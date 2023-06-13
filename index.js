const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 1
const backgroundmusic = new Audio('audio/music.mp3')

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

const shop = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
})

const player = new Fighter({
  position: {
    x: 270,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    idle2: {
      imageSrc: './img/samuraiMack/Idle2.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    run2: {
      imageSrc: './img/samuraiMack/Run2.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 6
    },
    attack2: {
      imageSrc: './img/samuraiMack/Attack2.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4
      
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 110,
    height: 50
  },
  attackBox2: {
    offset: {
      x: -130,
      y: 50
    },
    width: 110,
    height: 50
  }
})

const enemy = new Fighter({
  position: {
    x: 690,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    idle2: {
      imageSrc: './img/kenji/Idle2.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    run2: {
      imageSrc: './img/kenji/Run2.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    attack2: {
      imageSrc: './img/kenji/Attack2.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -120,
      y: 50
    },
    width: 100,
    height: 50
  },
  attackBox2: {
    offset: {
      x: 100,
      y: 50
    },
    width: 100,
    height: 50
  }
})

console.log(player)
console.log(enemy)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  Space: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.30 )'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0


 
  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    if (player.position.x > 0) {
      player.velocity.x = -5
      player.switchSprite('run2')
    } else {
      player.velocity.x = 0 // prevent player from moving left
    }
  } else if (keys.d.pressed && player.lastKey === 'd') {
    if (player.position.x < canvas.width - player.width) {
      player.velocity.x = 5
      player.switchSprite('run')
    } else {
      player.velocity.x = 0 // prevent player from moving right
    }
  } else if (player.lastKey === 'd'){
    player.switchSprite('idle2')
  } else if (player.lastKey === 'a'){
    player.switchSprite('idle')
  } else {
    player.switchSprite('idle2')
  }

  // jumping Player
 if (player.velocity.y < 0) {
  if (player.position.y > 0) {
    player.switchSprite('jump')
  } else {
    player.velocity.y = 0 // prevent player from jumping higher
  }
} else if (player.velocity.y > 0) {
  if (player.position.y < canvas.height - player.height) {
    player.switchSprite('fall')
  } else {
    player.velocity.y = 0 // prevent player from falling through the bottom
  }
}

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    if (enemy.position.x > 0) {
      enemy.velocity.x = -5
      enemy.switchSprite('run')
    } else {
      enemy.velocity.x = 0 // prevent enemy from moving left
    }
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    if (enemy.position.x < canvas.width - enemy.width) {
      enemy.velocity.x = 5
      enemy.switchSprite('run2')
    } else {
      enemy.velocity.x = 0 // prevent enemy from moving right
    }
  } else if (enemy.lastKey === 'ArrowRight'){
    enemy.switchSprite('idle2')
  } else if (enemy.lastKey === 'ArrowLeft'){
    enemy.switchSprite('idle')
  } else {
    enemy.switchSprite('idle')
  }

  // jumping Enemy
  if (enemy.velocity.y < 0) {
    if (enemy.position.y > 0) {
      enemy.switchSprite('jump')
    } else {
      enemy.velocity.y = 0 // prevent enemy from jumping higher
    }
  } else if (enemy.velocity.y > 0) {
    if (enemy.position.y < canvas.height - enemy.height) {
      enemy.switchSprite('fall')
    } else {
      enemy.velocity.y = 0 // prevent enemy from falling through the bottom
    }
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
    
    
  }
   
  

  // check if enemy is dead and switch spirit to idle if so 
  //if (enemy.dead && enemy.currentSprite !== 'idle') {
  //  enemy.switchSprite('idle');
  //} 

  //Playing the Background Music 
  backgroundmusic.loop = true;
  backgroundmusic.volume = 0.3;  //Music Volume
  backgroundmusic.play();

  //For Testing In Browser
  //console.log(player)
  //console.log(enemy)
}


animate()




window.addEventListener('keydown', (event) => {
  if (enemy.health <= 0 || player.health <= 0 || player.health === enemy.health < 100) {
    switch (event.key) {
      case 'r':
        player.health = 100;
        enemy.health = 100;  
        gsap.to('#playerHealth', {
          width: player.health + '%'})
        gsap.to('#enemyHealth', {
          width: enemy.health + '%'})
        player.position.x = 270;
        player.position.y = 0;
        enemy.position.x = 690;
        enemy.position.y = 100;
       
        player.switchSprite('idle')
        enemy.switchSprite('idle2')
         
        clearInterval(timerId);
        decreaseTimer();
        timer = 180;
        document.querySelector('#displayText').innerHTML = ''
        document.querySelector('#displayText2').innerHTML = ''
        document.querySelector('#displayText3').innerHTML = ''
        gameEnded = false
           
        break
    }
  }


  if (gameEnded === true) {
    return;
  }

  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -20
        break
      case ' ':
        keys.Space.pressed = true
        player.attackplayer()
        break
      
    
    }
  }
  
  
  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        enemy.velocity.y = -20
        break
      case 'ArrowDown':
        enemy.attackenemy()
        keys.ArrowDown.pressed = true
        break
    }
  }

})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})
