import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { IconInfo } from "../utils/Icons";

export default function SearchInputWithIcon({ value, onChange, onIconPress, placeholder }) {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
      <TouchableOpacity onPress={onIconPress} style={styles.iconInsideInput}>
        <IconInfo width={22} height={22} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        paddingRight: 40, // espacio para el ícono a la derecha
        marginBottom: 10,
    },
    iconInsideInput: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -15 }],
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center'
    }
}) 