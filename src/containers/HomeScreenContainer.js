import {connect} from 'react-redux';
import Home from '../screens/Home';

import {
  setCategories,
  setCurrentCategory,
  setPhrases,
  setLearntPhrases,
  synchronizeStorageToRedux,
  getAllCategories,
  setSeenPhrases,
  toggleLanguageName,
} from '../redux/actions';

import {
  categoriesRoot,
  nativeLanguageRoot,
  learntPhrases,
  categoryPhrasesRoot,
  currentCategoryIdRoot,
  userPhrasesRoot,
  seenPhrases,
  learntPhrases,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    learntPhrases: learntPhrases(state),
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryId: currentCategoryIdRoot(state),
    userPhrases: userPhrasesRoot(state),
    seenPhrases: seenPhrases(state),
    learntPhrases: learntPhrases(state),
  };
}
const mapDispatchToProps = {
  setCategories,
  setCurrentCategory,
  setPhrases,
  setLearntPhrases,
  getAllCategories,
  synchronizeStorageToRedux,
  setSeenPhrases,
  toggleLanguageName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
