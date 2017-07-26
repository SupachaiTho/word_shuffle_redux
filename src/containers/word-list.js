import React,{Component} from 'react'
import {connect} from 'react-redux'
import {selectWord} from '../actions/index'
import {bindActionCreators} from 'redux'

class WordList extends Component{

  renderList(){
    return this.props.words.map((word)=>{
      return (
        <li
         key={word.word}
         onClick={() => this.props.selectWord(word)}
         className="list-group-item">
         {word.word}
         </li>
      )
    })
  }

  render(){
    return (
      <ul clasName="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state){
  return {
    words: state.words
  }
}

function mapDispatchToProps(dispatch){
  // Whenever selectBook is call the result should be prass
  // to all of our reducer
  return bindActionCreators({selectWord:selectWord},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(WordList)
