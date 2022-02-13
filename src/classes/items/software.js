import File from './file'
import { log, mixin, emit } from '@/utils'
import Equippable from '@/mixins/equipable'
import Usable from '@/mixins/usable'

export default class Software extends File {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Software',
      icon: 'whh:software',
      equippable: true,
      decryptable: false,
      viewable: false,
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
    log(`Installing ${this.name.toLowerCase()}...`)
    return this.operate('equip', async () => {
      this.equipped = true
      log(`You have successfully installed ${this.name.toLowerCase()}`)
      await emit.call(this, 'onEquip')
    },this.weight)
  }

  async unequip() {
    if (!this.canUnequip(true)) {
      return false
    }
    log(`Uninstalling ${this.name.toLowerCase()}...`)
    return this.operate('unequip', async () => {
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
