import 'phaser';
import Game from './escenas/game';
import Carga from './escenas/carga';
import Precarga from './escenas/precarga';
import Menu from './escenas/menu';
import Hud from './escenas/hud';


const config = {
    type: Phaser.AUTO,
    backgroundColor: '#AFBCD6',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    scene: [Precarga, Carga, Menu, Hud, Game]
};

export class Juego extends Phaser.Game{
    constructor(configuracion){
        super(configuracion)
    }
}

window.addEventListener('load', () => {
    const juego = new Juego(config);
})