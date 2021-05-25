import AsyncStorage from '@react-native-community/async-storage';
export const LEARNT_PHRASES_KEY = '@malagasyApp/learntPhrases';
export const SEEN_PHRASE_KEY = '@seenPhrases';
export const USER_PHRASES_KEY = '@malagasyApp-userPhrase';

export const storeData = async (itemKey, value) => {
  try {
    const JsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(itemKey, JsonValue);
  } catch (e) {
    alert(e);
  }
};

export const getData = async itemKey => {
  try {
    const JsonValue = await AsyncStorage.getItem(itemKey);
    return JSON.parse(JsonValue);
  } catch (e) {
    alert(e);
  }
};
