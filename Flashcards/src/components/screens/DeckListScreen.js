import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import DeckItem from '../DeckItem';
import { connect } from 'react-redux';
import * as DeckActions from '../../actions/DeckActions';
import If from '../If';

class DeckListScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "Decks",
        tabBarIcon: () => <Entypo size={24} name="blackboard" color="white" />
    };

    state = {
        stopLoading: false
    }

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
            _deleteDeck={() => this.props.deleteDeck(item.name)}
        />
    );

    _deckItemExtractor = () => {
        const decks = this.props.decks;
        setTimeout(() => {
            this.setState({ stopLoading: true });
        }, 1000);

        if (decks === undefined || decks === null) {
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
        }).filter(item => item !== undefined)
    };

    render() {
        const decksList = this._deckItemExtractor()
        const { stopLoading } = this.state;
        return (
            <View style={styles.container}>
                <If test={!stopLoading}>
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        animating={!stopLoading} size='large' />
                </If>
                <If test={stopLoading}>{decksList.length < 1 ?
                    <Text style={styles.deckEmpty}>Your deck is empty!</Text> :
                    <FlatList
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        data={decksList}
                    />}
                </If>
            </View>
        )
    };
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    activityIndicator: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckEmpty: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
};

function mapDispatchToProps(dispatch) {
    return {
        getAllDecks: () => dispatch(DeckActions.getAllDecks()),
        deleteDeck: (title) => dispatch(DeckActions.deleteDeck(title))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckListScreen)