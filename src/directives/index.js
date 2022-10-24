import Vue from 'vue'
Vue.directive('imgerror', {
  inserted(el, binging) {
    console.log('binging', binging)
    el.onerror = function() {
      // this.src='https://img01.yzcdn.cn/vant/cat.jpeg'
      this.src = binging.value
    }
  },
  update(el, binging) {
    if (!el.src) {
      el.src = binging.value
    }
  }
})
