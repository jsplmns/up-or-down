'use strict';

function Game() {
  var self = this;
  self.onGameOverCallback = null;
  self.score = 0;
  self.timeLeft = null;
  self.card = [1, 2, 5, 7, 8, 13, 6, 12, 3, 11, 4, 10, 9];
  self.step = null;
}

Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(
    ` <main id="site-main" class="game">

        <header id="site-header" class="header-bar">
          <div class="timer">
            <span class="label">Time left:</span><br>
            <span class="value"></span>
          </div>
          <div class="score">
            <span class="label">Score:</span><br>
            <span class="value">0</span>
          </div>
        </header>

        <div class="game-cards">
          <div class="currentCard">
            <div class="card">
              <span></span>
            </div>
          </div>
          <div class="buttons">
            <div class="actions">
              <button class="up">up</button>
              <button class="down">down</button>
            </div>
          </div>
          <div class="nextCard">
            <div class="card">
              <span></span>
            </div>
          </div>
        </div>

        <footer id="site-footer">
          <p>Step: <span class="step-no">1</span> / <span class="total-steps">51</span></p>
        </footer>

      </main>`
  );

  self.scoreElement = self.gameMain.querySelector('.score .value');
  self.timeLeftElement = self.gameMain.querySelector('.timer .value');
  
  self.currentCardElement = self.gameMain.querySelector('.currentCard .card');
  self.nextCardElement = self.gameMain.querySelector('.nextCard .card');

  self.buttonUpElement = self.gameMain.querySelector('.up');
  self.buttonDownElement = self.gameMain.querySelector('.down');

  self.stepNoElement = self.gameMain.querySelector('.step-no');
  self.totalStepsElement = self.gameMain.querySelector('.total-steps');


  document.body.appendChild(self.gameMain);

  self.showFirstCard()

}

Game.prototype.showFirstCard = function () {
  var self = this;

  self.totalStepsElement.innerText = self.card.length - 1;
  
  self.step = 0
  self.showCard();
  self.startTimer();
};

Game.prototype.triggerTimeout = function () {
  var self = this;

  self.score--;
  self.scoreElement.innerText = self.score;
  self.nextCard();
};

Game.prototype.nextCard = function () {
  var self = this;

  self.step++;

  if (self.step === self.card.length -1) {
    self.onGameOverCallback();
  } else {
    self.showCard();
    self.startTimer();
  }

};

Game.prototype.showCard = function () {
  var self = this;

  var currentCard = self.card[self.step];
  self.currentCardElement.innerText = currentCard;
  self.nextCardElement.innerText = '?';

  self.stepNoElement.innerText = self.step + 1;

  self.handleClickUp = function () {
    self.revealNumber(true);
  };

  self.buttonUpElement.addEventListener('click', self.handleClickUp);
  self.buttonUpElement.removeAttribute('disabled');

  self.handleClickDown = function () {
    self.revealNumber(false);
  }
  self.buttonDownElement.addEventListener('click', self.handleClickDown)
  self.buttonDownElement.removeAttribute('disabled');
};

Game.prototype.startTimer = function () {
  var self = this;

  self.timeLeft = 3;
  self.timeLeftElement.innerText = self.timeLeft;

  self.intervalID = window.setInterval(function() {
    self.timeLeft--;
    self.timeLeftElement.innerText = self.timeLeft;

    if (self.timeLeft === 0) {
      clearInterval(self.intervalID);
      self.triggerTimeout();
    }

  }, 1000);
};

Game.prototype.revealNumber = function (answerWasUp) {
  var self = this;

  clearInterval(self.intervalID);
  self.buttonUpElement.removeEventListener('click', self.handleClickUp);
  self.buttonUpElement.setAttribute('disabled', 'disabled');
  self.buttonDownElement.removeEventListener('click', self.handleClickDown);
  self.buttonDownElement.setAttribute('disabled', 'disabled');


  var currentCard = self.card[self.step];
  var nextCard = self.card[self.step +1];

  var className = '';
  
  if (answerWasUp && nextCard > currentCard) {
    self.score++;
    className = 'correct';
    console.log('score added & class correct added')
  } else if (answerWasUp && nextCard < currentCard) {
    self.score--;
    className = 'incorrect';
    console.log('score retracted & class incorrect added')
  } else if (!answerWasUp && nextCard < currentCard) {
    self.score++;
    className = 'correct';
    console.log('score added & class correct added')
  } else if (!answerWasUp && nextCard > currentCard) {
    self.score--;
    className = 'incorrect';
    console.log('score retracted & class incorrect added')
  }

  self.scoreElement.innerText = self.score

  self.nextCardElement.classList.add(className);
  self.nextCardElement.innerText = nextCard;

  setTimeout(function () {
    self.nextCardElement.classList.remove(className);
    self.nextCard();
  }, 2000);
};


Game.prototype.onOver = function (callback) {
  var self = this;
  
  self.onGameOverCallback = callback;
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameMain.remove();
};