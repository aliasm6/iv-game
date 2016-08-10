// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('hex', 'images/hexagon1.png');
  for (let i = 1; i <= 6; i++) {
    
    game.load.image('rock' + i, 'images/projectiles/rock-' + i + '.png');
  }
}


var hex;
var cursors;

function create() {

    hex = game.add.sprite(400, 300, 'hex')
    hex.anchor.setTo(0.5, 0.5);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown)
  {
  hex.angle -= 5;

  // orb2.rotation += 0.05;
  }
  else if (cursors.right.isDown)
  {
    hex.angle += 5;

    // orb2.rotation -= 0.05;
  }
}



});
