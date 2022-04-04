import Boton from './boton';

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
        premio: 1
      },
      {
        nombre: 'triangulo',
        premio: 2
      },
    ]
  }

  preload() {}

  create() {

    this.imagen = this.scene.add.image(0,0,'rombo');
    this.add(this.imagen);

    this.boton = new Boton(this.scene, 0, 0, this.mezclar, 'Jugar');
    this.add(this.boton);

    this.scene.add.existing(this);
  }

  mezclar ()  {

    let times = 30

    this.pingTimer = this.time.addEvent({
      delay: 75,
      callback: () => {
        var textura = this.simbolo.imagenes[Math.floor(Math.random() * this.simbolo.imagenes.length)].nombre;
        this.simbolo.imagen.setTexture(textura)
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
    
    this.scene.events.emit('cambioCantidad', this.scene.registry.set('premiosCantidad', this.imagenes[num].premio));

    this.scene.contPremios.simboloTexto.setText(`Ha salido el ${this.imagenes[num].nombre}.`);
    this.scene.contPremios.resultadoTexto.setText(`Da ${this.imagenes[num].premio} de premio.`);
    
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