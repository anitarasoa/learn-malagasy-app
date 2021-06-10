import React from 'react';
import {View} from 'react-native';
import {getStyle, TOOL_BAR} from '../../themeMode';

export default function ToolBar({button, themeMode}) {
  return <View style={getStyle(TOOL_BAR, themeMode)}>{button}</View>;
}
