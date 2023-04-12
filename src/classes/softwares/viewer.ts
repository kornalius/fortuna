import { registerClass } from '@/utils'
import { ISoftwareData, Software } from '@/classes/softwares/software'
import { SetupData } from '@/entity'

export interface IViewerData extends ISoftwareData {
  // what type of files can you view
  viewerType?: string | null
}

export class Viewer extends Software {
  constructor(data?: IViewerData) {
    super(data)
  }

  setupInstance(data?: IViewerData): SetupData | undefined {
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
