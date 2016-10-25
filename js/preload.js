function hex() {
game.load.image('hex', 'images/hexagon1.png');
game.load.image('box','images/background/black.png')
};

for (let i = 1; i <= 6; i++) {

  game.load.image('rock' + i, 'images/projectiles/rock-' + i + '.png');
}

for (let i = 1; i <= 4; i++) {

  game.load.image('orb' + i, 'images/orb/orb-' + i + '.png');

}
