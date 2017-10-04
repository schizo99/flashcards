import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'MobileFlashcards:decks'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then(results => {
    console.log("getDecks", results)
    return JSON.parse(results)
  })
}

export function getDeck(id){
  return decks[id]
}

export function saveDeck(deck) {
  console.log("saveDeck", deck)
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}

export function addCardToDeck(title, card) {
  return
}