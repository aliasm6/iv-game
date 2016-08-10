// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  // defines canvas width and height as well as functions to be used for game
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// var crystalProperties = {
//   startingCrystals = 6;
//   maxCrystals = 15;
//   incrementCrystals = 2;
//   rock: { minVelocity: 50, maxVelocity: 150, minAngularVelocity: 0, maxAngularVelocity: 200, };
// }

function preload() {
  // preloading player controlled hex
  game.load.image('hex', 'images/hexagon1.png');

  // preloading projectiles

  for (let i = 1; i <= 6; i++) {

    game.load.image('rock' + i, 'images/projectiles/rock-' + i + '.png');
  }
}


var hex;
var crystals
var cursors;
var rocks;


function create() {
  //Allows physics to exist
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Creates Player Controlled Orbs
  hex = game.add.sprite(400, 300, 'hex');
  // allows for orbs to have physical body
  hex.enableBody = true;
  // Anchors Orbs to Center
  hex.anchor.setTo(0.5, 0.5);
  game.physics.enable(hex, Phaser.Physics.ARCADE);

  // creates rocks to be projected at player orb
  rocks = [];
  for (let i = 1; i < 7; i++)
   {
       var crystal = game.add.sprite(game.world.randomX, game.world.randomY, 'rock' + i);
       game.physics.enable(crystal, Phaser.Physics.ARCADE);
       crystal.anchor.setTo(0.5, 0.5);
       rocks.push(crystal)
   }






  // Allows for arrow keys to be used to control orbs
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {


    hex.body.angularVelocity = 0;
    rocks.forEach(function (rock) {
      rock.body.angularVelocity = 100;
      var rand = Math.floor(Math.random() * 10);
      var direction = (rand >= 5) ? -1 : 1;
      var direction1 = (rand >= 5) ? -1 : 1;

      if ( !rock.body.velocity.x && !rock.body.velocity.y ) {
        rock.body.velocity.x = rand * direction * 20;
        rock.body.velocity.y = rand * direction1 * 20;
      }

      if (rock.x < 0) {
          rock.x = game.width;
      } else if (rock.x > game.width) {
          rock.x = 0;
      }

      if (rock.y < 0) {
          rock.y = game.height;
      } else if (rock.y > game.height) {
          rock.y = 0;
      }
    })



    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        hex.body.angularVelocity -= 100;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        hex.body.angularVelocity += 100;
    }

    // crystals.body.angularCelocity
  // if (cursors.left.isDown)
  // {
  // hex.angle -= 5;
  // }
  // else if (cursors.right.isDown)
  // {
  //   hex.angle += 5;
  // }

  // crystals.rotation += .05
  // crystals.body.velocity.x = 0;
  // crystals.body.velocity.y = 0;
  // crystals.body.angularVelocity = 0;
  //
  // crystals.body.angularVelocity + 200;

  // crystals.body.angularVelocity -200

  // crystals.forEach(game.physics.arcade.moveToXY, 400, 300, game.physics.arcade, false, 200);


}



});
