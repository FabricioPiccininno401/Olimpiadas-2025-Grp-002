import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Servicios({ navigation }) {
  const [producto, setProducto] = useState('');
  const [preOriginal, setPrecioOriginal] = useState('');
  const [preFinal, setPrecioFinal] = useState('');
  const [img, setImg] = useState('');
  const [duracion, setDuracion] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [stars, setStars] = useState('');
//Envia al backend los datos para agregar a la tabla servicios
  async function agregarServicio() {
    if (!producto || !preOriginal || !preFinal || !img || !duracion || !calificacion || !stars) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch("http://localhost:3001/api/agregar_destino", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          nombre: producto,
          precioOriginal: parseFloat(preOriginal),
          precio: parseFloat(preFinal),
          imagen: img,
          duracion: parseInt(duracion),
          rating: calificacion,
          estrellas: stars
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data.mensaje);
        Alert.alert("Error", data.mensaje || "No se pudo agregar el servicio");
        return;
      }

      Alert.alert("Éxito", "Servicio agregado correctamente");
      navigation.goBack(); // volver a la pantalla anterior

    } catch (error) {
      console.error("Error al enviar:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#e1f5fe' }}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Agregar Nuevo Servicio</Text>

        <TextInput
          style={styles.input}
          onChangeText={setProducto}
          value={producto}
          placeholder="Nombre del paquete"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPrecioOriginal}
          value={preOriginal}
          placeholder="Precio original"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPrecioFinal}
          value={preFinal}
          placeholder="Precio final"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={setImg}
          value={img}
          placeholder="URL de imagen"
        />
        <TextInput
          style={styles.input}
          onChangeText={setDuracion}
          value={duracion}
          placeholder="Ej: 5 Dias/4 Noches"
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCalificacion}
          value={calificacion}
          placeholder="Calificación (Ej: 9)"
        />
        <TextInput
          style={styles.input}
          onChangeText={setStars}
          value={stars}
          placeholder="Estrellas (Ej: 4)"
        />

        <TouchableOpacity style={styles.boton} onPress={agregarServicio}>
          <Text style={styles.textoBoton}>Agregar Servicio</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0277bd',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 16,
    fontSize: 16,
    elevation: 2
  },
  boton: {
    backgroundColor: '#0288d1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
