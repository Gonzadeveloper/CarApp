import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenWidth = Dimensions.get('window').width;

export default function CarDetailBySearch() {
  const route = useRoute();
  const { carId } = route.params;
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchCarDetails = async () => {
        try {
        const token = await AsyncStorage.getItem('accessToken'); // o como lo tengas guardado
        const res = await axios.get(
            `https://6gk42kt8-3001.brs.devtunnels.ms/cars/searchid/${carId}`,
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
            }
        );
        setCar(res.data.data);
        } catch (err) {
        console.error('Error cargando detalles del auto:', err);
        } finally {
        setLoading(false);
        }
    };

    fetchCarDetails();
    }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#000" />;
  }

  if (!car) {
    return <Text style={styles.error}>No se pudo cargar la información del auto</Text>;
  }

  const kmLabels = car.km_history?.map(k => new Date(k.date).toLocaleDateString()) || [];
  const kmValues = car.km_history?.map(k => k.km) || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles del Auto</Text>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Patente:</Text>
        <Text style={styles.value}>{car.license_plate}</Text>

        <Text style={styles.label}>Año:</Text>
        <Text style={styles.value}>{car.year}</Text>

        <Text style={styles.label}>Último Service:</Text>
        <Text style={styles.value}>
          {car.Services && car.Services.length > 0
            ? `${car.Services.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].description} - ${new Date(car.Services[0].createdAt).toLocaleDateString()}`
            : 'Sin servicios registrados'}
        </Text>

        <Text style={styles.label}>Últimos Kms registrados:</Text>
        <Text style={styles.value}>
          {car.CarsKms && car.CarsKms.length > 0
            ? `${car.CarsKms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].km} km - ${new Date(car.CarsKms[0].createdAt).toLocaleDateString()}`
            : 'Sin datos de kilómetros'}
        </Text>

        <Text style={styles.label}>Marca:</Text>
        <Text style={styles.value}>{car.brand}</Text>

        <Text style={styles.label}>Modelo:</Text>
        <Text style={styles.value}>{car.model}</Text>

        <Text style={styles.label}>Versión:</Text>
        <Text style={styles.value}>{car.version}</Text>

        <Text style={styles.label}>ID del propietario:</Text>
        <Text style={styles.value}>{car.user_id}</Text>
      </View>

      {car.km_history?.length > 0 && (
        <>
          <Text style={styles.chartTitle}>Historial de Kilómetros</Text>
          <LineChart
            data={{
              labels: kmLabels,
              datasets: [{ data: kmValues }]
            }}
            width={screenWidth - 32}
            height={220}
            yAxisSuffix=" km"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#f7f7f7',
              backgroundGradientTo: '#f7f7f7',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: () => '#333',
              style: { borderRadius: 16 },
              propsForDots: { r: '4', strokeWidth: '1', stroke: '#000' }
            }}
            bezier
            style={styles.chart}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailBox: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    marginBottom: 10,
    fontSize: 16,
    color: '#222',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});
