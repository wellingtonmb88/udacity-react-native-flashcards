import {
    LOAD_ALL_DECKS,
    GET_DECK,
    SAVE_DECK,
    ADD_CARD_TO_DECK,
    REMOVE_ALL_DECKS,
    REMOVE_DECK
} from '../actions/DeckActions';

export function reducer(state = {}, action) {
    const { title, card, decks } = action

    switch (action.type) {

        case REMOVE_ALL_DECKS:
            return {
                ...state,
                decks: {}
            };

        case REMOVE_DECK:
            return {
                ...state,
                decks: Object.keys(state.decks).reduce((result, key) => {
                    if (key !== title) {
                        result[key] = state.decks[key];
                    }
                    return result;
                }, {})
            };

        case LOAD_ALL_DECKS:
            return {
                ...state,
                decks
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