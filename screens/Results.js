import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tomatoDiseasesData from '../assets/tomato_diseases.json';


const Results = ({ route }) => {
    const { prediction, confidence, imageUri } = route.params;
    const navigation = useNavigation();
    const [diseaseInfo, setDiseaseInfo] = useState(null);

    useEffect(() => {
        // Load disease information from JSON
        const matchedDisease = tomatoDiseasesData.find(disease => disease.name === prediction);
        setDiseaseInfo(matchedDisease);
    }, [prediction]);

    const handleDetailsPress = () => {
        navigation.navigate('HOME');
    };

    return (
        <ScrollView>

            <View style={styles.container}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <Text style={styles.text}>Prediction: {prediction}</Text>
                <Text style={styles.text}>Confidence: {confidence}</Text>
                {diseaseInfo && (
                    <FlatList
                    data={[diseaseInfo]}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.heading}>{item.name}</Text>
                            <Text style={styles.information}>{item.information}</Text>
                            <Text style={styles.prevention}>{item.prevention_and_treatment}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                )}
                <TouchableOpacity style={styles.button} onPress={handleDetailsPress}>
                    <Text style={styles.buttonText}>Go Back to Home</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    scrollViewContainer: {
        flexGrow: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: '50%',
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        width: '100%',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    subheading: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Results;
