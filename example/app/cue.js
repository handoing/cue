export default {
  data: {
    toggle: true,
    img: 'https://avatars.githubusercontent.com/u/9876343',
    nnnn: new Array(10).fill('')
  },
  created() {
    console.log('created');
  },
  updated() {
    console.log('updated');
  },
  mounted() {
    console.log('mounted');
  },
  destroyed() {
    console.log('destroyed');
  },
  onChange(e) {
    this.setData({
      toggle: !this.data.toggle
    })
  }
};
