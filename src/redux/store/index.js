import {createStore, applyMiddleware} from 'redux';
import state from '../state';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

const confingStore = () => {
  return createStore(reducers, state, applyMiddleware(thunk));
};

export default confingStore;
