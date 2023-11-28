# Project: Battleship

## Live Demo 👉 [Battleships](curveservices.github.io/battleships)

## PC View 👇

<img width="741" alt="Screenshot 2023-11-28 at 16 05 59" src="https://github.com/curveservices/battleships/assets/101556296/bfe68ecc-996c-4bda-ae7f-22ff3f4deacd">

## Overview

[Project]() has been set as part of [The Odin Project](https://www.theodinproject.com/) Project: Battleship. A classic game of Battleships using Jest TDD

## Assets

- [Battle ship rules](<https://en.wikipedia.org/wiki/Battleship_(game)>)
- [Play here](http://en.battleship-game.org/)

## Obejective

1. Begin by creating the Ship class/factory.

- ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.
- test your object’s public interface. Only methods or properties that are used outside of ‘ship’ object need unit tests.
- Ships should have a hit() function that increases the number of ‘hits’ in your ship.
- isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

2. Create Gameboard class/factory.

- run tests to see that code is coming together. DO not create a UI at first so no DOM methods or console.log
- Gameboard should be able to place ships at specific coordinates by calling the ship factory function.
- Gameboard should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
- Gameboards should keep track of missed attacks so they can display them properly.
- Gameboards should be able to report whether or not all of their ships have been sunk.

3. Create Player.

- Players can take turns playing the game by attacking the enemy Gameboard.
- The game is played against the computer, so make the ‘computer’ capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice).

4. Create the main game loop and a module for DOM interaction.

- At this point it is appropriate to begin crafting your User Interface.
- The game loop should set up a new game by creating Players and Gameboards. For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
- We’ll leave the HTML implementation up to you for now, but you should display both the player’s boards and render them using information from the Gameboard class/factory.
  You need methods to render the gameboards and to take user input for attacking. For attacks, let the user click on a coordinate in the enemy Gameboard.
- The game loop should step through the game turn by turn using only methods from other objects. If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.
- Create conditions so that the game ends once one player’s ships have all been sunk. This function is appropriate for the Game module.

5. Finish it up

- There are several options available for letting users place their ships. You can let them type coordinates for each ship, or investigate implementing drag and drop.
- You can polish the intelligence of the computer player by having it try adjacent slots after getting a ‘hit’.
- Optionally, create a 2 player option that lets users take turns by passing the device back and forth. If you’re going to go this route, make sure the game is playable on a mobile screen and implement a ‘pass device’ screen so that players don’t see each others boards!

## Extra

## Languages & Tools

<a href="https://javascript.info/">
    <img width="100" alt="Javascript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" /></a> 
<a href="https://html.com/html5/">
    <img width="100" alt="HTML5" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" /></a> 
<a href="https://css3.com/">
    <img width="100" alt="CSS3" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" /></a> 
<a href="https://git-scm.com/">
    <img width="100" alt="GIT" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" /></a>
<a href="https://webpack.js.org/">
    <img width="100" alt="Webpack"src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" /></a>
<a href="https://jestjs.io/">
    <img width="100" alt="jest" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" /></a>

**_<a href="https://twitter.com/Crypto_Rozla"> Rozla-Dev </a> 28-11-2023_**

[Back to top 👆](#project-battleship)
