import File from '../items/file'
import { log, mixin, emit } from '@/utils'
import Equippable from '@/mixins/equipable'
import Usable from '@/mixins/usable'
import { store } from '@/store';

export default class Software extends File {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Software',
      icon: 'whh:software',
      equippable: true,
      decryptable: false,
      viewable: false,
      pickable: true,
      dropable: true,
      actionsOrder: [
        'equip',
        'unequip',
      ],
      ...data,
    })
  }

  get isSoftware() { return true }

  get isFile() { return false }

  get content() { return undefined }
  set content(value) {}

  get isTextFile() { return false }
  get isImageFile() { return false }

  get isViewed() { return false }
  set viewed(value) {}

  get icon() { return this.state.icon }

  async equip() {
    if (!this.canEquip(true)) {
      return false
    }
    store.game.playSound('hd2')
    log(`Installing ${this.name.toLowerCase()}...`)
    return this.operate('equip', async () => {
      store.game.stopSound('hd2')
      this.equipped = true
      log(`You have successfully installed ${this.name.toLowerCase()}`)
      await emit.call(this, 'onEquip')
    },this.weight)
  }

  async unequip() {
    if (!this.canUnequip(true)) {
      return false
    }
    store.game.playSound('hd2')
    log(`Uninstalling ${this.name.toLowerCase()}...`)
    return this.operate('unequip', async () => {
      store.game.stopSound('hd2')
      this.equipped = false
      log(`You have successfully uninstalled ${this.name.toLowerCase()}`)
      await emit.call(this, 'onUnequip')
    }, this.weight)
  }
}

mixin(Software, [
  Equippable,
  Usable,
])
