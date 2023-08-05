import '@/game.css'
import Phaser from 'phaser'
import resize from '@/resize'

window.addEventListener('load', function () {
  const config: Phaser.Types.Core.GameConfig = {}
  const game = new Phaser.Game(config)

  this.focus()
  resize(game)
  this.addEventListener('resize', () => resize(game))
})
