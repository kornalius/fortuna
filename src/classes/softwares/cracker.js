import Software from '@/classes/softwares/software'
import { can, emit, registerClass } from '@/utils'
import { store } from '@/store'

export default class Cracker extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Cracker',
      installType: 'cracker',
      actions: [
        item => (
          {
            label: 'Use',
            key: 'crack',
            icon: 'gearWhite',
            disabled: !item.canCrack(),
            click: async () => item.crack(),
          }
        ),
      ],
      actionsOrder: [
        'examine',
        'crack',
        'install',
        'uninstall',
        'delete',
      ],
      ...data,
    })
  }

  get isCracker() { return true }

  canCrack(showMessage) {
    if (!can(this, [
      {
        expr: () => !store.player.server,
        log: () => `You need to be connected to a terminal first`,
      },
    ], showMessage)) {
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

registerClass(Cracker)
