import Light from './light'
import { log, registerClass } from '@/utils'

export default class LightSwitch extends Light {
  setupInstance(data) {
    return super.setupInstance({
      name: 'Light switch',
      icon: 'lightSwitch',
      ...data,
    })
  }

  async onExamine() {
    log('It\'s a normal looking light switch, nothing special about it other than the little button in the middle', 0, this.icon)
    return super.onExamine()
  }
}

registerClass(LightSwitch)
