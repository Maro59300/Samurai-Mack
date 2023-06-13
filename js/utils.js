function rectangularCollision({ rectangle1, rectangle2 }) {
    if (rectangle1.lastKey === 'd' || rectangle1.lastKey === 'ArrowLeft') {
      return(rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
  }
    else {
      return(rectangle1.attackBox2.position.x + rectangle1.attackBox2.width >=
    rectangle2.position.x &&
     rectangle1.attackBox2.position.x <=
    rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox2.position.y + rectangle1.attackBox2.height >=
    rectangle2.position.y &&
      rectangle1.attackBox2.position.y <= rectangle2.position.y + rectangle2.height)
    }

  
}
let gameEnded = false
function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  document.querySelector('#displayText2').style.display = 'flex'
  document.querySelector('#displayText3').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = ' Tie'
    document.querySelector('#displayText2').innerHTML = 'To Restart'
    document.querySelector('#displayText3').innerHTML = 'Press R'
    gameEnded = true
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = ' Mack Wins'
    document.querySelector('#displayText2').innerHTML = 'To Restart'
    document.querySelector('#displayText3').innerHTML = 'Press R'
    gameEnded = true
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = ' Kenji Wins'
    document.querySelector('#displayText2').innerHTML = 'To Restart'
    document.querySelector('#displayText3').innerHTML = 'Press R'
    gameEnded = true
  }
  

  
}




let timer = 180  // Timer in Seconds Start Time
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}

