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
} from '../translations/index';
import {View, SafeAreaView, KeyboardAvoidingView} from 'react-native';

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

import {
  getStyle,
  getFillColor,
  CONTAINER_STYLE,
  HEADER_STYLE,
  HEADING_STYLE,
} from '../themeMode';

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
  themeMode,
  setThemeMode,
}) => {
  const selectCatText = LANG_DATA[SELECT_CAT][nativeLanguage];
  const seenPhraseText = LANG_DATA[SEEN_PHRASES][nativeLanguage];
  const learnText = LANG_DATA[LEARN][nativeLanguage];
  const learntPhraseText = LANG_DATA[LEARNT_PHRASES][nativeLanguage];
  const leftText = LANG_DATA[LEFT_TEXT][nativeLanguage];
  const rightText = LANG_DATA[RIGHT_TEXT][nativeLanguage];
  const wordsAndPhrases = LANG_DATA[WORDS_PHRASES][nativeLanguage];

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
        <View style={getStyle(CONTAINER_STYLE, themeMode)}>
          <View style={getStyle(HEADER_STYLE, themeMode)}>
            <ToolBar
              themeMode={themeMode}
              button={
                <ToolButton
                  onPress={() => {
                    navigation.navigate('NewTerm');
                    themeMode = {themeMode};
                  }}>
                  <AddIcon
                    width={24}
                    height={24}
                    fill={getFillColor(themeMode)}
                  />
                </ToolButton>
              }
            />
            <ToolBar
              themeMode={themeMode}
              button={
                <LanguageSwitcher
                  firstLanguage={LANGUAGE_NAMES.EN}
                  LeftText={leftText}
                  RightText={rightText}
                  color={getFillColor(themeMode)}
                  iconType=""
                  iconName="swap-horiz"
                  onPress={toggleLanguageName}
                  iconSize={24}
                  themeMode={themeMode}
                />
              }
            />
            <ToolBar
              themeMode={themeMode}
              button={
                <ToolButton themeMode={themeMode} onPress={openSeenPhrases}>
                  <CheckIcon
                    width={24}
                    height={24}
                    fill={getFillColor(themeMode)}
                  />
                </ToolButton>
              }
            />
            <ToolBar
              themeMode={themeMode}
              button={
                <ToolButton
                  themeMode={themeMode}
                  onPress={openCategoryLearntPhrases}>
                  <CheckAllIcon
                    width={24}
                    height={24}
                    fill={getFillColor(themeMode)}
                  />
                </ToolButton>
              }
            />
            <ToolBar
              themeMode={themeMode}
              button={
                <ToolButton themeMode={themeMode} onPress={setThemeMode}>
                  <ModeIcon
                    width={24}
                    height={24}
                    fill={getFillColor(themeMode)}
                  />
                </ToolButton>
              }
            />
          </View>
          <View style={getStyle(HEADING_STYLE, themeMode)}>
            <SectionHeading themeMode={themeMode} text={selectCatText} />
          </View>
          <List
            lang={nativeLanguage}
            data={categories}
            text={learnText}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryPhrases}
            themeMode={themeMode}
          />
          <View style={getStyle(HEADING_STYLE, themeMode)}>
            <SectionHeading
              themeMode={themeMode}
              text={`${seenPhraseText}: `}
            />
          </View>
          <List
            data={[
              {
                id: `${SEEN_PHRASES_ID}`,
                name: `${
                  seenPhrases.length === 0 ? 'No' : `${seenPhrases.length}`
                } ${wordsAndPhrases}`,
              },
            ]}
            text={learnText}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openSeenPhrases}
            themeMode={themeMode}
          />
          <View style={getStyle(HEADING_STYLE, themeMode)}>
            <SectionHeading
              themeMode={themeMode}
              text={`${learntPhraseText}: `}
            />
          </View>
          <List
            data={[
              {
                id: LEARNT_PRHASES_ID,
                name: `${
                  learntPhrases.length ? learntPhrases.length : 'No'
                } ${wordsAndPhrases}`,
              },
            ]}
            text={learnText}
            color="#06B6D4"
            iconType="material-community"
            iconName="arrow-right"
            makeAction={openCategoryLearntPhrases}
            themeMode={themeMode}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
