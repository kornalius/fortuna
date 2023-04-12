/**
 * Adds actions requirements to an object. Before executing an action, it will check its requirements
 */

import { AnyData, log, LOG_WARN } from '@/utils'
import { State } from '@/entity'
import { IIcon, IIconSetupData } from './icon'

export interface IRequirement {
  name: string
  dex?: number
  str?: number
  int?: number
  ram?: number
  disk?: number
  lvl?: number
  credits?: number
}

const attrIcons: { [key: string]: string } = {
  lvl: '🌟',
  str: '💪',
  dex: '🏃',
  int: '🧠',
  credits: '💳',
}

export interface IRequirementsSetupData extends
  IIconSetupData
{
  // requirements for an action [{ name: actionName, attrName: value... }]
  requirements?: IRequirement[]
}

export interface IRequirements extends
  IIcon
{
  state: State
  get requirements(): IRequirement[]
  set requirements(value)
  checkRequirementsFor(actionName: string, showMessage?: boolean): boolean
  requirementsLabelFor(actionName: string): string
}

// @ts-ignore
export const Requirements: IRequirements = {
  state: {
    requirements: [],
  },

  get requirements(): IRequirement[] { return this.state.requirements },
  set requirements(value) { this.state.requirements = value },

  /**
   * Checks if all requirements are met
   *
   * @param actionName {string}
   * @param showMessage {boolean}
   * @returns {boolean}
   */
  checkRequirementsFor(actionName: string, showMessage?: boolean): boolean {
    const requirements = this.requirements.filter(r => r.name === actionName)
    for (let requirement of requirements) {
      for (let attr in requirement) {
        if (attr !== 'name') {
          const v = (requirement as AnyData)[attr]
          if ((window.store.player as AnyData)[attr] < v) {
            if (showMessage) {
              log(`Requirement not met for ${attr}, must be greater or equal to ${v}`, LOG_WARN, this.icon)
            }
            return false
          }
        }
      }
    }
    return true
  },

  /**
   * Build a requirements string for display purposes
   *
   * @param actionName {string}
   * @returns {string}
   */
  requirementsLabelFor(actionName: string): string {
    const labels: string[] = []
    const requirements = this.requirements.filter(r => r.name === actionName)
    for (let requirement of requirements) {
      Object.keys(requirement).forEach(attr => {
        if (attr !== 'name') {
          const v = (requirement as AnyData)[attr]
          // @ts-ignore
          if (window.store.player[attr] < v) {
            labels.push(`${attrIcons[attr]} ${v}`)
          }
        }
      })
    }
    return labels.length ? `(${labels.join(', ')})` : ''
  },
}
