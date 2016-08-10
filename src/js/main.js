// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  // defines canvas width and height as well as functions to be used for game
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  // preloading player controlled hex
  game.load.image('hex', 'images/hexagon1.png');

  // preloading projectiles
  for (let i = 1; i <= 6; i++) {

    game.load.image('rock' + i, 'images/projectiles/rock-' + i + '.png');
  }
}


var hex;
var crystal
var cursors;

function create() {
  //Allows physics to exist
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Creates Player Controlled Orbs
  hex = game.add.sprite(400, 300, 'hex');
  // allows for orbs to have physical body
  hex.enableBody = true;
  // Anchors Orbs to Center
  hex.anchor.setTo(0.5, 0.5);

  // Creates group for projectiles
  crystals = game.add.group();
  crystals.enableBody = true;
  crystals.create(0,0, 'rock1');

  for (let i = 1; i < 7; i++)
   {
       let crystal = crystals.create(game.world.randomX, game.world.randomY, 'rock' + i);
   }

  // Allows for arrow keys to be used to control orbs
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {

  if (cursors.left.isDown)
  {
  hex.angle -= 5;
  }
  else if (cursors.right.isDown)
  {
    hex.angle += 5;
  }

  // crystals.forEach(game.physics.arcade.moveToXY, 400, 300, game.physics.arcade, false, 200);


}



});
