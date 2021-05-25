import React, {useRef, useState} from 'react';
import {action} from '@storybook/addon-actions';

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

export default ({
  // Nav provider
  navigation,
  categories,
  nativeLanguage,
  addUserPhrase,
}) => {
  const [englishTerm, setEnglishTerm] = useState('');
  const [malagasyTerm, setMalagasyTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);

  // Dropdown selector: reset and handle default text
  const dropdownRef = useRef({});
  const defaultTextSelecter = 'Select Category';
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
    <KeyboardAwareScrollView>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
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
                  <ToolButton onPress={action('clicked-add-button')}>
                    <ModeIcon width={24} height={24} fill="#FFFFFF" />
                  </ToolButton>
                }
              />
              <ToolBar
                button={
                  <LanguageSwitcher
                    firstLanguage={LANGUAGE_NAMES.EN}
                    LeftText="EN"
                    RightText="MA"
                    color="#FFFFFF"
                    iconType=""
                    iconName="swap-horiz"
                    onPress={() => null}
                    iconSize={24}
                  />
                }
              />
            </View>

            <View style={styles.heading}>
              <SectionHeading style={styles.dropdown} text={'Category: '} />
              <SelectDropdown
                data={categories}
                ref={dropdownRef}
                onSelect={(selectedItem, index) => {
                  setSelectedCategory(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name[nativeLanguage];
                }}
                rowTextForSelection={(item, index) => {
                  return item.name[nativeLanguage];
                }}
                defaultButtonText={defaultTextSelecter}
                dropdownIconPosition={'right'}
                showDropDowns={true}
                renderDropdownIcon={IconWrapper}
                rowStyle={{width: '100%'}}
                dropdownStyle={{height: '70%'}}
                buttonTextStyle={styles.buttonText}
                buttonStyle={styles.buttonSelect}
              />
            </View>
            <View style={(styles.heading, {paddingVertical: 20})}>
              <SectionHeading text="The phrase in English: " />
            </View>
            <View style={{marginBottom: 37}}>
              <Textarea
                editable={true}
                phrase={englishTerm}
                placeholder={'Enter here'}
                onChange={e => setEnglishTerm(e)}
              />
            </View>
            <View style={styles.heading}>
              <SectionHeading text="The phrase in Malagasy: " />
            </View>
            <View style={{marginBottom: 37}}>
              <Textarea
                editable={true}
                phrase={malagasyTerm}
                placeholder={'Ataovy eto'}
                onChange={e => setMalagasyTerm(e)}
              />
            </View>

            <View style={{marginTop: 45}}>
              <NextButton
                isDisabled={englishTerm && malagasyTerm ? false : true}
                textColor={englishTerm && malagasyTerm ? '#E5E5E5' : '#06B6D4'}
                text={'Add'}
                onPress={addNewTermHandler}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
