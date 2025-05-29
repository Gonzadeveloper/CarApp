import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { updateUser } from '../api/userApi';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { user, loading } = useAuth();
  const userId = user?.id;
  const [editingField, setEditingField] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    City:'',
    dni:'',
  });
  
  useEffect(() => {
    if (user && !loading) {
      setUserData({
        name: user.data?.name || '',
        lastName: user.data?.lastName || '',
        email: user.data?.email || '',
        dni: user.data?.dni || '',
        City: user.data.City?.name || '',
      });
    }
  }, [user, loading]);
  
  const handleFieldEdit = (field) => {
    setEditingField(field);
  };

  const handleSubmitEdit = async () => {
    const filteredData = Object.fromEntries(
      Object.entries(userData).filter(([_, value]) => value !== '')
    );

    try {
      await updateUser(userId, filteredData);
      Alert.alert('Éxito', 'Datos actualizados correctamente');
    } catch {
      Alert.alert('Error', 'No se pudieron guardar los cambios');
    }
    setEditingField(null);
    Keyboard.dismiss();
  };

    if (loading || !user) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text>Cargando usuario...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>

      <Text style={styles.screenTitle}>Settings</Text>

      {/* Foto de perfil y botón editar */}
      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/profile-placeholder.png')} // Usa tu imagen placeholder
          style={styles.profileImage}
        />
        <TouchableOpacity>
          <Text style={styles.editPhotoText}>Editar mi foto de perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Campo Nombre */}
      <TouchableOpacity onPress={() => handleFieldEdit('name')}>
        <Text style={styles.label}>Nombre</Text>
        {editingField === 'name' ? (
          <TextInput
            style={styles.editableText}
            value={userData.name}
            onChangeText={(val) => setUserData({ ...userData, name: val })}
            onSubmitEditing={handleSubmitEdit}
            returnKeyType="done"
            autoFocus
          />
        ) : (
          <Text style={styles.valueText}>{userData?.name}</Text>
        )}
      </TouchableOpacity>

      {/* Campo Apellido */}
      <TouchableOpacity onPress={() => handleFieldEdit('lastName')}>
        <Text style={styles.label}>Apellido</Text>
        {editingField === 'lastName' ? (
          <TextInput
            style={styles.editableText}
            value={userData.lastName}
            onChangeText={(val) => setUserData({ ...userData, lastName: val })}
            onSubmitEditing={handleSubmitEdit}
            returnKeyType="done"
            autoFocus
          />
        ) : (
          <Text style={styles.valueText}>{userData?.lastName}</Text>
        )}
      </TouchableOpacity>

      {/* Campo DNI */}
      <TouchableOpacity onPress={() => handleFieldEdit('dni')}>
        <Text style={styles.label}>DNI</Text>
        {editingField === 'dni' ? (
          <TextInput
            style={styles.editableText}
            value={userData.dni}
            onChangeText={(val) => setUserData({ ...userData, dni: val })}
            onSubmitEditing={handleSubmitEdit}
            returnKeyType="done"
            autoFocus
          />
        ) : (
          <Text style={styles.valueText}>{userData?.dni}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFieldEdit('City')}>
        <Text style={styles.label}>Ciudad</Text>
        {editingField === 'City' ? (
          <TextInput
            style={styles.editableText}
            value={userData.City}
            onChangeText={(val) => setUserData({ ...userData, City: val })}
            onSubmitEditing={handleSubmitEdit}
            returnKeyType="done"
            autoFocus
          />
        ) : (
          <Text style={styles.valueText}>{userData?.City}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFieldEdit('email')}>
        <Text style={styles.label}>Email</Text>
        {editingField === 'email' ? (
          <TextInput
            style={styles.editableText}
            value={userData.email}
            onChangeText={(val) => setUserData({ ...userData, email: val })}
            onSubmitEditing={handleSubmitEdit}
            returnKeyType="done"
            autoFocus
          />
        ) : (
          <Text style={styles.valueText}>{userData.email}</Text>
        )}
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    padding: 10,
  },
  closeButton: {
    fontSize: 22,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
  },
  editPhotoText: {
    marginLeft: 20,
    color: '#007bff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  valueText: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  editableText: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
