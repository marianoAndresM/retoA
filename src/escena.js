import cuadrado from './assets/cuadrado.png';
import rombo from './assets/rombo.png';
import circulo from './assets/circulo.png';
import triangulo from './assets/triangulo.png';
import ContPremios from "./marcador";
import Simbolo from './simbolo';

export default class Escena extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'game' });
    }

    init()  {
        this.premios = 0;
    }

    preload () {
        this.load.image('cuadrado', cuadrado);
        this.load.image('rombo', rombo);
        this.load.image('circulo', circulo);
        this.load.image('triangulo', triangulo);
    }

    create () {

        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;

        //texto superior
        const txtSaludo = this.add.text(gameW / 2, 120, 'Minijuego', { font: '50px Garamond', fill: '#000' }).setOrigin(0.5);

        this.cont = new ContPremios(this, gameW / 2, gameH - 100);
        
        this.simb = new Simbolo(this, gameW / 2, gameH / 2);
           
    }




}
