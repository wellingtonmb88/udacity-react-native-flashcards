export const LOAD_ALL_DECKS = 'LOAD_ALL_DECKS';
export const GET_DECK = 'GET_DECK';
export const SAVE_DECK = 'SAVE_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const REMOVE_ALL_DECKS = 'REMOVE_ALL_DECKS';
import * as DeckApi from '../utils/DeckApi';

function loadAllDecks(decks) {
    return {
        type: LOAD_ALL_DECKS,
        decks
    }
};

function saveDeckTitle(title) {
    return {
        type: SAVE_DECK,
        title
    }
};

function insertCardToDeck(title, card) {
    return {
        type: ADD_CARD_TO_DECK,
        title,
        card
    }
};

function removeAllDecks() {
    return {
        type: REMOVE_ALL_DECKS
    }
}

export const getAllDecks = () => dispatch => (
    DeckApi.fetchAllDecks()
        .then(decks => dispatch(loadAllDecks(JSON.parse(decks))))
);

export const addCardToDeck = (title, card) => dispatch => {
    dispatch(insertCardToDeck(title, card));
};

export const saveDeck = (title) => dispatch => {
    dispatch(saveDeckTitle(title));
};

export const deleteAllDecks = () => dispatch => (
    DeckApi.clearAllDecks()
        .then(dispatch(removeAllDecks()))
);
