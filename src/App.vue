<template>
  <div id="app">
   <v-header></v-header>
   <keep-alive>
        <router-view></router-view>
   </keep-alive>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
     <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import Header from './components/header/header.vue'
// import Footer from './components/footer/footer.vue'
export default {
  name: 'app',
  components:{
    'v-header':Header,
    // 'v-footer':Footer,
  }
}
</script>

<style lang="less" scoped>
  #app .tab{
    display: flex;
    width: 100%;
    height: 0.8rem;
    line-height:0.8rem;
    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
    .tab-item{
      flex:1;
      text-align: center;
      font-size: 0.28rem;
      color:rgb(77,85,93);
      line-height:0.8rem;

      & > a{
        font-size:0.28rem;
        display: block;
        &.active{
          color:rgb(240,20,20);
        }
      }
    }


  }
</style>

