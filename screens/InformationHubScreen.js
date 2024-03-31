import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from expo/vector-icons
import tomatoDiseasesData from '../assets/tomato_diseases.json';


const InformationHubScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openCardId, setOpenCardId] = useState(null);
    const [cards, setCards] = useState(tomatoDiseasesData.map((disease, index) => ({
        id: index + 1, // Assuming the id is just a unique number starting from 1
        heading: disease.name,
        information: disease.information,
        prevention_and_treatment: disease.prevention_and_treatment,
    })));

    const sortedCards = [...cards].sort((a, b) => a.heading.localeCompare(b.heading));


    const filteredCards = sortedCards.filter(card =>
        card.heading.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleCard = (cardId) => {
        setOpenCardId(openCardId === cardId ? null : cardId);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery ? (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                        <MaterialIcons name="clear" size={24} color="black" />
                    </TouchableOpacity>
                ) : null}
            </View>

            {searchQuery ? (
                <View style={styles.suggestionsContainer}>
                    {filteredCards.map((card) => (
                        <TouchableOpacity
                            key={card.id}
                            onPress={() => setSearchQuery(card.heading)}
                        >
                            <Text style={styles.suggestionText}>{card.heading}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : null}
            <ScrollView style={{ paddingTop: searchQuery ? 60 : 0 }}>
                {filteredCards.map((card) => (
                    <TouchableOpacity key={card.id} style={styles.card} onPress={() => toggleCard(card.id)}>
                        <Text style={styles.heading}>{card.heading}</Text>
                        {openCardId === card.id && <Text>
                            <Text style={{ fontWeight: 'bold'}}>Information:</Text>
                            <Text>{'\n' + card.information + '\n\n'}</Text>
                            <Text style={{ fontWeight: 'bold'}}>Prevention and Treatment:</Text>
                            <Text>{'\n' + card.prevention_and_treatment}</Text>
                        </Text>}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },

    searchContainer: {
        //flexDirection: 'row',
        //alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },

    searchBar: {
        fontSize: 18,
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
    },

    clearButton: {
        position: 'absolute',
        right: 12,
        top: '35%',
        color: '#333',    },

    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
        elevation: 3, // Shadow for Android
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    heading: {
        fontSize: 20,
        marginBottom: 5,
    },

    suggestionsContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 1
        // Add more styles like padding, shadow, etc, as per your design requirements
    },

    suggestionText: {
        fontSize: 20, // Increased font size
        paddingVertical: 5, // Optional: for better touch targets
        paddingHorizontal: 10, // Optional: for better spacing
        // Additional styles for the suggestion text items
    },
});

export default InformationHubScreen;