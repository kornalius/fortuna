import { reactive } from 'vue'
import dayjs from 'dayjs'
import { Howl } from 'howler'
import max from 'lodash/max'
import omit from 'lodash/omit'
import { reset, store } from '@/store'
import { soundFiles } from '@/sounds'
import { serializeObject, deserializeObject } from '@/utils'

export default class Game {
  storeName = 'game'

  constructor() {
    this.state = reactive({ ...this.defaultState })
  }

  get defaultState() {
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
      date: store.config.startDate,
      time: store.config.startTime,
      showLabels: false,
    }
  }

  get isGame() { return true }

  get date() { return this.state.date }
  set date(value) { return this.state.date = value }

  get time() { return this.state.time }
  set time(value) { return this.state.time = value }

  get day() { return dayjs(`${this.date} ${this.time}`) }
  get dayString() { return this.day.format('YYYY-MM-DD HH:mm') }

  get hasSave() { return typeof localStorage.getItem('game') === 'string' }

  get roomId() { return this.state.roomId }
  set roomId(value) { this.state.roomId = value }

  get showLabels() { return this.state.showLabels }
  set showLabels(value) { this.state.showLabels = value }

  get room() {
    return this.roomId
      ? store.rooms.get(this.roomId)
      : undefined
  }
  set room(value) {
    if (value) {
      this.roomId = value.id
    } else {
      this.roomId = null
    }
  }

  get cityId() { return this.state.cityId }
  set cityId(value) { this.state.cityId = value }

  get city() {
    return this.cityId
      ? store.cities.get(this.cityId)
      : undefined
  }
  set city(value) {
    if (value) {
      this.cityId = value.id
    } else {
      this.cityId = null
    }
  }

  get buildingId() { return this.state.buildingId }
  set buildingId(value) { this.state.buildingId = value }

  get building() {
    return this.buildingId
      ? store.buildings.get(this.buildingId)
      : undefined
  }
  set building(value) {
    if (value) {
      this.buildingId = value.id
    } else {
      this.buildingId = null
    }
  }

  get isStarted() { return this.state.started }
  get isPaused() { return this.state.paused }

  get width() { return max(store.rooms.list.map(r => r.x )) }
  get height() { return max(store.rooms.list.map(r => r.y )) }

  get minimapWidth() { return (this.width || 1) * store.config.minimapRoomSize }
  get minimapHeight() { return (this.height || 1) * store.config.minimapRoomSize }

  get showOptions() { return this.state.showOptions }
  set showOptions(value) { this.state.showOptions = value }

  get showProvince() { return this.state.showProvince }
  set showProvince(value) { this.state.showProvince = value }

  get showCityMap() { return this.state.showCityMap }
  set showCityMap(value) { this.state.showCityMap = value }

  get showLevelUp() { return this.state.showLevelUp }
  set showLevelUp(value) { this.state.showLevelUp = value }

  get showKeypad() { return this.state.showKeypad }
  set showKeypad(value) { this.state.showKeypad = value }

  get keypadId() { return this.state.keypadId }
  set keypadId(value) { this.state.keypadId = value }

  get keypad() {
    return this.keypadId
      ? store.items.get(this.keypadId)
      : undefined
  }
  set keypad(value) {
    if (value) {
      this.keypadId = value.id
    } else {
      this.keypadId = null
    }
  }

  get volume() { return this.state.volume }
  set volume(value) { this.state.volume = Math.max(0.0, Math.min(1.0, value)) }

  startTick() {
    this._interval = setInterval(() => {
      this.tick()
    }, store.config.tickInterval)
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
      const city = store.cities.findByCode(store.config.startCityCode)
      if (city) {
        await city.enter()
      }
    }
    this.startTick()
  }

  /**
   * Tick to the next time / day
   */
  tick() {
    const t = this.day.add(store.config.tickTime, 'minutes')
    this.date = t.format('YYYY-MM-DD')
    this.time = t.format('HH:mm')
    store.npcs.processAgendas()
    return t
  }

  isBetween(start, end) {
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

  loadSound(name) {
    if (typeof soundFiles[name] !== 'string') {
      return new Howl({
        ...soundFiles[name],
        src:  [`/sounds/${soundFiles[name].src}`],
      })
    } else {
      return new Howl({ src: [`/sounds/${soundFiles[name]}`] })
    }
  }

  playSound(name, volume) {
    if (!this.state.sounds[name]) {
      this.state.sounds[name] = this.loadSound(name)
      this.state.sounds[name].once('load', () => this.state.sounds[name].play())
    }
    if (volume) {
      this.state.sounds[name].volume(volume)
    }
    this.state.sounds[name].play()
  }

  pauseSound(name) {
    this.state.sounds[name].pause()
  }

  stopSound(name) {
    this.state.sounds[name].stop()
  }

  isSoundPlaying(name) {
    return this.state.sounds[name].playing()
  }

  toggleSound(name) {
    if (this.isSoundPlaying(name)) {
      this.playSound(name)
    } else {
      this.stopSound(name)
    }
  }

  async load() {
    const data = JSON.parse(localStorage.getItem('game'))
    if (data) {
      console.log('Loading game...')
      serializeObject(data.game, store.game.state)
      console.log('Loading player...')
      serializeObject(data.player, store.player.state)
      Object.keys(store).forEach(k => {
        if (!['config', 'game', 'player'].includes(k)) {
          console.log(`Loading ${k}...`)
          store[k].serialize(data[k])
        }
      })
    }
  }

  async save() {
    const data = {}
    Object.keys(store).forEach(k => {
      if (k !== 'config') {
        console.log(`Saving ${k}...`)
        data[k] = store[k].deserialize()
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
