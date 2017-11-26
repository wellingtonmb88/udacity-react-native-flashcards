import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { blue_4e4cb8 } from '../../utils/colors';
import SubmitButton from '../SubmitButton';
import * as DeckActions from '../../actions/DeckActions';

export default class AddCardScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Add Card',
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: blue_4e4cb8,
        }
    });

    state = {
        question: '',
        answer: '',
        disableSubButton: true
    };

    _handleQuestionChange = (text) => {
        this.setState({ question: text },
            () => { this.validateFields() });
    };

    _handleAnswerChange = (text) => {
        this.setState({ answer: text },
            () => { this.validateFields() });
    };

    validateFields = () => {
        const { answer, question } = this.state;
        if (answer === undefined || question === undefined) {
            this.setState({ disableSubButton: true });
            return;
        }
        if (answer.length > 0 && question.length > 0) {
            this.setState({ disableSubButton: false });
        } else if (answer.length < 1 || title.length < 1) {
            this.setState({ disableSubButton: true });
        }
    };

    _submit = () => {
        const { addCardToDeck } = this.props.navigation.state.params;
        const { answer, question } = this.state;
        addCardToDeck({
            question,
            answer
        });

        this.setState({ answer: '', question: '', disableSubButton: true });
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this._handleQuestionChange}
                    placeholder='Question'
                    value={this.state.question}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={this._handleAnswerChange}
                    placeholder='Answer'
                    value={this.state.answer}
                />
                <SubmitButton
                    _disabled={this.state.disableSubButton}
                    _onPress={this._submit}
                />
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
    textInput: {
        height: 40,
        borderColor: 'gray',
        marginTop: 20,
        marginBottom: 20,
    }
});