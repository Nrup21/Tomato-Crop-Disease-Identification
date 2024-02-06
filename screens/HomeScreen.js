import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Login");
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>

            <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignOut}>
                <Text
                    style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>    

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#F95A2C' }]}
                    onPress={() => {
                        // Handle action for the first additional button
                    }}>
                    <Text style={styles.buttonText}>Information Hub</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#F95A2C', marginLeft: 10 }]}
                    onPress={() => {
                        // Handle action for the second additional button
                    }}>
                    <Text style={styles.buttonText}>Disease Alert</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#F95A2C', marginLeft: 10 }]}
                onPress={() => {
                    // Handle action for the second additional button
                }}>
                <Text style={styles.buttonText}>Take a Photo</Text>
            </TouchableOpacity>
            <View style={styles.HistoryView}>    
                <Text style={styles.HistoryText}>History:</Text>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20

    },
    signOutButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#0782F9',
        borderRadius: 10,
        alignItems: 'center',
        zIndex: 1,
      },
      signOutButtonText: {
        color: 'white',
        fontWeight: '250',
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
        alignItems: 'center',
        width: '75%',
        justifyContent: 'center',
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
