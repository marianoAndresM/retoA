export default class Boton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, funcionEjecutar, texto) {
    super(scene, x, y);
    this.funcionEjecutar = funcionEjecutar;
    this.texto = texto;
    
    //botón
    this.boton = this.scene.add.text(0, 180, this.texto, { 
      fontSize: 40,
      fontFamily: 'fuente',
      fill: '#fff'
     }).setOrigin(0.5);
    this.boton.depth = 1;
    
    //hitArea
    const hitArea = new Phaser.Geom.Rectangle(-this.boton.width, 190 -this.boton.height, 2 * this.boton.width, 2*this.boton.height - 20);
    
    //forma
    this.forma = this.scene.add.graphics();
    this.forma.fillStyle(0x000000, 0.7);
    this.forma.fillRoundedRect(-this.boton.width, 180 -this.boton.height, 2 * this.boton.width, 2*this.boton.height, 20);
    // this.forma.lineStyle(4, 0xff00ff, 1);
    this.forma.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    this.forma.on('pointerdown', this.funcionEjecutar, this.scene);
    this.add(this.forma)
    this.add(this.boton);
    
    this.scene.add.existing(this);
  }
}