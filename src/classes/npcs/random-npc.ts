import random from 'lodash/random'
import omit from 'lodash/omit'
import capitalize from 'lodash/capitalize'
import compact from 'lodash/compact'
import { pickRandom, registerClass } from '@/utils'
import { INpcData, Npc } from './npc'
import { SetupData } from '@/entity'
import {
  adverbs,
  eyeColors,
  femaleNames,
  hairColors,
  intelligence,
  jobDomains,
  jobLevels,
  jobs,
  largeSizes,
  lastNames,
  maleNames,
  motives,
  nickNames,
  normalSizes,
  poor,
  rich,
  short,
  skinColors,
  smallSizes,
  stateMoods,
  strong,
  tall,
  traits,
  weak
} from '@/words'

const jobIcons: { [key: string]: string[] } = {
  'scientist': ['astronaut', 'astronomer', 'biologist', 'chemist', 'cook', 'dentalcase', 'microbiologist', 'paramedic',
    'physician', 'physicist', 'physiologist', 'therapist', 'toxicologist', 'veterinary', 'generalist', 'technician',
    'technologist'],

  'doctor': ['anesthesiologist', 'hygienist', 'dentist', 'doctor', 'nurse'],

  'construction': ['assembler', 'carpenter', 'electrician', 'machinists', 'painter', 'plumber', 'welder', 'controller', 'engineer',
    'mechanic', 'operator', 'worker'],

  'business': ['economist', 'marketer', 'publicist', 'advisor', 'buyer', 'consultant', 'estimator', 'examiner', 'manager',
    'recruiter', 'representative', 'scheduler', 'specialist', 'strategist', 'verificator'],

  'boss': ['attorney', 'broker', 'lawer', 'administrator', 'advocate', 'collector', 'curator', 'director', 'inspector',
    'president', 'regulator', 'superintendent'],

  'casual': ['archivist', 'bartender', 'captain', 'cashier', 'coach', 'concierge', 'courier', 'dispatcher', 'housekeeper',
    'janitor', 'journalist', 'librarian', 'merchant', 'meteorologist', 'pilot', 'psychiatric', 'receptionist', 'reporter',
    'secretary', 'agent', 'ambassador', 'analyst', 'architect', 'coder', 'commander', 'communicator', 'coordinator',
    'counselor', 'designer', 'developer', 'expeditor', 'forecaster', 'integrator', 'interpreter', 'investigator', 'messenger',
    'officer', 'personel', 'planner', 'processor', 'producer', 'programmer', 'researcher', 'scientist', 'tester', 'trainer'],
}

const jobColors: { [key: string]: string[] } = {
  'scientist': [],
  'doctor': [],
  'construction': ['blue', 'beige'],
  'business': ['blue', 'beige'],
  'boss': ['blue', 'beige'],
  'casual': ['blue', 'beige', 'yellow', 'red', 'green', 'black'],
}

const randomize = (sets: any[]) => {
  const s = random(0, sets.length - 1)
  return pickRandom(sets[s])
}

export interface IRandomNpcData extends INpcData {
  old?: boolean
  kid?: boolean
  color?: string | null
  firstname?: string | null
  lastname?: string | null
  nickname?: string | null
  age?: number
  eyeColor?: string | null
  hairColor?: string | null
  skinColor?: string | null
  build?: string | null
  size?: string | null
  strength?: string | null
  status?: string | null
  mood?: string | null
  motives?: string | null
  mind?: string | null
  trait?: string | null
  job?: string | null
  jobLevel?: string | null
  jobDomain?: string | null
  buildAdv?: string | null
  sizeAdv?: string | null
  strengthAdv?: string | null
  statusAdv?: string | null
  moodAdv?: string | null
  mindAdv?: string | null
}

export class RandomNpc extends Npc {
  setupInstance(data?: IRandomNpcData): SetupData | undefined {
    const { old, kid } = data || {}
    data = omit(data, ['old', 'kid'])

    const age = data.age ||
      (kid
        ? random(1, 17)
        : (old
          ? random(61, 90)
          : random(18, 60)
        )
      )

    const female = typeof data.female === 'boolean' ? data.female : pickRandom([true, false])
    const job = data.job || pickRandom(jobs)
    const ic = this.iconKeyFor(job)
    const jc = ic ? jobColors[ic] : []

    return super.setupInstance({
      color: pickRandom(jc),
      firstname: capitalize(pickRandom(female ? femaleNames : maleNames)),
      lastname: capitalize(pickRandom(lastNames)),
      nickname: capitalize(pickRandom(nickNames)),
      female,
      age,
      eyeColor: pickRandom(eyeColors),
      hairColor: pickRandom(hairColors),
      skinColor: pickRandom(skinColors),
      build: randomize([smallSizes, normalSizes, largeSizes]),
      size: randomize([short, tall]),
      strength: randomize([weak, strong]),
      status: randomize([poor, rich]),
      mood: pickRandom(stateMoods),
      motives: pickRandom(motives),
      mind: pickRandom(intelligence),
      trait: pickRandom(traits),
      job,
      jobLevel: pickRandom(jobLevels),
      jobDomain: pickRandom(jobDomains),
      buildAdv: pickRandom(adverbs),
      sizeAdv: pickRandom(adverbs),
      strengthAdv: pickRandom(adverbs),
      statusAdv: pickRandom(adverbs),
      moodAdv: pickRandom(adverbs),
      mindAdv: pickRandom(adverbs),
      ...(data || {})
    })
  }

