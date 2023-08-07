import '@/game.css'
import Phaser from 'phaser'
import Main from '@/main'

const config: Phaser.Types.Core.GameConfig = {
  width: 640,
  height: 640,
  type: Phaser.AUTO,
  scene: [Main],
  scale: { autoCenter: Phaser.Scale.CENTER_BOTH, mode: Phaser.Scale.FIT },
}

export default new Phaser.Game(config)
