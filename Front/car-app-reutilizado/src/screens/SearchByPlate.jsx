import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function SearchByPlate({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    
    if (text.length >= 2) {
      try {
          const res = await axios.get(`https://6gk42kt8-3001.brs.devtunnels.ms/cars/search?plate=${text}`);
          setResults(res.data.data);
        } catch (err) {
            console.error('Error al buscar:', err);
        }
    } else {
        setResults([]);
    }
};

const handlePress = (carId) => {
  navigation.navigate('CarDetailBySearch', { carId });
};


const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
        <View style={styles.card}>
        <Image
            source={{ uri: item.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmypQtgxswHGNkcLoFC6A16DGUAU-HQBL2uQ&s' }}
            style={styles.image}
            />
        <View style={styles.cardContent}>
            <Text style={styles.text}>{item.brand} {item.model}</Text>
            <Text style={styles.text}>Año: {item.year}</Text>
            <Text style={styles.plate}>Patente: {item.license_plate}</Text>
        </View>
        </View>
    </TouchableOpacity>
  );
  
  return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por patente..."
        value={query}
        onChangeText={handleSearch}
        />
      <Text style={styles.info}>Aquí puedes buscar por patente</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noResults}>Sin resultados</Text>}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    info: {
        marginBottom: 10,
        color: '#666',
    fontSize: 14,
},
noResults: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999',
},
card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
},
image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
},
text: {
    fontSize: 16,
},
plate: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#333',
  },
});
