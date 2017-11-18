import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import DeckItem from '../DeckItem';
import { connect } from 'react-redux';
import * as DeckActions from '../../actions/DeckActions';

class DeckListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "Decks",
        tabBarIcon: () => <Entypo size={24} name="blackboard" color="white" />
    };

    componentDidMount() {
        this.props.getAllDecks();
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <DeckItem
            deck={item}
            _onPress={() => this.props.navigation.navigate(
                'DeckScreen',
                { deckTitle: item.name }
            )}
        />
    );

    _deckItemExtractor = () => {
        const decks = this.props.decks;
        if (decks === undefined) {
            return [];
        }
        return Object.keys(decks).map(key => {
            if (decks[key].title === undefined
                || decks[key].questions === undefined) {
                return undefined;
            }
            return {
                id: key,
                name: decks[key].title,
                numCards: decks[key].questions.length
            }
        }).filter( item => item !== undefined)
    };

    render() {
        const decksList = this._deckItemExtractor()
        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    data={decksList}
                />
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
};

function mapDispatchToProps(dispatch) {
    return {
        saveDeck: (title) => dispatch(DeckActions.saveDeck(title)),
        addCardToDeck: (title, card) => dispatch(DeckActions.addCardToDeck(title, card)),
        getAllDecks: () => dispatch(DeckActions.getAllDecks())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckListScreen)