// import all of the constants from contants folder
import {
  SET_CATEGORIES,
  SET_PHRASES,
  SET_LANGUAGE_NAME,
  SET_CURRENT_CATEGORY,
  SET_LEARNT_PHRASES,
  USER_PHRASES,
  SET_SEEN_PHRASES,
  SET_PHRASES_LEFT,
  SET_SEEN_PHRASES_CATEGORY,
} from '../constants';

import {getAllCategories as getAllLocalCategories} from '../../data/dataUtils';
// import {getAllCategories} from '../../data/dataUtils';

import {
  storeData,
  LEARNT_PHRASES_KEY,
  SEEN_PHRASE_KEY,
  USER_PHRASES_KEY,
  getData,
} from '../../utils/storage';

// categories actions
export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
}

export function getAllCategories() {
  return async dispatch => {
    const categories = await getAllLocalCategories();
    dispatch(setCategories(categories));
  };
}

export function setCurrentCategory(categoryId) {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: categoryId,
  };
}

export function setPhrases(phrases) {
  return {
    type: SET_PHRASES,
    payload: phrases,
  };
}

export function setLanguageName(language) {
  return {
    type: SET_LANGUAGE_NAME,
    payload: language,
  };
}

// Seen phrases with async storage
export function setSeenPhrases(seenPhrases) {
  return {
    type: SET_SEEN_PHRASES,
    payload: seenPhrases,
  };
}

// Learnt phrases with async storage
export function setLearntPhrases(learntPhrases) {
  return {
    type: SET_LEARNT_PHRASES,
    payload: learntPhrases,
  };
}

// Add learnt phrases
export function addLearntPhrase(phrase) {
  return async dispatch => {
    const storedLearntPhrases = await getData(LEARNT_PHRASES_KEY);
    let dataToStore = storedLearntPhrases
      ? [...storedLearntPhrases, phrase]
      : [phrase];
    await storeData(LEARNT_PHRASES_KEY, dataToStore);
    dispatch(setLearntPhrases(dataToStore));
  };
}

// Add seen phrases
export function addSeenPhrase(phrases) {
  return async dispatch => {
    const storedSeenPhrases = await getData(SEEN_PHRASE_KEY);
    let dataToStore = storedSeenPhrases
      ? [...storedSeenPhrases, phrase]
      : [phrase];
    await storeData(LEARNT_PHRASES_KEY, dataToStore);
    dispatch(setLearntPhrases(dataToStore));
  };
}

// Adding new term actions

export function setUserPhrases(phrases) {
  return {
    type: USER_PHRASES,
    payload: phrases,
  };
}

export function addUserPhrase(phrase) {
  return async dispatch => {
    const storedPhrases = await getData(USER_PHRASES_KEY);
    let dataToStore = storedPhrases ? [...storedPhrases, phrase] : [phrase];
    await storeData(LEARNT_PHRASES_KEY, dataToStore);
    dispatch(setLearntPhrases(dataToStore));
  };
}

export const synchronizeStorageToRedux = () => {
  return async dispatch => {
    const storedPhrases = await getData(USER_PHRASES_KEY);
    const storedLearntPhrase = await getData(LEARNT_PHRASES_KEY);
    const storedSeenPhrase = await getData(SEEN_PHRASE_KEY);
    if (storedPhrases) {
      dispatch(setUserPhrases(storedPhrases));
    }
    if (storedLearntPhrase) {
      dispatch(setLearntPhrases(storedLearntPhrase));
    }
    if (storedSeenPhrase) {
      dispatch(setSeenPhrases(storedSeenPhrase));
    }
    return Promise.resolve();
  };
};

export function setLeftPhrase(category) {
  return {
    type: SET_PHRASES_LEFT,
    payload: category,
  };
}

export function setSeenPhraseCategory(category) {
  return {
    type: SET_SEEN_PHRASES_CATEGORY,
    payload: category,
  };
}
