import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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



    const filteredCards = cards.filter(card =>
        card.heading.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleCard = (cardId) => {
        setOpenCardId(openCardId === cardId ? null : cardId);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search cards..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
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
    },
    searchBar: {
        fontSize: 18,
        padding: 10,
        backgroundColor: '#f0f0f0',
        margin: 10,
        borderRadius: 10,
    },
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
        // keep your existing styles, and you might want to add
        // additional styles to position your suggestions dropdown correctly
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
    // ... the rest of your styles
});

export default InformationHubScreen;