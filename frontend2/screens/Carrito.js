import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Carrito({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [token, setToken] = useState(null);
    //Carga carrito en la pestaña
  useEffect(() => {
    AsyncStorage.getItem('token').then(t => {
      if (!t) {
        Alert.alert("Token no encontrado", "Iniciá sesión nuevamente");
        return;
      }
      setToken(t);
      fetch("http://localhost:3001/api/carrito_lista", {
        headers: {
          "Authorization": t
        }
      })
        .then(res => res.json())
        .then(data => setProductos(data))
        .catch(err => {
          console.error("Error al obtener carrito:", err);
          Alert.alert("Error", "No se pudo obtener el carrito");
        });
    });
  }, []);
  //Quita servicio del carrito mediante el id del boton
  const quitarDelCarrito = async (idProducto) => {
  if (!token) return;

  try {
    const res = await fetch("http://localhost:3001/api/eliminar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({ id_Producto: idProducto }),
    });

    if (res.ok) {
      setProductos(productos.filter(p => p.id !== idProducto));
      Alert.alert("Eliminado", "Producto quitado del carrito");
    } else {
      Alert.alert("Error", "No se pudo eliminar");
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Fallo la conexión al eliminar");
  }
};

    //Comfirma compra y envia todo a pendiente
  const confirmarCompra = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3001/api/comprar", {
        method: "POST",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert("✅", "Compra confirmada");
        setProductos([]);
      } else {
        Alert.alert("Error", data.error || "No se pudo confirmar");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo conectar con el servidor");
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
      <TouchableOpacity style={styles.botonRojo} onPress={() => quitarDelCarrito(item.id)}>
        <Text style={styles.botonTexto}>Quitar del carrito</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListHeaderComponent={() => (
          <Text style={styles.header}>Tu carrito de compras</Text>
        )}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
        ListEmptyComponent={() => <Text style={{ fontSize: 18 }}>No hay productos en el carrito</Text>}
      />
      {productos.length > 0 && (
        <TouchableOpacity style={styles.botonComprar} onPress={confirmarCompra}>
          <Text style={styles.botonTexto}>Comprar</Text>
        </TouchableOpacity>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2ffff',
    alignItems: 'center',
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#c0f3fa',
    padding: 20,
    borderRadius: 12,
    width: 300,
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 15,
    marginVertical: 2,
  },
  precio: {
    fontSize: 15,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  bot: {
    fontSize: 14,
    color: 'green',
    backgroundColor: '#b0e0e6',
    borderRadius: 6,
    paddingHorizontal: 6,
    marginVertical: 4,
  },
  botonRojo: {
    marginTop: 8,
    backgroundColor: '#f87171',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '100%'
  },
  botonComprar: {
    backgroundColor: '#34d399',
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
    width: '80%'
  },
  botonTexto: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: '#b4e8fa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  }
});