  get name(): string {
    return this.state.name || `${this.firstname} ${this.lastname}`
  }

  get icon(): string {
    if (this.isKid) {
      return compact(['kid', this.iconSuffix]).join('-')
    }
    return compact([this.state.icon || this.iconKey, this.iconSuffix]).join('-')
  }

  get iconKey(): string | undefined {
    return this.iconKeyFor(this.job)
  }

  get iconSuffix(): string {
    return compact([this.state.iconSuffix, this.female ? 'female' : 'male', this.color]).join('-')
  }

  get color(): string { return this.state.color }
  set color(value) { this.state.color = value }

  get firstname(): string { return this.state.firstname }
  set firstname(value) { this.state.firstname = value }

  get lastname(): string { return this.state.lastname }
  set lastname(value) { this.state.lastname = value }

  get nickname(): string { return this.state.nickname }
  set nickname(value) { this.state.nickname = value }

  get age(): number { return this.state.age }
  set age(value) { this.state.age = value }

  get eyeColor(): string { return this.state.eyeColor }
  set eyeColor(value) { this.state.eyeColor = value }

  get hairColor(): string { return this.state.hairColor }
  set hairColor(value) { this.state.hairColor = value }

  get skinColor(): string { return this.state.skinColor }
  set skinColor(value) { this.state.skinColor = value }

  get motives(): string { return this.state.motives }
  set motives(value) { this.state.motives = value }

  get buildAdv(): string { return this.state.buildAdv }
  set buildAdv(value) { this.state.buildAdv = value }

  get build(): string { return this.state.build }
  set build(value) { this.state.build = value }

  get sizeAdv(): string { return this.state.sizeAdv }
  set sizeAdv(value) { this.state.sizeAdv = value }

  get size(): string { return this.state.size }
  set size(value) { this.state.size = value }

  get strengthAdv(): string { return this.state.strengthAdv }
  set strengthAdv(value) { this.state.strengthAdv = value }

  get strength(): string { return this.state.strength }
  set strength(value) { this.state.strength = value }

  get statusAdv(): string { return this.state.statusAdv }
  set statusAdv(value) { this.state.statusAdv = value }

  get status(): string { return this.state.status }
  set status(value) { this.state.status = value }

  get moodAdv(): string { return this.state.moodAdv }
  set moodAdv(value) { this.state.moodAdv = value }

  get mood(): string { return this.state.mood }
  set mood(value) { this.state.mood = value }

  get mindAdv(): string { return this.state.mindAdv }
  set mindAdv(value) { this.state.mindAdv = value }

  get mind(): string { return this.state.mind }
  set mind(value) { this.state.mind = value }

  get traitAdv(): string { return this.state.traitAdv }
  set traitAdv(value) { this.state.traitAdv = value }

  get trait(): string { return this.state.trait }
  set trait(value) { this.state.trait = value }

  get jobLevel(): string { return this.state.jobLevel }
  set jobLevel(value) { this.state.jobLevel = value }

  get jobDomain(): string { return this.state.jobDomain }
  set jobDomain(value) { this.state.jobDomain = value }

  get job(): string { return this.state.job }
  set job(value) { this.state.job = value }

  get isKid(): boolean { return this.age <= 17 }

  get isOld(): boolean { return this.age >= 61 && this.age <= 99 }

  get description(): string {
    const id = this.female ? 'she' : 'he'
    const his = this.female ? 'her' : 'his'

    return `${this.nameProper}, also known as "${this.nickname}", 
      is a ${this.age} years old, ${this.skinColor} skin, ${this.eyeColor} eyes, ${this.buildAdv} ${this.build} 
      and ${this.sizeAdv} ${this.size}, ${this.jobLevel} ${this.jobDomain} ${this.job}. 
      ${capitalize(his)} main motive in life is to ${this.motives}. 
      ${capitalize(id)} is ${this.mindAdv} ${this.mind}, 
      ${this.traitAdv} ${this.trait} and a ${this.moodAdv} ${this.mood} type of person.`
  }

  iconKeyFor(job: string): string | undefined {
    return Object.keys(jobIcons).find(k => jobIcons[k].includes(job))
  }
}

registerClass(RandomNpc)
