import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as DeckActions from '../../actions/DeckActions';
import SubmitButton from '../SubmitButton';

class NewDeckScreen extends Component {

    static navigationOptions = {
        tabBarLabel: "New Deck",
        tabBarIcon: () => <MaterialIcons size={24} name="playlist-add" color="white" />
    };

    state = {
        title: '',
        disableSubButton: true
    };

    _handleChange = (text) => {
        this.setState({ title: text },
            () => { this.validateFields() });
    };

    validateFields = () => {
        const { title } = this.state;
        if (title === undefined) {
            this.setState({ disableSubButton: true });
            return;
        }
        if (title.length > 0) {
            this.setState({ disableSubButton: false });
        } else if (title.length < 1) {
            this.setState({ disableSubButton: true });
        }
    };

    _submit = () => {
        const { title } = this.state;
        this.props.saveDeck(title);
        this.setState({ title: '', disableSubButton: true});
        this.props.navigation.navigate(
            'DeckScreen',
            { deckTitle: title }
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this._handleChange}
                    placeholder='Deck Title'
                    value={this.state.title}
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
    header: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        marginTop: 20,
        marginBottom: 20,
    }
});


function mapDispatchToProps(dispatch) {
    return {
        saveDeck: (title) => dispatch(DeckActions.saveDeck(title))
    }
};

export default connect(
    null,
    mapDispatchToProps
)(NewDeckScreen)