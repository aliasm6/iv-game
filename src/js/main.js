
// $(document).on('ready', function() {
  console.log('sanity check!');

  // defines canvas width and height as well as functions to be used for game
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render:render
  });


function preload() {
  //preloads background
  loadBackground()
  //preloads images for orb and rock sprites
  loadSprites('rock', 'images/projectiles/rock-', '.png', 6)
  loadSprites('orb', 'images/orb/orb-', '.png', 4)
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
  initializePhysics()
  //createsRocks and enables physics to be imposed on them
  createRocks()



   orbs = game.add.physicsGroup()

  //  game.physics.enable(crystal, Phaser.Physics.ARCADE);

   orbs.create(0, -115, 'orb1')
   orbs.create(-115, 0, 'orb2')
   orbs.create(0, 115, 'orb3')
   orbs.create(115, 0, 'orb4')
   orbs.x = 350
   orbs.y = 250
  //  orbs.children[0].pivot.x = 100

   for (let i = 0; i < orbs.children.length; i ++) {
     var orb = orbs.children[i];
     orb.body.immovable = true
     orb.body.setSize(30, 30, 25, 25)

   }

   console.log('!',orbs.children[0])
   console.log(orbs.children[0].x)



   //  Text
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '25px Helvetica', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;


  // Allows for arrow keys to be used to control orbs
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {



    //crystal physics
    rocks.forEach(function (rock) {


      rock.body.angularVelocity = 100;

      var rand = Math.floor(Math.random() * 10);
      var direction = (rand >= 5) ? -1 : 1;
      var randSpeed = game.rnd.integerInRange(50, 100)


      if ( !rock.body.velocity.x && !rock.body.velocity.y ) {
        rock.body.velocity.x = rand * direction * 30;
        rock.body.velocity.y = rand * direction * 30;
        game.physics.arcade.moveToXY(
          rock, 350, 300, randSpeed
        );
      }



      if (rock.x < 0) {
          rock.x = game.width;
          game.physics.arcade.moveToXY(
            rock, 350, 300, randSpeed
          );
      } else if (rock.x > game.width) {
          rock.x = 0;
          game.physics.arcade.moveToXY(
            rock, 350, 300, randSpeed
          );
      }

      if (rock.y < 0) {
          rock.y = game.height;
          game.physics.arcade.moveToXY(
            rock, 350, 300, randSpeed
          );
      } else if (rock.y > game.height) {
          rock.y = 0;
          game.physics.arcade.moveToXY(
            rock, 350, 300, randSpeed
          );
      }
    })


    // orb control
    if (cursors.left.isDown)
    {
    orbs.rotation -= 0.05;
    orbs.children.forEach(function(orb) {
      orb.rotation += 0.05;
    })

    }
    else if (cursors.right.isDown)
    {
      orbs.rotation += 0.05;
      orbs.children.forEach(function(orb) {
        orb.rotation -= 0.05;
      })


    }

    if (game.physics.arcade.collide(rocks, orbs, gameOver, null, this)){
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
}

function gameOver(){
    orbs.children.forEach(function(child) {
    child.kill()
  })
    rocks.forEach(function(crystal){
      crystal.kill()
    })

    stateText.text=" You didn't win. \n But you're not a loser. \n Click to try again.";
    stateText.visible = true;

    //the "click to restart" handler
    game.input.onTap.addOnce(restart,this);

}

function restart () {




    //revives the player
    orbs.children.forEach(function(child) {
    child.revive()

  })

  rocks = [];
  for (let i = 1; i < 7; i++)
   {
      var rand = Math.floor(Math.random() * 10);
      var posOrNeg = (rand >= 5) ? -1 : 1;


       var crystal = game.add.sprite(game.world.randomX + 500 * posOrNeg, game.world.randomY + 500 * posOrNeg, 'rock' + i);
       game.physics.enable(crystal, Phaser.Physics.ARCADE);
       crystal.anchor.setTo(0.5, 0.5);
       crystal.body.setSize(30,30, 20, 20 )


       rocks.push(crystal)
   }
    //hides the text
    stateText.visible = false;



}


// });
