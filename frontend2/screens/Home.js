import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function Home({ navigation }) {
  const [servicios, setServicios] = useState([]);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/api/servicios") 
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => {
        console.error("Error:", err);
        Alert.alert("Error", "No se pudo obtener los servicios");
      });
  }, []);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={servicios}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
      <StatusBar style="dark" />
    </View>
  );
}
