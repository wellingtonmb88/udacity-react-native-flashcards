import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class NewDeckScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "New Deck",
        tabBarIcon: () => <MaterialIcons size={24} name="playlist-add" color="white" />
    };

    render() {
        return (
            <View >
                <Text>New Deck</Text>
            </View>
        )
    };
};
