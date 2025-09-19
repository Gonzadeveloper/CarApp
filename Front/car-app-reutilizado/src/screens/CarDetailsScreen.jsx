import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ScreenWrapper from '../components/ScreenWrapper';
import { useEffect, useState } from 'react';
import { getMyCars } from '../api/carApi';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const CarDetails = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [cars, setCars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const [selectedTab, setSelectedTab] = useState('service');

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
      <View>
        <View style={styles.navRow}>
          <TouchableOpacity onPress={handlePrevious} disabled={currentIndex === 0}>
            <Ionicons name="arrow-back-circle" size={32} color={currentIndex === 0 ? '#ccc' : '#2196F3'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext} disabled={currentIndex === cars.length - 1}>
            <Ionicons name="arrow-forward-circle" size={32} color={currentIndex === cars.length - 1 ? '#ccc' : '#2196F3'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>{`${brandName}`}</Text>
        <Text style={styles.title}>{`${modelName}`}</Text>
        <Text style={styles.title}>{`${versionName}`}</Text>
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

        <View style={styles.rowContainer}>
          <View style={styles.card}>
            <Icon name="speed" type="material" color="#000" />
            <Text style={styles.cardText}>Kilometraje</Text>
            <Text>{CarKms.at(-1)?.km ?? 'Sin datos'}</Text>
            <Text></Text>
          </View>
          <View style={styles.card}>
            <Icon name="wysiwyg" type="material" color="#000" />
            <Text style={styles.cardText}>Patente</Text>
            <Text style={styles.subTitle}>{license_plate}</Text>
          </View>
        </View>



        <Text style={styles.subTitle}>Año: {year}</Text>


        <View>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, selectedTab === 'service' && styles.activeTab]}
              onPress={() => setSelectedTab('service')}
            >
              <Text style={styles.tabText}>Service</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, selectedTab === 'km' && styles.activeTab]}
              onPress={() => setSelectedTab('km')}
            >
              <Text style={styles.tabText}>Kilómetros</Text>
            </TouchableOpacity>
          </View>

          {/* Contenido condicional */}
          {selectedTab === 'service' ? (
            <View>
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
            </View>
          ) : (
            <View>

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
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 10,
  },
  activeTab: {
    borderColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 5, // separación entre las tarjetas
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  navRow: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    zIndex: 10,
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
    alignSelf: 'flex-start',
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
