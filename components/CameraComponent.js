import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const CameraComponent = () =>
{
    const [photo, setPhoto] = useState(null);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);
    const navigation = useNavigation();

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
            if (!response.ok)
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else
            {
                const data = await response.json();
                // Save the results to Firestore
                // const docRef = doc(collection(db, "results"), auth.currentUser.uid);
                // await addDoc(collection(db, "results"), {
                //     userId: auth.currentUser.uid,
                //     imageUri: photo,
                //     prediction: data.prediction,
                //     confidence: data.confidence,
                //     timestamp: serverTimestamp(), // to order the results by time
                // });
                // Check if the user is not anonymous before storing data
                if (auth.currentUser && !auth.currentUser.isAnonymous)
                {
                    const userDocRef = doc(db, "results", auth.currentUser.uid);
                    const newDocRef = await addDoc(collection(userDocRef, "data"), {
                        imageUri: photo,
                        prediction: data.prediction,
                        confidence: data.confidence,
                        timestamp: serverTimestamp(),
                    });
                }
                // Pass the image URI as a parameter
                navigation.navigate('Results', { prediction: data.prediction, confidence: data.confidence, imageUri: photo });
            }
        } catch (error)
        {
            console.error('Error analyzing picture:', error);
            alert('An error occurred while analyzing the picture');
        }
    }

    const pickImage = async () =>
    {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled)
        {
            setPhoto(result.assets[0].uri);
            // navigation.navigate('Results', { uri: result.uri }); // Add this line
        }
    };


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
                    <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
                        <Icon name="images" size={30} color="white" />
                    </TouchableOpacity>
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
        // backgroundColor: '#000000a0',
    },
    button: {
        padding: 15,
        backgroundColor: '#2F4F4F',
        borderRadius: 5,
        width:'35%'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
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
    galleryButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 20,
        marginLeft: 40,
    },
});

export default CameraComponent;
