import { useAuth } from '../context/AuthContext';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CustomDrawerContent(props) {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login'); // Redirige al login
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      {!user ? (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Iniciar sesión</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            navigation.navigate('CarSearchStack');
            await logout();
          }}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      )}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  loginText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
});