<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">拇指街</div></nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            :pull-up-load="true"
            @scroll="contentScroll"
            @pulling-up="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control  class="tab-control" 
                    :titles="['流行','新款','精选']" 
                    @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- .native 监听组件的原生事件的点击事件 -->
    <back-top class="backtop" 
              @click.native="backClick" 
              v-show="isShowBackTop"/> 
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  
export default {
  name:'home',
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },


  data(){
    return{
      banners: [],
      recommends: [],
      goods: {
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []},
      },
      currentType:"pop",
      isShowBackTop:false
    }
  },


  computed:{
    showGoods() {
      return this.goods[this.currentType].list
    }
  },


  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },


  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)//拿到组件对象(scroll.vue)的scroll
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)

      // this.$refs.scroll.scroll.refresh()
    },
    
    /**
     *网络请求 
     */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // console.log(res);
        this.$refs.scroll.finishPullUp()
    })
    }


    
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: snow;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 5;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    /* height: calc(100%-93px); */
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>