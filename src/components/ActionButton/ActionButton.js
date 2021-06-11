import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  getStyle,
  ACTION_BUTTON_CONTAINER,
  BUTTON_STYLE,
  BUTTON_TEXT,
} from '../../themeMode';

export default function ActionButton({
  onPress,
  text,
  color,
  iconType,
  iconName,
  themeMode,
}) {
  return (
    <TouchableHighlight
      style={getStyle(ACTION_BUTTON_CONTAINER, themeMode)}
      underlayColor="transparent"
      onRowPress={onPress}>
      <View style={getStyle(BUTTON_STYLE, themeMode)}>
        <Text style={(getStyle(BUTTON_TEXT, themeMode), {color: color})}>
          {text}
        </Text>
        <Icon
          style={{marginLeft: 10}}
          name={iconName}
          type={iconType}
          color={color}
        />
      </View>
    </TouchableHighlight>
  );
}

ActionButton.defaultProps = {
  onPress: () => {},
};

ActionButton.propTypes = {
  onPress: PropTypes.func,
};
