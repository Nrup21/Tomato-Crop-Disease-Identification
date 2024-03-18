import React, { useEffect } from 'react'; // Import useEffect
import { View, Text, Image, StyleSheet } from 'react-native';

const Results = ({ route }) =>
{
    const { prediction, confidence, imageUri } = route.params;

    // Log the imageUri when the component mounts
    // useEffect(() =>
    // {
    //     // console.log('imageUri:', imageUri);
    // }, []);

    return (
        <View style={styles.container}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Text style={styles.text}>Prediction: {prediction}</Text>
            <Text style={styles.text}>Confidence: {confidence}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
    }
});

export default Results;
