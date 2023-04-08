import { reactive } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { Howl } from 'howler'
import max from 'lodash/max'
import omit from 'lodash/omit'
import { reset } from '@/store'
import { soundFiles } from '@/sounds'
import { serializeObject, deserializeObject, AnyData } from '@/utils'
import { Item } from '@/classes/items/item'
import { City } from '@/classes/city'
import { Building } from '@/classes/buildings/building'
import { Room } from '@/classes/rooms/room'

export interface GameState {
  started: boolean
  paused: boolean
  cityId: string | null
  buildingId: string | null
  roomId: string | null
  sounds: { [key: string]: Howl }
  showOptions: boolean
  showProvince: boolean
  showCityMap: boolean
  showLevelUp: boolean
  showKeypad: boolean
  keypadId: string | null
  volume: number
  crt: boolean
  showLabels: boolean
  showIconsList: boolean
  date: string
  time: string
}

export class Game {
  storeName = 'game'

  state = reactive<GameState>({ ...this.defaultState })

  get defaultState(): GameState {
    return {
      started: false,
      paused: false,
      cityId: null,
      buildingId: null,
      roomId: null,
      sounds: {},
      showOptions: false,
      showProvince: false,
      showCityMap: false,
      showLevelUp: false,
      showKeypad: false,
      keypadId: null,
      volume: 0.1,
      crt: true,
      showLabels: false,
      showIconsList: false,
      date: window.store.config.startDate,
      time: window.store.config.startTime,
    }
  }

  private _interval: number = 0

  get isGame(): boolean { return true }

  get date(): string { return this.state.date }
  set date(value) { this.state.date = value }

  get time(): string { return this.state.time }
  set time(value) { this.state.time = value }

  get day(): Dayjs { return dayjs(`${this.date} ${this.time}`) }
  get dayString(): string { return this.day.format('YYYY-MM-DD HH:mm') }

  get hasSave(): boolean { return typeof localStorage.getItem('game') === 'string' }

  get showLabels(): boolean { return this.state.showLabels }
  set showLabels(value) { this.state.showLabels = value }

  get showIconsList(): boolean { return this.state.showIconsList }
  set showIconsList(value) { this.state.showIconsList = value }

  get roomId(): string | null { return this.state.roomId }
  set roomId(value) { this.state.roomId = value }

  get room(): Room | undefined { return window.store.rooms.get(this.roomId) }
  set room(value: Room | undefined | null) {
    if (value) {
      this.roomId = value.id
    } else {
      this.roomId = null
    }
  }

  get cityId(): string | null { return this.state.cityId }
  set cityId(value) { this.state.cityId = value }

  get city(): City | undefined { return window.store.cities.get(this.cityId)  }
  set city(value: City | undefined | null) {
    if (value) {
      this.cityId = value.id
    } else {
      this.cityId = null
    }
  }

  get buildingId(): string | null { return this.state.buildingId }
  set buildingId(value) { this.state.buildingId = value }

  get building(): Building | undefined { return window.store.buildings.get(this.buildingId) }
  set building(value: Building | undefined | null) {
    if (value) {
      this.buildingId = value.id
    } else {
      this.buildingId = null
    }
  }

  get isStarted(): boolean { return this.state.started }
  get isPaused(): boolean { return this.state.paused }

  get width(): number {
    return max(window.store.rooms.list.map(r => r.x)) as number
  }

  get height(): number {
    return max(window.store.rooms.list.map(r => r.y )) as number
  }

  get minimapWidth(): number { return (this.width || 1) * window.store.config.minimapRoomSize }
  get minimapHeight(): number { return (this.height || 1) * window.store.config.minimapRoomSize }

  get showOptions(): boolean { return this.state.showOptions }
  set showOptions(value) { this.state.showOptions = value }

  get showProvince(): boolean { return this.state.showProvince }
  set showProvince(value) { this.state.showProvince = value }

  get showCityMap(): boolean { return this.state.showCityMap }
  set showCityMap(value) { this.state.showCityMap = value }

  get showLevelUp(): boolean { return this.state.showLevelUp }
  set showLevelUp(value) { this.state.showLevelUp = value }

  get showKeypad(): boolean { return this.state.showKeypad }
  set showKeypad(value) { this.state.showKeypad = value }

