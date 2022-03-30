import Boton from './boton';

export default class Simbolo extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.preload();
    this.create();
  }

  preload() {

  }

  create() {

    this.imagen = this.scene.add.image(0,0,'cuadrado');
    this.add(this.imagen);

    this.boton = new Boton(this.scene, 0, 0, this.mezclar, 'Jugar');
    this.add(this.boton);

    this.scene.add.existing(this);
  }

  mezclar ()  {
    const agitar = this.tweens.add({
        targets: this.simb.imagen,
        x: '-=50',
        ease: 'linear',
        yoyo: true,
        repeat: 30,
        duration: 50,
    });
    agitar.on('complete', this.simb.cambiar, this);
  }

  cambiar() {
    let num = Math.floor(Math.random() * 4);
    switch (num) {
      case 0: {
          this.simb.imagen.setTexture('cuadrado'); 
          break;
      }
      case 1: {
          this.simb.imagen.setTexture('rombo'); 
          break;
      }
      case 2: {
          this.simb.imagen.setTexture('circulo');
          this.cont.actualizarPremiosCantidad(1); 
          this.simb.aumentar(); 
          break;
      }
      case 3: {
          this.simb.imagen.setTexture('triangulo');
          this.cont.actualizarPremiosCantidad(2);  
          this.simb.aumentar(); 
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