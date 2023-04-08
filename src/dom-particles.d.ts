import { AnyData } from '@/utils'

declare module 'dom-particles' {
  export interface EmitterOptions {
    heading?: number
    maxEmissions?: number
    ttl?: number
    emitEvery?: number
    position?: { x?: number, y?: number, z?: number },
    velocity?: { x?: number, y?: number, z?: number },
    onCreate?(): void
    onUpdate?(): void
    onDestroy?(): void
  }

  export interface ParticleOptions {
    heading?: boolean
    grid?: boolean
    ttl?: number
    content?: string
    style?: CSSStyleDeclaration
    onCreate?(particle: TextParticle): void
    onUpdate?(particle: TextParticle): void
    onDestroy?(particle: TextParticle): void
  }

  export interface ParticleManager {
    max?: number
    preallocate?: number
    tagName?: string
    autostart?: boolean
  }

  export class TextParticle {
    constructor(options: ParticleOptions)
    get alive(): boolean
    get lifeFrac(): number
    buildProps(propObject: AnyData): void
    setContents(html: string): void
    setText(text: string): void
    setStyleText(text: string): void
    updateStyle(style: CSSStyleDeclaration): void
    getSnapshot(): AnyData
    getScaledTransform(snapshot: AnyData): string
    getTransform(scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number): string
    getGridTransform(scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number): string
    update(delta: number): void
  }

  export class TextParticleEmitter {
    constructor(options: EmitterOptions)
    get alive(): boolean
    update(delta: number): void
  }

  export default class TextParticleManager {
    addParticle(options: ParticleOptions): TextParticle
    addEmitter(options: EmitterOptions): TextParticleEmitter
    start(): void
    reset(): void
    clearEmitters(): void
    _update(timestamp: number): void
    _push(el: HTMLElement): void
    _pop(): HTMLElement
    _create(): HTMLElement
    _allocate(count: number): void
  }
}
