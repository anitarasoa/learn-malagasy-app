import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';

import {LANGUAGE_NAMES} from '../data/dataUtils';
import Textarea from '../components/Textarea/Textarea';
import ToolBar from '../components/ToolBar/ToolBar';
import ToolButton from '../components/ToolButton/ToolButton';
import NextButton from '../components/NextButton/NextButton';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher';

import BackIcon from '../components/ToolButton/assets/back.svg';
import ModeIcon from '../components/ToolButton/assets/mode.svg';
import ArrowDownIcon from '../icons/arrow-down.svg';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {
  SELECT_CAT,
  CAT,
  LANG_DATA,
  LEFT_TEXT,
  RIGHT_TEXT,
  PHRASE_ENGLISH,
  PHRASE_MALAGASY,
  ADD,
} from '../translations';

import {
  getStyle,
  getFillColor,
  HEADER_STYLE,
  HEADING_STYLE,
  CONTAINER_STYLE,
  getEnabledButtonTextColor,
  LIST_ITEM_TEXT_STYLE,
  DROPDOWN_STYLE,
} from '../themeMode';

export default ({
  // Nav provider
  navigation,
  categories,
  nativeLanguage,
  addUserPhrase,
  toggleLanguageName,
  themeMode,
  setThemeMode,
}) => {
  const [englishTerm, setEnglishTerm] = useState('');
  const [malagasyTerm, setMalagasyTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);

  const selectCatText = LANG_DATA[SELECT_CAT][nativeLanguage];
  const catText = LANG_DATA[CAT][nativeLanguage];
  const leftText = LANG_DATA[LEFT_TEXT][nativeLanguage];
  const rightText = LANG_DATA[RIGHT_TEXT][nativeLanguage];
  const phraseEnglish = LANG_DATA[PHRASE_ENGLISH][nativeLanguage];
  const phraseMalagasy = LANG_DATA[PHRASE_MALAGASY][nativeLanguage];
  const addText = LANG_DATA[ADD][nativeLanguage];

  // Dropdown selector: reset and handle default text
  const dropdownRef = useRef({});
  const defaultTextSelecter = selectCatText;
  const IconWrapper = () => {
    return (
      <View style={{marginRight: 115}}>
        <ArrowDownIcon />
      </View>
    );
  };

  const getSelectId = selectedCategory && selectedCategory.id;

  function addNewTermHandler() {
    const newPhrase = {
      catId: getSelectId,
      id: `##-${englishTerm}`,
      name: {en: englishTerm, mg: malagasyTerm},
    };

    addUserPhrase(newPhrase);
    setMalagasyTerm('');
    setEnglishTerm('');
    // reset the default text selecter
    dropdownRef.current.reset();
  }

  return (
    <View style={getStyle(CONTAINER_STYLE, themeMode)}>
      <KeyboardAwareScrollView>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
            <View style={getStyle(HEADER_STYLE, themeMode)}>
              <ToolBar
                themeMode={themeMode}
                button={
                  <ToolButton
                    onPress={() => {
                      navigation.navigate('Home');
                      themeMode = {themeMode};
                    }}>
                    <BackIcon
                      themeMode={themeMode}
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
                      themeMode={themeMode}
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
                    iconName="swap-horiz"
                    onPress={toggleLanguageName}
                    iconSize={24}
                    themeMode={themeMode}
                  />
                }
              />
            </View>

            <View style={getStyle(HEADING_STYLE, themeMode)}>
              <SectionHeading
                themeMode={themeMode}
                style={styles.dropdown}
                text={catText}
              />
              <SelectDropdown
                data={categories}
                ref={dropdownRef}
                onSelect={selectedItem => {
                  setSelectedCategory(selectedItem);
                }}
                buttonTextAfterSelection={selectedItem => {
                  return selectedItem.name[nativeLanguage];
                }}
                rowTextForSelection={item => {
                  return item.name[nativeLanguage];
                }}
                defaultButtonText={defaultTextSelecter}
                dropdownIconPosition={'right'}
                showDropDowns={true}
                renderDropdownIcon={IconWrapper}
                rowStyle={[
                  {width: '100%'},
                  getStyle(DROPDOWN_STYLE, themeMode),
                ]}
                rowTextStyle={getStyle(LIST_ITEM_TEXT_STYLE, themeMode)}
                dropdownStyle={{height: '70%'}}
                buttonTextStyle={styles.buttonText}
                buttonStyle={styles.buttonSelect}
              />
            </View>
            <View
              style={
                (getStyle(HEADING_STYLE, themeMode), {paddingVertical: 20})
              }>
              <SectionHeading themeMode={themeMode} text={phraseEnglish} />
            </View>
            <View style={{marginBottom: 37}}>
              <Textarea
                editable={true}
                phrase={englishTerm}
                placeholder="Enter here"
                onChange={e => setEnglishTerm(e)}
                themeMode={themeMode}
              />
            </View>
            <View style={getStyle(HEADING_STYLE, themeMode)}>
              <SectionHeading themeMode={themeMode} text={phraseMalagasy} />
            </View>
            <View style={{marginBottom: 37}}>
              <Textarea
                editable={true}
                phrase={malagasyTerm}
                placeholder="Ataovy eto"
                onChange={e => setMalagasyTerm(e)}
                themeMode={themeMode}
              />
            </View>

            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={!Boolean(englishTerm && malagasyTerm)}
                textColor={
                  englishTerm && malagasyTerm
                    ? getEnabledButtonTextColor(themeMode)
                    : '#06B6D4'
                }
                text={addText}
                onPress={addNewTermHandler}
                themeMode={themeMode}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSelect: {
    width: '70%',
    marginVertical: -17,
    marginHorizontal: -15,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#06B6D4',
    textAlign: 'left',
  },
});
