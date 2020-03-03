let failedTries = 0;
const min = 1;
const max = 10;

const guessButton = document.getElementById('guess-btn');
const messageParagraph = document.querySelector('.message');
let randomNumber = getRandomNumber(min, max);

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
};

guessButton.addEventListener('click', submitNumber);

function submitNumber() {
  let guessInput = document.getElementById('guess-input').value;

  if (guessInput < min || guessInput > max) {
    showError('Enter number from ' + min + ' to ' + max);
    return;
  }
  
  if (randomNumber != guessInput) {
    failedTries += 1;   
    if (failedTries < 3) {
      messageParagraph.innerHTML = 'The numbers are not the same. Keep guessing. You still have ' + (3 - failedTries) + ' tries';
      document.getElementById('guess-input').className = 'form-control border border-danger';
      messageParagraph.className = 'text-danger';
    } else {
      messageParagraph.innerHTML = 'You lose. Do You want play again?';
      document.getElementById('guess-input').className = 'form-control border border-danger';
      messageParagraph.className = 'text-danger';
      refreshGame();
    }
  } else {    
    messageParagraph.innerHTML = 'You win, the numbers are the same. Do You want play again?';
    document.getElementById('guess-input').className = 'form-control border border-success';
    messageParagraph.className = 'text-success'
    refreshGame();
  }
}

function showError(error) {  
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);  
  setTimeout(removeError, 5000);
}

function removeError() {
  document.querySelector('.alert').remove();
}

function refreshGame() {
  guessButton.value = 'Refresh';
  guessButton.className = 'refresh-button input-group-text';
  const refreshButton = document.querySelector('.refresh-button');
  const refreshPage = () => {
    location.reload();
  }
  refreshButton.addEventListener('click', refreshPage);
}