import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

import InicioSec from './screens/InicioSec';
import Lista from './screens/Lista';
import InicioAd from './screens/InicioAd';
import Registro from './screens/Registro';
import Consultar from './screens/Consultar';
import Servicios from './screens/Servicios';
import Carrito from './screens/Carrito';
import Pendientes from './screens/Pendientes';

const Stack = createNativeStackNavigator();
const screenWidth = Dimensions.get('window').width;

// Header personalizado
const HeaderWithLogo = ({ title }) => (
  <View style={styles.headerContainer}>
    <Image
      source={require('./assets/logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='InicioSec'>
        <Stack.Screen
          name='InicioSec'
          component={InicioSec}
          options={{
            headerTitle: () => <HeaderWithLogo title="Login" />,
            headerStyle: { backgroundColor: '#b4e8fa', height: 100 },
          }}
        />
        <Stack.Screen
          name='InicioAd'
          component={InicioAd}
          options={{
            headerTitle: () => <HeaderWithLogo title="Bienvenido Admin" />,
            headerStyle: { backgroundColor: '#b4e8fa', height: 100 },
          }}
        />
        <Stack.Screen
          name='Registro'
          component={Registro}
          options={{
            headerTitle: () => <HeaderWithLogo title="Registrarse" />,
            headerStyle: { backgroundColor: '#b4e8fa', height: 100 },
          }}
        />
        <Stack.Screen
          name='Servicios'
          component={Servicios}
          options={{
            headerTitle: () => <HeaderWithLogo title="Servicios" />,
            headerStyle: { backgroundColor: '#b4e8fa', height: 100 },
          }}
        />
        <Stack.Screen
          name='Consultar'
          component={Consultar}
          options={{
            headerTitle: () => <HeaderWithLogo title="Consultar" />,
            headerStyle: { backgroundColor: '#b4e8fa', height: 100 },
          }}
        />
        <Stack.Screen
          name='Lista'
          component={Lista}
          options={{
            headerTitle: () => <HeaderWithLogo title="Servicios" />,
            headerStyle: { backgroundColor: '#b4e8fa', height: 100 },
          }}
        />
        <Stack.Screen
          name='Carrito'
          component={Carrito}
          options={{
            headerTitle: () => <HeaderWithLogo title="Carrito" />,
            headerStyle: { backgroundColor: '#b4e8fa', height: 100 },
          }}
        />
        <Stack.Screen
          name='Pendientes'
          component={Pendientes}
          options={{
            headerTitle: () => <HeaderWithLogo title="Pendientes" />,
            headerStyle: { backgroundColor: '#b4e8fa', height: 100 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    height: 100,
    position: 'relative',
  },
  logo: {
    width: 70,
    height: 70,
    position: 'absolute',
    left: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});
