function initializePhysics() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
}

rocks = [];
function createRocks() {

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
