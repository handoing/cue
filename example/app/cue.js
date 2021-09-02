export default {
  data: {
    toggle: true,
    img: 'https://hao8.qhimg.com/t01c413c779df7eeecb.jpg',
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
