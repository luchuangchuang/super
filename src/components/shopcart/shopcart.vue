<template>
 <div>
 	
        <div class="shopcart">
             <div class="shopcart-left" @click="toggleList">
             <!-- <div class="shopcart-left" > -->
                  <div class="cartwrapper">
                       <div class="cartcontainer"  :class="{'highlight':totalcount>0}">
                         
                            <span class="icon-shopping_cart  cart"  :class="{'highlight':totalcount>0}"></span>
                       </div>
                      <span class="num" v-show="totalcount>0">{{totalcount}}</span>
                  </div>
                  <span class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</span>
             </div>
             <div class="shopcart-middle">
                另需配送费￥{{seller.deliveryPrice}}元
             </div>
             <div class="shopcart-right"  >
                   
                   <div class="pay"  @click.stop="pay" :class="{'enough':totalPrice>=seller.minPrice}">
                   {{payDesc}} <span v-show = '!totalcount'></span>
                   </div>
             </div>
        </div>
        <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
          <div class="back"  v-show="listShow">
		          <div class="shopcart-list" >
		            <div class="list-header">
		              <div class="title">购物车</div>
		              <div class="empty" @click="empty">清空</div>
		            </div>
		            <div class="list-content" ref="list">
                   <div class="">
    		              <div v-show = 'emptyfood' class="emptyfood">购物车已清空</div>
    		              <ul>
    		                <li class="food" v-for="food in selectFoods">
    		                  <div class="name">{{food.name}}</div>
    		                  <div class="pricewrapper">
    		                        <div class="price">
    		                            <span>￥{{food.price*food.count}}</span>
    		                        </div>
    		                        <div class="cartcontroll-wrapper">
    		                           <cartcontrol :food="food"></cartcontrol>
    		                  </div>
    		                  </div>
    		                  
    		                </li>
    		              </ul>
    		            </div>
                  </div>
            </div>
          </div>
        </transition>
      
 </div>
         
		
	 
</template>
<script>
  import {mapGetters} from 'vuex'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
     
	export default{
      created(){
      	 
      },
      computed:{
          	...mapGetters([
                  'seller',
                  'goods'
              ]),
          selectFoods(){
                let foods = [];
             //双重循环 将具有count属性的food对象添加进一个新的数组，即所选购的商品
                this.goods.forEach( good => {

                  good.foods.forEach( food => {

                    if ( food.count > 0 ){
                      foods.push(food);
                    }
                  })
                });
                return foods;
          },
          totalcount(){//所选商品的总数
                let count = 0;
                this.selectFoods.forEach( food => {
                  count += food.count;
                })
                return count;
          },
          totalPrice(){//所选商品的总价
              let total = 0;
              this.selectFoods.forEach( food => {
                total += food.price * food.count;
              })
              return total;
          },
          payDesc(){
              if( this.totalPrice === 0 ){
                return `￥${this.seller.minPrice}元起送`
              }else if ( this.totalPrice < this.seller.minPrice ) {
                return ` 还差${this.seller.minPrice - this.totalPrice } 元`  
              }else{
                return '结算'
              }
          },
          


      },
      components:{
          cartcontrol
      },
      data(){
      return {
        listShow:false,
        emptyfood:false
      }
     },
      methods:{
        toggleList(){
          if(!this.totalcount){
            return;
          }
          this.listShow=!this.listShow;
          //初始化滚动
          if(this.listShow){
            this.$nextTick(() => {
              console.log(11111);
              if(!this.scroll){
                this.scroll=new BScroll(this.$refs.list,{   
                  click:true
                });
              }else{
                this.scroll.refresh();
              }
            });
          }
        },
      	  empty(){//清空购物车
            this.selectFoods.forEach(food => {
              food.count=0;
              this.emptyfood=true;
              setTimeout( ()=>{
                this.emptyfood=false;
                 this.listShow=!this.listShow;
              },500);
            });
          },
          pay(){
              if(this.totalPrice<this.minPrice){
                return;
              }else{

                alert(`需要支付${this.totalPrice}元`);
              }
            }

			   }
      
	}

