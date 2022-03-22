import { reactive } from 'vue'
import random from 'lodash/random'
import shuffle from 'lodash/shuffle'
import compact from 'lodash/compact'
import { store } from './store'
import Log, { LOG_IRRELEVANT, LOG_IMPORTANT, LOG_WARN, LOG_ERROR } from './classes/log'
import { fileNouns, adjectives, filetypes, maleNames, lastNames, femaleNames } from '@/words'

export { LOG_IRRELEVANT, LOG_IMPORTANT, LOG_WARN, LOG_ERROR }

/**
 * Adds a log message to the logs store
 * @param message
 * @param icon
 * @param level
 */
export const log = (message, level = 0, icon) => {
  store.logs.update(new Log({
    message: Array.isArray(message) ? message : [message],
    icon,
    level,
  }))
}

/**
 * Adds log messages to the logs store
 * @param messages
 */
export const logs = (...messages) => {
  messages.forEach(message => {
    store.logs.update(new Log({
      message: Array.isArray(message) ? message : [message],
      level: 0,
    }))
  })
}

/**
 * Returns the opposite direction of 'd'
 * @param d
 * @returns {string}
 */
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
      // if (k === 'requirements') {
      //   console.log(s?.name || t?.name, '->', { s: s?.[k], t: t?.[k], m: m?.[k] })
      // }
    }
  })
  return { ...s, ...t, ...m }
}

/**
 * Mix properties from 'o' with a class 'cl' prototype. It handles 'state' object in a specific way.
 * @param cl
 * @param o
 */
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

/**
 * Generate an html tag with the color class with inner text
 * @param color
 * @param text
 * @returns {string}
 */
export const color = (color, text) => `<span class="${color}">${text}</span>`

/**
 * Returns a random operation timeout time in ms
 * @param size
 * @returns {number|*}
 */
export const operationTimeout = size => {
  if (!size) {
    return 0
  }
  // if (localStorage.getItem('DEV_MODE') === 'true') {
  //   return 0
  // }
  return random(size * (store.config.operationBaseDelay * 1.5))
    + store.config.operationBaseDelay
}

/**
 * Checks if the server is not busy and software is not busy and its version can operate on server
 * @param software
 * @param showMessage
 * @returns {boolean}
 */
export function checkSoftware(software, showMessage) {
  if (this.isBusy) {
    if (showMessage) {
      log(`${this.name} is locked while an operation is running on it`, LOG_ERROR, this.icon)
    }
    return false
  }
  if (software?.isBusy) {
    if (showMessage) {
      log(`${software.name} is locked while an operation is running on it`, LOG_ERROR, this.icon)
    }
    return false
  }
  if (software && software.version < this.version) {
    if (showMessage) {
      log(`You need an installed ${showMessage} v${this.version} software to execute this operation`, LOG_ERROR, this.icon)
    }
    return false
  }
  return true
}

/**
 * Call a function on the item, its location and the game itself
 * @param name
 * @param args
 * @returns {Promise<void>}
 */
export async function emit(name, ...args) {
  // self
  if (this[name]) {
    await this[name](...args)
  }

  // location
  if (this !== this.location && this.location && this.location[name]) {
    await this.location[name](this, ...args)
  }

  // player
  if (this !== store.player && store.player[name]) {
    await store.player[name](this, ...args)
  }

  // game
  if (this !== store.game && store.game[name]) {
    await store.game[name](this, ...args)
  }
}

/**
 * Picks a random element in an array
 * @param array
 * @returns {*}
 */
export const pickRandom = array => array[random(array.length - 1)]

export const arrayFromFrequencies = (array, key, frequencies) => {
  const newArray = new Array(100)
  let y = 0
  array.forEach(a => {
    const c = frequencies[a[key]]
    for (let x = 0; x < c; x++) {
      newArray[y++] = a
    }
  })
  return shuffle(newArray)
}

export const randomFilename = () => `${pickRandom(adjectives)}-${pickRandom(fileNouns)}.${pickRandom(filetypes)}`

export const randomMaleName = () => `${pickRandom(maleNames)} ${pickRandom(lastNames)}`

export const randomFemaleName = () => `${pickRandom(femaleNames)} ${pickRandom(lastNames)}`

export const delay = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const allowedDeserializeTypes = [
  'string',
  'number',
  'boolean',
]

export const deserializeElement = e => {
  if (e === null || e === undefined || allowedDeserializeTypes.includes(typeof e)) {
    return e
  // } else if (typeof e === 'function') {
  //   return e.toString()
  } else if (Array.isArray(e)) {
    return deserializeArray(e)
  } else if (typeof e === 'object') {
    return deserializeObject(e)
  }
  return undefined
}

export const deserializeObject = o => (
  Object.keys(o).reduce((acc, k) => ({ ...acc, [k]: deserializeElement(o[k]) }), [])
)

export const deserializeArray = arr => compact(arr.map(a => deserializeElement(a)))

export const serializeObject = (t, s) => {
  Object.keys({ ...s, ...t }).forEach(k => {
    if (Array.isArray(s?.[k]) && Array.isArray(t?.[k])) {
      t[k] = [...s?.[k], ...t?.[k]]
    } else if (typeof s?.[k] === 'object' && typeof t?.[k] === 'object') {
      t[k] = { ...s?.[k], ...t?.[k] }
    } else {
      t[k] = s[k]
    }
  })
}

export const can = (self, checks, showMessage, actionName) => {
  for (const check of checks) {
    if (check.expr()) {
      if (showMessage && check.log) {
        log(check.log(), LOG_ERROR, self.icon)
      }
      return false
    }
  }
  if (actionName) {
    return !(self.checkRequirementsFor && !self.checkRequirementsFor(actionName, showMessage))
  }
  return true
}

export const registeredClasses = {}

export const registerClass = k => {
  registeredClasses[k.prototype.constructor.name] = k
}

// Cannot put in log.js
registerClass(Log)
