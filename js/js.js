var vm = new Vue({
  el: '#app',
  data: {
    movies: [],
    cart: [],
    currentMovie: null,
    isCartOpen: false,
  },
  created() {
    let apiUrl =
      'https://awiclass.monoame.com/api/command.php?type=get&name=movies'
    axios.get(apiUrl).then((res) => {
      this.movies = res.data
    })
  },
  methods: {
    bgcss(url) {
      return {
        'background-image': 'url(' + url + ')',
        'background-position': 'center center',
        'background-size': 'cover',
      }
    },
    wheel(evt) {
      // 滾輪往上正值,往下負值
      console.log(evt.deltaY)
      TweenMax.to('.cards', 0.8, {left: '+=' + evt.deltaY * 2 + 'px'})
    },
    addCart(movie, evt) {
      this.currentMovie = movie
      let target = evt.target
      this.$nextTick(() => {
        TweenMax.from('.buybox', 0.8, {
          // 偏移量
          left: $(evt.target).offset().left,
          top: $(evt.target).offset().top,
          opacity: 1,
          ease: Power1.easeOut,
        })
        setTimeout(() => {
          this.cart.push(movie)
        }, 800)
      })
    },
  },
  // 計算屬性 算總額
  computed: {
    totalPrice() {
      return this.cart
        .map((movie) => movie.price)
        .reduce((total, p) => total + p, 0)
      console.log(totalPrice)
    },
  },
  watch: {
    cart() {
      TweenMax.from('.fa-shopping-cart', 0.3, {scale: 0.5})
    },
  },
})
