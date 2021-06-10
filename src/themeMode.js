import color from 'color';
import {StyleSheet} from 'react-native';

export const getStyle = (stylekey, theme) => {
  const styles = StyleSheet.create({
    [CONTAINER_STYLE]: {
      backgroundColor: theme === LIGHT_MODE ? '#E5E5E5' : '#1F232C',
      paddingHorizontal: 35,
      paddingVertical: 23,
      height: '100%',
    },
    [HEADER_STYLE]: {
      flexDirection: 'row',
      paddingBottom: 56,
    },
    [HEADING_STYLE]: {
      paddingBottom: 15,
      flexDirection: 'row',
    },
    [LIST_STYLE]: {
      backgroundColor: getFillColor(theme),
      borderWidth: 1,
      borderColor: theme === LIGHT_MODE ? '#FFFF' : '#111827',
      maxHeight: 370,
      marginBottom: 15,
    },
    [DROPDOWN_STYLE]: {
      backgroundColor: getFillColor(theme),
      borderBottomColor: theme === LIGHT_MODE ? '#E5E5E5' : '#1F232C',
      borderStyle: 'solid',
      borderBottomWidth: 1,
    },
    [TOOL_BUTTON_CONTAINER_STYLE]: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      color: getFillColor(theme),
      width: 'auto',
      alignSelf: 'center',
      borderRadius: 100,
      backgroundColor: '#06B6D4',
      alignItems: 'center',
    },
    [LANGUAGE_SWITCHER_CONTAINER_STYLE]: {
      alignSelf: 'center',
      backgroundColor: '#06B6D4',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 11,
      borderRadius: 30,
    },
    [BUTTON_STYLE]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlignVertical: 'center',
    },
    [TOOL_BUTTON_STYLE]: {
      margin: 13,
    },
    [TOOL_BAR]: {
      marginRight: 10,
    },
    [SECTION_HEADING_TEXT_STYLE]: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 22,
      color: getTextColor(theme),
      paddingBottom: 15,
    },
    [LIST_ITEM_CONTAINER]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlignVertical: 'center',
      paddingLeft: 16,
      paddingRight: 20,
      paddingVertical: 17,
    },
    [LIST_ITEM_TEXT_STYLE]: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: 19,
      color: getTextColor(theme),
      maxWidth: 320,
    },
    [LIST_SEPARATOR_STYLE]: {
      flex: 1,
      height: 1,
      backgroundColor: theme === LIGHT_MODE ? '#E5E5E5' : '#1F232C',
    },
    [TEXTAREA_STYLE]: {
      fontFamily: 'Inter',
      color: getTextColor(theme),
      marginHorizontal: 'auto',
      fontSize: 20,
      lineHeight: 24.3,
    },
    [TEXT_TEXTAREA_CONTAINER_STYLE]: {
      height: 100,
      marginVertical: 0,
      marginHorizontal: 'auto',
      backgroundColor: getFillColor(theme),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme === LIGHT_MODE ? '#E5E5E5' : '#1F232C',
      borderRadius: 3,
    },
    [DISABLE_BUTTON]: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      alignSelf: 'center',
      textAlignVertical: 'center',
      borderWidth: 1,
      borderColor: '#06B6D4',
      backgroundColor: theme === LIGHT_MODE ? '#FFFFFF' : '#1F232C',
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 27,
      paddingVertical: 11,
    },
    [BUTTON]: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      color: getFillColor(theme),
      alignSelf: 'center',
      backgroundColor: '#06B6D4',
      borderRadius: 30,
      paddingHorizontal: 27,
      paddingVertical: 11,
      tintColor: 'red',
    },
    [BUTTON_TEXT]: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 19,
    },
    [ACTION_BUTTON_CONTAINER]: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      color: '#FFFFFF',
      alignSelf: 'center',
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
  });
  return styles[stylekey];
};
export const DARK_MODE = 'dark';
export const LIGHT_MODE = 'light';
export const toggleThemeMode = (setThemeMode, themeMode) => {
  const newMode = themeMode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
  setThemeMode(newMode);
};

export const getEnabledButtonTextColor = theme =>
  theme === LIGHT_MODE ? '#E5E5E5' : '#111827';
export const getFillColor = theme =>
  theme === LIGHT_MODE ? '#FFFF' : '#111827';
export const getTextColor = theme =>
  theme === LIGHT_MODE ? '#111827' : '#FFFF';
export const getFillLearningColor = theme =>
  theme === LIGHT_MODE ? '#FFFF' : '#111827';
export const CONTAINER_STYLE = 'container';
export const HEADER_STYLE = 'header';
export const HEADING_STYLE = 'heading';
export const LIST_STYLE = 'list';
export const TOOL_BUTTON_CONTAINER_STYLE = 'toolButtonContainer';
export const TOOL_BUTTON_STYLE = 'toolButton';
export const SECTION_HEADING_TEXT_STYLE = 'sectionHeadingText';
export const LIST_ITEM_TEXT_STYLE = 'listItemText';
export const LIST_SEPARATOR_STYLE = 'listSeparator';
export const TEXTAREA_STYLE = 'textarea';
export const INPUT_STYLE = 'input';
export const TEXT_TEXTAREA_CONTAINER_STYLE = 'textTextareaContainer';
export const BUTTON = 'button';
export const DISABLE_BUTTON = 'disableButton';
export const BUTTON_TEXT = 'buttonText';
export const TOOL_BAR = 'toolBar';
export const LIST_ITEM_CONTAINER = 'listItemContainer';
export const LANGUAGE_SWITCHER_CONTAINER_STYLE =
  'languageSwitcherContainerStyle';
export const BUTTON_STYLE = 'buttonStyle';
export const ACTION_BUTTON_CONTAINER = 'actionButtonContainer';
export const ENABLED_USER_BUTTON = 'enabledUserButton';
export const DISABLE_USER_BUTTON = 'disabledUserButton';
export const DROPDOWN_STYLE = 'drowpdownStyle';
