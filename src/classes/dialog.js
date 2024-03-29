import Entity from '../entity'
import { store } from '@/store'
import { can, emit, log, LOG_WARN, mixin, registerClass } from '@/utils'
import Code from '@/mixins/code'
import Requirements from '@/mixins/requirements'

export default class Dialog extends Entity {
  includeStateKeys = ['answers', 'answerCount']

  byeAnswer = {
    code: 'bye',
    text: 'Bye',
    disabled: async () => false,
    say: async () => {
      log('You leave the conversation', LOG_WARN)
      await this.bye()
    },
  }

  setupInstance(data) {
    return super.setupInstance({
      npcId: null,
      parentId: null,
      code: null,
      text: '',
      answers: [],
      answerCount: {},
      sayCount: 0,
      ...data,
    })
  }

  get isDialog() { return true }

  setupAnswers() {
    let x = 0
    this.answers.forEach(a => {
      a.code = a.code || `${this.code}-${x}`
      a.dialogId = this.id
      a.npcId = this.npcId
      Object.defineProperty(a, 'dialog', {
        get: function () { return store.dialogs.get(this.dialogId) }.bind(this)
      })
      Object.defineProperty(a, 'npc', {
        get: function () { return store.npcs.get(this.npcId) }.bind(this)
      })
      x += 1
    })
  }

  get npcId() { return this.state.npcId }
  set npcId(value) { this.state.npcId = value }

  get npc() {
    return this.state.npcId
      ? store.npcs.get(this.state.npcId)
      : undefined
  }
  set npc(value) {
    if (value) {
      this.state.npcId = value.id
    } else {
      this.state.npcId = null
    }
  }

  get parentId() { return this.state.parentId }
  set parentId(value) { this.state.parentId = value }

  get parent() {
    return this.state.parentId
      ? store.dialogs.get(this.state.parentId)
      : undefined
  }
  set parent(value) {
    if (value) {
      this.state.parentId = value.id
    } else {
      this.state.parentId = null
    }
  }

  get code() { return this.state.code }
  set code(value) { this.state.code = value }

  get text() { return this.state.text }
  set text(value) { this.state.text = value }

  get answers() { return [...this.state.answers, this.byeAnswer] }
  set answers(value) { this.state.answers = value }

  get answerCount() { return this.state.answerCount }
  set answerCount(value) { this.state.answerCount = value }

  get sayCount() { return this.state.sayCount }
  set sayCount(value) { this.state.sayCount = value }

  getAnswer(code) { return this.answers.find(o => o.code === code) }

  addAnswer(answer) {
    if (answer.code === 'bye') {
      return false
    }
    if (!answer.code) {
      answer.code = this.answers.length
    }
    if (!this.getAnswer(answer.code)) {
      this.answers.push(answer)
      return true
    }
    return false
  }

  canSay(showMessage) {
    return can(this, [], showMessage, 'say')
  }

  async say() {
    if (!this.canSay(true)) {
      return false
    }
    store.player.dialog = this
    this.sayCount += 1
    await emit.call(this, 'onSay')
    return true
  }

  async onSay() {}

  canAnswer(code, showMessage) {
    const answer = this.getAnswer(code)
    if (typeof answer.disabled === 'function') {
      return answer.disabled.call(this)
    }
    return can(this, [
      {
        expr: () => !answer,
        log: () => `Could not find a valid answer with the code ${code}`
      },
      {
        expr: () => answer.disabled === true
      }
    ], showMessage, 'answer')
  }

  async answer(code) {
    if (this.canAnswer(code, true)) {
      const answer = this.getAnswer(code)
      this.answerCount[code] += 1
      await emit.call(this, 'onAnswer', code)
      if (answer.next) {
        await this.npc.say(answer.next)
      } else {
        await answer.say.call(this)
      }
      return true
    }
    return false
  }

  async onAnswer(code) {}

  async bye() {
    await emit.call(this, 'onBye')
    store.player.dialog = null
  }

  async onBye() {}
}

mixin(Dialog, [
  Code,
  Requirements,
])

registerClass(Dialog)
