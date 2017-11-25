import * as DeckActions from '../../src/actions/DeckActions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const cardMock = { question: 'question1', answer: 'answer1' };
const decksMock = {
    'deck 1': {
        title: 'deck 1',
        questions: [cardMock]
    }
};

jest.mock('react-native', () => {
    const cardMock = { question: 'question1', answer: 'answer1' };
    const decksMock = {
        'deck 1': {
            title: 'deck 1',
            questions: [cardMock]
        }
    };
    const returnValues = JSON.stringify(decksMock);
    return ({
        AsyncStorage: {
            setItem: jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(null);
                });
            }),
            multiSet: jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(null);
                });
            }),
            getItem: jest.fn((key) => {
                return new Promise((resolve) => {
                    resolve(returnValues);
                });
            }),
            removeItem: jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(null);
                });
            }),
            getAllKeys: jest.fn(() => {
                return new Promise((resolve) => {
                    resolve(null);
                });
            }),
            multiRemove: jest.fn(() => ({
                then: jest.fn(),
            })),
            clear: jest.fn(() => {
                return new Promise((resolve) => {
                    resolve({});
                });
            })
        }
    })
});

describe('DeckActions suite test', () => {

    it('testing LOAD_ALL_DECKS action', () => {

        const expectedActions = [
            { type: DeckActions.LOAD_ALL_DECKS, decks: decksMock }
        ];

        const store = mockStore({ decks: {} });

        return store.dispatch(DeckActions.getAllDecks()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('testing SAVE_DECK action', () => {

        const expectedActions = [
            { type: DeckActions.SAVE_DECK, title: 'deck 1' }
        ];

        const store = mockStore({ decks: {} });

        store.dispatch(DeckActions.saveDeck('deck 1'));
        expect(store.getActions()).toEqual(expectedActions)
    });

    it('testing ADD_CARD_TO_DECK action', () => {

        const expectedActions = [
            {
                type: DeckActions.ADD_CARD_TO_DECK,
                title: 'deck 1', card: cardMock
            }
        ];

        const store = mockStore({ decks: {} });

        store.dispatch(DeckActions.addCardToDeck('deck 1', cardMock));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('testing REMOVE_ALL_DECKS action', () => {

        const expectedActions = [
            {
                type: DeckActions.REMOVE_ALL_DECKS
            }
        ];

        const store = mockStore({ decks: {} });

        return store.dispatch(DeckActions.deleteAllDecks()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
})