</script>
<style lang='less' scoped>
  .shopcart{
    display: flex;
    position: fixed;
    bottom: 0rem;
    width: 100%;
    height:1rem;
    // overflow: hidden; 
    z-index:2;
    background-color:#141d27;
    text-align: center;
    margin-left: -7.5rem;
   .shopcart-left{
        
       flex:4; 
       font-size: 0.32rem;
       color:rgba(255,255,255,0.4);
       font-weight: 700;
       line-height: 1rem;
       padding:0.24rem ;
       position: relative;
       box-sizing: border-box;
       // border-right: 0.01rem solid #ccc;
       .cartwrapper{
             position: relative;
             left: 0rem;
             top:-0.6rem;
             width: 1.2rem;
             height: 1.2rem;
             border-radius: 0.6rem; 
             background-color:#141d27 ;
             border: 0.01rem solid rgba(7,17,27,0);
             text-align: center;
             line-height: 1rem;
             .cartcontainer{

                        margin:0.16rem auto;
                        width: 0.88rem;
                        height: 0.88rem;
                        border-radius: 0.44rem; 
                        background-color:rgba(255,255,255,0.2);
                        // border: 0.01rem solid #fff;
                  &.highlight{
                    background-color:rgb(0,160,220); 
                  }
                  .cart{
                        // border: 1px solid #fff;
                        font-size: 0.48rem;
                        line-height: 0.88rem;
                        &.highlight{
                          color:#fff; 
                        }
                   }
             }
            
           .num{
             position: absolute;
             left: 0.8rem;
             bottom:0.7rem;
             width: 0.48rem;
             text-align: center;
             height:0.32rem;
             border-radius: 0.1rem;
             background:red;
             font-size: 0.18rem;
             font-weight: 700;
             line-height: 0.32rem;
             color:#fff;
           } 
         

       }
       .price{
            position: absolute;
            top: 0rem;
            right: 0.24rem;
            }
       
    }
   .shopcart-middle{
       flex:4; 
       padding:0.24rem; 
       font-size: 0.3rem;
       color:rgba(255,255,255,0.4);
       font-weight: 700;
       line-height:0.48rem;

    }
    .shopcart-right{
       flex:3; 
       // padding: 0.24rem 0.16rem;

       font-size: 0.3rem;
       color:rgba(255,255,255,0.4);
       font-weight: 700;
       line-height:1rem;
      .pay{
        &.enough{
            background-color:rgba(255,255,255,0.2);
            color:#fff; 
          }
      }


    }
    
  }
  .shopcart-list{
    position: fixed;
    bottom:1rem;
    left: 0;
    // z-index: -1;
    z-index:1;
    width: 100%;
    .list-header{
      display: flex;
      justify-content: space-between;
      height: 0.8rem;
      line-height:0.8rem;
      padding: 0  0.36rem;
      background-color: #f3f5f7;
      border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
      .title{
        
        font-size: 0.28rem;
        font-weight: 200;
        color: rgb(7, 17, 27);
      }
      .empty{
        font-size:0.24rem;
        color: rgb(0, 160, 220);
      }
    }
    .list-content{

      padding:0.4rem 0.36rem;
      max-height:3rem;
      overflow:hidden;
      background: #fff;
      .emptyfood{
      	  text-align: center;
      	  line-height:0.48rem;
          font-size:0.28rem;
          color:rgb(7, 17, 27);
      }
      .food{
        display:flex;
        justify-content: space-between;
        padding:0.24rem 0;
        border-bottom: 0.01rem solid rgba(7, 17, 27, 0.1);
        .name{
          line-height:0.48rem;
          font-size:0.28rem;
          color:rgb(7, 17, 27);
        }
        .pricewrapper{
              position: relative;
              padding-right:1.2rem;
            .price{
              padding-right: 0.4rem;
              line-height:0.48rem;
              font-size: 0.2rem;
              font-weight: 700;
              color: rgb(240, 20, 20);
            }
            .cartcontroll-wrapper{
              position: absolute;
              right:0rem;
              top:0.06rem;
              font-size:0rem ;

            }
        }
        
      }
    }
  }
  .back{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    z-index:1;
    background-color: rgba(7, 17, 27, 0.6);
  }

	
</style>