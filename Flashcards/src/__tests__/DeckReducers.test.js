import * as DeckActions from '../../src/actions/DeckActions';
import { reducer } from '../../src/reducers/DeckReducers';

const decksMock = {
    'deck 1': {
        title: 'deck 1',
        questions: [{ question: 'question1', answer: 'answer1' }]
    }
};

const newDeckMock = {
    'deck 2': {
        title: 'deck 2',
        questions: []
    }
};

const cardMock = { question: 'question3', answer: 'answer3' };
const addCardToDeckMock = {
    'deck 3': {
        title: 'deck 3',
        questions: [cardMock]
    }
};

describe('DeckReducers reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({})
    });

    it('should handle LOAD_ALL_DECKS', () => {
        expect(
            reducer([], {
                type: DeckActions.LOAD_ALL_DECKS,
                decks: decksMock
            })
        ).toEqual(
            { decks: decksMock }
            );
    });

    it('should handle SAVE_DECK', () => {
        expect(
            reducer([], {
                type: DeckActions.SAVE_DECK,
                title: 'deck 2'
            })
        ).toEqual(
            { decks: newDeckMock }
            );
    });

    it('should handle ADD_CARD_TO_DECK', () => {
        expect(
            reducer({ decks: {'deck 3':{ title: 'deck 3', questions: [] }} }, {
                type: DeckActions.ADD_CARD_TO_DECK,
                title: 'deck 3',
                card: cardMock
            })
        ).toEqual(
            { decks: addCardToDeckMock }
            );
    });

    it('should handle ADD_CARD_TO_DECK', () => {
        expect(
            reducer({ decks: {'deck 3':{ title: 'deck 3', questions: [] }} }, {
                type: DeckActions.REMOVE_ALL_DECKS
            })
        ).toEqual(
            { decks: {} }
            );
    });
});