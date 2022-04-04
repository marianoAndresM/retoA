import ContPremios from "../elementos/marcador";
import Simbolo from '../elementos/simbolo';

export default class Game extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'game' });
    }

    init()  {
        this.premios = 0;
    }

    preload() {
        this.add.image(0, 0, 'bg').setOrigin(0);
    }

    create () {

        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;

        //texto superior
        this.add.text(gameW / 2, 50, 'Juego', { font: '50px fuente', fill: '#fff' }).setOrigin(0.5);

        this.simbolo = new Simbolo(this, gameW / 2, gameH / 2 - 50);
        
        this.contPremios = new ContPremios(this, gameW / 2, gameH - 100);
          
    }

}
