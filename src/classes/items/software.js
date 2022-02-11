import File from './file'
import { store } from '@/store'
import { log, mixin, operationTimeout, emit } from '@/utils'
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
      log(`You cannot install ${this.name}`)
      return false
    }
    this.busy = true
    log(`Installing ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.busy = false
        await this.equip(store.player)
        log(`You have successfully installed ${this.name}`)
        await emit.call(this, 'onEquip')
        resolve(true)
      }, operationTimeout(this.weight))
    })
  }

  async unequip() {
    if (!this.canUnequip(true)) {
      log(`You cannot uninstall ${this.name}`)
      return false
    }
    this.busy = true
    log(`Uninstalling ${this.name}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.busy = false
        await this.unequip(store.player)
        log(`You have successfully uninstalled ${this.name}`)
        await emit.call(this, 'onUnequip')
        resolve(true)
      }, operationTimeout(this.weight))
    })
  }
}

mixin(Software, [Equippable, Usable])
