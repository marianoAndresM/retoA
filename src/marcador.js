export default class ContPremios extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.premiosTexto = this.scene.add.text(-200, 0, 'Premios: ', { font: '40px Verdana', fill: '#000' });
    this.premiosCantidad = this.scene.add.text(100, 0, this.scene.premios, { font: '40px Verdana', fill: '#000' } );
    
    this.add(this.premiosTexto);
    this.add(this.premiosCantidad);
        
    scene.add.existing(this);
  }

  actualizarPremiosCantidad (num) {
    this.scene.premios += num;
    this.premiosCantidad.setText(this.scene.premios);
  }
}