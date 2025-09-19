import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";

export default function CarCard({ car, onPress }){

    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmypQtgxswHGNkcLoFC6A16DGUAU-HQBL2uQ&s'

    return (
        <TouchableOpacity onPress={() => onPress(car.id)}>
            <View style={styles.card}>
                <Image
                    source={{ uri: car.image || defaultImage }}
                    style={styles.image}
                />
                <View style={styles.cardContent}>
                <Text style={styles.text}>{car.brand} {car.model}</Text>                
                <Text style={styles.text}>Año: {car.year}</Text>
                <Text style={styles.plate}>Patente: {car.license_plate}</Text>           
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    plate: {
        marginTop: 4,
        fontWeight: 'bold',
        color: '#333',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
        elevation: 2,
    },
})