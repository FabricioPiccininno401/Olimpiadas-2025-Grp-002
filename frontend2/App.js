import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioSec from './screens/InicioSec';
import Lista from './screens/Lista';
import InicioAd from './screens/InicioAd';
import Registro from './screens/Registro';
import Consultar from './screens/Consultar';
import Servicios from './screens/Servicios';
import Carrito from './screens/Carrito';
import Pendientes from './screens/Pendientes';
const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='InicioSec' screenOptions={{headerShown: true}}>

        <Stack.Screen name = 'InicioSec' component = {InicioSec} options = {{title: 'Login', headerStyle:{fontWeight: 'bold', fontSize: 32, backgroundColor: '#b4e8fa', borderRadius: 12}}}/>
        <Stack.Screen name = 'InicioAd' component = {InicioAd} options = {{title: 'Bienvenido Admin',  headerStyle:{fontWeight: 'bold', fontSize: 32, backgroundColor: '#b4e8fa'}}}/>
        <Stack.Screen name = 'Registro' component = {Registro} options = {{ title: 'Registrarse',  headerStyle:{fontWeight: 'bold', fontSize: 32, backgroundColor: '#b4e8fa'}}}/> 
        <Stack.Screen name = 'Servicios' component = {Servicios} options = {{ title: 'Servicios', headerStyle:{fontWeight: 'bold', fontSize: 32, backgroundColor: '#b4e8fa'}}}/>
        <Stack.Screen name = 'Consultar' component = {Consultar} options = {{ title: 'Consultar', headerStyle:{fontWeight: 'bold', fontSize: 32, backgroundColor: '#b4e8fa'}}}/>
        <Stack.Screen name = 'Lista' component ={Lista} options={{title: 'Servicios', headerStyle:{fontWeight: 'bold', fontSize: 32, backgroundColor: '#b4e8fa'}}}/>
        <Stack.Screen name = 'Carrito' component = {Carrito} options = {{ title: 'Carrito', headerStyle:{fontWeight: 'bold', fontSize: 32, backgroundColor: '#b4e8fa'}}}/>
        <Stack.Screen name = 'Pendientes' component={Pendientes} options = {{ title: 'Pendientes', headerStyle:{fontWeight: 'bold', fontSize: 32, backgroundColor: '#b4e8fa'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

