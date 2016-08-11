
$(document).on('ready', function() {
  console.log('sanity check!');
  // defines canvas width and height as well as functions to be used for game
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });


function preload() {
  // preloading player controlled hex
  game.load.image('hex', 'images/hexagon1.png');
  game.load.image('box','images/background/black.png')
  // preloading projectiles

  for (let i = 1; i <= 6; i++) {

    game.load.image('rock' + i, 'images/projectiles/rock-' + i + '.png');
    game.load.image('orb' + i, 'images/orbs/orb-' + i + '.png');
  }
}


var hex;
var crystals
var cursors;
var rocks;
var orbs;
var box;

function create() {


  //Allows physics to exist
  game.physics.startSystem(Phaser.Physics.ARCADE);


  // Creates Player Controlled Orbs
  hex = game.add.sprite(400, 300, 'hex');
  // allows for orbs to have physical body
  hex.enableBody = true;

  // // box to position orbs on
  // box = game.add.sprite(400, 300, 'box')
  // box.enableBody = true;
  // box.anchor.setTo(0.5, 0.5)
  // game.physics.enable(box, Phaser.Physics.ARCADE);


  // Anchors Orbs to Center
  hex.anchor.setTo(0.5, 0.5);
  game.physics.enable(hex, Phaser.Physics.ARCADE);
  // hex.body.setSize(42,42,50,0)

  // creates rocks to be projected at player orb
  rocks = [];
  for (let i = 1; i < 7; i++)
   {
       var crystal = game.add.sprite(game.world.randomX, game.world.randomY, 'rock' + i);
       game.physics.enable(crystal, Phaser.Physics.ARCADE);
       crystal.anchor.setTo(0.5, 0.5);
       rocks.push(crystal)
   }

  orbs = [];

  for (let i = 1; i<7; i++)
    {
      var sphere = game.add.sprite(0,0, 'orb' + i);
      game.physics.enable(sphere, Phaser.Physics.ARCADE);
      sphere.anchor.setTo(0.5, 0.5);
      orbs.push(sphere)
    }
  // orbs[1].alignIn(box, Phaser.BOTTOM);




  // Allows for arrow keys to be used to control orbs
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {


    hex.body.angularVelocity = 0;

    rocks.forEach(function (rock) {


      rock.body.angularVelocity = 100;

      var rand = Math.floor(Math.random() * 100);
      var direction = (rand >= 5) ? -1 : 1;



      if ( !rock.body.velocity.x && !rock.body.velocity.y ) {
        rock.body.velocity.x = rand * direction * 30;
        rock.body.velocity.y = rand * direction * 30;
        game.physics.arcade.moveToXY(
          rock, 400, 300
        );
      }

      if (rock.x < 0) {
          rock.x = game.width;
          game.physics.arcade.moveToXY(
            rock, 400, 300
          );
      } else if (rock.x > game.width) {
          rock.x = 0;
          game.physics.arcade.moveToXY(
            rock, 400, 300
          );
      }

      if (rock.y < 0) {
          rock.y = game.height;
          game.physics.arcade.moveToXY(
            rock, 400, 300
          );
      } else if (rock.y > game.height) {
          rock.y = 0;
          game.physics.arcade.moveToXY(
            rock, 400, 300
          );
      }
    })



    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        hex.body.angularVelocity = -50;
        // box.rotation -= 100
        // box.angle -= 20
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        hex.body.angularVelocity = 50;
    }
    else {
      hex.body.angularVelocity = 0
    }



}

function render() {
  // game.debug.body(hex)
  // game.debug.body(rocks[0])
  // game.debug.body(orbs[0])
}



});
