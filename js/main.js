$(document).ready(function() {
  console.log("jquery runs!");

  // The Five Ships To Position and their value in number of consecutive cases.
  var ships = [
    {
      name: "carrier",
      value: 5
    },
    {
      name: "battleship",
      value: 4
   },
    {
      name: "cruiser",
      value: 3
   },
    {
      name: "submarine",
      value: 3
   },
    {
      name: "destroyer",
      value: 2
   }
 ];

 // The first player to play is the number 1
 var currentPlayer = 1;

 // The variable "currentShip" is to follow which ship the player has to position
 var currentShipIndex = 0;
 var currentShip = ships[currentShipIndex];

 // Creation of multiple audio
 var audioBackground = new Audio('./audio/Jarrod-Radnich-Pirates-Caribbean.mp3');
 var audioSplash = new Audio('./audio/splash.mp3');
 var audioTouched = new Audio('./audio/touched.mp3');

 // Creation of multiple global variable that will me modified during the game
 var player1 = {};
 var player2 = {};
 var thisPlayer = {};
 var otherPlayer = {};
 var thisPlayerShips = {};
 var otherPlayerShips = {};
 var player1name = "";
 var player2name = "";



 init();

  function init() {
    audioBackground.play();
    player1 = {
      // the positions the player choose for each ship
      shipsPositions: {
        // cases chosen indexes will be push on the corresponding array
        carrier: [],
        battleship:	[],
        cruiser: [],
        submarine: [],
        destroyer: []
      },
      // to save the score of each player
      score: 0
    }
    player2 = {
      shipsPositions: {
        carrier: [],
        battleship:	[],
        cruiser: [],
        submarine: [],
        destroyer: []
      },
      score: 0
    }
    // the initialisation make the current player be the first one again
    currentPlayer = 1;
    currentShipIndex = 0;
    currentShip = ships[currentShipIndex];
    thisPlayerShips = {};
    otherPlayerShips = {};
    player1name = "";
    player2name = "";
    $("#contentGame").remove();
    renderLandingPage();
  };

  // HTML content of LANDING PAGE
  function renderLandingPage() {
     var $contentLandingPage = $(`
        <div id='landing-page'>
          <h1 id='title-land'>BATTLESHIP - TWO PLAYER</h1>
          <h2 class='h2-land'>Instructions:</h2>
          <p class='instruc-land'>Each player secretly arranges five ships on their primary grid : a carrier, a battleship,
          a cruiser, a submarine and a destroyer. You can choose how and where your ships are arranged, either horizontally
          or vertically, but they can not overlap.<br/><br/>
          Be the first to find all the other player's ships! Good luck! </p>
          <div id="playersNames">
            <div class="playerNameInput">
              <label for="player1">PLAYER 1:</label><br/>
              <input type="text" name="player1" id="player1name" />
            </div>
            <div class="playerNameInput">
              <label for="player1">PLAYER 2:</label><br/>
              <input type="text" name="player2" id="player2name" />
            </div>
          </div>
          <button>LET'S<br/>PLAY</button>
        </div>
        `);
      $("body").append($contentLandingPage);
      goButton();
  };

  // GO BUTTON on LANDING PAGE - remove the landing page and adds calls the renderGamePage
  function goButton() {
    $("button").on("click", function(event) {
      player1name = document.querySelector("#player1name").value;
      player2name = document.querySelector("#player2name").value;
      $("#landing-page").remove();
      renderGamePagePrep();
    });
  }

  // GAME PAGE PREP - adds the page of preparation of the game, for the first player
  function renderGamePagePrep() {
    var $contentGamePrep = $(`<div id='contentGamePrep'></div>`);
    $('body').append($contentGamePrep);
    // calls the function which display the title of the page, with the current player
    var $titleGamePrep = $(`<h1 id='title-game-prep'><span class="currentPlayerNumber"></span>, POSITION YOUR SHIPS!</h1>`);
    $("#contentGamePrep").append($titleGamePrep);
    updateTitleGame();
    // calls the function which display the instruction with the current ship to place
    var $instrucGamePrep = $(`<div class='instruc-game-prep'>Position your <span class="currentShipName"></span>, clicking on <span class="currentShipValue"></span> consecutive cases !</div>`);
    $("#contentGamePrep").append($instrucGamePrep);
    updateInstrucGamePrep();
    // create the board in which the current player will position his ships
    renderBoard("#contentGamePrep", false);
    // create the paragraph that displays all the ships to place
    shipToPlace();
  };

        function updateTitleGame() {
          if (currentPlayer === 1) {
            if (player1name !== "") {
              currentPlayerName = player1name.toUpperCase();
            } else {
              currentPlayerName = "PLAYER 1";
            }
          } else {
            if (player2name !== "") {
              currentPlayerName = player2name.toUpperCase();
            } else {
              currentPlayerName = "PLAYER 2";
            }
          }
          $(".currentPlayerNumber").text(currentPlayerName);
        }

        function updateInstrucGamePrep() {
          if (currentShip !== undefined) {
            $(".currentShipName").text(currentShip.name);
            $(".currentShipValue").text(currentShip.value);
          }
        }

        function renderBoard(contentPage, choiceShipsPositionEvent, classBoardAndGrid) {
            var $board = $(`<div class='board boardGame${classBoardAndGrid}'></div>`);
            $(`${contentPage}`).append($board);
            var $grid = $(`<div class='grid gridGame${classBoardAndGrid}'></div>`);
            $board.append($grid);
            for (var i = -1; i < 10; i ++) {
              var $line = $("<div class='line'></div>");
              $grid.append($line);
              for (var j = -1; j < 10; j++) {
                var $case = $(`<div class='case' id=${i}${j}></div>`);
                $line.append($case);
                if (($case.attr('id').charAt(0) === "-") && ($case.attr('id').charAt(2) === "-")){
                  $case.addClass("to-hide");
                } else if ($case.attr('id').charAt(0) === "-") {
                  $case.addClass("first-line");
                } else if ($case.attr('id').charAt(1) === "-") {
                  $case.addClass("first-column");
                } else {
                  $case.addClass("case-to-click");
                }
              }
              var alphabet = "ABCDEFGHIJ".split("");
              $.each($(`.boardGame${classBoardAndGrid} .first-line`), function(index,value) {
                // $(value).append($(`<span class="textCase">${alphabet[index]}</span>`));
                $(value).text(alphabet[index]);
              });
              $.each($(`.boardGame${classBoardAndGrid} .first-column`), function(index,value) {
                $(value).text(index+1);
              });
            };

            if (choiceShipsPositionEvent !== true) {
            $(".case-to-click").on("click", function choiceShipsPosition(event) {
                // color their background
                $(this).css("background-color", "rgb(90,105,124)");
                var $idClickedCase = $(this).attr("id");
                // add their id to the array corresponding on the ship of the current player object.
                  if (currentPlayer === 1 ) {
                    player1.shipsPositions[currentShip.name].push($idClickedCase);
                    if (player1.shipsPositions[currentShip.name].length >= currentShip.value) {
                      currentShipIndex++;
                      currentShip = ships[currentShipIndex];
                      updateInstrucGamePrep();
                      updateStyleShipToPlace();
                    }
                    if (currentShip === undefined) {
                      switchCurrentPlayer();
                      currentShipIndex = 0;
                      currentShip = ships[currentShipIndex];
                      setTimeout(function() {
                        $($board).remove();
                        renderBoard("#contentGamePrep", false);
                        updateTitleGame();
                        updateInstrucGamePrep();
                        shipToPlace();}
                      ,500);
                    }
                  } else if (currentPlayer === 2 ) {
                    player2.shipsPositions[currentShip.name].push($idClickedCase);
                    if (player2.shipsPositions[currentShip.name].length >= currentShip.value) {
                      currentShipIndex++;
                      currentShip = ships[currentShipIndex];
                      updateInstrucGamePrep();
                      updateStyleShipToPlace();
                    }
                    if (currentShip === undefined) {
                      currentShipIndex = 0;
                      currentShip = ships[currentShipIndex];
                      setTimeout(function() {
                        $("#contentGamePrep").remove();
                        renderGamePage();}
                      ,500);
                    }
                  }
                // remove the event listener on the case clicked
                $(this).off("click", choiceShipsPosition);
            });
            }
          };

        function shipToPlace() {
          var $shipsToPlace = $("<div id='shipsToPlace'></div>");
          ships.forEach(function(ship) {
            var $currentShipToPlace = $(`<p class="shipToPlace ${ship.name}">${ship.name.toUpperCase()}: ${ship.value} cases</p>`);
            $shipsToPlace.append($currentShipToPlace);
          });
          $(".board").append($shipsToPlace);
          updateStyleShipToPlace();
        };
              function updateStyleShipToPlace() {
                if (currentShip !== undefined) {
                  $(`.shipToPlace`).css("color", "black");
                  $(`.shipToPlace.${currentShip.name}`).css("color", "white");
                }
              }

  function renderGamePage() {
    var $contentGame = $(`<div id='contentGame'></div>`);
    $('body').append($contentGame);
    // calls the function which display the title of the page, with the current player
    var $titleGame = $(`<h1 id='title-game'><span class="currentPlayerNumber"></span>, YOUR TURN!</h1>`);
    $("#contentGame").append($titleGame);
    // calls the function which display the instruction with the current ship to place
    var $instrucGame = $(`<div class='instruc-game'>Click on a case to attempt to find the other's ships!</div>`);
    $("#contentGame").append($instrucGame);
    // create the board in which the current player will position his ships
    switchBoard();
  };

        function switchBoard() {
          switchCurrentPlayer();
          // define the current player and the other player
          if (currentPlayer === 1) {
            var otherPlayer = 2;
          } else {
            var otherPlayer = 1;
          }
          // if the div with the class "boardGame"+currentPlayer does not exist yet, create board
          // if not, toggle the visibility of the 2 boards
          if ($(".boardGame"+currentPlayer).length === 0) {
              // if none of element has the "board" class, create the board
              // if not, tootle the board which already exist, and create another one for the second player
              if ($(".board").length === 0) {
                renderBoard("#contentGame", true, currentPlayer);
                eventOnClickedCase("boardGame"+currentPlayer);
              } else {
                $(".boardGame"+otherPlayer).toggle();
                renderBoard("#contentGame", true, currentPlayer);
                eventOnClickedCase("boardGame"+currentPlayer);
              }
            // update the title with the current player
            updateTitleGame();

          } else {
            $(".boardGame"+otherPlayer).toggle();
            $(".boardGame"+currentPlayer).toggle();
            updateTitleGame();
          }
        }

        function eventOnClickedCase(boardOfCase) {
          $(`.${boardOfCase} .case`).on("click", function isTouched(event) {
            // switch board 2 seconds after the click, so the player has time to see if he touched a ship or not
            setTimeout(switchBoard, 1000);
            // get the id of the case clicked
            var $idClickedCase = $(this).attr("id");
            // define which array is the current player's and which one is the other's
            if (currentPlayer === 1) {
              thisPlayer = player1;
              thisPlayerShips = player1.shipsPositions ;
              otherPlayer = player2;
              otherPlayerShips = player2.shipsPositions ;
            } else {
              thisPlayer = player2;
              thisPlayerShips = player2.shipsPositions ;
              otherPlayer = player1;
              otherPlayerShips = player1.shipsPositions ;
            }

            // check each ship of the other player's object of saved position
            // if the ID of the case clicked is in one of the array, add "touched" and splice it from the array
              // if the array is empty, the ship is hit and sunk
                // if the object if empaty, all the ships are hit and sunk : the player wins
            // else, add the class "splash"
            for (var j = 0 in otherPlayerShips) {
              for (var i = 0; i < otherPlayerShips[j].length; i ++) {
                if (otherPlayerShips[j][i] === $idClickedCase) {
                $(event.target).addClass("touched");
                audioTouched.play();
                otherPlayerShips[j].splice(otherPlayerShips[j].indexOf($idClickedCase),1);
                if ( otherPlayerShips[j].length === 0 ) {
                  alert(`${j.toUpperCase()} HIT AND SUNK!`);
                  delete otherPlayerShips[j];
                  console.log(otherPlayerShips);
                  if (jQuery.isEmptyObject(otherPlayerShips) === true) {
                    alert(currentPlayerName+ " WINS!");
                    var restart = prompt("Do you want to restart? Y/N");
                    while ((restart.toUpperCase() !== "Y") && (restart.toUpperCase() !== "N")) {
                      alert("Sorry, I did not understand.")
                      restart = prompt("Do you want to restart? Y/N");
                    }
                    if (restart.toUpperCase() === "Y") {
                      init();
                    } else if (restart.toUpperCase() === "N") {
                      alert("Too bad... Goodbye!")
                    }
                  }
                }
                break;
                }
              }
            }
            if (!$(event.target).hasClass("touched")) {
              $(event.target).addClass("splash");
              audioSplash.play();
            }

          }) // close event listener
        }; // close the function eventOnClickedCase()


            // switch the current player
              function switchCurrentPlayer() {
                if (currentPlayer === 1) {
                  currentPlayer = 2;
                } else {
                  currentPlayer = 1;
                }
              }

});


// Obliger un placement de bateaux avec des cases consécutives
// Ajouter des noms
// Local Storage : compter le nombre de points en fonction des joueurs
