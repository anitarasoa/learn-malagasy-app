import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {
  setSeenPhraseCategory,
  setCategories,
  setSeenPhrases,
  addSeenPhrase,
  addLearntPhrase,
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
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    learntPhrases: learntPhrases(state),
    categories: categoriesRoot(state),
    currentCategoryIdRoot: currentCategoryIdRoot(state),
    seenPhrases: seenPhrases(state),
    seenPhrasesCategory: seenPhrasesCategory(state),
    leftPhrases: leftPhrases(state),
    currentCategoryId: currentCategoryIdRoot(state),
  }
}

const mapDispatchToProps = {
  setSeenPhraseCategory,
  setCategories,
  addLearntPhrase,
  addSeenPhrase,
  setSeenPhrases,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
