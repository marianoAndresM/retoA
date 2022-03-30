export default class ContPremios extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.simboloTexto = this.scene.add.text(0, 0, ' ', { font: '25px Verdana', fill: '#000' }).setOrigin(0.5);
    this.resultadoTexto = this.scene.add.text(0, 25, ' ', { font: '25px Verdana', fill: '#000' }).setOrigin(0.5);

    this.premiosTexto = this.scene.add.text(-200, 50, 'Premios: ', { font: '25px Verdana', fill: '#000' });
    this.premiosCantidad = this.scene.add.text(100, 50, this.scene.premios, { font: '25px Verdana', fill: '#000' } );
    
    this.add(this.simboloTexto);
    this.add(this.resultadoTexto);
    
    this.add(this.premiosTexto);
    this.add(this.premiosCantidad);
        
    scene.add.existing(this);
  }

  actualizarPremiosCantidad (num) {
    this.scene.premios += num;
    this.premiosCantidad.setText(this.scene.premios);
  }
}