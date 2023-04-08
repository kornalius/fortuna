import { registerClass } from '@/utils'
import { Electronic } from './electronic'
import { SetupData } from '@/entity'

export class PDA extends Electronic {
  setupInstance(data?: SetupData): SetupData | undefined {
    return super.setupInstance({
      name: 'PDA',
      icon: 'pda',
      ...(data || {})
    })
  }
}

registerClass(PDA)
