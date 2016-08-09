// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');

  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  for (let i = 1; i <= 6; i++) {
    game.load.image('orb' + i, 'images/orbs/orb-' + i + '.png');
    game.load.image('rock' + i, 'images/projectiles/rock-' + i + '.png');
  }
}

var obs
var orb1;
var orb2;
var orb3;
var cursors;

function create() {

    orbs = game.add.group()

    orbs.create(0, 0, 'orb1')
    orbs.create(20,20, 'orb2')
    orbs.create(30,30, 'orb3')

    orbs.x = 400;
    orbs.y = 300;
    // orbs.pivot.x = 100;

    // orb1.pivot.y = 100;

    // orb1 = game.add.sprite(400, 300, 'orb1');
    // orb1.anchor.setTo(-0.5, 0.5);
    //
    // orb1.pivot.y = 0;

    // orb1.anchor.setTo(1);
    // orb1.pivot.x = 100;
    // orb1.pivot.y = 100;

    // orb2 = game.add.sprite(400, 200, 'orb2');
    // orb2.anchor.setTo(.05);
    // orb2.pivot.x = 100;
    // orb2.pivot.y = 100;



    // orb.pivot.y = 100;
  // game.add.sprite( 350, 300, 'orb1');
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  if (cursors.left.isDown)
  {
  orbs.rotation += 0.05;
  // orb2.rotation += 0.05;
  }
  else if (cursors.right.isDown)
  {
    orbs.rotation -= 0.05;
    // orb2.rotation -= 0.05;
  }
}
});
