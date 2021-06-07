import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from 'redux';

// import all of constat case name for the switch
import {LANGUAGE_NAMES} from '../../data/dataUtils';
// import all of constat case name for the swich
// in reducers
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
  TOOGLE_LANGUAGE_NAME,
} from '../constants';

// categories reducer
function categories(state = [], action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}

// categories reducer
function currentCategoryId(state = '', action) {
  switch (action.type) {
    case SET_CURRENT_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}

// phrases reducer
function categoryPhrases(state = [], action) {
  switch (action.type) {
    case SET_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

function nativeLanguage(state = '', action) {
  switch (action.type) {
    case SET_LANGUAGE_NAME:
      return action.payload;
    case TOOGLE_LANGUAGE_NAME:
      const switchlanguage =
        state === LANGUAGE_NAMES.MG ? LANGUAGE_NAMES.EN : LANGUAGE_NAMES.MG;
      return switchlanguage;
    default:
      return state;
  }
}

function learntPhrases(state = [], action) {
  switch (action.type) {
    case SET_LEARNT_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

function userPhrases(state = [], action) {
  switch (action.type) {
    case USER_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

function seenPhrases(state = [], action) {
  switch (action.type) {
    case SET_SEEN_PHRASES:
      return action.payload;
    default:
      return state;
  }
}

function leftPhrases(state = null, action) {
  switch (action.type) {
    case SET_PHRASES_LEFT:
      return action.payload;
    default:
      return state;
  }
}

function seenPhrasesCategory(state = null, action) {
  switch (action.type) {
    case SET_SEEN_PHRASES_CATEGORY:
      return action.payload;
    default:
      return state;
  }
}

// combine all of the reducers together
export default combineReducers({
  currentCategoryId,
  categories,
  categoryPhrases,
  nativeLanguage,
  learntPhrases,
  userPhrases,
  seenPhrases,
  seenPhrasesCategory,
  leftPhrases,
});
