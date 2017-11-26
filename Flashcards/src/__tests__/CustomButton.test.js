import React from 'react';
import CustomButton from '../components/CustomButton';
import { shallow } from "enzyme";
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
        <CustomButton text='text' _onPress={_onPressSpy} />,
    );
    expect(wrapper).toBeTruthy();
});

it('renders without crashing testing press ', () => {
    const wrapper = shallow(
        <CustomButton text='text' _onPress={_onPressSpy} />,
    );
    expect(wrapper).toBeTruthy();
    wrapper.simulate('press');
    expect(_onPressSpy.callCount).toBe(1);
});
