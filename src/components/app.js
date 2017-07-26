import React, { Component } from 'react';
import WordList from '../containers/word-list'
import WordDetail from '../containers/word-detail'
import Word from '../containers/word'
export default class App extends Component {
  render() {
    return (
      <div>
      <WordList />
      <WordDetail/>
      <Word/>
      </div>
    );
  }
}
