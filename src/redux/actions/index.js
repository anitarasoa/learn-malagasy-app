// import all of the constants from contants folder

import {
  USER_PHRASES_KEY,
  LEARNT_PHRASES_KEY,
  getStoreItem,
  setStoreItem,
} from '../../utils/storage';
import {
  SET_CATEGORIES,
  SET_PHRASES,
  SET_LANGUAGE_NAME,
  SET_CURRENT_CATEGORY,
  SET_LEARNT_PHRASES,
  USER_PHRASES,
} from '../constants';
import {getAllCategories as getAllLocalCategories} from '../../data/dataUtils';

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

export function setLearntPhrases(learntPhrases) {
  return {
    type: SET_LEARNT_PHRASES,
    payload: learntPhrases,
  };
}

export function addLearntPhrase(phrase) {
  return async dispatch => {
    const storedLearntPhrases = await getStoreItem(LEARNT_PHRASES_KEY);
    let dataToStore = null;
    if (!storedLearntPhrases) {
      dataToStore = [phrase];
    } else {
      dataToStore = [...storedLearntPhrases, phrase];
    }
    await setStoreItem(LEARNT_PHRASES_KEY, dataToStore);
    dispatch(setLearntPhrases(dataToStore));
    return Promise.resolve();
  };
}

// Adding new term actions

export function setSelectedCategory(category) {
  return {
    type: SELECTE_VALUE,
    payload: category,
  };
}

export function setUserPhrases(phrases) {
  return {
    type: USER_PHRASES,
    payload: phrases,
  };
}

export function addUserPhrase(phrase) {
  return async dispatch => {
    const storedPhrases = await getStoreItem(USER_PHRASES_KEY);
    let dataToStore = null;
    if (!storedPhrases) {
      dataToStore = [phrase];
    } else {
      dataToStore = [...storedPhrases, phrase];
    }

    await setStoreItem(USER_PHRASES_KEY, dataToStore);
    dispatch(setUserPhrases(dataToStore));
    return Promise.resolve();
  };
}

export const synchronizeStorageToRedux = () => {
  return async dispatch => {
    const storedPhrases = await getStoreItem(USER_PHRASES_KEY);
    const storedLearntPhrase = await getStoreItem(LEARNT_PHRASES_KEY);
    if (storedPhrases) {
      dispatch(setUserPhrases(storedPhrases));
    }

    if (storedLearntPhrase) {
      dispatch(setLearntPhrases(storedLearntPhrase));
    }
    return Promise.resolve();
  };
};
