var player = true;
var boardState = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
};
var winCombination = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [3,5,7],
  [1,5,9]
];

$(document).ready(function(){
  $(".cell").on("click",function(){
    var cellId = this;
    player = playerClick(player, cellId);
    checkBoard(boardState, winCombination);
    //console.log(boardState);
  });
});


function playerClick(player, cellId){
  if(player){
    $(cellId).html('X');
    boardState[$(cellId).attr('id')] = $(cellId).html();
  }else{
    $(cellId).html('o');
    boardState[$(cellId).attr('id')] = $(cellId).html();
  }

  return !player;
}

function checkBoard(boardState, winCombination){
  for(var i = 0; i < winCombination.length; i++){
    if((boardState[winCombination[i][0]] == boardState[winCombination[i][1]] == boardState[winCombination[i][2]]) && (boardState[winCombination[i][0]] !== null)){
      console.log("WINWINWIN");
    }
    console.log("i = " + i + ": " + boardState[winCombination[i][0]] && boardState[winCombination[i][1]] && boardState[winCombination[i][2]]);
  }
}
