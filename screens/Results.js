import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tomatoDiseasesData from '../assets/tomato_diseases.json';

const Results = ({ route }) =>
{
    const { prediction, confidence, imageUri } = route.params;
    const navigation = useNavigation();
    const [diseaseInfo, setDiseaseInfo] = useState(null);
    const [containerColor, setContainerColor] = useState('white');
    const [message, setMessage] = useState('');

    useEffect(() =>
    {
        // Load disease information from JSON
        const matchedDisease = tomatoDiseasesData.find(disease => disease.name === prediction);
        setDiseaseInfo(matchedDisease);

        // Set container color based on prediction
        switch (prediction)
        {
            case 'Healthy':
                setContainerColor('rgba(0, 128, 0, 0.4)');
                setMessage('Plant is healthy.');
                break;
            case 'Bacterial Spot':
            case 'Early Blight':
            case 'Late Blight':
            case 'Buckeye Rot':
            case 'Tomato Yellow Leaf Curl':
                setContainerColor('rgba(255, 255, 0, 0.4)');
                setMessage('Plant does not require immediate attention.');
                break;
            case 'Leaf Mold':
            case 'Septoria Leaf Spot':
            case 'Tomato Mosaic Virus':
            case 'Tomato Spotted Wilt':
                setContainerColor('rgba(255, 0, 0, 0.75)');
                setMessage('Plant requires immediate attention.');
                break;
            default:
                setContainerColor('white');
                setMessage('');
        }
    }, [prediction]);

    const handleDetailsPress = () =>
    {
        navigation.navigate('HOME');
    };

    return (
        // <ScrollView style={styles.scrollViewContainer}>

        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Text style={[styles.text, { marginTop: 20 }]}>
                Prediction: <Text style={{ fontWeight: 600 }}>{prediction}</Text>
            </Text>
            <Text style={styles.text}>
                Confidence: <Text style={{ fontWeight: 600 }}>{confidence}</Text>
            </Text>
            <View style={[styles.message, { backgroundColor: containerColor }]}>
                <Text style={{ fontSize: 19, fontWeight: 500 }}>{message}</Text>
            </View>
            {diseaseInfo && (
                <FlatList style={styles.card}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={[diseaseInfo]}
                    renderItem={({ item }) => (
                        <View >
                            {/* <Text style={styles.heading}>{item.name}</Text> */}
                            <Text style={styles.information}>{item.information + '\n'}</Text>
                            <Text style={styles.prevention}>
                                <Text style={{ fontWeight: 'bold' }}>Prevention and Treatment:</Text>
                                {'\n' + item.prevention_and_treatment}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
            <TouchableOpacity style={styles.button} onPress={handleDetailsPress}>
                <Text style={styles.buttonText}>Go Back to Home</Text>
            </TouchableOpacity>
        </View>
        // </ScrollView>

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
        width: '80%',
        height: '40%',
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
    card: {
        // backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        // marginTop: 20,
        borderWidth: 0.5,
        borderColor: 'black',
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
        backgroundColor: '#2F4F4F',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    information: {
        textAlign: 'justify',
        lineHeight: 25,
        fontSize: 16,
    },
    prevention: {
        textAlign: 'justify',
        lineHeight: 25,
        fontSize: 16,
    },
    message: { 
        padding: 15, 
        borderRadius: 10,
        width: '100%', 
        alignItems: 'center', 
        marginBottom: 15, 
        borderWidth: 0.5, 
        borderColor: 'black'
    },
});

export default Results;
