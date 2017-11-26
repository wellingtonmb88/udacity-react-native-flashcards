import React from 'react';
import AddCardScreen from '../components/screens/AddCardScreen';
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

const sinon = require('sinon');

configure({ adapter: new Adapter() });

const addCardToDeckSpy = sinon.spy();
const goBackSpy = sinon.spy();

const props = {
  navigation: {
    goBack: goBackSpy,
    state: {
      params: {
        addCardToDeck: addCardToDeckSpy
      }
    }
  }
};

it('renders without crashing', () => {
  const wrapper = renderer.create(<AddCardScreen />).toJSON();
  expect(wrapper).toBeTruthy();
});

it('renders without crashing testing submit ', () => {
  const wrapper = shallow(
    <AddCardScreen {...props} />,
  );

  expect(wrapper).toBeTruthy();
  wrapper.find('SubmitButton').prop('_onPress')({});
  expect(addCardToDeckSpy.callCount).toBe(1);
});

it('renders without crashing testing onChangeText with value ', () => {
  const wrapper = shallow(
    <AddCardScreen {...props} />,
  );
  expect(wrapper).toBeTruthy();
  wrapper.find("TextInput").at(0).prop('onChangeText')("test");
  wrapper.find("TextInput").at(1).prop('onChangeText')("test");
});

it('renders without crashing testing onChangeText empty value ', () => {
  const wrapper = shallow(
    <AddCardScreen {...props} />,
  );
  expect(wrapper).toBeTruthy();
  wrapper.find("TextInput").at(0).prop('onChangeText')("");
  wrapper.find("TextInput").at(1).prop('onChangeText')("");
});

it('renders without crashing testing onChangeText undefined value ', () => {
  const wrapper = shallow(
    <AddCardScreen {...props} />,
  );
  expect(wrapper).toBeTruthy();
  wrapper.find("TextInput").at(0).prop('onChangeText')(undefined);
  wrapper.find("TextInput").at(1).prop('onChangeText')(undefined);
});