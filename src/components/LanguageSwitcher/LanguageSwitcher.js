import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  getStyle,
  LANGUAGE_SWITCHER_CONTAINER_STYLE,
  BUTTON_STYLE,
  BUTTON_TEXT,
} from '../../themeMode';

export default function LanguageSwitcher({
  onPress,
  color,
  iconType,
  iconName,
  LeftText,
  RightText,
  iconSize,
  firstLanguage,
  themeMode,
}) {
  return (
    <TouchableHighlight
      style={getStyle(LANGUAGE_SWITCHER_CONTAINER_STYLE, themeMode)}
      underlayColor={firstLanguage ? '#001F7E' : '#007E3A'}
      onPress={onPress}>
      <View style={getStyle(BUTTON_STYLE, themeMode)}>
        <Text style={(getStyle(BUTTON_TEXT, themeMode), {color: color})}>
          {firstLanguage ? RightText : LeftText}
        </Text>
        <Icon
          style={{paddingHorizontal: 5}}
          name={iconName}
          color={color}
          type={iconType}
          size={iconSize}
        />
        <Text style={(getStyle(BUTTON_TEXT, themeMode), {color: color})}>
          {firstLanguage ? LeftText : RightText}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

LanguageSwitcher.defaultProps = {
  onPress: () => {},
};

LanguageSwitcher.propTypes = {
  onPress: PropTypes.func,
};
