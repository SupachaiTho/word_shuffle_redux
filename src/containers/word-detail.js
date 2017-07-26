import React, {Component} from 'react'
import {connect} from 'react-redux'

class WordDetail extends Component {
  render() {
    if(!this.props.word){
      return <div> Select a Word to be starting </div>
    }
    return (
      <div>
        <h3>Word Shuffle</h3>
        <h2>{this.props.word.word}</h2>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    word: state.activeword
  }
}

export default connect(mapStateToProps)(WordDetail)
