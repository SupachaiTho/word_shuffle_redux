import { combineReducers } from 'redux';
import WordReducer from './reducer_words'
import ActiveWord from './reducer_active_word'
import WordShuffle from './reducer_word_shuffer'
const rootReducer = combineReducers({
  words: WordReducer,
  activeword: ActiveWord,
  wordshuffle: WordShuffle
});

export default rootReducer;
