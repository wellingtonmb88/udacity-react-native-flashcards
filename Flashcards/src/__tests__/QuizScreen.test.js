import React from 'react';
import QuizScreen from '../components/screens/QuizScreen';
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

const sinon = require('sinon');

configure({ adapter: new Adapter() });

const cardMock = { question: 'question1', answer: 'answer1' };
const deckMock = {
  title: 'deck 1',
  questions: [cardMock, cardMock]
};

const goBackSpy = sinon.spy();

const props = {
  navigation: {
    goBack: goBackSpy,
    state: {
      params: {
        deck: deckMock
      }
    }
  }
};

const deckMock_2 = {
  title: 'deck 2',
  questions: [cardMock]
};

const props_2 = {
  navigation: {
    goBack: goBackSpy,
    state: {
      params: {
        deck: deckMock_2
      }
    }
  }
};

const deckMock_3 = {
  title: 'deck 3',
  questions: []
};

const props_3 = {
  navigation: {
    goBack: goBackSpy,
    state: {
      params: {
        deck: deckMock_3
      }
    }
  }
};

it('renders without crashing', () => {
  const wrapper = renderer.create(<QuizScreen  {...props} />).toJSON();
  expect(wrapper).toBeTruthy();
});

it('renders without crashing with no questions', () => {
  const wrapper = renderer.create(<QuizScreen  {...props_3} />).toJSON();
  expect(wrapper).toBeTruthy();
});

it('renders without crashing testing press Correct button ', () => {
  const wrapper = shallow(
    <QuizScreen {...props} />,
  );

  expect(wrapper).toBeTruthy();
  wrapper.find('CustomButton').at(0).prop('_onPress')({});
});

it('renders without crashing testing press Incorrect button ', () => {
  const wrapper = shallow(
    <QuizScreen {...props_2} />,
  );

  expect(wrapper).toBeTruthy();
  wrapper.find('CustomButton').at(1).prop('_onPress')({});
});

it('renders without crashing testing press Incorrect button whitout cards', () => {
  const wrapper = shallow(
    <QuizScreen {...props_3} />,
  );

  expect(wrapper).toBeTruthy();
  wrapper.find('CustomButton').at(1).prop('_onPress')({});
});


it('renders without crashing testing press Question/Answer Layout with 2 cards', () => {
  const wrapper = shallow(
    <QuizScreen {...props} />,
  );

  expect(wrapper).toBeTruthy();
  wrapper.find('QuestionAnswerLayout').prop('_onPress')({});
});


it('renders without crashing testing  Question/Answer Layout press Show Answer text  ', () => {
  const wrapper = shallow(
    <QuizScreen {...props} />,
  );

  expect(wrapper).toBeTruthy();
  const reset = wrapper.find('QuestionAnswerLayout').dive().find('TouchableOpacity').at(0);
  reset.prop('onPress')({});
});

it('renders without crashing testing  Question/Answer Layout press Show Question text  ', () => {
  const wrapper = shallow(
    <QuizScreen {...props} />,
  );

  expect(wrapper).toBeTruthy();
  const reset = wrapper.find('QuestionAnswerLayout').dive().find('TouchableOpacity').at(1);
  reset.prop('onPress')({});
});

it('renders without crashing testing ScoreLayout pressing reset button', () => {
  const wrapper = shallow(
    <QuizScreen {...props} />,
  );
  expect(wrapper.find('ScoreLayout')).toBeTruthy();
  const reset = wrapper.find('ScoreLayout').dive().find('CustomButton').at(0);
  reset.prop('_onPress')({});
});

it('renders without crashing testing ScoreLayout pressing goBack button', () => {
  const wrapper = shallow(
    <QuizScreen {...props} />,
  );
  expect(wrapper.find('ScoreLayout')).toBeTruthy();
  const goBack = wrapper.find('ScoreLayout').dive().find('CustomButton').at(1);
  goBack.prop('_onPress')({});
});