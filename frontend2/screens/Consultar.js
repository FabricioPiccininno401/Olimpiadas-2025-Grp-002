import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Consultar({ navigation }) {
  const [id, setId] = useState('');
  const [result, setResult] = useState([]);
  const [token, setToken] = useState('');
  //Cargar pedidos mediante ID
  const IdentificarId = async () => {
    if (!id) return Alert.alert("Error", "Debe ingresar un ID");

    const t = await AsyncStorage.getItem('token');
    if (!t) return Alert.alert("Error", "No se encontró el token");

    setToken(t);
    
    fetch("http://localhost:3001/api/buscar_pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: id })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setResult(data);
        } else {
          Alert.alert("Sin resultados", "No se encontraron viajes para ese ID");
          setResult([]);
        }
      })
      .catch(err => {
        console.error("Error en fetch:", err);
        Alert.alert("Error", "No se pudo obtener la información");
      });
  };
  //Comfirma el pedido de envio del usuario
  const confirmarPago = async (id_Pedido) => {
    const res = await fetch("http://localhost:3001/api/comfirmarEnvio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id_usuario: id, id_pendiente: id_Pedido })
    });

    const data = await res.json();
    if (data.ok) {
      Alert.alert("✅", "Confirmado y movido a historial");
      IdentificarId(); // Recargar
    } else {
      Alert.alert("Error", "No se pudo confirmar");
    }
  };
  //Elimina el pedido de envio del usuario
  const cancelarViaje = async (id_Pedido) => {
    const res = await fetch("http://localhost:3001/api/eliminarPedidoAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id_usuario: id, id_pendiente: id_Pedido })
    });

    const data = await res.json();
    if (data.ok) {
      Alert.alert("✅", "Pedido cancelado");
      IdentificarId(); 
    } else {
      Alert.alert("Error", "No se pudo cancelar");
    }
  };

  const ItemCard = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Paquete a {item.nombre}</Text>
      <Text style={styles.texto}>ID Pedido: {item.id}</Text>
      <Text style={styles.texto}>{item.paquete}</Text>
      <Text style={styles.texto}>{item.salida}</Text>
      <Text style={styles.texto}>Precio: ${item.precio.toLocaleString()}</Text>
      <View style={styles.botonesAccion}>
        <TouchableOpacity style={styles.aceptar} onPress={() => confirmarPago(item.id)}>
          <Text style={styles.textoBoton}>Confirmar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelar} onPress={() => cancelarViaje(item.id)}>
          <Text style={styles.textoBoton}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consultar viajes</Text>
      <TextInput
        style={styles.input}
        placeholder="ID del usuario"
        onChangeText={setId}
        value={id}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.boton} onPress={IdentificarId}>
        <Text style={styles.textoBoton}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={result}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListHeaderComponent={() => result.length > 0 && (
          <Text style={styles.subHeader}>Viajes Pendientes</Text>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#f2faff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: '#b4e8fa',
    padding: 5,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#c0f3fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 14,
    marginTop: 2,
  },
  botonesAccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  aceptar: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelar: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  }
});
