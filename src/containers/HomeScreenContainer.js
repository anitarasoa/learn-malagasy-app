import {connect} from 'react-redux';
import Home from '../screens/Home';
import {
  setCategories,
  setCurrentCategory,
  setPhrases,
  setLearntPhrases,
  synchronizeStorageToRedux,
  getAllCategories,
} from '../redux/actions';
import {
  categoriesRoot,
  nativeLanguageRoot,
  learntPhrases,
  categoryPhrasesRoot,
  currentCategoryIdRoot,
  userPhrasesRoot,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
