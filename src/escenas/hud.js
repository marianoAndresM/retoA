// import Game from "./game";

import Stats from "../stats";

export default class Hud extends Phaser.Scene {
  constructor() {
    super({ key: 'hud' })
  };
  
  init()  {
    this.premios = 0;
    this.game = this.scene.get('game');
  }

  create() {
    //fondo
    this.fondo = this.add.rectangle(0, 0).setOrigin(0);
    this.fondo.setFillStyle(0x000000, 0.7);
    this.fondo.setSize(800, 50);

    //Texto
    this.premiosTexto = this.add.text(0, 0, 'Premio: ', {
      fontSize: 36,
      fontFamily: 'fuente',
      fill: '#fff' });
    this.premiosTexto.x = this.sys.game.config.width/2 - this.premiosTexto.width + 50;
    this.premiosTexto.depth = 1;

    this.premiosCantidad = this.add.text(this.sys.game.config.width/2 + 70, 0, this.premios, {
      fontSize: 36,
      fontFamily: 'fuente',
      fill: '#fff' });
    this.premiosCantidad.depth = 1;
    
    this.game.events.on('cambioCantidad', this.actualizarPremiosCantidad, this);

    const contenedor = this.add.container(0, 0, this.fondo, this.premiosCantidad);
    this.add.existing(contenedor);

    this.monedaSound = this.sound.add('monedaAudio')

  }
  
  actualizarPremiosCantidad (parent, key, data) {
    this.aumentarTexto();
  }

  aumentarTexto() {
    const tweenAumentar = this.tweens.add({
      targets: this.premiosCantidad,
      scaleY: 1.2,
      scaleX: 1.2,
      ease: 'linear',
      repeat: 0,
      duration: 500,
    });
    tweenAumentar.on('complete', () => {
      this.incrementarCantidad(Stats.actual)
    })
  }
  reducirTexto() {
    this.tweens.add({
      targets: this.premiosCantidad,
      scaleY: 1,
      scaleX: 1,
      ease: 'linear',
      repeat: 0,
      duration: 500,
    });
  }

  incrementarCantidad(num) {
    this.efectoMonedas()
    this.monedaSound.play()
    this.tweensMoneda.on('complete', () => {
      this.premios++
      this.premiosCantidad.setText(this.premios);
      num--
      if (num > 0) {
        this.incrementarCantidad(num)
      } else {
        this.reducirTexto()
      }
    })
  }

  efectoMonedas () {
    this.imagenMoneda = this.add.sprite(400, 300, 'moneda')
    this.imagenMoneda.setScale(0.2)
    this.imagenMoneda.setAlpha(0)
    this.tweensMoneda = this.tweens.add({
        targets: this.imagenMoneda,
        props: {
            alpha: {
                value: 1,
                duration: 250,
                ease: 'ELastic',
                yoyo: true
            },
            y: {
                value: 20,
                duration: 250,
                ease: 'Sine.easeOut',
            },
            x: {
                value: 480,
                duration: 250,
                ease: 'Sine.easeOut',
            }
        },
        repeat: 0
    })
  }
}