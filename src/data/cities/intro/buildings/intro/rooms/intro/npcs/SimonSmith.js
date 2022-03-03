export default {
  name: 'Simon Smith',
  icon: 'emojione:old-man-medium-light-skin-tone',
  img: 'old-man2.png',
  description: 'An old grumpy man',
  talkable: true,
  aggresive: true,

  mounted() {
    this.addDialog([
      {
        code: 'start',
        text: 'The old man, non chalantly, turns his head to look at you, ' +
          'as if you were just another passenger from his day dreaming. ' +
          '"What do you want? Make it quick I\'ve got places to be."' +
          'Places to be?, you think, this man is definately some lunatic...',
        answers: [{
          text: 'What is your name old man?',
          next: 'name',
          async say() { await this.npc.say('name') },
        }]
      },
      {
        code: 'name',
        text: 'He grimace like you were some kind of bug he was about to squash with his old boot. ' +
          '"My name is Simon Smith", he replies reluctantly.',
        async onSay() {
          this.npc.known = true
        }
      }
    ])
  },
}
