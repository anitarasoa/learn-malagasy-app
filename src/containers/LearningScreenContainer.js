import {connect} from 'react-redux';
import Learning from '../screens/Learning';
import {addLearntPhrase} from '../redux/actions';
import {
  categoryPhrasesRoot,
  currentCategoryName,
  categoriesRoot,
  learntPhrases,
  currentCategoryIdRoot,
} from '../redux/selectors';

function mapStateToProps(state) {
  return {
    categoryPhrases: categoryPhrasesRoot(state),
    currentCategoryName: currentCategoryName(state),
    learntPhrases: learntPhrases(state),
    categories: categoriesRoot(state),
    currentCategoryIdRoot: currentCategoryIdRoot(state),
  };
}
const mapDispatchToProps = {
  addLearntPhrase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
