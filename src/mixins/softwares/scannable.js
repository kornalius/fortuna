import { checkSoftware, emit, log, operationTimeout } from '@/utils'
import { store } from '@/store'

export default {
  state: {
    scanned: false,
    actions: [
      item => (
        item.canScan()
          ? {
            label: 'Scan',
            key: 'scan',
            icon: 'mdi:cube-scan',
            disabled: false,
            click: async () => item.scan(),
          }
          : undefined
      ),
    ],
  },

  get isScanned() { return this.state.scanned },
  set scanned(value) { this.state.scanned = value },

  get isScanning() { return store.player.installedScanner?.isBusy || false },
  set scanning(value) { this.setBusy(store.player.installedScanner, value) },

  canScan(showMessage) {
    if (this.isScanned) {
      if (showMessage) {
        log(`Server ${this.name} has already been scanned`)
      }
      return false
    }
    if (this.isConnected) {
      if (showMessage) {
        log(`You need to be disconnected from ${this.name.toLowerCase()} to perform a port scan`)
      }
      return false
    }
    return checkSoftware.call(this, store.player.installedScanner, showMessage && 'scanner')
  },

  async scan() {
    if (!this.canScan(true)) {
      return false
    }
    this.scanning = true
    log(`Scanning ${this.name.toLowerCase()}...`)
    return new Promise(resolve => {
      setTimeout(async () => {
        this.scanning = false
        this.scanned = true
        log(`You have successfully scanned ${this.name.toLowerCase()}`)
        await emit.call(this, 'onScan')
        resolve(true)
      }, operationTimeout(this.version))
    })
  },

  async onScan() {},
}
