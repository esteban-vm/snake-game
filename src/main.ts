import Phaser from 'phaser'
import Snake from '@/snake'

const Main = class extends Phaser.Scene {
  private snake!: Snake

  constructor() {
    super('Main')
  }

  public create() {
    this.snake = new Snake(this)
    this.input.addPointer(1)
    this.input.setTopOnly(false)
  }

  public update(delta: number) {
    this.snake.update(delta)
  }
}

export default Main
