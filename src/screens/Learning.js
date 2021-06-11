import React, {useState, useEffect, useCallback} from 'react';

import {Text, View, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import List from '../components/List/List';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import ToolBar from '../components/ToolBar/ToolBar';
import Textarea from '../components/Textarea/Textarea';
import NextButton from '../components/NextButton/NextButton';
import ToolButton from '../components/ToolButton/ToolButton';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';
import BackIcon from '../components/ToolButton/assets/back.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';

import {
  LANG_DATA,
  LEFT_TEXT,
  RIGHT_TEXT,
  CAT,
  PHRASES,
  PICK_SOLUTION,
  PICK,
  NEXT,
  RESHUFFLE,
  ANSWERED_ALL_QUESTIONS,
  SOLUTION,
  INPUT_AREA,
  LEARNT_PHRASES,
  LEARNT_CAT_NAME,
  SEEN_CAT_NAME,
  SEEN_PHRASES,
  CORRECT,
  WRONG,
} from '../translations/index';

import {getPhrasesForCategoryId, LANGUAGE_NAMES} from '../data/dataUtils';
import {shuffleArray} from '../utils';
import {LEARNT_PRHASES_ID, SEEN_PHRASES_ID} from '../redux/constants/index';
import {
  getStyle,
  getFillColor,
  CONTAINER_STYLE,
  HEADER_STYLE,
  HEADING_STYLE,
  TEXTAREA_STYLE,
  getTextColor,
} from '../themeMode';

export default ({
  //nav provider
  navigation,
  categoryPhrases,
  currentCategoryName,
  addLearntPhrase,
  learntPhrases,
  categories,
  seenPhrases,
  addSeenPhrase,
  currentCategoryId,
  nativeLanguage,
  toggleLanguageName,
  themeMode,
  setThemeMode,
}) => {
  const [originalPhrases, setOriginalPhrases] = useState([]);
  const [phrasesLeft, setPhrasesLeft] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState(null);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [disableAllOptions, setDisableAllOptions] = useState(false);
  const [shouldReshuffle, setshouldReshuffle] = useState(false);

  const leftText = LANG_DATA[LEFT_TEXT][nativeLanguage];
  const rightText = LANG_DATA[RIGHT_TEXT][nativeLanguage];
  const catText = LANG_DATA[CAT][nativeLanguage];
  const phrasesText = LANG_DATA[PHRASES][nativeLanguage];
  const pickSolution = LANG_DATA[PICK_SOLUTION][nativeLanguage];
  const pickText = LANG_DATA[PICK][nativeLanguage];
  const nextText = LANG_DATA[NEXT][nativeLanguage];
  const reshuffleText = LANG_DATA[RESHUFFLE][nativeLanguage];
  const answeredAllQuestionsText =
    LANG_DATA[ANSWERED_ALL_QUESTIONS][nativeLanguage];
  const solutionText = LANG_DATA[SOLUTION][nativeLanguage];
  const inputAreaText = LANG_DATA[INPUT_AREA][nativeLanguage];
  const learntPhraseText = LANG_DATA[LEARNT_PHRASES][nativeLanguage];
  const seenPhraseText = LANG_DATA[SEEN_PHRASES][nativeLanguage];
  const learntCatNameText = LANG_DATA[LEARNT_CAT_NAME][nativeLanguage];
  const seenCatNameText = LANG_DATA[SEEN_CAT_NAME][nativeLanguage];

  useEffect(() => {
    setOriginalPhrases(categoryPhrases);
    setNewQuestionPhrase(categoryPhrases, categoryPhrases);
  }, [categoryPhrases]);

  const selectAnswerCallback = useCallback(
    item => {
      if (
        item.id === currentPhrase.id &&
        learntPhrases?.every(phrase => phrase.id !== currentPhrase.id)
      ) {
        addLearntPhrase(item);
      } else {
        seenPhrases.every(phrase => phrase.id !== currentPhrase.id) &&
          addSeenPhrase(item);
      }

      setDisableAllOptions(true);
      const answerOptionsWithSelected = answerOptions.map(phrase => {
        return {...phrase, isSelected: phrase.id === item.id};
      });
      setAnswerOptions(answerOptionsWithSelected);
    },
    [currentPhrase, setDisableAllOptions, answerOptions],
  );

  const currentPhraseCategory = categories.find(cat =>
    cat.phrasesIds.includes(currentPhrase?.id),
  );

  let catName = null;
  if (currentCategoryId === SEEN_PHRASES_ID) {
    catName = `${seenPhraseText} - ${currentPhraseCategory?.name?.[seenCatNameText]}`;
  } else if (currentCategoryId === LEARNT_PRHASES_ID) {
    catName = `${learntPhraseText} - ${currentPhraseCategory?.name?.[learntCatNameText]}`;
  } else {
    catName = currentCategoryName;
  }

  const setAnswerOptionsCallback = (original, current) => {
    const originWithoutCurrent = original.filter(phr => phr.id !== current.id);
    // Find a category
    const phraseCategoryId = categories.find(cat =>
      cat.phrasesIds.includes(current?.id),
    );
    const allAppendixPhrases = getPhrasesForCategoryId(phraseCategoryId?.id);
    const removeDuplicateItem = allAppendixPhrases.filter(
      phr => phr.id !== current.id,
    );
    const randomFromAll = shuffleArray(
      seenPhrases || learntPhrases ? removeDuplicateItem : originWithoutCurrent,
    ).slice(0, 3);
    const randomWithCorrect = shuffleArray([...randomFromAll, current]);
    setAnswerOptions(randomWithCorrect);
  };

  const nextAnswerCallback = useCallback(() => {
    if (!Boolean(phrasesLeft.length)) {
      setshouldReshuffle(true);
      return;
    }
    setDisableAllOptions(false);
    const leftWithResetSelection = phrasesLeft.map(p => ({
      ...p,
      isSelected: false,
    }));

    setNewQuestionPhrase(originalPhrases, leftWithResetSelection);
  }, [phrasesLeft, originalPhrases]);

  const reshuffleCallback = useCallback(() => {
    setshouldReshuffle(false);
    setDisableAllOptions(false);
    setNewQuestionPhrase(originalPhrases, originalPhrases);
  }, [originalPhrases]);

  const setNewQuestionPhrase = (originalAll, leftOriginal) => {
    const phrasesLeftOriginal = shuffleArray(leftOriginal);
    const phrasesLeftCopy = [...phrasesLeftOriginal];
    const newPhrase = phrasesLeftCopy.shift();
    setPhrasesLeft(phrasesLeftCopy);
    setCurrentPhrase(newPhrase);
    setAnswerOptionsCallback(originalAll, newPhrase);
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
                  themeMode={themeMode}
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <BackIcon
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
            <SectionHeading themeMode={themeMode} text={catText} />
            <Text style={{color: getTextColor(themeMode)}}>{catName}</Text>
          </View>
          <View style={getStyle(HEADING_STYLE, themeMode)}>
            <SectionHeading themeMode={themeMode} text={phrasesText} />
          </View>
          <View style={{marginBottom: 37}}>
            <Textarea
              editable={false}
              phrase={
                shouldReshuffle
                  ? answeredAllQuestionsText
                  : currentPhrase?.name?.[inputAreaText]
              }
              themeMode={themeMode}
            />
          </View>
          {!shouldReshuffle && Boolean(answerOptions && answerOptions.length) && (
            <View>
              <View style={getStyle(HEADING_STYLE, themeMode)}>
                <SectionHeading text={pickSolution} themeMode={themeMode} />
              </View>
              <List
                lang={LANGUAGE_NAMES.EN}
                lang={solutionText}
                data={answerOptions}
                text={pickText}
                color="#06B6D4"
                iconType="material-community"
                iconName="arrow-right"
                makeAction={selectAnswerCallback}
                randomPhraseId={currentPhrase.id}
                disableAllOptions={disableAllOptions}
                themeMode={themeMode}
              />
            </View>
          )}
          {disableAllOptions && !shouldReshuffle && (
            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={false}
                text={nextText}
                textColor={getFillColor(themeMode)}
                onPress={nextAnswerCallback}
                themeMode={themeMode}
              />
            </View>
          )}
          {shouldReshuffle && (
            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={false}
                text={reshuffleText}
                textColor={getFillColor(themeMode)}
                onPress={reshuffleCallback}
                themeMode={themeMode}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
