import bg from '../assets/images/bg.png'

export default class Precarga extends Phaser.Scene {
  constructor() {
    super({ key: 'precarga'})
  }

  preload() {
    this.load.image('bg', bg);
  }

  create() {
    this.scene.start('carga');
  }
}