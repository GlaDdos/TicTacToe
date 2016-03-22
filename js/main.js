var playerSelect  = "";
var compSelect    = "";
var playerScore   = 0;
var drawScore     = 0;
var compScore     = 0;
var freeMoves     = [];

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

    checkBoard(boardState, winCombination);

    $(".cell-apart").hide();
  });


  $(".cell").on("click",function(){
    if(playerClick(this) === true || compClick() === true){
      setTimeout(reset, 1000);
      return 0;
    }


  });
});


function playerClick(cellId){
    $(cellId).html(playerSelect);
    boardState[$(cellId).attr('id')] = $(cellId).html();
    $(cellId).css('pointer-events', 'none');
    if(checkBoard(boardState, winCombination)){
      return true;
    }
}

function compClick(){

  var compCellId = compMove(boardState, winCombination);

  $("#" + compCellId + "")
    .html(compSelect)
    .css('pointer-events', 'none');

  boardState[compCellId] = compSelect;
  if(checkBoard(boardState, winCombination)){
    return true;
  }

}

function checkBoard(boardState, winCombination){
  freeMoves = [];
  for(var i = 0; i < winCombination.length; i++){
    if((boardState[winCombination[i][0]] == boardState[winCombination[i][1]]) && ( boardState[winCombination[i][1]] == boardState[winCombination[i][2]]) && (boardState[winCombination[i][0]] !== null)){
      $('#board').css('pointer-events', 'none');

      if(boardState[winCombination[i][0]] == playerSelect){
        playerScore++;

        $('#' + winCombination[i][0] + ', #' + winCombination[i][1] + ', #' + winCombination[i][2]).toggleClass('cell-blink-green');

        setTimeout(function(){
          $('#' + winCombination[i][0] + ', #' + winCombination[i][1] + ', #' + winCombination[i][2]).toggleClass('cell-blink-green');
        }, 700);


      }else {
        compScore++;
        $('#' + winCombination[i][0] + ', #' + winCombination[i][1] + ', #' + winCombination[i][2]).toggleClass('cell-blink-red');

        setTimeout(function(){
          $('#' + winCombination[i][0] + ', #' + winCombination[i][1] + ', #' + winCombination[i][2]).toggleClass('cell-blink-red');
        }, 700);


      }

      $('#score').html(
        "<p>Won: "  + playerScore    + '&emsp14;' +
         "Draw: "   + drawScore      + '&emsp14;' +
         "Lost: "   + compScore      + '&emsp14;' +
         "</p>"
      );
      return true;
    }
  }

  for(var i = 1; i <= 9; i++ ){
    if(boardState[i] === null){
      freeMoves.push(i);
    }
  }

  if (freeMoves.length < 1) {
    drawScore++;

    $('#score').html(
      "<p>Won: "  + playerScore    + '&emsp14;' +
       "Draw: "   + drawScore      + '&emsp14;' +
       "Lost: "   + compScore      + '&emsp14;' +
       "</p>"
    );

    return true;
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

function reset(){
  boardState = {
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

  $('button')
  .html("")
  .css('pointer-events', 'all');
  checkBoard(boardState, winCombination);
}
