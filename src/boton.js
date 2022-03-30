export default class Boton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, funcionEjecutar, texto) {
    super(scene, x, y);
    this.funcionEjecutar = funcionEjecutar;
    this.texto = texto;
    
    //forma
    this.forma = this.scene.add.graphics();
    this.forma.lineStyle(2, 0x000000, 1);
    this.forma.strokeRoundedRect(-80, 120, 160, 60, 32);
    this.forma.lineStyle(4, 0xff00ff, 1);
    this.add(this.forma)
    
    //botón
    this.boton = this.scene.add.text(0, 155, this.texto, { font: '40px Verdana', fill: '#000', fontSize: 45 }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.boton.on('pointerdown', this.funcionEjecutar, this.scene);
    this.add(this.boton);
    
    this.scene.add.existing(this);
  }
}