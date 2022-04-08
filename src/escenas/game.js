import ContPremios from "../elementos/marcador";
import Simbolo from '../elementos/simbolo';
import BotonCustom from '../elementos/botonCustom';
import eventsCenter from '../elementos/manejadorEventos'

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

        this.boton = new BotonCustom(this, gameW / 2, 500, 'botonJugar2', 'botonJugar1', 'botonJugar3', 'JUGAR')
        this.add.existing(this.boton)
        this.boton.setInteractive()
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.mezclarTodas, this)
          .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, function () {
              this.boton.disableInteractive()
            }, this)
        
        //Funcion que llama a mezclar y pase el id del simbolo
        eventsCenter.on('habilitarBoton', function() {
            this.boton.setInteractive()
        }, this)
    }

    mezclarTodas() {

        this.grupoSimbolos.forEach(simbolo => {
            simbolo.mezclar()
        })
    }
}
