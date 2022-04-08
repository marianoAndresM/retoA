import cuadrado from '../assets/images/cuadrado.png';
import rombo from '../assets/images/rombo.png';
import circulo from '../assets/images/circulo.png';
import triangulo from '../assets/images/triangulo.png';
import botonJugar1 from '../assets/button/grey_button01.png'
import botonJugar2 from '../assets/button/grey_button02.png'
import botonJugar3 from '../assets/button/grey_button03.png'

import moneda from '../assets/images/moneda.png';
import monedaAudio from '../assets/audio/monedaAudio.mp3';
import bgMusic from '../assets/audio/bgMusic.mp3';
import Boton from '../elementos/boton';

export default class Carga extends Phaser.Scene {
  constructor() {
    super({ key: 'carga' })
  }
  
  preload () {
    this.bg = this.add.sprite(0, 0, 'bg').setOrigin(0);

    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;
    
    //dibujar barra fondo
    this.bgBar = this.add.graphics();
    const bgBarW = 400;
    const bgBarH = 40;
    this.bgBar.setPosition(this.gameW/2 - bgBarW/2, this.gameH/2 - bgBarH/2)
    this.bgBar.fillStyle(0x000000, 1);
    this.bgBar.fillRect(0, 0, bgBarW, bgBarH);

    //dibujar barra progreso
    this.progressBar = this.add.graphics();
    this.progressBar.setPosition(this.gameW/2 - bgBarW/2 + 4, this.gameH/2 - bgBarH/2 + 4);
    this.progressBar.fillStyle(0xbbbbbb,0.7);
    
    this.load.on('progress', function(value) {
      this.scene.progressBar.fillRect(0, 0, value * (bgBarW-8), bgBarH-8);
    })

    //cargar assets
    this.load.image('cuadrado', cuadrado);
    this.load.image('rombo', rombo);
    this.load.image('circulo', circulo);
    this.load.image('triangulo', triangulo);
    this.load.image('moneda', moneda);
    
    this.load.image('botonJugar1', botonJugar1);
    this.load.image('botonJugar2', botonJugar2);
    this.load.image('botonJugar3', botonJugar3);

    this.load.audio('monedaAudio', monedaAudio);
    this.load.audio('bgMusic', bgMusic);
    
    
    for (let i = 0; i < 100; i++) {
      this.load.image('rombo'+i, rombo);
    }
  }

  create() {

    this.textoEmpezar = this.add.text(0, 0, 'Haz clic para empezar', { fontSize: 28, fontFamily: 'fuente' });
    this.textoEmpezar
      .setPosition(this.gameW/2 - this.textoEmpezar.width/2, this.gameH/2 - this.textoEmpezar.height/2 + 100)
      .setAlpha(0)

    this.tweens.add({
      targets: this.textoEmpezar,
      alpha: 1,
      yoyo: true,
      repeat: -1,
      ease: 'linear',
      duration: 1000
    })
    
    this.input.on('pointerdown', function () {
      this.textoEmpezar.setVisible(false);
      this.progressBar.alpha = 0;
      this.bgBar.alpha = 0;

      this.scene.transition({
        target: 'menu',
        duration: 1000,
        moveBelow: true,
        onUpdate: this.transitionOut,
        data: { x: 400, y: 300 }
      });
    }, this);
  }

  transitionOut (progress) {
    this.bg.y = (600 * progress);
    this.bg.alpha = (1 - progress);
  }


}
