import Boton from './boton';
import Stats from "../stats";

export default class Simbolo extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.init();
    this.create();
  }
  init() {
    this.imagenes = [
      {
        nombre: 'cuadrado',
        premio: 0
      },
      {
        nombre: 'rombo',
        premio: 0
      },
      {
        nombre: 'circulo',
        premio: 2
      },
      {
        nombre: 'triangulo',
        premio: 5
      },
    ]

  }

  create() {
    this.imagen = this.scene.add.image(0,0,'cuadrado');
    this.add(this.imagen);

    this.boton = new Boton(this.scene, 0, 0, this.mezclar, 'Jugar');
    this.add(this.boton);

    this.scene.add.existing(this);
  }

  mezclar ()  {

    let times = 30
    let texturaIndexPrevia = 0
    this.pingTimer = this.time.addEvent({
      delay: 75,
      callback: () => {
        let texturaIndex
        do {
          texturaIndex = Math.floor(Math.random() * this.simbolo.imagenes.length); 
        } while (texturaIndexPrevia === texturaIndex)
        texturaIndexPrevia = texturaIndex;

        this.simbolo.imagen.setTexture(this.simbolo.imagenes[texturaIndex].nombre)
        times--;
        if (times === 0) {
          this.pingTimer.remove();
          this.simbolo.cambiar();
        }
      },
      loop: true
    })

  }

  cambiar() {
    let num = Math.floor(Math.random() * 4);

    this.imagen.setTexture(this.imagenes[num].nombre)

    Stats.actual = this.imagenes[num].premio 
    
    if (this.imagenes[num].premio > 0) {
      this.scene.events.emit('cambioCantidad');
    }

    // this.scene.contPremios.simboloTexto.setText(`Ha salido el ${this.imagenes[num].nombre}.`);
    // this.scene.contPremios.resultadoTexto.setText(`Da ${this.imagenes[num].premio} de premio.`);
    
    if (this.imagenes[num].premio > 0) {
      this.aumentar(); 
    }
  }

  aumentar() {
    this.scene.tweens.add({
      targets: this.imagen,
      scaleX: 1.6,
      scaleY: 1.6,
      ease: 'linear',
      yoyo: true,
      repeat: 0,
      duration: 1000,
    });
  }

}