import React from 'react';
import NewDeckScreen from '../components/screens/NewDeckScreen';
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const sinon = require('sinon');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({ adapter: new Adapter() });

const cardMock = { question: 'question1', answer: 'answer1' };
const decksMock = {
    'deck 1': {
        title: 'deck 1',
        questions: [cardMock]
    }
};

const initialState = {
    decks: decksMock
};

const navigateSpy = sinon.spy();
const goBackSpy = sinon.spy();

const props = {
    navigation: {
        navigate: navigateSpy,
        goBack: goBackSpy,
    }
}

it('renders without crashing', () => {
    const wrapper = shallow(
        <NewDeckScreen />,
        { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toBeTruthy();
});


it('renders without crashing testing submit ', () => {
    const wrapper = shallow(
        <NewDeckScreen {...props} />,
        { context: { store: mockStore(initialState) } },
    );

    expect(wrapper).toBeTruthy();
    wrapper.dive().find('SubmitButton').prop('_onPress')({});
});

it('renders without crashing testing onChangeText undefined value ', () => {
    const wrapper = shallow(
        <NewDeckScreen {...props} />,
        { context: { store: mockStore(initialState) } },
    );

    expect(wrapper).toBeTruthy();
    wrapper.dive().find("TextInput").prop('onChangeText')(undefined);
});

it('renders without crashing testing onChangeText value ', () => {
    const wrapper = shallow(
        <NewDeckScreen {...props} />,
        { context: { store: mockStore(initialState) } },
    );

    expect(wrapper).toBeTruthy();
    wrapper.dive().find("TextInput").prop('onChangeText')('test');
});

it('renders without crashing testing onChangeText value length < 1', () => {
    const wrapper = shallow(
        <NewDeckScreen {...props} />,
        { context: { store: mockStore(initialState) } },
    );

    expect(wrapper).toBeTruthy();
    wrapper.dive().find("TextInput").prop('onChangeText')('');
});