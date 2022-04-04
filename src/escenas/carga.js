import cuadrado from '../assets/cuadrado.png';
import rombo from '../assets/rombo.png';
import circulo from '../assets/circulo.png';
import triangulo from '../assets/triangulo.png';

export default class Carga extends Phaser.Scene {
  constructor() {
    super({ key: 'carga' })
  }
  
  preload () {
    this.add.sprite(0, 0, 'bg').setOrigin(0);

    const gameW = this.sys.game.config.width;
    const gameH = this.sys.game.config.height;
    
    //dibujar barra fondo
    const bgBar = this.add.graphics();
    const bgBarW = 400;
    const bgBarH = 40;
    bgBar.setPosition(gameW/2 - bgBarW/2, gameH/2 - bgBarH/2)
    bgBar.fillStyle(0x000000, 1);
    bgBar.fillRect(0, 0, bgBarW, bgBarH);

    //dibujar barra progreso
    const progressBar = this.add.graphics();
    progressBar.setPosition(gameW/2 - bgBarW/2 + 4, gameH/2 - bgBarH/2 + 4);
    progressBar.fillStyle(0xbbbbbb,0.7);
    
    this.load.on('progress', function(value) {
      progressBar.fillRect(0, 0, value * (bgBarW-8), bgBarH-8);
    })

    //cargar assets
    this.load.image('cuadrado', cuadrado);
    this.load.image('rombo', rombo);
    this.load.image('circulo', circulo);
    this.load.image('triangulo', triangulo);
    
    for (let i = 0; i < 200; i++) {
      this.load.image('rombo'+i, rombo);
    }
  }

  create() {

    this.scene.start('menu');
  }
}