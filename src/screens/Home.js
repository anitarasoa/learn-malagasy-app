import React, {useEffect} from 'react';

import {LANGUAGE_NAMES, getPhrasesForCategoryId} from '../data/dataUtils';
import {
  LANG_DATA,
  SELECT_CAT,
  SEEN_PHRASES,
  LEARN,
  LEARNT_PHRASES,
  LEFT_TEXT,
  RIGHT_TEXT,
  WORDS_PHRASES,
  NO_PHRASES,
} from '../translations/index';

import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import List from '../components/List/List';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import ToolBar from '../components/ToolBar/ToolBar';
import ToolButton from '../components/ToolButton/ToolButton';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import AddIcon from '../components/ToolButton/assets/add.svg';
import CheckIcon from '../components/ToolButton/assets/check.svg';
import CheckAllIcon from '../components/ToolButton/assets/check-all.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import {LEARNT_PRHASES_ID, SEEN_PHRASES_ID} from '../redux/constants/index';

export default ({
  navigation,
  categories,
  nativeLanguage,
  setCurrentCategory,
  seenPhrases,
  setPhrases,
  learntPhrases,
  getAllCategories,
  userPhrases,
  synchronizeStorageToRedux,
  toggleLanguageName,
}) => {
  const selectCatText = LANG_DATA[SELECT_CAT][nativeLanguage];
  const seenPhraseText = LANG_DATA[SEEN_PHRASES][nativeLanguage];
  const learnText = LANG_DATA[LEARN][nativeLanguage];
  const learntPhraseText = LANG_DATA[LEARNT_PHRASES][nativeLanguage];
  const leftText = LANG_DATA[LEFT_TEXT][nativeLanguage];
  const rightText = LANG_DATA[RIGHT_TEXT][nativeLanguage];
  const wordsAndPhrases = LANG_DATA[WORDS_PHRASES][nativeLanguage];
  const noPhrasesText = LANG_DATA[NO_PHRASES][nativeLanguage];

  useEffect(() => {
    // handle the storing new phrases
    synchronizeStorageToRedux();
    // fetch categories
    getAllCategories();
  }, []);

  const openCategoryPhrases = item => {
    setCurrentCategory(item.id);
    // fetch Phrases for category
    const phrasesForCategory = getPhrasesForCategoryId(item.id);
    const filterUserPhrases = userPhrases.filter(
      userPhrase => userPhrase.catId === item.id,
    );

    const combinationNewCatAndCurrentCat = [
      ...phrasesForCategory,
      ...filterUserPhrases,
    ];
    setPhrases(combinationNewCatAndCurrentCat);
    navigation.navigate('Learn');
  };

  // fetch Phrases for category
  const openCategoryLearntPhrases = () => {
    setCurrentCategory(LEARNT_PRHASES_ID);
    setPhrases(learntPhrases);
    learntPhrases.length !== 0 && navigation.navigate('Learn');
  };

  const openSeenPhrases = () => {
    setCurrentCategory(SEEN_PHRASES_ID);
    setPhrases(seenPhrases);
    seenPhrases.length !== 0 && navigation.navigate('Learn');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={{paddingHorizontal: 35, paddingVertical: 23}}>
          <View style={styles.header}>
            <ToolBar
              button={
                <ToolButton
                  onPress={() => {
                    navigation.navigate('NewTerm');
                  }}>
                  <AddIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <LanguageSwitcher
                  firstLanguage={LANGUAGE_NAMES.EN}
                  LeftText={leftText}
                  RightText={rightText}
                  color="#FFFFFF"
                  iconName="swap-horiz"
                  onPress={toggleLanguageName}
                  iconSize={24}
                />
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={openSeenPhrases}>
                  <CheckIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={openCategoryLearntPhrases}>
                  <CheckAllIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
            <ToolBar
              button={
                <ToolButton onPress={() => null}>
                  <ModeIcon width={24} height={24} fill="#FFFFFF" />
                </ToolButton>
              }
            />
          </View>
          <View style={styles.heading}>
            <SectionHeading text={selectCatText} />
          </View>
          <List
            lang={nativeLanguage}
            data={categories}
            text={learnText}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryPhrases}
          />
          <View style={styles.heading}>
            <SectionHeading text={`${seenPhraseText}: `} />
          </View>
          <List
            data={[
              {
                id: `${SEEN_PHRASES_ID}`,
                name: `${
                  seenPhrases.length === 0
                    ? `${noPhrasesText}`
                    : `${seenPhrases.length}`
                } ${wordsAndPhrases}`,
              },
            ]}
            text={learnText}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openSeenPhrases}
          />
          <View style={styles.heading}>
            <SectionHeading text={`${learntPhraseText}: `} />
          </View>
          <List
            data={[
              {
                id: LEARNT_PRHASES_ID,
                name: `${
                  learntPhrases.length
                    ? learntPhrases.length
                    : `${noPhrasesText}`
                } ${wordsAndPhrases}`,
              },
            ]}
            text={learnText}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryLearntPhrases}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingBottom: 56,
  },
  heading: {
    paddingBottom: 15,
  },
});
