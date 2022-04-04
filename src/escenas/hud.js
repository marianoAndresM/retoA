import Game from "./game";

export default class Hud extends Phaser.Scene {
  constructor() {
    super({ key: 'hud' })
  };

  init()  {
    this.premios = 0;
    this.game = this.scene.get('game');
  }

  create() {
    //fondo
    this.fondo = this.add.rectangle(0, 0);
    this.fondo.setFillStyle(0x000000, 0.7);
    this.fondo.setSize(880, 100);

    //Texto
    this.premiosCantidad = this.add.text(0, 0, `Premios: ${this.premios}`, { font: '25px fuente', fill: '#fff' });
    this.premiosCantidad.x = this.sys.game.config.width/2 - this.premiosCantidad.width/2;
    this.premiosCantidad.depth = 1;
    
    this.game.events.on('cambioCantidad', this.actualizarPremiosCantidad, this);

    const contenedor = this.add.container(0, 0, this.fondo, this.premiosCantidad);
    this.add.existing(contenedor);
  }

  actualizarPremiosCantidad (parent, key, data) {
    this.premios += this.data.scene.registry.list.premiosCantidad;
    this.premiosCantidad.setText(`Premios: ${this.premios}`);
  }
}