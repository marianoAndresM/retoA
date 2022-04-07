import Boton from '../elementos/boton';

export default class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' })
  }

  preload() {
    this.add.image(0, 0, 'bg').setOrigin(0);
  }

  create() {

    this.boton = new Boton(this, this.sys.game.config.width/2, 0, this.avanzar, 'Jugar').setScale(0);

    const instrucciones = ["Pulse el botón Jugar para jugar",
    "El triángulo da dos premios.",
    "El círculo da un premio.",
    "El rombo y el cuadrado dan cero premios."]

    this.texto = this.add.text(0, 300, instrucciones, {font: '25px fuente', align: 'center'})
    
    const contenedor = this.add.container((this.sys.game.config.width - this.texto.width)/2, 0, this.texto); 
    
    this.add.existing(contenedor);
  
    contenedor.alpha = 0
    this.boton.setScale(0);
    
    this.events.on('transitionstart', (fromScene, duration) => {
      this.tweens.add({
        // targets: [contenedor, this.boton],
        targets: this.boton,
        scaleX: 1,
        scaleY: 1,
        duration: duration/2
      })
      this.tweens.add({
        targets: contenedor,
        alpha: 1,
        duration: duration
      })
    }, this)
  }

  avanzar() {
    this.cameras.main.fade(1000, 0, 0, 0)
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('game');
      this.scene.start('hud');
      this.scene.bringToTop('hud');
    })

  }
}