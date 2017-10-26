# Yveline's 1st projet - BATTLESHIP

## Link to the repo
https://git.generalassemb.ly/yvln-ga/project1-battleship

## Explanations of the technologies used
- HTML : for the head of the document
- CSS : to style my elements
- JS and jQuery : to create, append and manipulate the elements with the DOM

## Wireframes
- Landing page: https://wireframe.cc/mIvng4
- Game preparation page: https://wireframe.cc/Ijh5Pe
- Game page: https://wireframe.cc/gk2oCl

## The approach taken
1. Creation of the landing page
2. Creation of 2 game preparation pages
  a. Creation of a first board, to make the first player position his ships
    i. Assign an id to each case of the board
    ii. Save the id of the case chosen in an array dedicated to this player
  b. Creation of a second board, with the same properties than the first board but with no data
    i. Save the id of the case chosen in another array dedicated to this player.
3. Creation of 2 game pages
  a Creation of a third board, which is the 1st player game board
    i. Compare the id of the clicked case to all the elements of the array created by the other player
    ii. If there is a match, splice it from the array, add a class "touched" and off the click
    iii. If not, add a class "splash" and off the click too
    After each click :
    i. Switch boards
    ii. Or create a new one if the board does not exist yet, with the same properties than the previous one
    iii. Check if one of the array is empty. If yet, the player wins.
4. Manage events and functions to create boards, switch boards and switch players, updaate the text and the titles.

## Installation instructions
Just click on https://git.generalassemb.ly/pages/yvln-ga/project1-battleship/

## Unsolved problems
- The cases that are chosen to position the ships need to be consecutive for each ship. My game does not block the other cells and they  can be chosen too. Please play as the original game.
- There is a setTimeOut function after each player click to touch the other's board game. Within this time, the player can still click on other cases, and it makes him play multiple times in one turn. I know this is tempting, but please refrain yourself from cheating!

## Other useful information

### Rules
- Each player secretly arranges five ships on their primary grid : A carrier, a battleship, a cruiser, a submarine and a destroyer.
- Each ship occupies a number of consecutive squares on the grid.
- Players can choose how and where their ships are arranged, either horizontally or vertically, but they can not overlap!

### Game Play:
Each participant attempts to sink all of the other player's ones, by choosing one case on a grid at each turn.

### Win condition:
The first player to have found the other player's all cases of all ships wins

### MVP
- 2 different game boards
- Each player positions their ships
- Each player take turns trying to sink each others' ships
- First player to sink all the other player's ships wins.
