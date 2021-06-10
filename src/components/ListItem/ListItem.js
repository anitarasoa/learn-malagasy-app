import React from 'react';
import ActionButton from '../ActionButton/ActionButton';
import {
  getStyle,
  LIST_ITEM_TEXT_STYLE,
  LIST_SEPARATOR_STYLE,
  LIST_ITEM_CONTAINER,
} from '../../themeMode';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
} from 'react-native';

export const Separator = ({themeMode}) => (
  <View style={getStyle(LIST_SEPARATOR_STYLE, themeMode)} />
);

const RenderDataItem = ({
  item,
  index,
  makeAction,
  text,
  iconName,
  iconType,
  color,
  lang,
  randomPhraseId,
  disableAllOptions,
  themeMode,
}) => {
  const showAnswerMode = disableAllOptions === true;
  const isCorrectAnswer = item.id === randomPhraseId;
  const isSelected = Boolean(item?.isSelected);
  const showAsCorrect = showAnswerMode && isCorrectAnswer;
  const shouldReveal = isSelected || showAsCorrect;
  const shouldDisplayAnswer = showAnswerMode && shouldReveal;

  const textToDisplay = !shouldDisplayAnswer
    ? text
    : showAsCorrect
    ? 'Correct'
    : 'Wrong';

  const colorToDisplay = !shouldDisplayAnswer
    ? color
    : showAsCorrect
    ? '#06D440'
    : '#D4068E';

  const iconTypeToDisplay = !shouldDisplayAnswer
    ? iconType
    : showAsCorrect
    ? 'octicon'
    : '';

  const IconNameToDisplay = !shouldDisplayAnswer
    ? iconName
    : showAsCorrect
    ? 'check'
    : 'close';

  return (
    <TouchableOpacity
      disabled={disableAllOptions && disableAllOptions}
      style={getStyle(LIST_ITEM_CONTAINER, themeMode)}
      onPress={() => makeAction(item, index)}>
      <View>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={getStyle(LIST_ITEM_TEXT_STYLE, themeMode)}>
          {lang ? item?.name?.[lang] : item.name}
        </Text>
      </View>
      <ActionButton
        text={textToDisplay}
        color={colorToDisplay}
        iconType={iconTypeToDisplay}
        iconName={IconNameToDisplay}
        themeMode={themeMode}
      />
    </TouchableOpacity>
  );
};

export default function ListItem({
  makeAction,
  data,
  text,
  iconName,
  iconType,
  color,
  lang,
  randomPhraseId,
  disableAllOptions,
  themeMode,
}) {
  return (
    <SafeAreaView>
      <SectionList
        sections={[{data: data}]}
        renderItem={({item, index}) => (
          <RenderDataItem
            item={item}
            index={index}
            makeAction={makeAction}
            text={text}
            iconName={iconName}
            iconType={iconType}
            color={color}
            lang={lang}
            randomPhraseId={randomPhraseId}
            disableAllOptions={disableAllOptions}
            themeMode={themeMode}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Separator themeMode={themeMode} />}
      />
    </SafeAreaView>
  );
}
