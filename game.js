'use strict';

function Game() {


}

Game.prototype.start = function () {
  this.gameMain = buildDom(
    `<main>
      <h1>this is the game, lol</h1>
    </main>`
  ) 

  document.body.appendChild(this.gameMain);
}


Game.prototype.destroy = function () {
  this.gameMain.remove();
}