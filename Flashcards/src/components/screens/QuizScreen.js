import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { blue_4e4cb8 } from '../../utils/colors';
import CustomButton from '../CustomButton';
import SubmitButton from '../SubmitButton';
import { NavigationActions } from 'react-navigation';
import * as DeckActions from '../../actions/DeckActions';

export default class QuizScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Quiz',
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