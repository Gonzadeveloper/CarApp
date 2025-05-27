import React, { useEffect, useState } from 'react';
import { 
  View,
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';
import ScreenWrapper from '../components/ScreenWrapper';
import {
  getBrands,
  getModels,
  getVersions,
  createCar
} from '../api/carApi';

const CarForm = () => {
  const { user } = useAuth()
  const userId = user?.id
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [licensePlate, setLicensePlate] = useState('');
  const [nextService, setNextService] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (_, i) => 1980 + i);

  // Traer marcas
  useEffect(() => {
    getBrands()
      .then(res => setBrands(res.data.data))
      .catch(err => console.error(err));
  }, []);

  // Traer modelos según marca seleccionada
  useEffect(() => {
    if (selectedBrand) {
      getModels()
        .then(res => {
          const filteredModels = res.data.data.filter(m => m.brand_id === selectedBrand);
          setModels(filteredModels);
        })
        .catch(err => console.error(err));
    } else {
      setModels([]);
      setSelectedModel(null);
    }
  }, [selectedBrand]);

  // Traer versiones según modelo seleccionada
  useEffect(() => {
    if (selectedModel) {
      getVersions()
        .then(res => {
          const filteredVersions = res.data.data.filter(v => v.model_id === selectedModel);
          setVersions(filteredVersions);
        })
        .catch(err => console.error(err));
    } else {
      setVersions([]);
      setSelectedVersion(null);
    }
  }, [selectedModel]);

  // Enviar formulario
  const handleSubmit = () => {
    if (!selectedVersion || !selectedYear || !licensePlate || !nextService) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }


    const newCar = {
      version_id: selectedVersion,
      user_id: userId,
      license_plate: licensePlate,
      locked: false,
      year: selectedYear,
      next_service: nextService
    };

    createCar(newCar)
      .then(() => {
        Alert.alert('Éxito', 'Auto creado correctamente');
        // Limpiar campos
        setSelectedBrand(null);
        setSelectedModel(null);
        setSelectedVersion(null);
        setLicensePlate('');
        setNextService('');
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'No se pudo crear el auto');
      });
  };

  return (
    <ScreenWrapper>
        <View style={styles.container}>
        <Text style={styles.label}>Marca</Text>
        <Picker
            selectedValue={selectedBrand}
            onValueChange={value => setSelectedBrand(value)}
        >
            <Picker.Item label="Selecciona una marca" value={null} />
            {brands.map(brand => (
            <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
            ))}
        </Picker>

        <Text style={styles.label}>Modelo</Text>
        <Picker
            selectedValue={selectedModel}
            onValueChange={value => setSelectedModel(value)}
            enabled={models.length > 0}
        >
            <Picker.Item label="Selecciona un modelo" value={null} />
            {models.map(model => (
            <Picker.Item key={model.id} label={model.name} value={model.id} />
            ))}
        </Picker>

        <Text style={styles.label}>Versión</Text>
        <Picker
            selectedValue={selectedVersion}
            onValueChange={value => setSelectedVersion(value)}
            enabled={versions.length > 0}
        >
            <Picker.Item label="Selecciona una versión" value={null} />
            {versions.map(version => (
            <Picker.Item key={version.id} label={version.name} value={version.id} />
            ))}
        </Picker>

        <Text style={styles.label}>Patente</Text>
        <TextInput
            style={styles.input}
            placeholder="Ej: ABC123"
            value={licensePlate}
            onChangeText={setLicensePlate}
        />

        <Text style={styles.label}>Año</Text>
        <Picker
          selectedValue={selectedYear}
          onValueChange={value => setSelectedYear(value)}
        >
          <Picker.Item label="Selecciona un año" value={null} />
          {years.map(year => (
            <Picker.Item key={year} label={year.toString()} value={year} />
          ))}
        </Picker>


        <Text style={styles.label}>Próximo service (YYYY-MM-DD)</Text>
        <TextInput
            style={styles.input}
            placeholder="Ej: 2025-08-15"
            value={nextService}
            onChangeText={setNextService}
        />

        <Button title="Registrar auto" onPress={handleSubmit} />
        </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 6,
    borderRadius: 4
  }
});

export default CarForm;
