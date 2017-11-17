
import { AsyncStorage } from 'react-native';

const DECK_KEY = "DECK_KEY";

export function fetchAllDecks() {
    return AsyncStorage.getItem(DECK_KEY);
};

export function saveDeck(decks) {
    AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(decks));
};

export function clearAllDecks() {
    AsyncStorage.clear();
};