import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//"Traducir el token"
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

export default function Pendientes() {
  const [viajes, setViajes] = useState([]);
  const [idUsuario, setIdUsuario] = useState(null);
    //Carga pedidos pendientes en la web
  useEffect(() => {
  async function fetchPendientes() {
    const token = await AsyncStorage.getItem('token');
    if (!token) return Alert.alert("Error", "Token no encontrado");

    const payload = parseJwt(token);
    if (!payload?.id) return Alert.alert("Error", "Token inválido");

    setIdUsuario(payload.id);
    console.log("Se activo el fetch desde el front");

    try {
      const res = await fetch("http://192.168.0.246:3001/api/pendientes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
        // ❌ NO body en GET
      });

      const data = await res.json();
      if (res.ok) {
        setViajes(data);
      } else {
        Alert.alert("Error", data.mensaje || "Error al obtener pendientes");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  }

  fetchPendientes();
}, []);

    //Elimina el pedido
  const eliminarPedido = async (id_pedido) => {
  console.log("Se activó la función de eliminar pedido");

  const token = await AsyncStorage.getItem("token");
  if (!token) {
    Alert.alert("Error", "Token no encontrado");
    return;
  }

  try {
    const res = await fetch("http://192.168.0.246:3001/api/EliminarPedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({ id_Pedido: id_pedido })
    });

    const data = await res.json();
    if (res.ok) {
      Alert.alert("✅", "Pedido eliminado");
      setViajes(prev => prev.filter(v => v.id !== id_pedido));
    } else {
      Alert.alert("Error", data.mensaje || "No se pudo eliminar");
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Fallo la conexión al servidor");
  }
};


  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Destino: {item.nombre}</Text>
      <Text style={styles.texto}>Salida: {item.salida}</Text>
      <Text style={styles.texto}>Precio: {item.precio}</Text>

      <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarPedido(item.id)}>
        <Text style={styles.botonTexto}>Eliminar pedido</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis pedidos pendientes</Text>
      <FlatList
        data={viajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item item={item} />}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3fc', // Fondo más suave
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f3c88', // Azul profundo
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 0.5,
    borderColor: '#dce3f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 6,
  },
  texto: {
    fontSize: 15,
    color: '#555',
    marginBottom: 3,
  },
  botonEliminar: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  botonTexto: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
