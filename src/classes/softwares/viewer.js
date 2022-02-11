import Software from '@/classes/items/software'

export default class Viewer extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Viewer',
      viewerType: 'txt',
      ...data,
    })
  }

  get isViewer() { return true }

  get viewerType() { return this.state.viewerType }
  set viewerType(value) { this.state.viewerType = value }
}
