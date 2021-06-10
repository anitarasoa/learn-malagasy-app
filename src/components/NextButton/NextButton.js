import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text} from 'react-native';
import {getStyle, BUTTON, DISABLE_BUTTON, BUTTON_TEXT} from '../../themeMode';

export default function Button({
  onPress,
  isDisabled,
  text,
  themeMode,
  textColor,
}) {
  return (
    <TouchableHighlight
      disabled={isDisabled}
      style={
        isDisabled
          ? getStyle(DISABLE_BUTTON, themeMode)
          : getStyle(BUTTON, themeMode)
      }
      underlayColor="#06D440"
      onPress={onPress}>
      <Text style={(getStyle(BUTTON_TEXT, themeMode), {color: textColor})}>
        {text}
      </Text>
    </TouchableHighlight>
  );
}

Button.defaultProps = {
  onPress: () => {},
};

Button.propTypes = {
  onPress: PropTypes.func,
};
