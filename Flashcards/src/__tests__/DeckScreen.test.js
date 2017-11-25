import React from 'react';
import DeckScreen from '../components/screens/DeckScreen';
import { shallow, mount } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

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

const addCardToDeckSpy = sinon.spy();
const _onPressSpy = sinon.spy();
const navigateSpy = sinon.spy();
const goBackSpy = sinon.spy();

const props = {
    addCardToDeck: addCardToDeckSpy,
    navigation: {
        navigate: navigateSpy,
        goBack: goBackSpy,
        state: {
            params: {
                deckTitle: 'deck 1'
            }
        }
    }
}

it('renders without crashing', () => {
    const wrapper = shallow(
        <DeckScreen />,
        { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toBeTruthy();
});

it('renders without crashing testing Add Card ', () => {
    const wrapper = shallow(
        <DeckScreen {...props} />,
        { context: { store: mockStore(initialState) } },
    );

    expect(wrapper).toBeTruthy();
    wrapper.dive().find('CustomButton').at(0).prop('_onPress')({});
});

it('renders without crashing testing Start Quiz ', () => {
    const wrapper = shallow(
        <DeckScreen {...props} />,
        { context: { store: mockStore(initialState) } },
    );

    expect(wrapper).toBeTruthy();
    wrapper.dive().find('CustomButton').at(1).prop('_onPress')({});
});