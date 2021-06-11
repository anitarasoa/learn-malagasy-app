// components/Task.js
import * as React from 'react';
import {SafeAreaView, TextInput} from 'react-native';
import {
  getStyle,
  TEXT_TEXTAREA_CONTAINER_STYLE,
  TEXTAREA_STYLE,
  getTextColor,
} from '../../themeMode';
export default function Example({
  phrase,
  themeMode,
  editable,
  onChange = () => null,
  placeholder,
}) {
  return (
    <SafeAreaView style={getStyle(TEXT_TEXTAREA_CONTAINER_STYLE, themeMode)}>
      <TextInput
        style={
          editable
            ? [getStyle(TEXTAREA_STYLE, themeMode), {opacity: phrase ? 1 : 0.5}]
            : [getStyle(TEXTAREA_STYLE, themeMode), {maxWidth: 360}]
        }
        value={phrase}
        editable={editable}
        onChangeText={onChange}
        multiline={true}
        placeholder={placeholder}
        placeholderTextColor={getTextColor(themeMode)}
      />
    </SafeAreaView>
  );
}
