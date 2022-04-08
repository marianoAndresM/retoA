export default class BotonCustom extends Phaser.GameObjects.Container {
  constructor(scene, x, y, downTexture, upTexture, overTexture, texto) {
    super(scene, x, y)

    this.downImage = scene.add.image(0, 0, downTexture)
    this.upImage = scene.add.image(0, 0, upTexture)
    this.overImage = scene.add.image(0, 0, overTexture)

    this.texto = scene.add.text(0, 0, texto, {
       fill: '#000',
       fontFamily: 'fuente',
       fontSize: 24 
      }).setOrigin(0.5)

    this.add(this.downImage)
    this.add(this.upImage)
    this.add(this.overImage)
    this.add(this.texto)

    this.downImage.setVisible(false)
    this.overImage.setVisible(false)

    this.setSize(this.upImage.width, this.upImage.height)

    this.setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        this.downImage.setVisible(false)
        this.upImage.setVisible(false)
        this.overImage.setVisible(true)
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        this.downImage.setVisible(false)
        this.upImage.setVisible(true)
        this.overImage.setVisible(false)
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.downImage.setVisible(true)
        this.upImage.setVisible(false)
        this.overImage.setVisible(false)
      })


  }


}