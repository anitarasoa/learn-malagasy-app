import {connect} from 'react-redux';
import AddNewTerm from '../screens/AddNewTerm';
import {
  categoriesRoot,
  userPhrasesRoot,
  nativeLanguageRoot,
} from '../redux/selectors';
import {addUserPhrase} from '../redux/actions';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    userPhrases: userPhrasesRoot(state),
  };
}
const mapDispatchToProps = {
  addUserPhrase,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTerm);
