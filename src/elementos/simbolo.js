import Stats from "../stats";

export default class Simbolo extends Phaser.GameObjects.Container {
  constructor(scene, x, y, id) {
    super(scene, x, y);
    this.init();
    this.create();
    this.id = id
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
      // {
      //   nombre: 'triangulo',
      //   premio: 5
      // },
    ]

  }

  create() {
    this.imagen = this.scene.add.image(0,0,'cuadrado');
    this.imagen.setScale(0.8)
    this.add(this.imagen);

    this.scene.add.existing(this);
  }

  mezclar ()  {
    let times = 25 + (8 * this.id)
    let texturaIndexPrevia = 0

    this.pingTimer = this.scene.time.addEvent({
      delay: 75,
      callback: () => {
        let texturaIndex
        do {
          texturaIndex = Math.floor(Math.random() * this.imagenes.length); 
        } while (texturaIndexPrevia === texturaIndex)
        texturaIndexPrevia = texturaIndex;

        this.imagen.setTexture(this.imagenes[texturaIndex].nombre)
        times--;
        if (times === 0) {
          this.pingTimer.remove();
          this.cambiar();
        }
      },
      loop: true
    })

  }

  cambiar() {
    let num = Math.floor(Math.random() * this.imagenes.length);

    this.imagen.setTexture(this.imagenes[num].nombre)

    // Stats.actual = this.imagenes[num].premio 
    const n = this.id
    // console.log(this.id);
    
    Stats.turnoActual[n] = this.imagenes[num].nombre 
    
    // console.log(Stats.turnoActual.n);
    
    // if (this.imagenes[num].premio > 0) {
      this.scene.events.emit('figuraCambiada');
    // }

    // this.scene.contPremios.simboloTexto.setText(`Ha salido el ${this.imagenes[num].nombre}.`);
    // this.scene.contPremios.resultadoTexto.setText(`Da ${this.imagenes[num].premio} de premio.`);
    
    // if (this.imagenes[num].premio > 0) {
    //   this.aumentar(); 
    // }
  }

  // aumentar() {
  //   this.scene.tweens.add({
  //     targets: this.imagen,
  //     scaleX: 1.6,
  //     scaleY: 1.6,
  //     ease: 'linear',
  //     yoyo: true,
  //     repeat: 0,
  //     duration: 1000,
  //   });
  // }

}