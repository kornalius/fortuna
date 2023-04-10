import { SetupData } from '@/entity'
import { emit, mixin, registerClass } from '@/utils'
import { ICode, Code } from '@/mixins/code'
import { IName, Name } from '@/mixins/name'
import { IDescription, Description } from '@/mixins/description'
import { IIcon, Icon } from '@/mixins/icon'
import { IHovered, Hovered } from '@/mixins/hovered'
import { ILocation, Location } from '@/mixins/location'
import { IActions, Actions } from '@/mixins/actions'
import { IExaminable, Examinable } from '@/mixins/examinable'
import { IOpenable, Openable } from '@/mixins/openable'
import { ISearchable, Searchable } from '@/mixins/searchable'
import { IUnlockable, Unlockable } from '@/mixins/unlockable'
import { IPushable, Pushable } from '@/mixins/pushable'
import { IPullable, Pullable } from '@/mixins/pullable'
import { IItems, Items } from '@/mixins/items'
import { IRequirements, Requirements } from '@/mixins/requirements'
import { ITooltip, Tooltip } from '@/mixins/tooltip'
import { Item } from '@/classes/items/item'

export interface Container extends
  ICode,
  IName,
  IDescription,
  IIcon,
  IHovered,
  ILocation,
  IActions,
  IExaminable,
  IOpenable,
  ISearchable,
  IUnlockable,
  IPushable,
  IPullable,
  IItems,
  IRequirements,
  ITooltip
{}

export class Container extends Item {
  setupInstance(data?: SetupData): SetupData | undefined {
    const { locationId, locationStore } = this.setupLocation(data)

    return super.setupInstance({
      name: 'Container',
      locationId,
      locationStore,
      ...(data || {})
    })
  }

  get isContainer(): boolean { return true }

  get isInInventory(): boolean { return window.store.player.has(this) }

  async onOpen(): Promise<void> {
    this.items.forEach(i => {
      emit(i, 'onReveal')
    })
  }

  async onClose(): Promise<void> {
    this.items.forEach(i => {
      emit(i, 'onConceal')
    })
  }
}

mixin(Container, [
  Code,
  Name,
  Description,
  Icon,
  Hovered,
  Location,
  Actions,
  Examinable,
  Openable,
  Searchable,
  Unlockable,
  Pushable,
  Pullable,
  Items,
  Requirements,
  Tooltip,
])

registerClass(Container)
