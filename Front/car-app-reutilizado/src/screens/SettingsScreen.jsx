import React, { useEffect, useState } from 'react';
import { View, Text, Keyboard, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import EditableField from '../components/EditableField';
import ProfilePhotoEditor from '../components/ProfilePhotoEditor';
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
    City: '',
    dni: '',
  });

  useEffect(() => {
    if (user && !loading) {
      setUserData({
        name: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        dni: user.dni || '',
        City: user.City?.name || '',
      });
    }
  }, [user, loading]);

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
      <ProfilePhotoEditor />

      <EditableField
        label="Nombre"
        value={userData.name}
        field="name"
        editingField={editingField}
        setEditingField={setEditingField}
        onChangeText={(val) => setUserData({ ...userData, name: val })}
        onSubmit={handleSubmitEdit}
      />
      <EditableField
        label="Apellido"
        value={userData.lastName}
        field="lastName"
        editingField={editingField}
        setEditingField={setEditingField}
        onChangeText={(val) => setUserData({ ...userData, lastName: val })}
        onSubmit={handleSubmitEdit}
      />
      <EditableField
        label="DNI"
        value={userData.dni}
        field="dni"
        editingField={editingField}
        setEditingField={setEditingField}
        onChangeText={(val) => setUserData({ ...userData, dni: val })}
        onSubmit={handleSubmitEdit}
      />
      <EditableField
        label="Ciudad"
        value={userData.City}
        field="City"
        editingField={editingField}
        setEditingField={setEditingField}
        onChangeText={(val) => setUserData({ ...userData, City: val })}
        onSubmit={handleSubmitEdit}
      />
      <EditableField
        label="Email"
        value={userData.email}
        field="email"
        editingField={editingField}
        setEditingField={setEditingField}
        onChangeText={(val) => setUserData({ ...userData, email: val })}
        onSubmit={handleSubmitEdit}
      />
    </ScreenWrapper>
  );
}

// 🎨 Estilos agrupados abajo
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
