import React from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function EditableField ({
    label,
    value,
    field,
    editingField,
    setEditingField,
    onChangeText,
    onSubmit
}) {
    return (
        <TouchableOpacity onPress={()=> setEditingField(field)}>
            <Text style={styles.label}>{label}</Text>
            {editingField === field ? (
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmit}
                    returnKeyType="done"
                    autoFocus    
                />
            ) : (
                <Text style={styles.text}>{value}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    label: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        paddingHorizontal: 20, 
        marginTop: 20 
    },
    input: { 
        fontSize: 16, 
        paddingHorizontal: 20, 
        paddingVertical: 8, 
        borderBottomWidth: 1, 
        borderColor: '#ccc' 
    },
    text: { 
        fontSize: 16, 
        paddingHorizontal: 20, 
        paddingVertical: 8 
    },
});