import ContPremios from "../elementos/marcador";
import Simbolo from '../elementos/simbolo';
import Boton from '../elementos/boton';

export default class Game extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'game' });
    }

    init()  {
        this.premios = 0;
        this.grupoSimbolos = []
    }

    preload() {
        this.add.image(0, 0, 'bg').setOrigin(0);
    }

    create () {


        this.bandasonoraNivel = this.sound.add('bgMusic', { loop: true, volume: 0 });
        this.bandasonoraNivel.play();
        this.tweens.add({
            targets: this.bandasonoraNivel,
            volume: 1,
            duration: 1500
        })

        let gameW = this.sys.game.config.width;
        let gameH = this.sys.game.config.height;

        //texto superior
        this.add.text(gameW / 2, 100, 'Juego', { font: '50px fuente', fill: '#fff' }).setOrigin(0.5);

        this.simbolo0 = new Simbolo(this, gameW / 2 -200, gameH / 2 - 50, 0);
        this.simbolo1 = new Simbolo(this, gameW / 2, gameH / 2 - 50, 1);
        this.simbolo2 = new Simbolo(this, gameW / 2 +200, gameH / 2 - 50, 2);

        this.grupoSimbolos.push(this.simbolo0)
        this.grupoSimbolos.push(this.simbolo1)
        this.grupoSimbolos.push(this.simbolo2)
        
        this.contPremios = new ContPremios(this, gameW / 2, gameH - 100);

        //Boton que haga que se mezclen todas
        this.boton = new Boton(this, gameW / 2, 300, this.mezclarTodas, 'Jugar');
        this.add.existing(this.boton);
        
        //Funcion que llama a mezclar y pase el id del simbolo
        this.game.events.on('accionAcabada', () => {
            console.log('acabada')
        })

    }

    mezclarTodas() {
        this.boton.active = false;
        console.log(this.boton);
        this.grupoSimbolos.forEach(simbolo => {
            // console.log(simbolo)
            // console.log(this.boton);
            // console.log(simbolo.id)
            simbolo.mezclar()
        })
    }
    


}
