import React from 'react';
import SubmitButton from '../components/SubmitButton';
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

const _onPressSpy = sinon.spy();

it('renders with disabled true', () => {
    const wrapper = shallow(
        <SubmitButton _disabled={true} _onPress={_onPressSpy} />,
    );
    expect(wrapper).toBeTruthy();
});

it('renders with disabled false', () => {
    const wrapper = shallow(
        <SubmitButton _disabled={false} _onPress={_onPressSpy} />,
    );
    expect(wrapper).toBeTruthy();
});

it('renders without crashing testing press ', () => {
    const wrapper = shallow(
        <SubmitButton _disabled={false} _onPress={_onPressSpy} />,
    );
    expect(wrapper).toBeTruthy();
    wrapper.simulate('press');
    expect(_onPressSpy.callCount).toBe(1);
});
