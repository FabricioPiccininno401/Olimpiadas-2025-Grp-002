import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';

export default function Registro({ navigation }) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [dni, setDni] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFocus, setInputFocus] = useState(null);

  async function enviarRegistro() {
    if (!name || !lastname || !dni || !mail || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.246:3001/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      navigation.navigate('InicioSec');
    } catch (error) {
      console.error("Error de conexión:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Registro de Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={[styles.input, inputFocus === 'name' && styles.inputFocus]}
          onChangeText={setName}
          value={name}
          onFocus={() => setInputFocus('name')}
          onBlur={() => setInputFocus(null)}
          placeholder="Nombre"
        />

        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={[styles.input, inputFocus === 'lastname' && styles.inputFocus]}
          onChangeText={setLastname}
          value={lastname}
          onFocus={() => setInputFocus('lastname')}
          onBlur={() => setInputFocus(null)}
          placeholder="Apellido"
        />

        <Text style={styles.label}>DNI</Text>
        <TextInput
          style={[styles.input, inputFocus === 'dni' && styles.inputFocus]}
          onChangeText={setDni}
          value={dni}
          onFocus={() => setInputFocus('dni')}
          onBlur={() => setInputFocus(null)}
          placeholder="Documento"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={[styles.input, inputFocus === 'mail' && styles.inputFocus]}
          onChangeText={setMail}
          value={mail}
          onFocus={() => setInputFocus('mail')}
          onBlur={() => setInputFocus(null)}
          placeholder="Correo electrónico"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Contraseña</Text>
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
          <Text style={styles.textoBoton}>Registrarme</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e1f5fe',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    width: '100%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0277bd',
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 15,
  },
  inputFocus: {
    borderColor: '#0288d1',
    shadowColor: '#0288d1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  boton: {
    backgroundColor: '#0288d1',
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
});
