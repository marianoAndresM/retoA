import 'phaser';
import Escena from './escena';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#AFBCD6',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    scene: [Escena]
};

export class Juego extends Phaser.Game{
    constructor(configuracion){
        super(configuracion)
    }
}

window.addEventListener('load', () => {
    const juego = new Juego(config);
})