import AsyncStorage from '@react-native-community/async-storage';
export const USER_PHRASES_KEY = '@malagasyApp-userPhrase';
export const LEARNT_PHRASES_KEY = '@malagasyApp/learntPhrases';

export async function setStoreItem(key, phrase) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(phrase));
  } catch (e) {
    console.log(e);
  }
}

export async function getStoreItem(key) {
  try {
    const itemData = await AsyncStorage.getItem(key);
    return JSON.parse(itemData);
  } catch (e) {
    console.log(e);
  }
}
