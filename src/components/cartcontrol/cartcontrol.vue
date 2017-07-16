<template>
	<div class="cartcontrl">
  <transition enter-active-class="animated fadeIn">
		<div class="decrease icon-remove_circle_outline" v-if = 'food.count>0' @click.stop ='decreasecart'></div>
   </transition> 
		<div class="count" v-if='food.count>0'>{{food.count}}</div>
		<div class="increase icon-add_circle" @click.stop ='increasecart'></div>
	</div>

</template>
<script>
 import Vue from 'vue'
 export default{
 	props:['food'],//接收传过来的food对象
 	methods:{
        increasecart(){
        	if(!this.food.count){ //如果此时没有count属性则添加，否则加一
              Vue.set(this.food, 'count',1);//调用Vue.set()方法为food对象添加count属性
        	}else{
        		this.food.count++;
        	}

        }, 
        decreasecart(){
        	if(this.food.count){
              this.food.count--;
        	}

        },
 	}

 }
</script>
<style lang = 'less' scoped>
  	.cartcontrl{
  		.decrease,.increase{
  			display:inline-block;
  			padding:0.06rem;
  			font-size:0.36rem;
  			line-height: 0.24rem;
  			color:rgb(0,160,220);
  		}
  		.count{
  			display:inline-block;
  			vertical-align:top;
  			padding-top: 0.06rem;
        padding-right: 0.1rem;
        padding-left: 0.1rem;
  			text-align:center;
  			width: 0.2rem;
  			font-size:0.1rem;
  			color:rgb(147,153,159);
  			line-height: 0.24rem;
  		}
  	}
</style>

