import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'


const teamMembers = [
    { photo: require('../assets/TCDI.png'), name: 'Abhishek Yawalkar', detail: 'Founder' },
    { photo: require('../assets/TCDI.png'), name: 'Nrup Patel', detail: 'Co-founder' },
    { photo: require('../assets/TCDI.png'), name: 'Sanjay Patel', detail: 'CTO' },
    { photo: require('../assets/TCDI.png'), name: 'Shreyansh Dalwadi', detail: 'Designer' }
];


const ContactUsScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {teamMembers.slice(0, 2).map((member, index) => (
                    <View key={index} style={styles.memberContainer}>
                        <Image source={member.photo} style={styles.photo} />
                        <Text style={styles.name}>{member.name}</Text>
                        <Text style={styles.detail}>{member.detail}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.row}>
                {teamMembers.slice(2, 4).map((member, index) => (
                    <View key={index} style={styles.memberContainer}>
                        <Image source={member.photo} style={styles.photo} />
                        <Text style={styles.name}>{member.name}</Text>
                        <Text style={styles.detail}>{member.detail}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // Container for the whole 2x2 grid
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10 // Adjust to your preference
    },
    memberContainer: {
        alignItems: 'center', // Center content horizontally
        marginHorizontal: 5 // Adjust to your preference
    },
    photo: {
        width: 100, // Adjust to your preference
        height: 100, // Adjust to your preference
        borderRadius: 50 // Adjust for circular images
    },
    name: {
        fontWeight: 'bold',
        marginTop: 4 // Adjust to your preference
    },
    detail: {
        // Additional styles for detail text
    }
});

export default ContactUsScreen;
