import Software from '@/classes/softwares/software'
import { registerClass } from '@/utils'

export default class Viewer extends Software {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Viewer',
      installType: 'viewer',
      usable: false,
      viewerType: 'txt',
      ...data,
    })
  }

  get isViewer() { return true }

  get viewerType() { return this.state.viewerType }
  set viewerType(value) { this.state.viewerType = value }
}

registerClass(Viewer)
