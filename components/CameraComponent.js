import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons';

const CameraComponent = () =>
{
    const [photo, setPhoto] = useState(null);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    const takePicture = async () =>
    {
        if (cameraRef.current)
        {
            let photo = await cameraRef.current.takePictureAsync();
            setPhoto(photo.uri);
        }
    }

    const retakePicture = () =>
    {
        setPhoto(null);
    }

    const analyzePicture = async () =>
    {
        if (!photo) return; // No photo to analyze

        const formData = new FormData();
        formData.append('image', {
            uri: photo,
            type: 'image/jpeg',
            name: 'photo.jpg',
        });

        try
        {
            const response = await fetch('https://tcdi-flask-app.onrender.com/predict', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = await response.json();
            alert('Prediction: ' + data.prediction);
        } catch (error)
        {
            console.error('Error analyzing picture:', error);
            alert('An error occurred while analyzing the picture');
        }
    }

    const toggleFlash = () =>
    {
        setFlashMode(
            flashMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
        );
    }

    return (
        photo ? (
            <View style={styles.container}>
                <Image source={{ uri: photo }} style={styles.preview} resizeMode="contain" />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={retakePicture}>
                        <Text style={styles.buttonText}>Retake</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={analyzePicture}>
                        <Text style={styles.buttonText}>Analyze</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <Camera style={styles.container} flashMode={flashMode} ref={cameraRef}>
                <View style={styles.captureButtonContainer}>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        {/* <Text style={styles.buttonText}>Take Picture</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                        <Icon name={flashMode === Camera.Constants.FlashMode.on ? 'flash' : 'flash-off'} size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </Camera>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#000000a0',
    },
    button: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    captureButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 50,
    },
    captureButton: {
        backgroundColor: 'white',
        borderRadius: 50,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flashButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
});

export default CameraComponent;
