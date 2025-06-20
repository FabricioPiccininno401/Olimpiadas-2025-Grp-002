import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';

export default function Registro({ navigation }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dni, setDni] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFocus, setInputFocus] = useState(null);
//Registro enviando datos al back
  async function enviarRegistro() {
    if (!name || !lastname || !dni || !mail || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: name,
          apellido: lastname,
          dni,
          email: mail,
          password,
        })
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.mensaje || "No se pudo registrar el usuario");
        return;
      }

      Alert.alert("Éxito", "Usuario registrado correctamente");
      navigation.navigate('InicioSec'); // volver a login u otra pantalla

    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro de Usuario</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={[styles.input, inputFocus === 'name' && styles.inputFocus]}
        onChangeText={setName}
        value={name}
        onFocus={() => setInputFocus('name')}
        onBlur={() => setInputFocus(null)}
        keyboardType="default"
        placeholder="Nombre"
      />

      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={[styles.input, inputFocus === 'lastname' && styles.inputFocus]}
        onChangeText={setLastname}
        value={lastname}
        onFocus={() => setInputFocus('lastname')}
        onBlur={() => setInputFocus(null)}
        keyboardType="default"
        placeholder="Apellido"
      />

      <Text style={styles.label}>D.N.I:</Text>
      <TextInput
        style={[styles.input, inputFocus === 'dni' && styles.inputFocus]}
        onChangeText={setDni}
        value={dni}
        onFocus={() => setInputFocus('dni')}
        onBlur={() => setInputFocus(null)}
        keyboardType="numeric"
        placeholder="Documento"
      />

      <Text style={styles.label}>Mail:</Text>
      <TextInput
        style={[styles.input, inputFocus === 'mail' && styles.inputFocus]}
        onChangeText={setMail}
        value={mail}
        onFocus={() => setInputFocus('mail')}
        onBlur={() => setInputFocus(null)}
        keyboardType="email-address"
        placeholder="Correo electrónico"
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={[styles.input, inputFocus === 'password' && styles.inputFocus]}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        onFocus={() => setInputFocus('password')}
        onBlur={() => setInputFocus(null)}
        placeholder="Contraseña"
      />

      <TouchableOpacity style={styles.boton} onPress={enviarRegistro}>
        <Text style={styles.textoBoton}>Enviar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#0277bd',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 18,
    fontSize: 16,
  },
  inputFocus: {
    borderColor: '#0288d1',
    shadowColor: '#0288d1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 4,
  },
  boton: {
    width: '100%',
    backgroundColor: '#0288d1',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
