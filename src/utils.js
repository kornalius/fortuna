import { reactive } from 'vue'
import { store } from './store'
import Log from './classes/log'

export const log = (message, target) => {
  store.logs.update(new Log({ message, target }))
}

export const loadRoom = (f) => {
  const { room, items, doors } = f()
  if (room) {
    store.rooms.update(room)
  }
  if (doors) {
    store.doors.update(doors)
  }
  if (items) {
    store.items.update(items)
  }
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
        value: reactive({ ...cl.prototype[k], ...d.value}),
      })
    } else {
      cl.prototype[k] = d.value
    }
  })
}
