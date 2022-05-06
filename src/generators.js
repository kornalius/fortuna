import random from 'lodash/random'
import { pickRandom } from '@/utils'
import { bookNames } from '@/words'
import Book from '@/classes/items/book'

/**
 * Generate random requirements based on types and max values passed
 *
 * @param types {object[]} { name: actionName, attrName: maxRandomValue, ... }
 * @returns {object}
 */
export const requirements = types => (
  types.map(t => {
    const r = { name: t.name }
    Object.keys(t).forEach(key => {
      if (key !== 'name') {
        r[key] = random(1, t[key])
      }
    })
    return r
  })
)

/**
 * Generate random books with random INT requirements
 *
 * @param min {number} minimum number of books to generate
 * @param max {number} maximum number of books to generate
 * @returns {Book[]}
 */
export const books = (min = 1, max = 5) => {
  return new Array(random(min, max)).fill(0).map(() => {
    const r = requirements([{ name: 'use', int: 4 }])
    const { int } = r[0]
    return new Book({
      name: pickRandom(bookNames),
      requirements: r,
      uses: 1,
      async onUse() {
        store.player.xp += (int * 100)
      },
    })
  })
}

/**
 * Generate random loot from a list of classes or objects
 *
 * @param classesOrInstances {Class[] | object[]} classes or objects to choose from
 * @param min {number} minimum number to generate
 * @param max {number} maximum number to generate
 * @returns {object[]} array of instances
 */
export const loot = (classesOrInstances, min = 1, max = 5) => {
  return new Array(random(min, max)).fill(0).map(() => {
    const coi = pickRandom(classesOrInstances)
    if (typeof coi === 'function') {
      return new coi()
    }
    return coi
  })
}

/**
 * Generate items from a list classes and their quantities
 *
 * @param classes {[][]} classes and quantities object
 *  ex: [[LightSwitch, 1], [Chair, 0, 4], ...]
 * @returns {object[]} array of instances
 */
export const randomItems = (classes) => {
  const instances = []
  classes.forEach(c => {
    let qty = c[1]
    if (c.length === 3) {
      qty = random(c[1], c[2])
    }
    for (let i = 0; i < qty; i++) {
      instances.push(new c[0]())
    }
  })

  return instances
}

export const search = (self, content) => {
  content.forEach(c => {
    let q = c.qty || 1
    if (Array.isArray(c.qty) && c.qty.length === 2) {
      q = random(c.qty[0], c.qty[1])
    }
    self.addItem(new c.klass({ qty: q }))
  })
}
