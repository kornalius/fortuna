import { registerClass } from '@/utils'
import { Software } from '@/classes/softwares/software'
import { SetupData } from '@/entity'

export class Viewer extends Software {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'Viewer',
      installType: 'viewer',
      usable: false,
      viewerType: 'txt',
      ...(data || {})
    })
  }

  get isViewer(): boolean { return true }

  get viewerType(): string | null { return this.state.viewerType }
  set viewerType(value) { this.state.viewerType = value }
}

registerClass(Viewer)
