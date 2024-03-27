import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const teamMembers = [
    { photo: require('../assets/abhishek_yawalkar.jpg'), name: 'Abhishek Yawalkar', occupation: 'Software Engineer', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { photo: require('../assets/nrup_patel.png'), name: 'Nrup Patel', occupation: 'Software Enigneer', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { photo: require('../assets/sanjay_patel.jpg'), name: 'Sanjay Patel', occupation: 'AI/ML Engineer', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { photo: require('../assets/shreyansh_dalwadi.jpg'), name: 'Shreyansh Dalwadi', occupation: 'Software Engineer', details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
];

const ContactUsScreen = () => {
    const [openCardIndex, setOpenCardIndex] = useState(null);

    const handleCardPress = (index) => {
        setOpenCardIndex(openCardIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {teamMembers.map((member, index) => (
                    <TouchableOpacity key={index} style={styles.memberContainer} onPress={() => handleCardPress(index)}>
                        <Image source={member.photo} style={styles.photo} />
                        <Text style={styles.name}>{member.name}</Text>
                        {openCardIndex === index && (
                            <View style={styles.detailsContainer}>
                                <Text style={styles.occupation}>{member.occupation}</Text>
                                <Text style={styles.details}>{member.details}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap', // Allow cards to wrap to the next row
    },
    memberContainer: {
        alignItems: 'center', // Center content horizontally
        marginVertical: 10, // Adjust to your preference
        width: '45%', // Set width for each card, adjust as needed
    },
    photo: {
        width: 150, // Adjust to your preference
        height: 250, // Adjust to your preference
        borderRadius: 50, // Adjust for circular images
    },
    name: {
        fontWeight: 'bold',
        marginTop: 4, // Adjust to your preference
        textAlign: 'center', // Center text horizontally
    },
    occupation: {
        fontWeight: 'bold',
        textAlign: 'center', // Center text horizontally
    },
    detailsContainer: {
        marginTop: 8, // Adjust to your preference
        paddingHorizontal: 8, // Adjust to your preference
    },
    details: {
        textAlign: 'center', // Center text horizontally
        // Additional styles for details text
    }
});

export default ContactUsScreen;