  get keypadId(): string | null { return this.state.keypadId }
  set keypadId(value) {
    // @ts-ignore
    this.state.keypadId = value
  }

  get keypad(): Item | undefined {
    return this.keypadId
      ? window.store.items.get(this.keypadId)
      : undefined
  }
  set keypad(value: Item | undefined | null) {
    if (value) {
      this.keypadId = value.id
    } else {
      this.keypadId = null
    }
  }

  get volume(): number { return this.state.volume }
  set volume(value) { this.state.volume = Math.max(0.0, Math.min(1.0, value)) }

  get crt(): boolean { return this.state.crt }
  set crt(value) { this.state.crt = value }

  startTick() {
    this._interval = window.setInterval(async () => {
      await this.tick()
    }, window.store.config.tickInterval)
  }

  stopTick() {
    clearInterval(this._interval)
    this._interval = 0
  }

  async start() {
    if (this.state.paused) {
      window.location.reload()
      return
    }
    this.state.started = true
    if (!this.city) {
      const city = window.store.cities.findByCode(window.store.config.startCityCode) as City
      if (city) {
        await city.enter()
      }
    }
    this.startTick()
  }

  /**
   * Tick to the next time / day
   */
  async tick() {
    const t = this.day.add(window.store.config.tickTime, 'minutes')
    this.date = t.format('YYYY-MM-DD')
    this.time = t.format('HH:mm')
    await window.store.npcs.processAgendas()
    return t
  }

  isBetween(start: string | number | Dayjs | null, end: string | number | Dayjs | null): boolean {
    const t = this.day
    const s = dayjs(start)
    const e = dayjs(end)
    return t.isSameOrAfter(s) && t.isSameOrBefore(e)
  }

  pause() {
    this.state.paused = true
    this.stopTick()
  }

  resume() {
    this.state.paused = false
    this.startTick()
  }

  loadSound(name: string): Howl {
    if (typeof soundFiles[name] !== 'string') {
      return new Howl({
        ...soundFiles[name],
        src:  [`/sounds/${soundFiles[name].src}`],
      })
    } else {
      return new Howl({ src: [`/sounds/${soundFiles[name]}`] })
    }
  }

  playSound(name: string, volume?: number) {
    if (!this.state.sounds[name]) {
      this.state.sounds[name] = this.loadSound(name)
      this.state.sounds[name].once('load', () => this.state.sounds[name].play())
    }
    if (volume) {
      this.state.sounds[name].volume(volume)
    }
    this.state.sounds[name].play()
  }

  pauseSound(name: string) {
    this.state.sounds[name].pause()
  }

  stopSound(name: string) {
    this.state.sounds[name].stop()
  }

  isSoundPlaying(name: string) {
    return this.state.sounds[name].playing()
  }

  toggleSound(name: string) {
    if (this.isSoundPlaying(name)) {
      this.playSound(name)
    } else {
      this.stopSound(name)
    }
  }

  async load() {
    const data = JSON.parse(localStorage.getItem('game') || 'undefined')
    if (data) {
      console.log('Loading game...')
      serializeObject(data.game, window.store.game.state)
      console.log('Loading player...')
      serializeObject(data.player, window.store.player.state)
      Object.keys(window.store).forEach(k => {
        if (!['config', 'game', 'player'].includes(k)) {
          console.log(`Loading ${k}...`);
          (window.store as AnyData)[k].serialize(data[k])
        }
      })
    }
  }

  async save() {
    const data: AnyData = {}
    Object.keys(window.store).forEach(k => {
      if (k !== 'config') {
        console.log(`Saving ${k}...`)
        data[k] = (window.store as AnyData)[k].deserialize()
      }
    })
    localStorage.setItem('game', JSON.stringify(data))
  }

  async delete() {
    localStorage.removeItem('game')
  }

  async reset() {
    Object.keys(this.defaultState).forEach(k => {
      if (k !== 'sounds') {
        // @ts-ignore
        this.state[k] = this.defaultState[k]
      }
    })
  }

  async restart() {
    await this.delete()
    await reset()
    await this.start()
  }

  deserialize() {
    return deserializeObject(omit(this.state, ['sounds']))
  }
}
