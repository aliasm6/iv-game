function loadBackground() {
game.load.image('box','images/background/black.png')
};

function loadSprites(spriteName, filePath, fileExtension, num) {
  for (let i = 1; i <= num; i++) {
    game.load.image(spriteName + i, filePath + i + fileExtension);
  }
}
