<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'rgb(243, 78, 78)'
    }
  },
  data(){
    return{
      // isActive: true,
      // path:'/home'
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !==-1 //tabbar图标颜色时 则表示对应即ture 
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {} //tabbar字体颜色
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    }    
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;   
    font-size: 13.5px; 
    color: rgb(59, 58, 58);
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle; 
    margin-bottom: 2px;
  }
   /* .active {
    color: rgb(59, 58, 58) ;
  }  */
</style>