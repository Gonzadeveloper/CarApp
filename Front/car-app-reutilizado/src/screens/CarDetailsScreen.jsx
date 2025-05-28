import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ScreenWrapper from '../components/ScreenWrapper';
import { useEffect, useState } from 'react';
import { getMyCars } from '../api/carApi';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused  } from '@react-navigation/native';

const CarDetails = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
  const fetchCars = async () => {
      try {
        const res = await getMyCars();
        setCars(res.data);
      } catch (error) {
        console.error('Error al obtener los autos:', error);
      }
    };

    if (isFocused) {
      fetchCars();
    }
  }, [isFocused]);

  const handleNext = () => {
    if (currentIndex < cars.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!cars.length) return <Text style={styles.loading}>Cargando autos...</Text>;

  const car = cars[currentIndex];
  const { license_plate, year, next_service, Services, CarKms, Version } = car;
  const { name: versionName, Model } = Version || {};
  const { name: modelName, Brand } = Model || {};
  const brandName = Brand?.name || '';

  // Formatear historial de KM por fecha (CarKms)
  const mileageLabels = CarKms.map(entry => new Date(entry.createdAt).toLocaleDateString());
  const mileageValues = CarKms.map(entry => entry.km);

  return (
    <ScreenWrapper>
      <View style={styles.navRow}>
        <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0}>
          <Ionicons name="arrow-back-circle" size={32} color={currentIndex === 0 ? '#ccc' : '#2196F3'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} disabled={currentIndex === cars.length - 1}>
          <Ionicons name="arrow-forward-circle" size={32} color={currentIndex === cars.length - 1 ? '#ccc' : '#2196F3'} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Image
            source={{
            uri:
              brandName === 'Toyota'
                ? 'https://i.pinimg.com/736x/77/52/32/775232084fc9143b82ab9a2bf25877f1.jpg'
                : brandName === 'Volkswagen'
                ? 'https://vw-digital-cdn-global.itd.vw.com.br/assets/vw-newsroon-cdn-ar-ps/notas/VW%20Gol%20(3).jpg'
                : 'https://img.freepik.com/psd-premium/coche-ciudad-blanca-sobre-fondo-transparente-ilustracion-renderizado-3d_494250-61995.jpg', // default
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{`${brandName} ${modelName} ${versionName}`}</Text>
        <Text style={styles.subTitle}>Año: {year} | Patente: {license_plate}</Text>

         <TouchableOpacity
           onPress={() => navigation.navigate('AddService', { carId: car.id })}
           style={{ backgroundColor: '#2196F3', padding: 12, borderRadius: 8, marginTop: 20 }}
         >
           <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Agregar Service</Text>
         </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.label}>Último service:</Text>
          <Text>
            {Services?.length
              ? new Date(Services[Services.length - 1].createdAt).toLocaleDateString()
              : 'Sin registros'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Próximo service:</Text>
          <Text>{new Date(next_service).toLocaleDateString()}</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddKm', { carId: car.id })}
          style={{ backgroundColor: '#2196F3', padding: 12, borderRadius: 8, marginTop: 20 }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Agregar KM</Text>
        </TouchableOpacity>


        <Text style={styles.label}>Historial de Kilómetros</Text>
        {CarKms.length ? (
          <LineChart
            data={{
              labels: mileageLabels,
              datasets: [{ data: mileageValues }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              labelColor: () => '#333',
              style: { borderRadius: 8 },
            }}
            style={styles.chart}
          />
        ) : (
          <Text>No hay historial de kilometraje</Text>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
  chart: {
    marginVertical: 20,
    borderRadius: 8,
  },
  loading: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});

export default CarDetails;
