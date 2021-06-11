import {LANGUAGE_NAMES} from '../data/dataUtils';

export const SELECT_CAT = 'SELECT_CAT';
export const LEARN = 'LEARN';
export const SEEN_PHRASES = 'SEEN_PHRASES';
export const LEARNT_PHRASES = 'LEARNT_PHRASES';
export const LEFT_TEXT = 'LEFT_TEXT';
export const RIGHT_TEXT = 'RIGHT_TEXT';
export const WORDS_PHRASES = 'WORDS_PHRASES';
export const CAT = 'CAT';
export const PHRASES = 'PHRASES';
export const PICK_SOLUTION = 'PICK_SOLUTION';
export const PICK = 'PICK';
export const NEXT = 'NEXT';
export const RESHUFFLE = 'RESHUFFLE';
export const ANSWERED_ALL_QUESTIONS = 'ANSWERED_ALL_QUESTIONS';
export const SOLUTION = 'SOLUTION';
export const INPUT_AREA = 'INPUT_AREA';
export const LEARNT_CAT_NAME = 'LEARNT_CAT_NAME';
export const SEEN_CAT_NAME = 'SEEN_CAT_NAME';
export const PHRASE_ENGLISH = 'PHRASE_ENGLISH';
export const PHRASE_MALAGASY = 'PHRASE_MALAGASY';
export const ADD = 'ADD';
export const CORRECT = 'CORRECT';
export const WRONG = 'WRONG';
export const NO_PHRASES = 'NO_PHRASES';

export const LANG_DATA = {
  [SELECT_CAT]: {
    [LANGUAGE_NAMES.EN]: 'Select a category: ',
    [LANGUAGE_NAMES.MG]: 'Misafidiana sokajy: ',
  },
  [LEARN]: {[LANGUAGE_NAMES.EN]: 'Learn', [LANGUAGE_NAMES.MG]: 'Minatra'},
  [SEEN_PHRASES]: {
    [LANGUAGE_NAMES.EN]: 'Seen phrases',
    [LANGUAGE_NAMES.MG]: 'Andian-teny hita',
  },
  [LEARNT_PHRASES]: {
    [LANGUAGE_NAMES.EN]: 'Learnt phrases',
    [LANGUAGE_NAMES.MG]: 'Andian-teny nianarana',
  },
  [LEFT_TEXT]: {
    [LANGUAGE_NAMES.EN]: 'MA',
    [LANGUAGE_NAMES.MG]: 'EN',
  },
  [RIGHT_TEXT]: {
    [LANGUAGE_NAMES.EN]: 'EN',
    [LANGUAGE_NAMES.MG]: 'MA',
  },
  [WORDS_PHRASES]: {
    [LANGUAGE_NAMES.EN]: 'words and phrases',
    [LANGUAGE_NAMES.MG]: 'teny sy andian-teny',
  },
  [CAT]: {
    [LANGUAGE_NAMES.EN]: 'Category: ',
    [LANGUAGE_NAMES.MG]: 'Sokajy: ',
  },
  [PHRASES]: {
    [LANGUAGE_NAMES.EN]: 'The phrases: ',
    [LANGUAGE_NAMES.MG]: 'Ireo andian-teny: ',
  },
  [PICK_SOLUTION]: {
    [LANGUAGE_NAMES.EN]: 'Pick a solution: ',
    [LANGUAGE_NAMES.MG]: 'Misafidiana vahaolana: ',
  },
  [PICK]: {
    [LANGUAGE_NAMES.EN]: 'Pick',
    [LANGUAGE_NAMES.MG]: 'Haka',
  },
  [NEXT]: {
    [LANGUAGE_NAMES.EN]: 'Next',
    [LANGUAGE_NAMES.MG]: 'Manaraka',
  },
  [RESHUFFLE]: {
    [LANGUAGE_NAMES.EN]: 'Reshuffle',
    [LANGUAGE_NAMES.MG]: 'Fanamboarana',
  },
  [ANSWERED_ALL_QUESTIONS]: {
    [LANGUAGE_NAMES.EN]: 'You have answered all the questions in this category',
    [LANGUAGE_NAMES.MG]:
      'Voavaly ireo fanontaniana rehetra ato aminy ity sokajy ity',
  },
  [SOLUTION]: {
    [LANGUAGE_NAMES.EN]: LANGUAGE_NAMES.EN,
    [LANGUAGE_NAMES.MG]: LANGUAGE_NAMES.MG,
  },
  [INPUT_AREA]: {
    [LANGUAGE_NAMES.EN]: LANGUAGE_NAMES.MG,
    [LANGUAGE_NAMES.MG]: LANGUAGE_NAMES.EN,
  },
  [LEARNT_CAT_NAME]: {
    [LANGUAGE_NAMES.EN]: LANGUAGE_NAMES.EN,
    [LANGUAGE_NAMES.MG]: LANGUAGE_NAMES.MG,
  },
  [SEEN_CAT_NAME]: {
    [LANGUAGE_NAMES.EN]: LANGUAGE_NAMES.EN,
    [LANGUAGE_NAMES.MG]: LANGUAGE_NAMES.MG,
  },
  [PHRASE_ENGLISH]: {
    [LANGUAGE_NAMES.EN]: 'The phrase in English: ',
    [LANGUAGE_NAMES.MG]: "Ny andianteny amin'ny teny anglisy: ",
  },
  [PHRASE_MALAGASY]: {
    [LANGUAGE_NAMES.EN]: 'The phrase in Malagasy: ',
    [LANGUAGE_NAMES.MG]: "Ny andianteny amin'ny teny Malagasy: ",
  },
  [ADD]: {
    [LANGUAGE_NAMES.EN]: 'Add',
    [LANGUAGE_NAMES.MG]: 'Hametraka',
  },
  [CORRECT]: {
    [LANGUAGE_NAMES.EN]: 'Correct',
    [LANGUAGE_NAMES.MG]: 'Marina',
  },
  [WRONG]: {
    [LANGUAGE_NAMES.EN]: 'Wrong',
    [LANGUAGE_NAMES.MG]: 'Diso',
  },
  [NO_PHRASES]: {
    [LANGUAGE_NAMES.EN]: 'No',
    [LANGUAGE_NAMES.MG]: 'Tsy misy',
  },
};
