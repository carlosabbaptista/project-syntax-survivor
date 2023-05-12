# Syntax Survivor

## Introduction

Syntax Survivor is a simple canvas-based game where a player navigates through a set of obstacles. The goal of the game is to collect the 'good' code blocks and avoid the 'bad' ones, allowing the player to test their knowledge of HTML, CSS and JavaScript syntax in a playful manner.

## Gameplay

The player character moves vertically and needs to collect 'good' code blocks to increase the score and avoid the 'bad' code blocks. The player starts with three lives, and if a 'bad' code block is collected a life is lost. If a 'good' code block goes off the screen, a life will also be lost.

### Instructions

The game instructions are as follows:

* Use the up and down arrow keys to move the player
* Collect code blocks with the correct syntax to gain points
* If you collect a block with the incorrect syntax, you lose a life
* If you miss block with the correct syntax, you lose a life
* The game is over when you lose all lives
* It's that simple! Click the button below to start the game

### Controls

* Use the ArrowUp key to move the player up.
* Use the ArrowDown key to move the player down.

## Sounds

The game features background music, as well as sounds for good and bad collisions, losing a life and when the game is over. Sounds can be toggled on and off during the game.

## Project Structure

The project is organized as follows:

* `index.html`: The main HTML file that displays the game in the browser.
* `styles.css`: Contains all the CSS styles used in the game.
* `game.js`: The main JavaScript file that contains the overall game logic, such as the game loop, event listeners for player input, and sound controls.
* `code-blocks.js`: This file contains the CodeBlock class which is used to create both "good" and "bad" code block obstacles in the game. 
* `player.js`: This file contains the Player class which is used to create the player instance.
* `/sounds`: This directory contains all the sound files used in the game.
* `/images`: This directory contains the image of the player used in the game.

The HTML file serves as the main structure for the game and includes three main sections: the start screen, the game screen, and the game-over screen. The CSS file defines the style of each of these three screens. The game.js file contains the main logic of the game. It manages the game loop, handles input from the player, tracks and updates the game state, and renders the game elements (player and obstacles) on the canvas. This file also controls the game's start, game over, and restart functionality, as well as the use of audio elements and how the collision detection logic works between the player and the code blocks. The file also includes comments to describe key sections in more detail.

## Play Syntax Survivor

[Play the game here](https://ollie-j-j.github.io/project-syntax-survivor/)