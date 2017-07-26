export function selectWord(word){
  return{
    type: 'WORD_SELECTED',
    payload: word
  };
}

export function getInput(key){
    switch (key) {
      case 'enter':
       return{
         type: 'WORD_CORRECT',
         payload: key
       };
       break;
      case 'backspace':
       return{
         type: 'WORD_DELETE',
         payload: key
       }
       break;
      default:
       return {
         type: 'WORD_CHECKLETTER',
         payload: key
       };
    }
}

export function onDrop(data, target){
  var tempLocation
  var character
  var newLocation
  data.word.split(" ").forEach((val,index)=>{
    if(index == 0){
      tempLocation = parseInt(val)
    }else{
      character = val
    }
  })

  target.target.className.split(" ").forEach((val,index) => {
    newLocation = parseInt(val)
  })

  return {
    type:'WORD_DROP',
    payload: {tempLocation,character,newLocation}
  }
}
