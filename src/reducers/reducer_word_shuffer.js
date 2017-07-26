export default function(state = {
  word: "",
  word_correct: [],
  word_shuffle: [],
  key: 'n/a',
  select_location: 0,
  history: [],
  result: []
}, action){
  switch(action.type){
    case 'WORD_SELECTED':{
      state = {
        ...state,
        word: action.payload.word,
        word_correct: action.payload.word.split(''),
        word_shuffle: shuffle(action.payload.word.split('')),
        result: []
      }
      break;
    }
    case 'WORD_CHECKLETTER':{
      checkLetter(action.payload,state);
      state = {
        ...state,
        state
      }
      break;
    }
    case 'WORD_CORRECT':{
      checkReslt(state);
      state = {
        ...state,
        state
      }
      break;
    }
    case 'WORD_DELETE':{
      backWard(state);
      state = {
        ...state,
        state
      }
      break;
    }
    case 'WORD_DROP':{
      changeShuffleListByDrag(action.payload.character,
        action.payload.tempLocation,
        action.payload.newLocation,state)
        state = {
          ...state,
          state
        }
      break;
    }
  }
  return state
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a
}

function switchLocationByDrag(tempkey,newlocation,state){
  var tempWord = state.word_shuffle
  if(newlocation == tempWord.indexOf(tempkey)){
    state.history.pop()
  }else{
    tempWord[newlocation] = tempkey;
  }
}

function changeShuffleListByDrag(key,templocation,newlocation,state){
  var tempWord = state.word_shuffle.slice()
  var tempLocation = templocation
  var tempkey = tempWord[newlocation]
  state.result = []

  state.history.push(tempWord)

  tempWord = state.word_shuffle
  switchLocationByDrag(tempkey,tempLocation,state)

  if(newlocation != -1){
    tempWord[newlocation] = key
    state.select_location = newlocation+1
  }
}

function backWard(state){
  state.result = []
  if(state.history.length>0){
    state.word_shuffle = state.history.pop()

    if(state.select_location>0){
      state.select_location -=1
    }
  }
}

function checkReslt(state){
    var tempWord = state.word_shuffle
    var correctWord = state.word_correct

    tempWord.forEach(function(e,i){
      if(e == correctWord[i]){
        state.result[i] = "corrected"
      }else{
        state.result[i] = "incorrected"
      }
    })
    state.select_location = 0
}

function checkLetter(key,state){
  if(state.word_correct.indexOf(key)>=0){
       changeShuffleList(key, state)
  }
}

function changeShuffleList(key,state){
  // temp by value
  var tempWord = state.word_shuffle.slice()
  var tempkey = tempWord[state.select_location]
  state.result = []

  state.history.push(tempWord)

  // temp by ref
  tempWord = state.word_shuffle
  var newLocation = switchLocation(key,state.select_location,tempkey,state)

  if(newLocation!= -1){
    if(newLocation>state.select_location){
      tempWord[state.select_location] = key
    }

    state.select_location +=1

    if(state.select_location == tempWord.length){
      state.select_location=0
    }
  }

}

function switchLocation(key,location,tempkey,state){
  var tempWord = state.word_shuffle

  var newlocation = -1
  tempWord.forEach(function(e,i){
    if(e == key && i >= location){
      newlocation = i;
    }
  })
  if(newlocation > location){
    tempWord[newlocation] = tempkey;
  }else if(newlocation < location){
    state.history.pop()
  }

  return newlocation
}
