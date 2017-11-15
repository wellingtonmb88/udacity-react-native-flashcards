import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default class DesckListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "Decks",
        tabBarIcon: () => <Entypo size={24} name="blackboard" color="white" />
    };

    render() {
        return (
            <View>
                <Text>Decks</Text>
            </View>
        )
    };
};
