import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from "firebase/database";
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';

const ProgressBar = ({ steps }) =>
{
    return (
        <View style={styles.progressBar}>
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <View style={styles.stepContainer}>
                        <FontAwesome name={step.icon} size={30} color='black' />
                        <Text style={styles.stepText}>{step.name}</Text>
                    </View>
                    {index < steps.length - 1 && (
                        <View style={styles.arrowContainer}>
                            <FontAwesome name="angle-right" size={30} color='black' />
                        </View>
                    )}
                </React.Fragment>
            ))}
        </View>
    );
};

const HomeScreen = () =>
{
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    const steps = [
        { name: 'Take a picture', icon: 'camera-retro' },
        { name: 'See diagnosis', icon: 'stethoscope' },
        { name: 'Get medicine', icon: 'medkit' },
    ];

    useEffect(() =>
    {
        if (auth.currentUser)
        {
            setIsAnonymous(auth.currentUser.isAnonymous);
            if (auth.currentUser.isAnonymous)
            {
                setFirstName('Guest');
            } else
            {
                const userId = auth.currentUser.uid;
                const dbRef = ref(getDatabase(), '/users/' + userId + '/firstName');
                onValue(dbRef, (snapshot) =>
                {
                    setFirstName(snapshot.val());
                });
            }
        }
    }, []);

    const handleSignOut = () =>
    {
        if (!isAnonymous)
        {
            auth.signOut()
                .then(() =>
                {
                    navigation.replace("Login");
                })
                .catch(error => Alert.alert('Error', error.message));
        }
    };

    const handleTakePhoto = async () =>
    {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted')
        {
            navigation.navigate('Camera');
        } else
        {
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
                    style={styles.button}
                    onPress={() => navigation.navigate('Information Hub')}>
                    <Text style={styles.buttonText}>Information Hub</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}>
                    <Text style={styles.buttonText}>Disease Alert</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Contact Us')}>
                    <Text style={styles.buttonText}>About Us</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Heal your crop</Text>

            <View style={styles.progressContainer}>
                <ProgressBar steps={steps} />
                <TouchableOpacity
                    style={[styles.buttonTakeaPhoto]}
                    onPress={handleTakePhoto}>
                    <Text style={[styles.buttonText, { color: 'white'}]}>Take a Photo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.HistoryView}>
                <Text style={styles.HistoryText}>History:</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'flex-start'
    },
    progressContainer: {
        backgroundColor: '#E0F8D8', // Light gray background color
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 4, // Shadow below the container
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 6,
        width: '100%',
      },
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    stepContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    stepText: {
        color: 'black',
        marginTop: 20,
    },
    stepTextActive: {
        color: 'green',
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
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
        paddingVertical: 20,
    },
    buttonTakeaPhoto: {
        backgroundColor: '#2F4F4F',
        width: '100%',
        // padding: 15,
        borderRadius: 30,
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
    },
    arrowContainer: {
        // justifyContent: 'center',
        marginTop: 20
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        marginVertical: 40
    },
    button: {
        flex: 1,
        backgroundColor: '#E0F8D8',
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
});

export default HomeScreen;