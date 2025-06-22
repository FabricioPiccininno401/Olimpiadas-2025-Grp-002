import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function InicioAd({ navigation }) {
  function Agregar() {
    navigation.navigate('Servicios');
  }

  function Consultar() {
    navigation.navigate('Consultar');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Panel de Administrador</Text>
      <View style={styles.botonera}>
        <TouchableOpacity style={styles.boton} onPress={Agregar}>
          <Text style={styles.textoBoton}>Agregar Servicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={Consultar}>
          <Text style={styles.textoBoton}>Consultar Pedidos</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f9fc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#007B8A',
  },
  botonera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  boton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  textoBoton: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
