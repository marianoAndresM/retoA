export default class Boton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, funcionEjecutar, texto) {
    super(scene, x, y);
    this.funcionEjecutar = funcionEjecutar;
    this.texto = texto;
    this.active = true
    
    //botón
    this.boton = this.scene.add.text(0, 185, this.texto, { 
      fontSize: 40,
      fontFamily: 'fuente',
      fill: '#ddd'
     }).setOrigin(0.5);
    this.boton.depth = 1;
    
    //hitArea
    const hitArea = new Phaser.Geom.Rectangle(-(this.boton.width/2 + 30) , 200 -this.boton.height, this.boton.width + 30, this.boton.height + 20);
    
    //forma
    this.forma = this.scene.add.graphics();
    this.forma.fillStyle(0x000000, 0.7);
    this.forma.fillRoundedRect(-(this.boton.width/2 + 30) , 200 -this.boton.height, this.boton.width + 60, this.boton.height + 20, 20);
    this.forma.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);

    if (this.active === true) {

      this.forma.on('pointerover', function() {
        this.boton.setColor('#fff');
      }, this);
      this.forma.on('pointerout', function() {
        this.boton.setColor('#ddd');
      }, this);
      this.forma.on('pointerdown', this.funcionEjecutar, this.scene);
    }
    this.add(this.forma)
    this.add(this.boton);
    
    this.scene.add.existing(this);
  }
}