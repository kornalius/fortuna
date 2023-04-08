import { Entity, SetupData } from '@/entity'
import { mixin, registerClass } from '@/utils'
import { Code } from '@/mixins/code'
import { Name } from '@/mixins/name'
import { Description } from '@/mixins/description'
import { Icon } from '@/mixins/icon'
import { Hovered } from '@/mixins/hovered'
import { Location } from '@/mixins/location'
import { Actions } from '@/mixins/actions'
import { IExaminable } from '@/mixins/examinable'
import { IOpenable } from '@/mixins/openable'
import { ISearchable } from '@/mixins/searchable'
import { IUnlockable } from '@/mixins/unlockable'
import { IPushable } from '@/mixins/pushable'
import { IPullable } from '@/mixins/pullable'
import { IItems } from '@/mixins/items'
import { IRequirements } from '@/mixins/requirements'
import { Tooltip } from '@/mixins/tooltip'

export interface Container extends
  Code,
  Name,
  Description,
  Icon,
  Hovered,
  Location,
  Actions,
  IExaminable,
  IOpenable,
  ISearchable,
  IUnlockable,
  IPushable,
  IPullable,
  IItems,
  IRequirements,
  Tooltip
{}

export class Container extends Entity {
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
}

mixin(Container, [
  Code,
  Name,
  Description,
  Icon,
  Hovered,
  Location,
  Actions,
  IExaminable,
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
