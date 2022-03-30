import Boton from './boton';

export default class Simbolo extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.create();
  }

  preload() {}

  create() {

    this.imagen = this.scene.add.image(0,0,'cuadrado');
    this.add(this.imagen);

    this.boton = new Boton(this.scene, 0, 0, this.mezclar, 'Jugar');
    this.add(this.boton);

    this.scene.add.existing(this);
  }

  mezclar ()  {
    const agitar = this.tweens.add({
        targets: this.simbolo.imagen,
        x: '-=50',
        ease: 'linear',
        yoyo: true,
        repeat: 30,
        duration: 50,
    });
    agitar.on('complete', this.simbolo.cambiar, this);
  }

  cambiar() {
    let num = Math.floor(Math.random() * 4);
    switch (num) {
      case 0: {
          this.simbolo.imagen.setTexture('cuadrado'); 
          break;
      }
      case 1: {
          this.simbolo.imagen.setTexture('rombo'); 
          break;
      }
      case 2: {
          this.simbolo.imagen.setTexture('circulo');
          this.contPremios.actualizarPremiosCantidad(1); 
          this.simbolo.aumentar(); 
          break;
      }
      case 3: {
          this.simbolo.imagen.setTexture('triangulo');
          this.contPremios.actualizarPremiosCantidad(2);  
          this.simbolo.aumentar(); 
          break;
      }
    }
  }

  aumentar() {
    const agrandar = this.scene.tweens.add({
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