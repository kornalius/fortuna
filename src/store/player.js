import { reactive } from 'vue'
import { store } from './index'
import { log, mixin } from '@/utils'
import Item from '@/classes/items/item'
import Name from '@/mixins/name'
import Level from '@/mixins/level'
import Buffable from '@/mixins/buffable'
import Hp from '@/mixins/hp'
import Xp from '@/mixins/xp'
import Items from '@/mixins/items'
import Carry from '@/mixins/carry'

export default class Player {
  storeName = 'player'

  constructor() {
    this.state = reactive({
      ...this.state,
      name: '',
      hp: this.maxHp,
      xp: 0,
      // maximum ram space available to install softwares
      ram: store.config.baseRam,
      // maximum disk space available to store files in inventory
      disk: store.config.baseDisk,
      // currently connected server
      serverId: null,
      // current dialog being displayed
      dialogId: null,
    })
  }

  get items() { return store.items.list.filter(i => i.locationStore === this.storeName) }

  get installedSoftwares() { return this.items.filter(i => i.isSoftware && i.isEquipped) }
  get equippedItems() { return this.items.filter(i => i.isEquipped) }
  get files() { return this.items.filter(i => i.isFile) }

  get ram() { return this.state.ram }
  set ram(value) { this.state.ram = value }
  get ramFree() { return this.state.ram - this.ramUsed }
  get ramUsed() { return this.installedSoftwares .reduce((acc, i) => acc + i.weight, 0) }

  get disk() { return this.state.disk }
  set disk(value) { this.state.disk = value }
  get diskFree() { return this.state.disk - this.diskUsed }
  get diskUsed() { return this.files.reduce((acc, i) => acc + i.weight, 0) }

  get installedViewer() { return this.installedSoftware(i => i.isViewer) }
  get installedDecrypter() { return this.installedSoftware(i => i.isDecrypter) }
  get installedCracker() { return this.installedSoftware(i => i.isCracker) }
  get installedFtp() { return this.installedSoftware(i => i.isFtp) }
  get installedDeleter() { return this.installedSoftware(i => i.isDeleter) }

  get serverId() { return this.state.serverId }
  set serverId(value) { this.state.serverId = value }

  get server() { return store.items.get(this.serverId) }
  set server(value) {
    if (value) {
      this.state.serverId = value.id
    } else {
      this.state.serverId = null
    }
  }

  get isConnectedToServer() { return !!this.server }

  get isInDialog() { return !!this.dialog }

  get isInCombat() { return !!this.combat }

  get dialogId() { return this.state.dialogId }
  set dialogId(value) { this.state.dialogId = value }

  get dialog() { return store.dialogs.get(this.dialogId) }
  set dialog(value) {
    if (value) {
      this.state.dialogId = value.id
    } else {
      this.state.dialogId = null
    }
  }

  hasEquippedOfType(type) {
    return this.equippedItems.find(i => i.equipType === type)
  }

  installedSoftware(expr) {
    return this.installedSoftwares.find(i => expr.call(this, i))
  }

  addItem(data) {
    if (Array.isArray(data)) {
      return data.map(d => this.addItem(d))
    }

    if (data instanceof Item) {
      data.locationId = null
      data.locationStore = this.storeName
      data.hovered = false
      store.items.update(data)
      return data
    } else {
      const i = new Item(data)
      i.locationId = null
      i.locationStore = this.storeName
      i.hovered = false
      store.items.update(i)
      return i
    }
  }

  canAnswer(showMessage) {
    if (!this.isInDialog) {
      if (showMessage) {
        log('You are not talking to anyone')
      }
      return false
    }
    return true
  }

  /**
   * Respond with an answer to the current dialog
   *
   * @param code
   * @returns {Promise<void>}
   */
  async answer(code) {
    if (!this.canAnswer(true)) {
      return false
    }
    return this.dialog.answer(code)
  }

  canCombat(npc, showMessage) {
    return npc.canCombat(showMessage)
  }

  async combat(npc) {
    if (!this.canCombat(npc, true)) {
      return false
    }
    return npc.combat()
  }
}

mixin(Player, [
  Name,
  Level,
  Buffable,
  Items,
  Hp,
  Xp,
  Carry,
])
