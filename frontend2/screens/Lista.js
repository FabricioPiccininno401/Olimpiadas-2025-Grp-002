import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 👇 Función auxiliar para decodificar JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

export default function Lista({ navigation }) {
  const [servicios, setServicios] = useState([]);
  const [token, setToken] = useState(null);
// Cargar servicios desde el backend
  useEffect(() => {
    // Obtener token del almacenamiento
    AsyncStorage.getItem('token')
      .then(t => {
        if (!t) {
          Alert.alert("Token no encontrado", "Iniciá sesión nuevamente");
          return;
        }
        setToken(t);
        
        fetch("http://localhost:3001/api/servicios") 
          .then(res => res.json())
          .then(data => setServicios(data))
          .catch(err => {
            console.error("Error al traer servicios:", err);
            Alert.alert("Error", "No se pudo obtener servicios");
          });
      });
  }, []);
//Agrega al carrito mediante id del usuario y producto
  const agregarAlCarrito = async (id_Producto) => {
    if (!token) {
      Alert.alert("Error", "Token no disponible");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ id_Producto })
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("✅", "Producto agregado al carrito");
      } else {
        Alert.alert("Error", data.error || "No se pudo agregar");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Fallo la conexión al servidor");
    }
  };

  const ItemCard = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text style={styles.texto}>{item.paquete}</Text>
      <Text style={styles.texto}>{item.salida}</Text>
      <Text style={styles.precio}>${item.precioOriginal}</Text>
      <Text style={styles.texto}>${item.precio}</Text>
      <Text style={styles.bot}>Ahorra ${item.ahorro}</Text>

      <TouchableOpacity style={styles.boton} onPress={() => agregarAlCarrito(item.id)}>
        <Text style={styles.botonTexto}>Agregar al carrito</Text>
      </TouchableOpacity>

      
    </View>
  );

  return (
  <View style={styles.container}>
    <FlatList
      data={servicios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ItemCard item={item} />}
      ListHeaderComponent={() => (
        <Text style={styles.header}>Nuestros Servicios</Text>
      )}
      ItemSeparatorComponent={() => <View style={{ marginVertical: 19 }} />}
    />
    <View style={styles.botonesContenedor}>
    <TouchableOpacity style={styles.botonVerCarrito} onPress={() => navigation.navigate('Carrito')}>
      <Text style={styles.botonTexto}>Ver carrito</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.botonPendientes} onPress={() => navigation.navigate('Pendientes')}>
      <Text style={styles.botonTexto}>Pedidos pendientes</Text>
    </TouchableOpacity>
  </View>

    <StatusBar style="auto" />
  </View>
);

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6faff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  item: {
    backgroundColor: '#c0f3fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  texto: {
    fontSize: 16,
    marginBottom: 2,
  },
  precio: {
    color: 'gray',
    textDecorationLine: 'line-through',
    fontSize: 15,
    marginTop: 4,
  },
  bot: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    backgroundColor: '#b0e0e6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  boton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  botonVerCarrito: {
    backgroundColor: '#007f9c',
    padding: 14,
    marginHorizontal: 32,
    marginBottom: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007f9c',
    textAlign: 'center',
    marginBottom: 20,
  },
    botonesContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  botonPendientes: {
    backgroundColor: '#005f73',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  botonVerCarrito: {
    backgroundColor: '#007f9c',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },

});
