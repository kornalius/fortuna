import { reactive } from 'vue'
import { store } from './store'
import Log from './classes/log'
import merge from 'lodash/merge';

export const log = (message, target) => {
  store.logs.update(new Log({ message, target }))
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
    if (d.get || d.set) {
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
    } else {
      cl.prototype[k] = d.value
    }
  })
}

export const color = (color, text) => `<span class="${color}">${text}</span>`
