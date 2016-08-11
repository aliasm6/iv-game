
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
  }

  for (let i = 1; i <= 4; i++) {

    game.load.image('orb' + i, 'images/orb/orb-' + i + '.png');

  }

}

// var hex;
var crystals
var cursors;
var rocks;
var orbs;
var orb1
var orb2
var orb3
var orb4

function create() {


  //Allows physics to exist
  game.physics.startSystem(Phaser.Physics.ARCADE);


  // creates rocks to be projected at player orb
  rocks = [];
  for (let i = 1; i < 7; i++)
   {
       var crystal = game.add.sprite(game.world.randomX, game.world.randomY, 'rock' + i);
       game.physics.enable(crystal, Phaser.Physics.ARCADE);
       crystal.anchor.setTo(0.5, 0.5);
       crystal.body.setSize(35,35, 15, 15 )


       rocks.push(crystal)
   }
   orbs = game.add.physicsGroup()

   game.physics.enable(crystal, Phaser.Physics.ARCADE);

   orbs.create(-130, -30, 'orb1')
   orbs.create(70, -30, 'orb2')
   orbs.create(-30, 70, 'orb3')
   orbs.create(-30, -130, 'orb4')
   orbs.x = 400;
   orbs.y = 300;

   for (let i = 0; i < orbs.children.length; i ++) {
     var orb = orbs.children[i];
     orb.body.immovable = true
     orb.body.setSize(38, 38, 19, 19)
   }

   console.log('!',orbs.children[0])






  // Allows for arrow keys to be used to control orbs
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {



    //crystal physics
    rocks.forEach(function (rock) {


      rock.body.angularVelocity = 100;

      var rand = Math.floor(Math.random() * 100);
      var direction = (rand >= 5) ? -1 : 1;
      var randSpeed = game.rnd.integerInRange(40, 200)


      if ( !rock.body.velocity.x && !rock.body.velocity.y ) {
        rock.body.velocity.x = rand * direction * 30;
        rock.body.velocity.y = rand * direction * 30;
        game.physics.arcade.moveToXY(
          rock, 400, 300, randSpeed
        );
      }

      if (rock.x < 0) {
          rock.x = game.width;
          game.physics.arcade.moveToXY(
            rock, 400, 300, randSpeed
          );
      } else if (rock.x > game.width) {
          rock.x = 0;
          game.physics.arcade.moveToXY(
            rock, 400, 300, randSpeed
          );
      }

      if (rock.y < 0) {
          rock.y = game.height;
          game.physics.arcade.moveToXY(
            rock, 400, 300, randSpeed
          );
      } else if (rock.y > game.height) {
          rock.y = 0;
          game.physics.arcade.moveToXY(
            rock, 400, 300, randSpeed
          );
      }
    })


    // orb control
    if (cursors.left.isDown)
    {
    orbs.rotation -= 0.06;

    }
    else if (cursors.right.isDown)
    {
      orbs.rotation += 0.06;


    }
    // else {
    //     // hex.body.angularVelocity = 0
    // }
    for (let i = 0; i < orbs.children.length; i++) {

      if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
      {
          // hex.body.angularVelocity = -50;
          // box.rotation -= 100
          // box.angle -= 20



      }
      else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
      {
          // hex.body.angularVelocity = 50;
      }
      else {
          orbs.children[i].body.angularVelocity = 0
      }
    }
    if (game.physics.arcade.collide(rocks, orbs)){
      console.log('boop')
    }


}

function render() {
  rocks.forEach(function(rock){
    game.debug.body(rock);
  })
  orbs.children.forEach(function(orb){
    game.debug.body(orb);

  })
  game.debug.spriteInfo(orbs.children[0], 32, 32)
  // game.debug.body(hex)
  // game.debug.body(rocks[0])
  // game.debug.body(orbs[0])
}



});
