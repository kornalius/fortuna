/**
 * Add an image state to the object
 */

import { State } from '@/entity'

export interface IImageSetupData {
  // image name
  img?: string | null,
}

export interface IImage {
  state: State
  get img(): string | null
  set img(value)
}

export const Image: IImage = {
  state: {
    img: null,
  } as IImageSetupData,

  get img(): string | null { return `images/${this.state.img}` },
  set img(value) { this.state.img = value },
}
