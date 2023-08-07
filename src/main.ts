import Phaser from 'phaser'
import Snake from '@/snake'

const Main = class extends Phaser.Scene {
  private snake!: Snake

  constructor() {
    super('Main')
  }

  public create() {
    this.input.addPointer(1)
    this.input.setTopOnly(false)
    this.snake = new Snake(this)
  }

  public update(time: number) {
    this.snake.update(time)
  }
}

export default Main
