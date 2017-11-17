import {
    LOAD_ALL_DECKS,
    GET_DECK,
    SAVE_DECK,
    ADD_CARD_TO_DECK
} from '../actions/DeckActions';

export function reducer(state = {}, action) {
    const { deckId, title, card, decks } = action

    switch (action.type) {
        case LOAD_ALL_DECKS:
            return {
                ...state,
                decks
            };

        case GET_DECK:
            const deck = Object.keys(state.decks).filter((key) => state.decks[key].id === deckId)[0];
            return {
                ...state,
                decks: state.decks[deck]
            };

        case SAVE_DECK:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [title]: {
                        title: title,
                        questions: []
                    }
                }
            };

        case ADD_CARD_TO_DECK:
            //state.decks[title].questions might look like:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [title]: {
                        ...state.decks[title],
                        questions: [
                            ...state.decks[title].questions,
                            { question: card.question, answer: card.answer }
                        ]
                    }
                }
            };

        default:
            return state
    }
};