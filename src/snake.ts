import Phaser from 'phaser'
import Hammer from 'hammerjs'

export default class Snake {
  private scene: Phaser.Scene
  private gameWidth: number
  private gameHeight: number
  private lastMoveTime: number
  private moveInterval: number
  private tileSize: number
  private body: Phaser.GameObjects.Rectangle[]
  private apple: Phaser.GameObjects.Rectangle
  private direction: Phaser.Math.Vector2
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.gameWidth = this.scene.game.config.width as number
    this.gameHeight = this.scene.game.config.height as number
    this.lastMoveTime = 0
    this.moveInterval = 200
    this.tileSize = 16

    const { tileSize, gameWidth, gameHeight } = this
    const head = this.scene.add.rectangle(gameWidth / 2, gameHeight / 2, tileSize, tileSize, 0x00ff00).setOrigin(0)
    const apple = this.scene.add.rectangle(0, 0, tileSize, tileSize, 0xff0000).setOrigin(0)

    this.body = [head]
    this.apple = apple
    this.direction = Phaser.Math.Vector2.DOWN
    this.cursors = this.scene.input.keyboard!.createCursorKeys()

    this.placeApple()
    this.listenArrowKeys()
    this.listenSwipe()
  }

  public update(time: number) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time
      this.move()
    }
  }

  private move() {
    const { tileSize, scene, gameWidth, gameHeight, body, apple, direction } = this
    const { x: dx, y: dy } = direction
    const { x: bx, y: by } = body[0]
    const { x: ax, y: ay } = apple
    const x = bx + dx * tileSize
    const y = by + dy * tileSize

    if (ax === x && ay === y) {
      this.body.push(scene.add.rectangle(0, 0, tileSize, tileSize, 0x00ff00).setOrigin(0))
      this.placeApple()
    }

    for (let index = body.length - 1; index > 0; index--) {
      this.body[index].x = body[index - 1].x
      this.body[index].y = body[index - 1].y
    }

    this.body[0].x = x
    this.body[0].y = y

    const isGoingOff = x < 0 || x >= gameWidth || y < 0 || y >= gameHeight
    const isEatingTail = body.slice(1).some((s) => s.x === x && s.y === y)

    if (isGoingOff || isEatingTail) {
      this.scene.scene.restart()
    }
  }

  private placeApple() {
    const { tileSize, gameWidth, gameHeight } = this
    this.apple.x = Math.floor((Math.random() * gameWidth) / tileSize) * tileSize
    this.apple.y = Math.floor((Math.random() * gameHeight) / tileSize) * tileSize
  }

  private listenArrowKeys() {
    this.scene.input.keyboard!.on('keydown', () => {
      const { LEFT, RIGHT, UP, DOWN } = Phaser.Math.Vector2
      const { direction, cursors } = this
      const { down, left, up, right } = cursors

      if (left.isDown && direction !== RIGHT) this.direction = LEFT
      if (right.isDown && direction !== LEFT) this.direction = RIGHT
      if (up.isDown && direction !== DOWN) this.direction = UP
      if (down.isDown && direction !== UP) this.direction = DOWN
    })
  }

  private listenSwipe() {
    const hammer = new Hammer(this.scene.game.canvas)
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

    hammer.on('swipe', (event) => {
      const { LEFT, RIGHT, UP, DOWN } = Phaser.Math.Vector2
      const { DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP, DIRECTION_DOWN } = Hammer
      const { direction } = this

      if (event.direction === DIRECTION_LEFT && direction !== RIGHT) this.direction = LEFT
      if (event.direction === DIRECTION_RIGHT && direction !== LEFT) this.direction = RIGHT
      if (event.direction === DIRECTION_UP && direction !== DOWN) this.direction = UP
      if (event.direction === DIRECTION_DOWN && direction !== UP) this.direction = DOWN
    })
  }
}
