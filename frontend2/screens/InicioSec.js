import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob } from 'base-64';

export default function InicioSec({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function iniciarSesion() {
    if (!email || !password) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.mensaje || "Error al iniciar sesión");
        return;
      }

      await AsyncStorage.setItem("token", data.token);
      const payload = JSON.parse(atob(data.token.split(".")[1]));

      if (payload.rol === "admin") {
        navigation.navigate("InicioAd");
      } else if (payload.rol === "cliente") {
        navigation.navigate("Lista");
      } else {
        Alert.alert("Error", "Rol desconocido");
      }

    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  }

  function Registro() {
    navigation.navigate('Registro');
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Iniciar Sesión</Text>

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Correo"
          keyboardType='email-address'
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Contraseña"
          secureTextEntry={true}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
          <Text style={styles.textoBoton}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.registroTexto}>
          ¿No tienes cuenta? <Text style={styles.link} onPress={Registro}>Regístrate aquí</Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1f5fe',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0277bd',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 15,
  },
  boton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registroTexto: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
