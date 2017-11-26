import React from 'react';
import DeckItem from '../components/DeckItem';
import { shallow, mount } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const sinon = require('sinon');

configure({ adapter: new Adapter() });

const cardMock = { question: 'question1', answer: 'answer1' };
const deckMock = {
    name: 'deck 1',
    numCards: 1
};

const _deleteDeckSpy = sinon.spy();
const _onPressSpy = sinon.spy();

it('renders with 1 card', () => {
    const wrapper = shallow(
        <DeckItem deck={{
            name: 'deck 1',
            numCards: 1
        }} _onPress={_onPressSpy}
            _deleteDeck={_deleteDeckSpy} />,
    );
    expect(wrapper).toBeTruthy();
});

it('renders with 2 cards', () => {
    const wrapper = shallow(
        <DeckItem deck={{
            name: 'deck 1',
            numCards: 2
        }} _onPress={_onPressSpy}
            _deleteDeck={_deleteDeckSpy} />,
    );
    expect(wrapper).toBeTruthy();
});

it('renders without crashing testing press ', () => {
    const wrapper = shallow(
        <DeckItem deck={{
            name: 'deck 1',
            numCards: 2
        }} _onPress={_onPressSpy}
            _deleteDeck={_deleteDeckSpy} />,
    );
    expect(wrapper).toBeTruthy();

    wrapper.find("TouchableOpacity").simulate('press');
    expect(_onPressSpy.callCount).toBe(1);
});
