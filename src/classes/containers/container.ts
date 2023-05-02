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
import { IOpenable, IOpenableData, Openable } from '@/mixins/openable'
import { ISearchable, ISearchableData, Searchable } from '@/mixins/searchable'
import { IUnlockable, IUnlockableData, Unlockable } from '@/mixins/unlockable'
import { IPushable, Pushable } from '@/mixins/pushable'
import { IPullable, Pullable } from '@/mixins/pullable'
import { IItems, IItemsData, Items } from '@/mixins/items'
import { IRequirements, Requirements } from '@/mixins/requirements'
import { ITooltip, Tooltip } from '@/mixins/tooltip'
import { IItemData, Item } from '@/classes/items/item'
import { IRandomItems, IRandomItemsData, RandomItems } from '@/mixins/random-items'

export interface IContainerData extends
  IItemData,
  IOpenableData,
  ISearchableData,
  IUnlockableData,
  IItemsData,
  IRandomItemsData
{}

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
  ITooltip,
  IRandomItems
{}

export class Container extends Item {
  setupInstance(data?: IContainerData): SetupData | undefined {
    const { locationId, locationStore } = this.setupLocation(data as SetupData)

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
  RandomItems
])

registerClass(Container)
