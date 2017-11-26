import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { blue_4e4cb8 } from '../../utils/colors';
import { connect } from 'react-redux';
import * as DeckActions from '../../actions/DeckActions';
import CustomButton from '../CustomButton';
import If from '../If';

class DeckScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.deckTitle}`,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: blue_4e4cb8,
        }
    });

    state = {
        bounceValue: new Animated.Value(1),
    };

    _getDeck = () => {
        Animated.sequence([
            Animated.timing(this.state.bounceValue, { duration: 500, toValue: 1.04 }),
            Animated.spring(this.state.bounceValue, { toValue: 1, friction: 5 })
        ]).start();
        const { deckTitle } = this.props.navigation.state.params;
        return this.props.decks[deckTitle];
    };

    _getNumCards = () => {
        return this._getDeck().questions.length;
    };

    _addCardToDeck = (card) => {
        const { deckTitle } = this.props.navigation.state.params;
        this.props.addCardToDeck(deckTitle, card);
    };

    render() {
        const numCards = this._getNumCards();
        const deck = this._getDeck();
        return (
            <View style={styles.container}>
                <Animated.View style={{ transform: [{ scale: this.state.bounceValue }] }}>
                    <Text style={styles.deckName}>{deck.title}</Text>
                    <Text style={styles.deckCards}>
                        {numCards > 1 ?
                            `${numCards} cards` :
                            `${numCards} card`}
                    </Text>
                    <CustomButton
                        buttonStyles={StyleSheet.flatten([styles.button, styles.addCardButton])}
                        textStyles={styles.buttonTitle}
                        text='Add Card'
                        _onPress={() => {
                            this.props.navigation.navigate(
                                'AddCardScreen',
                                { addCardToDeck: this._addCardToDeck }
                            );
                        }} />
                    <If test={numCards > 0}>
                        <CustomButton
                            buttonStyles={StyleSheet.flatten([styles.button, styles.startQuizButton])}
                            textStyles={styles.buttonTitle}
                            text='Start Quiz'
                            _onPress={() => {
                                this.props.navigation.navigate(
                                    'QuizScreen',
                                    { deck: deck }
                                );
                            }} />
                    </If>
                </Animated.View>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    button: {
        padding: 10,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        height: 50,
        borderRadius: 3,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addCardButton: {
        backgroundColor: 'purple'
    },
    startQuizButton: {
        backgroundColor: 'green'
    },
    buttonTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    deckName: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    deckCards: {
        fontSize: 30,
        textAlign: 'center',
        color: 'gray'
    }
});

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
};

function mapDispatchToProps(dispatch) {
    return {
        addCardToDeck: (title, card) => dispatch(DeckActions.addCardToDeck(title, card)),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckScreen)