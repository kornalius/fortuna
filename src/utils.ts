import { createApp, reactive } from 'vue'
import random from 'lodash/random'
// import shuffle from 'lodash/shuffle'
import compact from 'lodash/compact'
import { Log, LOG_IRRELEVANT, LOG_IMPORTANT, LOG_WARN, LOG_ERROR } from './classes/log'
import { fileNouns, adjectives, filetypes, maleNames, lastNames, femaleNames } from '@/words'
import icons from '@/icons'
import Icon from '@/components/Icon.vue'
import { Software } from '@/classes/softwares/software'

export type AnyData = { [key: string]: any }

export { LOG_IRRELEVANT, LOG_IMPORTANT, LOG_WARN, LOG_ERROR }

/**
 * Adds a log message to the logs store
 * @param message
 * @param icon
 * @param level
 */
export const log = (message: string[] | string, level: number = 0, icon?: string | null): void => {
  window.store.logs.update(new Log({
    message: Array.isArray(message) ? message : [message],
    icon: icon ? icon : null,
    level,
  }))
}

/**
 * Adds log messages to the logs store
 * @param messages
 */
export const logs = (...messages: string[]): void => {
  messages.forEach(message => {
    window.store.logs.update(new Log({
      message: Array.isArray(message) ? message : [message],
      icon: null,
      level: 0,
    }))
  })
}

/**
 * Returns the opposite direction of 'd'
 * @param d
 * @returns {string}
 */
export const oppositeDirection = (d?: string): string => {
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

export const mixState = (s: { [key: string]: any }, t: { [key: string]: any }): { [key: string]: any } => {
  const m: { [key: string]: any } = {}
  const o: { [key: string]: any } = { ...s, ...t }
  Object.keys(o).forEach(k => {
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
export const mixin = (cl: Constructor, o: AnyData[] | AnyData): void => {
  if (Array.isArray(o)) {
    o.forEach(oo => mixin(cl, oo))
    return
  }

  Object.keys(o).forEach(k => {
    const d = Object.getOwnPropertyDescriptor(o, k)
    const cd = Object.getOwnPropertyDescriptor(cl.prototype, k)
    if ((d?.get || d?.set) && !cd) {
      Object.defineProperty(cl.prototype, k, {
        get: d.get,
        set: d.set,
      })
    } else if (k === 'state' && typeof d?.value === 'object') {
      Object.defineProperty(cl.prototype, k, {
        enumerable: true,
        writable: true,
        value: reactive(mixState(cl.prototype[k], d.value)),
      })
    } else if (typeof cd?.value === 'function' && typeof d?.value === 'function') {
      const pr = cl.prototype[k]
      cl.prototype[k] = function (...args: any[]) {
        pr.apply(this, args)
        d.value.apply(this, args)
      }
    } else if (!cd && d) {
      cl.prototype[k] = d.value
    }
  })

  // console.log(cl.prototype.constructor.name, cl.prototype)
}

/**
 * Generate an html tag with the color class with inner text
 * @param color
 * @param text
 * @returns {string}
 */
export const color = (color: string, text: string): string => `<span class="${color}">${text}</span>`

/**
 * Generate an icon tag
 *
 * @param icon
 * @param scale
 */
export const icon = (icon: string, scale: number = 1): string => (
  render(`<icon icon="${icons[icon]}" :scale="${scale}" />`)
)

/**
 * Render a Vue template string into an HTML string
 *
 * @param template
 * @returns {string}
 */
export const render = (template: string | object | undefined): string => {
  const id = `render-${window.nanoid()}`
  const el = document.createElement('span')
  el.setAttribute('id', id)
  setTimeout(() => {
    createApp({ template })
      .component('icon', Icon)
      .mount(`#${id}`)
  })
  return el.outerHTML
}

/**
 * Returns a random operation timeout time in ms
 * @param size
 * @returns {number|*}
 */
export const operationTimeout = (size?: number): number => {
  if (!size) {
    return 0
  }
  if (localStorage.getItem('DEV_MODE') === 'true') {
    return 100
  }
  return random(size * (window.store.config.operationBaseDelay * 1.5))
    + window.store.config.operationBaseDelay
}

/**
 * Checks if the server is not busy and software is not busy and its version can operate on server
 * @param self
 * @param software
 * @param showMessage
 * @returns {boolean}
 */
export function checkSoftware(self: any, software?: Software, showMessage?: boolean): boolean {
  return can(self, [
    {
      expr: () => self.isBusy,
      log: () => `${self.nameProper} is locked while an operation is running on it`,
    },
    {
      expr: () => software?.isBusy,
      log: () => `${software?.nameProper} is locked while an operation is running on it`,
    },
    {
      expr: () => software && software.version < self.version,
      log: () => `You need an installed ${showMessage} v${self.version} software to execute this operation`,
    },
  ], showMessage)
}

/**
 * Call a function on the item, its location and the game itself
 * @param self
 * @param name
 * @param args
 * @returns {Promise<void>}
 */
export async function emit(self: any, name: string, ...args: any[]): Promise<void> {
  if (self[name]) {
    await self[name](...args)
  }

  // location
  if (self !== self.location && self.location && self.location[name]) {
    await self.location[name](self, ...args)
  }

  // player
  if (self !== window.store.player && (window.store.player as any)[name]) {
    await (window.store.player as any)[name](self, ...args)
  }

  // game
  if (self !== window.store.game && (window.store.game as any)[name]) {
    await (window.store.game as any)[name](self, ...args)
  }
}

/**
 * Picks a random element in an array
 * @param array
 * @returns {*}
 */
export const pickRandom = (array: any[]): any => array[random(array.length - 1)]

// export const arrayFromFrequencies = (array, key, frequencies) => {
//   const newArray = new Array(100)
//   let y = 0
//   array.forEach(a => {
//     const c = frequencies[a[key]]
//     for (let x = 0; x < c; x++) {
//       newArray[y++] = a
//     }
//   })
//   return shuffle(newArray)
// }

export const randomFilename = (): string => `${pickRandom(adjectives)}-${pickRandom(fileNouns)}.${pickRandom(filetypes)}`

export const randomMaleName = (): string => `${pickRandom(maleNames)} ${pickRandom(lastNames)}`

export const randomFemaleName = (): string => `${pickRandom(femaleNames)} ${pickRandom(lastNames)}`

export const delay = (time: number): Promise<void> => {
  return new Promise((resolve: () => void) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const allowedDeserializeTypes: string[] = [
  'string',
  'number',
  'boolean',
]

export const deserializeElement = (e: any): any => {
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

export const deserializeObject = (o: any): any => (
  Object.keys(o).reduce((acc, k) => ({ ...acc, [k]: deserializeElement(o[k]) }), {})
)

export const deserializeArray = (arr: any[]): any[] => compact(arr.map(a => deserializeElement(a)))

export const serializeObject = (t: any, s: any) => {
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

export interface ICheck {
  expr: () => boolean
  log?: () => string
  level?: number
  icon?: string
}

export const can = (self: any, checks: ICheck[], showMessage?: boolean, actionName?: string) => {
  for (const check of checks) {
    if (check.expr()) {
      if (showMessage && check.log) {
        log(check.log(), check.level || LOG_ERROR, check.icon || self.icon)
      }
      return false
    }
  }
  if (actionName) {
    return !(self.checkRequirementsFor && !self.checkRequirementsFor(actionName, showMessage))
  }
  return true
}

export type Constructor = new (...args: any[]) => Object

export const registeredClasses: { [key: string]: Constructor } = {}

export const registerClass = (k: Constructor) => {
  registeredClasses[k.prototype.constructor.name] = k
}

// Cannot put in log.js
registerClass(Log)
