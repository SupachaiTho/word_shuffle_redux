import React,{ Component } from 'react'
import Character from '../components/character'
import {Droppable } from 'react-drag-and-drop'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getInput,onDrop} from '../actions/index'
var keycode = require('keycode');


class Word extends Component {
    constructor(props){
        super(props);
        document.addEventListener('keydown', (e)=>this.props.getInput(keycode(e)))
    }


    render() {
      if(!this.props.wordshuffle.word){
        return <div>Select Word</div>
      }

        const characters = this.props.wordshuffle.word_shuffle.map((character,index)=>{
        var selected = ""
        var result = this.props.wordshuffle.result;
        if(index == this.props.wordshuffle.select_location){
          selected = "selected"
        }
          return (
            <Droppable
                    types={['word']} // <= allowed drop types
                    onDrop={this.props.onDrop.bind(this)}
                    key = {index}
                    >
              <Character
              key = {index}
              character={character}
              selected = {selected}
              corrected = {result[index]}
              index = {index}/>
            </Droppable>
          )
      })

        return(
        <div className="word">
            <div className="col-md-12 list-inline">
              {characters}
            </div>
        </div>
        )
    }

}

function mapStateToProps(state){
  return {
    wordshuffle: state.wordshuffle
  }
}

function mapDispatchToProps(dispatch){
  // Whenever selectBook is call the result should be prass
  // to all of our reducer
  return bindActionCreators({getInput:getInput,onDrop:onDrop},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Word)
