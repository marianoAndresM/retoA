import Boton from '../elementos/boton';

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' })
  }

  preload() {
    this.add.image(0, 0, 'bg').setOrigin(0);
  }

  create() {

    this.boton = new Boton(this, this.sys.game.config.width/2, 0, this.avanzar, 'Jugar');
    console.log(this.boton);

  }

  avanzar() {
    this.scene.start('game');
  }
}