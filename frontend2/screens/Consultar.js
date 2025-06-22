import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Consultar({ navigation }) {
  const [id, setId] = useState('');
  const [result, setResult] = useState([]);
  const [token, setToken] = useState('');

  const IdentificarId = async () => {
    if (!id) return Alert.alert("Error", "Debe ingresar un ID");

    const t = await AsyncStorage.getItem('token');
    if (!t) return Alert.alert("Error", "No se encontró el token");

    setToken(t);

    fetch("http://192.168.0.246:3001/api/buscar_pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

  const confirmarPago = async (id_Pedido) => {
    const res = await fetch("http://192.168.0.246:3001/api/comfirmarEnvio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: id, id_pendiente: id_Pedido })
    });

    const data = await res.json();
    if (data.ok) {
      Alert.alert("✅", "Confirmado y movido a historial");
      IdentificarId();
    } else {
      Alert.alert("Error", "No se pudo confirmar");
    }
  };

  const cancelarViaje = async (id_Pedido) => {
    const res = await fetch("http://192.168.0.246:3001/api/eliminarPedidoAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      <Text style={styles.texto}>Paquete: {item.paquete}</Text>
      <Text style={styles.texto}>{item.salida}</Text>
      <Text style={styles.precio}>Precio: ${item.precio.toLocaleString()}</Text>
      <View style={styles.botonesAccion}>
        <TouchableOpacity style={styles.aceptar} onPress={() => confirmarPago(item.id)}>
          <Text style={styles.textoBoton}>✅ Confirmar Pago</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelar} onPress={() => cancelarViaje(item.id)}>
          <Text style={styles.textoBoton}>❌ Cancelar Viaje</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Viajes pendientes</Text>
      <View style={styles.buscadorContainer}>
        <TextInput
          style={styles.input}
          placeholder="ID del usuario"
          onChangeText={setId}
          value={id}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.boton} onPress={IdentificarId}>
          <Text style={styles.textoBoton}>🔍 Buscar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={result}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListEmptyComponent={() => (
          <Text style={styles.noResultados}>No hay viajes pendientes</Text>
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
    backgroundColor: '#f0f6ff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111827',
  },
  buscadorContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 42,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  boton: {
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  texto: {
    fontSize: 14,
    marginBottom: 2,
  },
  precio: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
    color: '#1e3a8a',
  },
  botonesAccion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  aceptar: {
    backgroundColor: '#22c55e',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 6,
    alignItems: 'center',
  },
  cancelar: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 6,
    alignItems: 'center',
  },
  noResultados: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#6b7280',
  }
});
