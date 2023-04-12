import { Entity, IEntityData, SetupData } from '../entity'
import { can, emit, log, LOG_WARN, mixin, registerClass } from '@/utils'
import { ICode, Code, ICodeData } from '@/mixins/code'
import { IRequirements, IRequirementsData, Requirements } from '@/mixins/requirements'
import { Npc } from '@/classes/npcs/npc'

export interface IDialog {
  code: string
  text: string
  npcId: string | null
  readonly npc?: Npc | undefined
  dialogId: string | null
  readonly dialog?: Dialog | undefined
  say?: () => Promise<void>
  onSay?: () => Promise<void>
}

export interface IAnswer {
  code: string
  next?: string
  text: string
  npcId: string | null
  readonly npc?: Npc | undefined
  dialogId: string | null
  readonly dialog?: Dialog | undefined
  disabled?: boolean | (() => boolean)
  say?: () => Promise<void>
  onSay?: () => Promise<void>
}

export type AnswerCount = { [key: string]: number }

export interface IDialogData extends
  IEntityData,
  ICodeData,
  IRequirementsData
{
  npcId?: string | null
  parentId?: string | null
  text?: string | null
  answers?: IAnswer[]
  answerCount?: AnswerCount
  sayCount?: number
}

export interface Dialog extends
  ICode,
  IRequirements
{}

export class Dialog extends Entity {
  byeAnswer: IAnswer = {
    code: 'bye',
    text: 'Bye',
    npcId: null,
    dialogId: null,
    disabled: () => false,
    say: async () => {
      log('You leave the conversation', LOG_WARN)
      await this.bye()
    },
  }

  constructor(data?: IDialogData) {
    super(data)
  }

  setupInstance(data?: IDialogData): SetupData | undefined {
    return super.setupInstance({
      npcId: null,
      parentId: null,
      code: null,
      text: '',
      answers: [],
      answerCount: {},
      sayCount: 0,
      ...(data || {})
    })
  }

  get isDialog(): boolean { return true }

  setupAnswer(a: IAnswer, idx: number): void {
    a.code = a.code || `${this.code}-${idx}`
    a.dialogId = this.id
    a.npcId = this.npcId
    Object.defineProperty(a, 'dialog', {
      get: function (): Dialog | undefined { return window.store.dialogs.get(a.dialogId) }.bind(a)
    })
    Object.defineProperty(a, 'npc', {
      get: function (): Npc | undefined { return window.store.npcs.get(a.npcId) }.bind(a)
    })
  }

  setupAnswers(): void {
    let x = 0
    this.answers.forEach(a => {
      this.setupAnswer(a, x)
      x += 1
    })
  }

  get npcId(): string | null { return this.state.npcId }
  set npcId(value) { this.state.npcId = value }

  get npc(): Npc | undefined { return window.store.npcs.get(this.state.npcId) }
  set npc(value: Npc | undefined | null) { this.state.npcId = value?.id || null }

  get parentId(): string | null { return this.state.parentId }
  set parentId(value) { this.state.parentId = value }

  get parent(): Npc | undefined { return window.store.npcs.get(this.state.parentId) }
  set parent(value: Npc | undefined | null) { this.state.parentId = value?.id || null }

  get text(): string | null { return this.state.text }
  set text(value) { this.state.text = value }

  get answers(): IAnswer[] { return [...this.state.answers, this.byeAnswer] }
  set answers(value) { this.state.answers = value }

  get answerCount(): AnswerCount { return this.state.answerCount }
  set answerCount(value) { this.state.answerCount = value }

  get sayCount(): number { return this.state.sayCount }
  set sayCount(value) { this.state.sayCount = value }

  getAnswer(code: string): IAnswer | undefined { return this.answers.find(o => o.code === code) }

  addAnswer(answer: IAnswer): boolean {
    if (answer.code === 'bye') {
      return false
    }
    if (!answer.code) {
      answer.code = String(this.answers.length)
    }
    if (!this.getAnswer(answer.code)) {
      this.setupAnswer(answer, this.answers.length)
      this.answers.push(answer)
      return true
    }
    return false
  }

  canSay(showMessage?: boolean): boolean {
    return can(this, [], showMessage, 'say')
  }

  async say(): Promise<boolean> {
    if (!this.canSay(true)) {
      return false
    }
    window.store.player.dialog = this
    this.sayCount += 1
    await emit(this, 'onSay')
    return true
  }

  async onSay(): Promise<void> {}

  canAnswer(code: string, showMessage?: boolean): boolean {
    const answer = this.getAnswer(code)
    if (answer) {
      return can(this, [
        {
          expr: () => !answer,
          log: () => `Could not find a valid answer with the code ${code}`
        },
        {
          expr: () => {
            if (typeof answer.disabled === 'function') {
              return answer.disabled.call(this)
            }
            return !!answer.disabled
          }
        }
      ], showMessage, 'answer')
    }
    return false
  }

  async answer(code: string): Promise<boolean> {
    if (this.canAnswer(code, true)) {
      const answer = this.getAnswer(code)
      if (answer) {
        this.answerCount[code] += 1
        await emit(this, 'onAnswer', code)
        if (answer.next) {
          await this.npc?.say(answer.next)
        } else {
          await answer.say?.call(this)
        }
        return true
      }
    }
    return false
  }

  async onAnswer(code: string): Promise<void> {}

  async bye(): Promise<boolean> {
    await emit(this, 'onBye')
    window.store.player.dialog = null
    return true
  }

  async onBye(): Promise<void> {}
}

mixin(Dialog, [
  Code,
  Requirements,
])

registerClass(Dialog)
