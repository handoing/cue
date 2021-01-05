module.exports = {
  data: {
    name: 'gogogo',
    showHello: true
  },
  toggle() {
    this.setData({
      showHello: !this.data.showHello
    })
  }
};