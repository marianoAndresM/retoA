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

    const instrucciones = ["Pulse el botón Jugar para jugar",
    "El triángulo da dos premios.",
    "El círculo da un premio.",
    "El rombo y el cuadrado dan cero premios."]

    this.texto = this.add.text(0, 300, instrucciones, {font: '25px fuente', align: 'center'})
    
    const contenedor = this.add.container((this.sys.game.config.width - this.texto.width)/2, 0, this.texto); 

    this.add.existing(contenedor);

  }

  avanzar() {
    this.scene.start('game');
    this.scene.start('hud');
    this.scene.bringToTop('hud');

  }
}