import { reactive } from 'vue'
import merge from 'lodash/merge'
import random from 'lodash/random'
import { store } from './store'
import Log from './classes/log'

export const log = (message, level = 0) => {
  store.logs.update(new Log({
    message: Array.isArray(message) ? message : [message],
    level,
  }))
}

export const oppositeDirection = d => {
  switch (d) {
    case 'N':
      return 'S'
    case 'S':
      return 'N'
    case 'E':
      return 'W'
    case 'W':
      return 'E'
    default:
      return ''
  }
}

export const mixState = (s, t) => {
  const m = {}
  Object.keys({ ...s, ...t }).forEach(k => {
    if (Array.isArray(s?.[k]) || Array.isArray(t?.[k])) {
      m[k] = [...(s?.[k] || []), ...(t?.[k] || [])]
    }
  })
  return merge({}, s, t, m)
}

export const mixin = (cl, o) => {
  if (Array.isArray(o)) {
    o.forEach(oo => mixin(cl, oo))
    return
  }

  Object.keys(o).forEach(k => {
    const d = Object.getOwnPropertyDescriptor(o, k)
    const cd = Object.getOwnPropertyDescriptor(cl.prototype, k)
    if ((d.get || d.set) && !cd) {
      Object.defineProperty(cl.prototype, k, {
        get: d.get,
        set: d.set,
      })
    } else if (k === 'state' && typeof d.value === 'object') {
      Object.defineProperty(cl.prototype, k, {
        enumerable: true,
        writable: true,
        value: reactive(mixState(cl.prototype[k], d.value)),
      })
    } else if (!cd) {
      cl.prototype[k] = d.value
    }
  })
}

export const color = (color, text) => `<span class="${color}">${text}</span>`

export const operationTimeout = size => (
  random(size * (store.config.operationBaseDelay * 1.5))
    + store.config.operationBaseDelay
)

export function checkSoftware(software, showMessage) {
  if (this.isBusy) {
    if (showMessage) {
      log(`${this.name} is locked while an operation is running on it`)
    }
    return false
  }
  if (software?.isBusy) {
    if (showMessage) {
      log(`${software.name} is locked while an operation is running on it`)
    }
    return false
  }
  if ((software?.version || 0) < this.version) {
    if (showMessage) {
      log(`You need an installed ${showMessage} v${this.version} software to execute this operation`)
    }
    return false
  }
  return true
}

export async function emit(name) {
  // self
  if (this[name]) {
    await this[name]()
  }

  // location
  if (this.location && this.location[name]) {
    await this.location[name].call(this.location, this)
  }

  // game
  if (store.game[name]) {
    await store.game[name](this)
  }
}
