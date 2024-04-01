import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const teamMembers = [
    { photo: require('../assets/abhishek_yawalkar.jpg'), name: 'Abhishek Yawalkar', occupation: 'Mobile App Developer', details: 'yawalka@uwindsor.ca' },
    { photo: require('../assets/nrup_patel.png'), name: 'Nrup Patel', occupation: 'Mobile App Developer', details: 'patel616@uwindsor.ca' },
    { photo: require('../assets/sanjay_patel.jpg'), name: 'Sanjay Patel', occupation: 'AI/ML Developer', details: 'patel7e6@uwindsor.ca' },
    { photo: require('../assets/shreyansh_dalwadi.jpg'), name: 'Shreyansh Dalwadi', occupation: 'Website Developer', details: 'dalwadi2@uwindsor.ca' }
];

const ContactUsScreen = () => {
    const [openCardIndex, setOpenCardIndex] = useState(null);

    const handleCardPress = (index) => {
        setOpenCardIndex(openCardIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>AgroTech Team</Text>
            <View style={styles.row}>
                {teamMembers.map((member, index) => (
                    <TouchableOpacity key={index} style={styles.memberContainer} onPress={() => handleCardPress(index)}>
                        <Image source={member.photo} style={styles.photo} />
                        <Text style={styles.name}>{member.name}</Text>
                        {openCardIndex === index && (
                            <View style={styles.detailsContainer}>
                                <Text style={styles.occupation}>{member.occupation}</Text>
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Email:</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap', // Allow cards to wrap to the next row
    },
    memberContainer: {
        alignItems: 'center', // Center content horizontally
        marginVertical: 20, // Adjust to your preference
        width: '45%', // Set width for each card, adjust as needed
    },
    photo: {
        width: 150, // Adjust to your preference
        height: 200, // Adjust to your preference
        borderRadius: 15, // Adjust for circular images
    },
    name: {
        fontWeight: '500',
        marginTop: 10, // Adjust to your preference
        textAlign: 'center', // Center text horizontally
        fontSize: 18,
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
