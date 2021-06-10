import {connect} from 'react-redux';
import AddNewTerm from '../screens/AddNewTerm';
import {
  categoriesRoot,
  userPhrasesRoot,
  nativeLanguageRoot,
  themeMode,
} from '../redux/selectors';
import {
  addUserPhrase,
  toggleLanguageName,
  setThemeMode,
} from '../redux/actions';

function mapStateToProps(state) {
  return {
    categories: categoriesRoot(state),
    nativeLanguage: nativeLanguageRoot(state),
    userPhrases: userPhrasesRoot(state),
    themeMode: themeMode(state),
  };
}
const mapDispatchToProps = {
  addUserPhrase,
  toggleLanguageName,
  setThemeMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTerm);
