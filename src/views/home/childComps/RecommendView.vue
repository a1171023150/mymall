<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="item-title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{

    recommends: {
      type: Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    background-color: snow;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    color: #000;
  }

  .recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }

  .item-title {
    color: rgb(58, 58, 58);
  }
</style>