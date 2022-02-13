export default {
  state: {
    img: null,
  },

  get img() { return `images/${this.state.img}` },
  set img(value) { this.state.img = value },
}
