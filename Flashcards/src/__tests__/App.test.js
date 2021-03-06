import React from 'react';
import App from '../../App';
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

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

it('renders without crashing', () => {
  const wrapper = shallow(
    <App />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper).toBeTruthy();
});
