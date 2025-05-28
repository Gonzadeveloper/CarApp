// screens/AddKmScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const AddKmScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { carId } = route.params;

  const [km, setKm] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = async () => {
    if (!km) {
      Alert.alert('Error', 'Por favor, ingresa los kilómetros');
      return;
    }

    const payload = {
      car_id: carId,
      km,
      year: date.toISOString().split('T')[0], // formato yyyy-mm-dd
    };

    try {
      await axios.post('https://6gk42kt8-3001.brs.devtunnels.ms/kms', payload);
      Alert.alert('Éxito', 'Kilómetros agregados correctamente');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron enviar los datos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kilómetros:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 120000"
        value={km}
        onChangeText={setKm}
      />

      <Text style={styles.label}>Fecha:</Text>
      <Button title={date.toLocaleDateString()} onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <View style={styles.button}>
        <Button title="Agregar KM" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 6,
  },
  button: {
    marginTop: 20,
  },
});

export default AddKmScreen;
