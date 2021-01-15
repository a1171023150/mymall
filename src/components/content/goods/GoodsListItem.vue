<template>
  <div class="goods-item">
      <img :src="goodsItem.show && goodsItem.show.img" alt="" >
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.Price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props: {
        goodsItem: {
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style>

</style>