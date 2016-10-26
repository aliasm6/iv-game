function initializePhysics() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
}
rocks = [];
function generateRocks() {
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
   game.physics.enable(crystal, Phaser.Physics.ARCADE);
}
function generateOrbs(arrXcor, arrYcor, str) {
  orbs = game.add.physicsGroup()
	for(let i=1; i <= arrXcor.length; i++) {
		orbs.create(arrXcor[i - 1], arrYcor[i - 1], str + i)
	}
  orbs.x = 350;
  orbs.y = 250;
}

function orbBody(){
  for (let i = 0; i < orbs.children.length; i ++) {
    var orb = orbs.children[i];
    orb.body.immovable = true
    orb.body.setSize(27, 27, 26, 26)
  }
}
  // orbs.create(0, -115, 'orb1')
  // orbs.create(-115, 0, 'orb2')
  // orbs.create(0, 115, 'orb3')
  // orbs.create(115, 0, 'orb4')
  // orbs.x = 350
  // orbs.y = 250
