import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default function AddServiceScreen({ route, navigation }) {
  const { carId } = route.params;

  const [km_at_service, setKm_at_service] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);



  const handleDateChange = (event, selectedDate) => {
      setShowPicker(Platform.OS === 'ios');
      if (selectedDate) setDate(selectedDate);
    };
    
    const handleSubmit = async () => {
    try {
        await axios.post(
    'https://6gk42kt8-3001.brs.devtunnels.ms/service',
    {
        car_id: carId,
        km_at_service,
        description,
        year: date.toISOString().split('T')[0],
    },
    {
        headers: {
        'Content-Type': 'application/json',
        },
    }
    );
      alert('Servicio agregado');
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar servicio:', error);
      alert('Error al agregar el servicio');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Kilómetros</Text>
      <TextInput
        keyboardType="numeric"
        value={km_at_service}
        onChangeText={setKm_at_service}
        placeholder="Ingrese los kilómetros"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Descripción</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción del servicio"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Button title="Seleccionar Fecha" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={{ marginVertical: 10 }}>Fecha: {date.toISOString().split('T')[0]}</Text>

      <Button title="Agregar Servicio" onPress={handleSubmit} />
    </View>
  );
}
