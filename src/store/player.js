import { reactive } from 'vue'
import { store } from './index'
import { mixin } from '@/utils'
import Item from '@/classes/items/item';
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
      // currentyle connected server
      serverId: undefined,
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
  get installedDownloader() { return this.installedSoftware(i => i.isDownloader) }
  get installedUploader() { return this.installedSoftware(i => i.isUploader) }
  get installedDeleter() { return this.installedSoftware(i => i.isDeleter) }
  get installedScanner() { return this.installedSoftware(i => i.isScanner) }
  get installedConnector() { return this.installedSoftware(i => i.isConnector) }
  get installedAuthenticator() { return this.installedSoftware(i => i.isAuthenticator) }

  get serverId() { return this.state.serverId }
  set serverId(value) { this.state.serverId = value }

  get server() { return store.items.get(this.serverId) }
  set server(value) { this.serverId = value?.id }

  get isConnectedToServer() { return this.server !== undefined }

  isEquipped(item) {
    return this.equippedItems.includes(item)
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
      data.locationId = undefined
      data.locationStore = this.storeName
      store.items.update(data)
      return data
    } else {
      const i = new Item(data)
      i.locationStore = this.storeName
      store.items.update(i)
      return i
    }
  }
}

mixin(Player, [Name, Level, Buffable, Items, Hp, Xp, Carry])
