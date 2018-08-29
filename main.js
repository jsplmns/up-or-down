'use strict';


function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  // --- SPLASH ---

  var splashMain;
  var gameOverMain;
  
  var game;


  // create Splash

  function buildSplash() {
    splashMain = buildDom(
      `<main class="start-screen">
        <h1>up or down</h1>
        <button>Start</button>
      </main>`
    );
    
    // input "main" on body in HTML
    document.body.appendChild(splashMain);

    // adding function to Start Button
    var button = document.querySelector('button');
    button.addEventListener('click', startGame);
  }

  // destroy Splash

  function destroySplash() {
    splashMain.remove();
  }

  // --- GAME ---

  function startGame() {
    destroySplash();
    destroyGameOver();

    // temporary

    game = new Game();
    game.start();
    game.onOver(function () {
      gameOver(game.score);
    });

  }

  function destroyGame() {
    game.destroy();
  }

  



  // --- GAME OVER ---

    // show score and button

  function gameOver(score) {
    destroyGame();
    buildGameOver(score);
  }
  

  function buildGameOver(score) {
    gameOverMain = buildDom(
      `<main class="end-screen">
        <h1>game over!!!</h1>
        <p>Your score was ` + score +`</p>
        <button>Restart</button>
      </main>`
    );

    document.body.appendChild(gameOverMain);

    var button = document.querySelector('button');
    button.addEventListener('click', startGame);

  }

  function destroyGameOver() {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  // --- INITIALIZE GAME ---

  buildSplash();

}

window.addEventListener('load', main);