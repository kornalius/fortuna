import { registerClass } from '@/utils'
import { IRandomRoomData, RandomRoom } from '@/classes/rooms/random-room'
import { SetupData } from '@/entity'
import { ClassDefinition } from '@/generators'
import { Smartphone } from '@/classes/items/electronic/smartphone'
import { Mirror } from '@/classes/items/furniture/mirror'
import { CeilingLight } from '@/classes/items/light/ceiling-light'
import { TrashCan } from '@/classes/containers/trash-can'
import { FirstAidKit } from '@/classes/containers/first-aid-kit'
import { Toilet } from '@/classes/containers/toilet'
import { Bathtub } from '@/classes/containers/bathtub'
import { ToiletPaperWall } from '@/classes/items/toilet-paper-wall'
import { ToiletPaper } from '@/classes/items/toilet-paper'
import { TissueBox } from '@/classes/containers/tissue-box'

export class RandomBathRoom extends RandomRoom {
  setupInstance(data?: IRandomRoomData): SetupData | undefined {
    return super.setupInstance({
      name: 'Random bathroom',
      randomItems: [
        [Smartphone, 0, 1],
        [Mirror, 0, 1],
        [CeilingLight, 1],
        [TrashCan, 0, 1],
        [FirstAidKit, 0, 1],
        [Toilet, 1],
        [ToiletPaperWall, 1],
        [Bathtub, 1],
        [ToiletPaper, 0, 3],
        [TissueBox, 0, 1],
        ...(data?.randomItems || []),
      ] as ClassDefinition[],
      ...(data || {}),
    })
  }
}

registerClass(RandomBathRoom)
