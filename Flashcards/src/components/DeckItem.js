import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default class DeckItem extends Component {

    static propTypes = {
        deck: PropTypes.object.isRequired,
        _onPress: PropTypes.func.isRequired,
    };

    _onPress = () => {
        this.props._onPress();
    };

    render() {
        const { deck } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={this._onPress}>
                <View>
                    <Text style={styles.deckName}>{deck.name}</Text>
                    <Text style={styles.deckCards}>
                        {deck.numCards > 1 ?
                            `${deck.numCards} cards` :
                            `${deck.numCards} card`}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5,
        marginRight: 8,
        marginLeft: 8,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: 'white',
        elevation: 2
    },
    deckName: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    deckCards: {
        fontSize: 20,
        textAlign: 'center',
        color: 'gray'
    }
});
