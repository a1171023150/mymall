<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  // import Pullup from '@better-scroll/pull-up'
export default {
  name:"Scroll",
  data() {
    return {
      scroll:null,
      props: {
        probeType: {
          type:Number,
          default:0
        },
         pullUpLoad: {
           type:Boolean,
           default:false
         }
      }
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click:true,
      probeType: this.probeType,
      // pullUpLoad: this.pullUpLoad,
      pullUpLoad:true
  })

    //2.监听滚动的位置
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position)
    })

    //3.监听上拉加载
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
      console.log('upupupupup');
    })
},
methods:{
  scrollTo(x, y, time=500) {
    this.scroll.scrollTo(x, y, time)
  },
  finishPullUp() {
    this.scroll.finishPullUp()
  }
}
}
</script>

<style scoped>

</style>