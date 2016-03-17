var playerSelect = "";
var compSelect = "";
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

var freeMoves = [];

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
  $('#board').hide();

  $(".cell-apart").on('click', function(){
    if($(this).html() == 'X'){
      playerSelect = 'X';
      compSelect = 'O';
    }else {
      playerSelect = 'O';
      compSelect = 'X';
    }

    $('#board').show();
    $(".cell-apart").hide();
  });


  $(".cell").on("click",function(){
    playerClick(this);
    checkBoard(boardState, winCombination);
    console.log(freeMoves);

  });
});


function playerClick(cellId){
    $(cellId).html(playerSelect);
    boardState[$(cellId).attr('id')] = $(cellId).html();

    var compCellId = compMove(boardState, winCombination);

    $("#" + compCellId + "").html(compSelect);
    boardState[compCellId] = compCellId;

    var a = compMove(boardState, winCombination);
    console.log(a);
}

function checkBoard(boardState, winCombination){
  freeMoves = [];
  for(var i = 0; i < winCombination.length; i++){
    if((boardState[winCombination[i][0]] == boardState[winCombination[i][1]]) && ( boardState[winCombination[i][1]] == boardState[winCombination[i][2]]) && (boardState[winCombination[i][0]] !== null)){
      $('#board').css('pointer-events', 'none');
      return 0;
    }
  }

  for(var i = 1; i <= 9; i++ ){
    if(boardState[i] === null){
      freeMoves.push(i);
    }
  }
}



function compMove(boardState, winCombination){
  //1
  for(var i=0; i < winCombination.length; i++){
    if((boardState[winCombination[i][0]] == boardState[winCombination[i][1]]) && (boardState[winCombination[i][1]] !== null) ){
      if( boardState[winCombination[i][2]] === null ){
        return winCombination[i][2];
      }
    }else if ((boardState[winCombination[i][1]] == boardState[winCombination[i][2]]) && (boardState[winCombination[i][2]] !== null)) {
      if(boardState[winCombination[i][0]] === null){
        return winCombination[i][0];
      }
    }else if ((boardState[winCombination[i][0]] == boardState[winCombination[i][2]]) && (boardState[winCombination[i][2]] !== null)) {
      if(boardState[winCombination[i][1]] === null){
        return winCombination[i][1];
      }
    }
  }

  //2
  if(boardState[5] === null){
    return winCombination[1][1];
  }

  //3
  return freeMoves[Math.floor((Math.random() * freeMoves.length))];

}
