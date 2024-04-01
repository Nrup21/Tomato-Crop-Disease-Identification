import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue } from "firebase/database";
import { collection, doc, getDocs } from "firebase/firestore";
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
    const [history, setHistory] = useState([]);

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

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            const userDocRef = doc(db, "results", auth.currentUser.uid);
            const querySnapshot = await getDocs(collection(userDocRef, "data"));
            const historyData = [];
            querySnapshot.forEach((doc) =>
            {
                // console.log(doc.data());  // Log the data
                historyData.push(doc.data());
            });
            // Sort the historyData array in descending order of timestamp
            historyData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
            setHistory(historyData);
        };

        const unsubscribe = navigation.addListener('focus', fetchData);

        // Clean up the event listener when you're done
        return unsubscribe;
    }, [navigation]);


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
                <Text style={{ fontSize: 15 }}>Hello, {firstName}</Text>
                {!isAnonymous && (
                    <TouchableOpacity
                        style={styles.signOutButton}
                        onPress={handleSignOut}>
                        <Text style={styles.signOutButtonText}>Log out</Text>
                    </TouchableOpacity>
                )}
            </View>
            <ScrollView style={{ height: '100%', width: '105%', marginTop: 35, }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Information Hub')}>
                        <Text style={styles.buttonText}>Information Hub</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Heal your crop</Text>

                <View style={styles.progressContainer}>
                    <ProgressBar steps={steps} />
                    <TouchableOpacity
                        style={[styles.buttonTakeaPhoto]}
                        onPress={handleTakePhoto}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>Take a Photo</Text>
                    </TouchableOpacity>
                </View>
                {!isAnonymous && history.length === 0 && (
                    <Text style={styles.noHistoryText}>Start clicking pictures to see the history.</Text>
                )}
                {!isAnonymous ? (
                    <View style={styles.HistoryView}>
                        <Text style={styles.HistoryText}>Your Diagnoses</Text>

                        {history.map((item, index) =>
                        {
                            let containerColor;
                            switch (item.prediction)
                            {
                                case 'Healthy':
                                    containerColor = 'rgba(0, 128, 0, 0.4)';
                                    break;
                                case 'Leaf Mold':
                                case 'Septoria Leaf Spot':
                                case 'Tomato Mosaic Virus':
                                case 'Tomato Spotted Wilt':
                                    containerColor = 'rgba(255, 255, 0, 0.4)';
                                    break;
                                case 'Bacterial Spot':
                                case 'Early Blight':
                                case 'Late Blight':
                                case 'Buckeye Rot':
                                case 'Tomato Yellow Leaf Curl':
                                    containerColor = 'rgba(255, 0, 0, 0.6)';
                                    break;
                                default:
                                    containerColor = 'white';
                            }
                            return (
                                <View key={index} style={[styles.itemContainer, { backgroundColor: containerColor }]}>
                                    <Image source={{ uri: item.imageUri }} style={styles.image} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>Prediction: {item.prediction}</Text>
                                        <Text style={styles.text}>Confidence: {item.confidence}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                ) : (
                    <View style={styles.guestRegisterHistory}>
                        <Text style={styles.guestRegisterHistoryText}>Please <Text style={[styles.guestRegisterHistoryText, { color: 'blue' }]}
                            onPress={() => navigation.navigate('Register')}>Register/Log In</Text> to store and see the history.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'flex-start'
    },
    progressContainer: {
        backgroundColor: '#E0F8D8',
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 2,
        width: '98%',
        alignSelf: 'center',
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
        fontSize: 20,
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
        fontSize: 20,
        marginBottom: 10
    },
    HistoryView: {
        alignSelf: 'flex-start',
        marginTop: 30,
        marginBottom: 10,
        width: '100%'
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
        marginTop: '2%',
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
        elevation: 2,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    textContainer: {
        // flexDirection: 'row',
        marginLeft: 10,
        // padding: 5,
        width: '70%'
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        flexShrink: 1,
    },
    guestRegisterHistory: {
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    guestRegisterHistoryText: {
        fontSize: 20,
    },
    noHistoryText: {
        fontSize: 20,
        // fontStyle: 'italic',
        marginTop: 20,
        // marginBottom: 10,
        marginHorizontal: 25,
        alignSelf: 'center'
    }
});

export default HomeScreen;