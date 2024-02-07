import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () =>
{

    const navigation = useNavigation();

    const handleSignOut = () =>
    {
        auth.signOut()
            .then(() =>
            {
                navigation.replace("Login");
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <View style={styles.userEmailandSignOut}>
                <Text>Email: {auth.currentUser?.email}</Text>

                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={handleSignOut}>
                    <Text
                        style={styles.signOutButtonText}>Log out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() =>
                    {
                        // Handle action for the first additional button
                    }}>
                    <Text style={styles.buttonText}>Information Hub</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() =>
                    {
                        // Handle action for the second additional button
                    }}>
                    <Text style={styles.buttonText}>Disease Alert</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.buttonTakeaPhoto, { backgroundColor: 'green', marginLeft: 10 }]}
                onPress={() =>
                {
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
        height: '140%',
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
        // marginTop: 10,
        alignItems: 'center',
        width: '75%',
        justifyContent: 'center',
    },

    buttonTakeaPhoto: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 100,
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
