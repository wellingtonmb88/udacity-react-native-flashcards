import React from 'react';
import DeckListScreen from '../components/screens/DeckListScreen';
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
        <DeckListScreen />,
        { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toBeTruthy();
});

it('renders without crashing testing FlatList length ', () => {

    const wrapper = shallow(
        <DeckListScreen {...props} />,
        { context: { store: mockStore(initialState) } },
    );

    expect(wrapper.dive().find('FlatList').length).toBe(1);
});

it('renders without crashing testing FlatList decks: undefined ', () => {

    const wrapper = shallow(
        <DeckListScreen {...props} />,
        {
            context: {
                store: mockStore({
                    decks: undefined
                })
            }
        },
    );
    expect(wrapper.dive().find('FlatList').length).toBe(0);
});