import { registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'

export class Director extends Npc {
  setupInstance(data?: INpcData): SetupData | undefined {
    return super.setupInstance({
      name: 'Director',
      icon: 'director',
      ...(data || {})
    })
  }
}

registerClass(Director)
