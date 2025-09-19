import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function InfoModal ({ visible, onClose, title, description }){
    return (
        <Modal transparent visible={visible} animationType='fade'>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.button}>
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 16,
  },
  button: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
});