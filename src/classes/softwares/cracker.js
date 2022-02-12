import Software from '@/classes/items/software'
import { store } from '@/store';
import { emit, log } from '@/utils';

export default class Cracker extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cracker',
      equipType: 'cracker',
      actions: [
        item => (
          item.canCrack()
            ? {
              label: 'Use',
              key: 'crack',
              icon: 'cib:hackaday',
              disabled: false,
              click: async () => item.crack(),
            }
            : undefined
        ),
      ],
      ...data,
    })
  }

  get isCracker() { return true }

  canCrack(showMessage) {
    if (!store.player.server) {
      if (showMessage) {
        log(`You need to be connected to a terminal first`)
      }
      return false
    }
    return store.player.server.canCrack(showMessage)
  }

  async crack() {
    if (!this.canCrack(true)) {
      return false
    }
    if (await store.player.server.crack()) {
      await emit.call(this, 'onCrack')
      return true
    }
    return false
  }

  async onCrack() {}
}
