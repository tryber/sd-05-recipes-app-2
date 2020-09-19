function timerGame(history) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    history.push('/comidas');
  }, 30000);
}

module.exports = timerGame;
