export default class ContPremios extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.simboloTexto = this.scene.add.text(0, 0, ' ', { font: '25px fuente', fill: '#fff' }).setOrigin(0.5);
    this.resultadoTexto = this.scene.add.text(0, 25, ' ', { font: '25px fuente', fill: '#fff' }).setOrigin(0.5);
    
    this.add(this.simboloTexto);
    this.add(this.resultadoTexto);
        
    scene.add.existing(this);
  }

}