import React, {useState, useEffect, useCallback} from 'react';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
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
} from '../translations/index';

import {LANGUAGE_NAMES} from '../data/dataUtils';
import {shuffleArray} from '../utils';
import {LEARNT_PRHASES_ID, SEEN_PHRASES_ID} from '../redux/constants/index';

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

  const setAnswerOptionsCallback = (original, current) => {
    const originWithoutCurrent = original.filter(phr => phr.id !== current.id);
    const randomFromAll = shuffleArray(originWithoutCurrent).slice(0, 3);
    const randomWithCorrect = shuffleArray([...randomFromAll, current]);
    setAnswerOptions(randomWithCorrect);
  };

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

  const currentPhraseCategory = categories.find(cat =>
    cat.phrasesIds.includes(currentPhrase?.id),
  );

  // Category name
  let catName = null;
  if (currentCategoryId === SEEN_PHRASES_ID) {
    catName = `${seenPhraseText} - ${currentPhraseCategory?.name?.[seenCatNameText]}`;
  } else if (currentCategoryId === LEARNT_PRHASES_ID) {
    catName = `${learntPhraseText} - ${currentPhraseCategory?.name?.[learntCatNameText]}`;
  } else {
    catName = currentCategoryName;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <View style={{paddingHorizontal: 35, paddingVertical: 23}}>
          <View style={styles.header}>
            <ToolBar
              button={
                <ToolButton
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  <BackIcon width={24} height={24} fill="#FFFFFF" />
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
                  iconType=""
                  iconName="swap-horiz"
                  onPress={toggleLanguageName}
                  iconSize={24}
                />
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
            <SectionHeading text={catText} />
            <Text>{catName}</Text>
          </View>
          <View style={styles.heading}>
            <SectionHeading text={phrasesText} />
          </View>
          <View style={{marginBottom: 37}}>
            <Textarea
              editable={false}
              phrase={
                shouldReshuffle
                  ? answeredAllQuestionsText
                  : currentPhrase?.name?.[inputAreaText]
              }
            />
          </View>
          {!shouldReshuffle && Boolean(answerOptions && answerOptions.length) && (
            <View>
              <View style={styles.heading}>
                <SectionHeading text={pickSolution} />
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
              />
            </View>
          )}

          {disableAllOptions && !shouldReshuffle && (
            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={false}
                textColor="#FFFFFF"
                text={nextText}
                onPress={nextAnswerCallback}
              />
            </View>
          )}
          {shouldReshuffle && (
            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={false}
                textColor="#FFFFFF"
                text={reshuffleText}
                onPress={reshuffleCallback}
              />
            </View>
          )}
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
    flexDirection: 'row',
  },
  debugList: {
    flexDirection: 'row',
    width: 250,
  },
});
