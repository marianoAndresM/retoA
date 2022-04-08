import Stats from "../stats";
import cargar from "../premios";
import eventsCenter from '../elementos/manejadorEventos'

export default class Hud extends Phaser.Scene {
  constructor() {
    super({ key: 'hud' })
  };
  
  init()  {
    this.premios = 0;
    this.game = this.scene.get('game');
    this.cambiosCantidad = 0
    this.monedaSound = this.sound.add('monedaAudio')
    this.tadaSound = this.sound.add('tadaAudio')
  }

  create() {
    //fondo
    this.fondo = this.add.rectangle(0, 0).setOrigin(0);
    this.fondo.setFillStyle(0x000000, 0.7);
    this.fondo.setSize(800, 50);

    //Texto
    this.premiosTexto = this.add.text(0, 5, 'Premio: ', {
      fontSize: 30,
      fontFamily: 'fuente',
      fill: '#fff' 
    });
    this.premiosTexto.x = this.sys.game.config.width/2 - this.premiosTexto.width + 50;
    this.premiosTexto.depth = 1;
      
    //Texto
    this.premiosCantidad = this.add.text(this.sys.game.config.width/2 + 70, 2, this.premios, {
      fontSize: 33,
      fontFamily: 'fuente',
      fill: '#fff' 
    });
    this.premiosCantidad.depth = 1;

    //Esperar a que terminen los cambios de figuras
    this.game.events.on('figuraCambiada', () => {
      this.cambiosCantidad++
      if (this.cambiosCantidad === 3) {
        this.comprobarCombinacion()
      }
    }, this);

    const contenedor = this.add.container(0, 0, this.fondo, this.premiosCantidad);
    this.add.existing(contenedor);




  }

  comprobarCombinacion() {
    // console.log(Stats.turnoActual);
    // if (Stats.turnoActual[0] === Stats.turnoActual[1]) {
      // console.log('bingo');
      // console.log(cargar());
      
      Stats.actual = cargar()

      if (Stats.actual) {
        this.actualizarPremiosCantidad()
        this.tadaSound.play()
        this.moverTextoPrueba(Stats.actual)
      } else {
        eventsCenter.emit('habilitarBoton', 'completaSinPremios')
      }
    // }
    this.cambiosCantidad = 0
  }
  
  actualizarPremiosCantidad (parent, key, data) {
    this.aumentarTexto();
  }

  aumentarTexto() {
    const tweenAumentar = this.tweens.add({
      targets: this.premiosCantidad,
      scaleY: 1.4,
      scaleX: 1.4,
      x: '-=2',
      y: '-=3',
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
      x: '+=2',
      y: '+=3',
      ease: 'linear',
      repeat: 0,
      duration: 200,
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
        eventsCenter.emit('habilitarBoton', 'completaConPremios')
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

  //Prueba texto lateral
  moverTextoPrueba(cantidad) {
    this.tinte = this.add.rectangle(0,0,800,600).setOrigin(0)
    this.tinte.setFillStyle(0x000000, 0.4)
    const randomX = Math.floor(Math.random() * 800)
    const randomY = Math.floor(Math.random() * 600)
    this.textoPrueba = this.add.text(randomX, randomY, cantidad, {
      fontSize: 60,
      fontFamily: 'fuentes',
      fill: '#fff'
    })
    this.textoPrueba.setOrigin(0.5)
    this.tweens.add({
        targets: this.textoPrueba,
        props: {
          x: {
          value: 400,
            duration: 1000,
            ease: 'linear',
          },
          y: {
            value: 300,
            duration: 1000,
            ease: 'linear',
          },
          alpha: {
            value: 0,
            duration: 2000,
            ease: 'Expo.easeIn',
          }
        }, 
        repeat: 0,
        completeDelay: 500,
        onComplete: function () {
          this.parent.scene.quitarTinte()
        }
      }, this)
      
      
    }
  quitarTinte() {
    console.log('quitando');
    this.tinte.destroy();

  }
}