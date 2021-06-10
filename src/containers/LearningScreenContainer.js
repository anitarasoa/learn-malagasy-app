import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  setSeenPhraseCategory,
  setCategories,
  setSeenPhrases,
  setThemeMode,
  addSeenPhrase,
  addLearntPhrase,
  toggleLanguageName,
} from '../redux/actions';

import {
  categoryPhrasesRoot,
  currentCategoryName,
  seenPhrases,
  leftPhrases,
  categoriesRoot,
  seenPhrasesCategory,
  currentCategoryIdRoot,
  learntPhrases,
  nativeLanguageRoot,
  themeMode,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    learntPhrases: learntPhrases(state),
    currentCategoryIdRoot: currentCategoryIdRoot(state),
    seenPhrases: seenPhrases(state),
    seenPhrasesCategory: seenPhrasesCategory(state),
    leftPhrases: leftPhrases(state),
    currentCategoryId: currentCategoryIdRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    themeMode: themeMode(state),
  };
}

const mapDispatchToProps = {
  setSeenPhraseCategory,
  setCategories,
  addLearntPhrase,
  addSeenPhrase,
  setSeenPhrases,
  toggleLanguageName,
  setThemeMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
