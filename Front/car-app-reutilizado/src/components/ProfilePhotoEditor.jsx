import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ProfilePhotoEditor(){
    return (
        <View style={StyleSheet.container}>
            <Image
                source={require('../../assets/profile-placeholder.png')}
                style={styles.image}
            />
            <TouchableOpacity>
                <Text style={StyleSheet.text}>Editar mi foto de perfil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        marginBottom: 20 
    },
  image: { 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: '#ccc' 
    },
  text: { 
        marginLeft: 20, 
        color: '#007bff' 
    },
});
