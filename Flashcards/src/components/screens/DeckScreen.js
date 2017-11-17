import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { purple_292477, white_fff, blue_4e4cb8 } from '../../utils/colors';

export default class DeckScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.deckTitle}`,
        headerTintColor: white_fff,
        headerStyle: {
            backgroundColor: blue_4e4cb8,
        }
    });
    render() {
        const { deckTitle } = this.props.navigation.state.params;
        return (
            <View >
                <Text>Deck {deckTitle}</Text>
            </View>
        )
    };
};


// this.props.addCardToDeck(`DECK 1`, {
//     question: 'What is a closure?',
//     answer: "I dont know"
// })
