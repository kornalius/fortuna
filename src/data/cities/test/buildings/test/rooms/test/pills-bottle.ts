import { log, LOG_WARN } from '@/utils'
import { IPillsBottleData, PillsBottle } from '@/classes/containers/pills-bottle'

export default {
  name: 'Bottle',

  async onPickup(this: PillsBottle): Promise<void> {
    log([
      'You stash it in your pockets. You will need to investigate',
      'this a little further down the road because you clearly don\'t remember being',
      'prescribed pills',
    ])
  },

  async onExamine(this: PillsBottle): Promise<void> {
    if (!window.store.player.has(this)) {
      log('You read the sticker on the bottle, it seems to belong to, YOU?', LOG_WARN, this.icon)
    } else {
      log('A bottle of prescribed pills to your name', LOG_WARN, this.icon)
    }
  },
} as IPillsBottleData
