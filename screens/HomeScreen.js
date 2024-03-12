import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from "firebase/database";
import { Camera } from 'expo-camera';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        if (auth.currentUser) {
            setIsAnonymous(auth.currentUser.isAnonymous);
            if (auth.currentUser.isAnonymous) {
                setFirstName('Guest');
            } else {
                const userId = auth.currentUser.uid;
                const dbRef = ref(getDatabase(), '/users/' + userId + '/firstName');
                onValue(dbRef, (snapshot) => {
                    setFirstName(snapshot.val());
                });
            }
        }
    }, []);

    const handleSignOut = () => {
        if (!isAnonymous) {
            auth.signOut()
                .then(() => {
                    navigation.replace("Login");
                })
                .catch(error => Alert.alert('Error', error.message));
        }
    };

    const handleTakePhoto = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {
            navigation.navigate('Camera');
        } else {
            Alert.alert(
                "Permission Required",
                "Allow AgroTech to take pictures?",
                [
                    {
                        text: "DENY",
                        onPress: () => setHasPermission(false),
                        style: "cancel"
                    },
                    { text: "ALLOW", onPress: () => setHasPermission(true) }
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.userEmailandSignOut}>
                <Text>Hello, {firstName}</Text>
                {!isAnonymous && (
                    <TouchableOpacity
                        style={styles.signOutButton}
                        onPress={handleSignOut}>
                        <Text style={styles.signOutButtonText}>Log out</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => navigation.navigate('Information Hub')}>
                    <Text style={styles.buttonText}>Information Hub</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => {
                        // Handle action for the second additional button
                    }}>
                    <Text style={styles.buttonText}>Disease Alert</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.buttonTakeaPhoto, { backgroundColor: 'green', marginLeft: 10 }]}
                onPress={handleTakePhoto}>
                <Text style={styles.buttonText}>Take a Photo</Text>
            </TouchableOpacity>

            <View style={styles.HistoryView}>
                <Text style={styles.HistoryText}>History:</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '45%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 6,
    },
    userEmailandSignOut: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    signOutButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: 10
    },
    signOutButtonText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 12,
        padding: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        paddingVertical: 20
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        width: '90%',
    },
    buttonTakeaPhoto: {
        backgroundColor: '#0782F9',
        width: '45%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 6,
    },
    HistoryText: {
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 10,
    },
    HistoryView: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 10,
    }
});

export default HomeScreen;
