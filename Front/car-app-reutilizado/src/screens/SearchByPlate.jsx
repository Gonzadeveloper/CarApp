import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CarCard from '../components/CarCard';
import InfoModal from '../components/InfoModal';
import SearchInputWithIcon from '../components/SearchInputWidthIcon';
import { useSearchByPlate } from '../CustomHooks/useSearchByPlate';

export default function SearchByPlate({ navigation }) {
  const { query, results, handleSearch } = useSearchByPlate();
  const [modalVisible, setModalVisible] = useState(false);


const handlePress = (carId) => {
  navigation.navigate('CarDetailBySearch', { carId });
};
  
  return (
      <View style={styles.container}>
        <SearchInputWithIcon
            value={query}
            onChange={handleSearch}
            onIconPress={()=> setModalVisible(true)}
            placeholder="Buscar por patente..."
        />

        <Text style={styles.info}>Aquí puedes buscar por patente</Text>

        <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <CarCard car={item} onPress={handlePress} />}
            ListEmptyComponent={<Text style={styles.noResults}>Sin resultados</Text>}
        />

        <InfoModal
            visible={modalVisible}
            onClose={()=> setModalVisible(false)}
            title="Buscar por patente"
            description="Podras buscar autos por patente, ver sus ultimos kilometros registrados, si fue cargado en la app services y ademas contatar con el propietario registrado en la app"
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
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
});
