import { can, emit, registerClass } from '@/utils'
import { ISoftwareData, Software } from '@/classes/softwares/software'
import { SetupData } from '@/entity'
import { IDropdownItem } from '@/mixins/actions'

export class Cracker extends Software {
  setupInstance(data?: ISoftwareData): SetupData | undefined {
    return super.setupInstance({
      name: 'Cracker',
      installType: 'cracker',
      actions: [
        (item: Cracker): IDropdownItem | undefined => (
          {
            label: 'Use',
            key: 'crack',
            icon: 'gearWhite',
            disabled: !item.canCrack(),
            click: () => item.crack(),
          }
        ),
      ],
      actionsOrder: [
        'examine',
        'crack',
        'install',
        'uninstall',
        'delete',
      ],
      ...(data || {})
    })
  }

  get isCracker(): boolean { return true }

  canCrack(showMessage?: boolean): boolean {
    if (!can(this, [
      {
        expr: () => !window.store.player.server,
        log: () => `You need to be connected to a terminal first`,
      },
    ], showMessage)) {
      return false
    }
    return window.store.player.server?.canCrack(showMessage) || false
  }

  async crack(): Promise<boolean> {
    if (!this.canCrack(true)) {
      return false
    }
    if (window.store.player.server && await window.store.player.server.crack()) {
      await emit(this, 'onCrack')
      return true
    }
    return false
  }

  async onUse(): Promise<void> {}
}

registerClass(Cracker)
