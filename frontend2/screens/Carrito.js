import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Carrito({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('token').then(t => {
      if (!t) {
        Alert.alert("Token no encontrado", "Iniciá sesión nuevamente");
        return;
      }
      setToken(t);
      fetch("http://192.168.0.246:3001/api/carrito_lista", {
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

  const quitarDelCarrito = async (idProducto) => {
    if (!token) return;

    try {
      const res = await fetch("http://192.168.0.246:3001/api/eliminar", {
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

  const confirmarCompra = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://192.168.0.246:3001/api/comprar", {
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
        // Podés navegar si querés: navigation.navigate("Pendientes");
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
        <View style={styles.resumenContainer}>
          <View style={styles.resumen}>
            <Text style={styles.resumenTitulo}>Resumen de compra:</Text>
            <View style={styles.linea}>
              <Text style={styles.etiqueta}>Precio original:</Text>
              <Text style={styles.valor}>${productos.reduce((acc, p) => acc + p.precioOriginal, 0).toLocaleString()}</Text>
            </View>
            <View style={styles.linea}>
              <Text style={styles.etiqueta}>Descuento total:</Text>
              <Text style={styles.valorDescuento}>-${productos.reduce((acc, p) => acc + p.ahorro, 0).toLocaleString()}</Text>
            </View>
            <View style={styles.lineaTotal}>
              <Text style={styles.etiquetaTotal}>Total a pagar:</Text>
              <Text style={styles.valorTotal}>${productos.reduce((acc, p) => acc + p.precio, 0).toLocaleString()}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.botonResumen} onPress={confirmarCompra}>
            <Text style={styles.botonTexto}>Iniciar Compra</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    paddingTop: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginBottom: 20,
    color: '#1f2937'
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#111827'
  },
  texto: {
    fontSize: 14,
    marginVertical: 1,
    color: '#374151'
  },
  precio: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#9ca3af',
    marginTop: 4,
  },
  bot: {
    fontSize: 13,
    color: '#047857',
    backgroundColor: '#d1fae5',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  botonRojo: {
    marginTop: 10,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  botonTexto: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },
  resumenContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    marginTop: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  resumen: {
    marginBottom: 15,
  },
  resumenTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827'
  },
  linea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  lineaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    paddingTop: 10,
  },
  etiqueta: {
    fontSize: 15,
    color: '#374151'
  },
  valor: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151'
  },
  valorDescuento: {
    fontSize: 15,
    fontWeight: '600',
    color: '#b91c1c',
  },
  etiquetaTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827'
  },
  valorTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  botonResumen: {
    backgroundColor: '#10b981',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  }
});
