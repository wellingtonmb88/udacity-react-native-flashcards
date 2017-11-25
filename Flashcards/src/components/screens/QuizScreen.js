import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { blue_4e4cb8 } from '../../utils/colors';
import CustomButton from '../CustomButton';
import If from '../If';
import { NavigationActions } from 'react-navigation';
import * as DeckActions from '../../actions/DeckActions';
import { AsyncStorage } from 'react-native';

const QUIZ_COMPLETED_DATE = 'QUIZ_COMPLETED_DATE';

const ScoreLayout = ({ score, showScore, reset, goBack, styles }) => (
    <View style={styles.scoreContainer}>
        <If test={showScore}>
            <Text style={styles.scoreText}>Your is score: {score}%</Text>
            <CustomButton
                buttonStyles={StyleSheet.flatten([styles.button, styles.restartButton])}
                textStyles={styles.buttonTitle}
                text='Restart Quiz!'
                _onPress={() => {
                    reset();
                }} />
            <CustomButton
                buttonStyles={StyleSheet.flatten([styles.button, styles.goBackButton])}
                textStyles={styles.buttonTitle}
                text='Back to Deck'
                _onPress={() => {
                    goBack();
                }} />
        </If>
    </View>
);

const QuestionAnswerLayout = ({ question, answer, showAnswer, _onPress, styles }) => (
    <View style={styles.questionAnswerContainer}>
        <If test={!showAnswer}>
            <Text style={styles.qestionText}>{question}</Text>
            <TouchableOpacity onPress={_onPress} >
                <Text style={styles.showAnswerText}>Show Answer!</Text>
            </TouchableOpacity>
        </If>
        <If test={showAnswer}>
            <Text style={styles.answerText}>{answer}</Text>
            <TouchableOpacity onPress={_onPress} >
                <Text style={styles.showQuestionText}>Show Question!</Text>
            </TouchableOpacity>
        </If>
    </View>
);

export default class QuizScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: blue_4e4cb8,
        }
    });

    state = {
        cardIndex: 0,
        score: 0,
        showScore: false,
        showAnswer: false
    };

    _getDeck = () => {
        const { deck } = this.props.navigation.state.params;
        return deck;
    };

    _getQuestion = (index) => {
        const deck = this._getDeck();
        if (index > deck.questions.length) {
            return undefined;
        }
        return deck.questions[index];
    };

    _getQuestionStr = () => {
        return  this._getQuestion(this.state.cardIndex) !== undefined
        ? this._getQuestion(this.state.cardIndex).question
        : 'Opss! No Question found';
    };

    _getAnswerStr = () => {
        return  this._getQuestion(this.state.cardIndex) !== undefined
        ? this._getQuestion(this.state.cardIndex).answer
        : 'Opss! No Answer found';
    };

    _submitAnswer = (isCorrect) => {
        const { cardIndex, score } = this.state;
        const numCards = this._getDeck().questions.length;

        this.setState({ showAnswer: false });

        if (isCorrect && score < numCards) {
            this.setState({ score: (score + 1) });
        }

        if (cardIndex < numCards - 1) {
            this.setState({ cardIndex: (cardIndex + 1) });
        } else {
            this.setState({ showScore: true });
        }
    };

    _showAnswer = () => {
        const { showAnswer } = this.state;
        this.setState({ showAnswer: !showAnswer });
    };

    _reset = () => {
        this.setState({ showScore: false, score: 0, cardIndex: 0, showAnswer: false });
    };

    render() {
        const { score, showScore, showAnswer } = this.state;
        const numCards = this._getDeck().questions.length;
        const currentCardIndex = (this.state.cardIndex + 1);
        return (
            <View style={styles.container}>
                <ScoreLayout
                    styles={styles}
                    score={((score / numCards) * 100)}
                    showScore={showScore}
                    reset={this._reset}
                    goBack={this.props.navigation.goBack} />

                <If test={currentCardIndex <= numCards && !showScore}>
                    <Text style={styles.numCards}>{currentCardIndex}/{numCards}</Text>
                    <QuestionAnswerLayout
                        styles={styles}
                        showAnswer={showAnswer}
                        question={this._getQuestionStr()}
                        answer={this._getAnswerStr()}
                        _onPress={this._showAnswer}
                    />
                    <CustomButton
                        buttonStyles={StyleSheet.flatten([styles.button, styles.correctButton])}
                        textStyles={styles.buttonTitle}
                        text='Correct'
                        _onPress={() => {
                            this._submitAnswer(true);
                        }} />

                    <CustomButton
                        buttonStyles={StyleSheet.flatten([styles.button, styles.incorrectButton])}
                        textStyles={styles.buttonTitle}
                        text='Incorrect'
                        _onPress={() => {
                            this._submitAnswer(false);
                        }} />
                </If>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    scoreContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreText: {
        fontSize: 30,
        margin: 10,
        fontWeight: 'bold',
    },
    questionAnswerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    numCards: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    qestionText: {
        fontSize: 30,
        margin: 10,
        fontWeight: 'bold',
    },
    answerText: {
        fontSize: 30,
        margin: 10,
        fontWeight: 'bold',
    },
    showAnswerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red'
    },
    showQuestionText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'blue'
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
    correctButton: {
        backgroundColor: 'green'
    },
    incorrectButton: {
        backgroundColor: 'red'
    },
    restartButton: {
        backgroundColor: 'blue'
    },
    goBackButton: {
        backgroundColor: 'black'
    },
    buttonTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
});