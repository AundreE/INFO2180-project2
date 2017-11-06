
//Welcome to the 15 puzzle game
$(document).ready(function(){
  $("div div div").addClass("puzzlepiece");

    //time variables
    var startime=0;
    var timer;
    var totaltime=0;
    var bestime=0;
    var bestmoves=0;

    //positioning the background image
    var img1 = 0;
    var img2 = 0;
    
    //Positioning tile without image behind it
    var emptytile1 = 300;
    var emptytile2 = 300;

    //positioning divs in the puzzle area
    var top = parseInt($("#puzzlearea").css("top"));
    var left = parseInt($("#puzzlearea").css("left"));


  var tiles = document.getElementsByClassName("puzzlepiece");
  //positioning the background image on individual div

  for(var i=0; i < tiles.length; i++){    
    tiles[i].style.backgroundSize ="400px 400px";
    $(tiles[i]).css("background-position", img1+"px "+img2+"px");
    

    img1 -= 100;
    if(img1%400 == 0){ img2 -= 100; }

    //Positioning individual divs
    $(tiles[i]).css("top", left);
    $(tiles[i]).css("left", top);

    top += 100;

    if(i !=0 && (i+1)%4 == 0){ 
      left += 100; 
      top = parseInt($("#puzzlearea").css("top")); 
    }

    //***************BEHAVIOR DETAILS BELOW***************

    //When mouse hovers ovr tile that can be moved text is underlined and text and border changes color
    $(tiles[i]).on("mouseover", function(){
      if(ismovevalid(this)){ $(this).addClass("movablepiece"); }
    });

    //Once the cursor is no longer hovering over the square, its appearance reverts to original state
    $(tiles[i]).on("mouseleave", function(){
      $(this).removeClass("movablepiece");
    });

    //If tile is clicked it swaps spaces with blank tile 
    $(tiles[i]).on("click", function(){
      if(ismovevalid(this)){ swaptiles(this); }
    });
  }
  var sec=0;
  var moves=0;
  var timer = function(){
    var output =document.querySelector(".explanation");
    output.innerHTML="The time you took: " +sec+"Amount of moves: "+moves;
    sec++;

  }
  //Checking to see if tile has a blank tile as a neighbour
  var ismovevalid = function(piece){

    if(((parseInt($(piece).css("top")) - emptytile2 == 100 || parseInt($(piece).css("top")) - emptytile2 == -100) && parseInt($(piece).css("left")) - emptytile1 == 0)
      ||((parseInt($(piece).css("left")) - emptytile1 == 100 || parseInt($(piece).css("left")) - emptytile1 == -100) && parseInt($(piece).css("top")) - emptytile2 == 0)){
        return true;
      }

    else{ return false; }
  };

  //function that swaps tiles
  var swaptiles = function(move){
    var temptile1 = emptytile1;
    var temptile2 = emptytile2;

    emptytile2 = parseInt($(move).css("top"));
    emptytile1 = parseInt($(move).css("left"));

        $(move).css("top", temptile2);
    $(move).css("left", temptile1);
  };

    //Checking to see if current tile is  next to a blank tile before the move is done
  var movetile = function(){

    //store the tiles in an array
    var arr = []; 
    for(var i=0; i < tiles.length; i++){
      if (ismovevalid(tiles[i]) == true){
        arr.push(tiles[i]);
      }
    }

    //generate a random tile that is next to the blank tile
    var move = arr[Math.floor(Math.random() * arr.length)];

    //swaps the blank tile with the randomly generated tile
    swaptiles(move);

  };
  
  //when shuffle button is clicked tiles are rearranged randomly
  $("#shufflebutton").on("click", function(){
    //specifies the amount of times to move tile while shuffling
    times = Math.floor(Math.random() * 100);

    for(var i=0; i < times; i++){
      movetile();
    }
  });
});