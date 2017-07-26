//State argument is not application state, only the state
// this reducer is respondsible for
export default function(state = null, action){
  switch(action.type){
    case 'WORD_SELECTED':
    return action.payload
  }
  return state
}
