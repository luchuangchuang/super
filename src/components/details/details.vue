<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="detail" v-show="detailShow">
		  
			<h1> <span class="icon-arrow_lift back"  @click="hideDetail"></span>       {{seller.name}}</h1>
			<stars  :score = 'seller.score'></stars>
			<h2>优惠信息</h2>
			<ul>
				<li v-if='seller.supports' v-for="item in seller.supports">
					<img src="../../../static/img/decrease_1@2x.png" height="24" width="24" alt="">{{item.description}}
				</li>
				 
			</ul>
			<h2>商家公告</h2>
			<p>{{seller.bulletin}}</p>

			 
			<span class="icon-close"  @click="hideDetail"></span>
		</div>
	</transition>
</template>
<script>
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import stars from'../stars/stars.vue'

	export default {
		components:{
			stars,
		},
		computed:{
			...mapGetters([
				'detailShow',
				'seller'
			])
		},
		methods:{
			hideDetail(){
				this.$store.dispatch('hideDetail');
			}
		}
	}

</script>
<style lang="less" scoped>
	
.detail{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(7,17,27,0.8);
		blur:10px;
		color:#fff;
		// padding: 1.28rem 0.72rem 0.64rem;
		// padding-top:1.28rem;
		// padding-right: 0.72rem;
		// padding-left: 0.72rem;
		// padding-bottom:0.64rem ;
		// span.back{
		// 	position: absolute;
		// 	top:1.28rem ;
		// 	left:0.8rem ;
		// 	font-size: 0.32rem;

		// }

		h1{ 
			padding-top: 1.28rem;
			padding-bottom: 0.32rem;
			text-align: center;
			font-size: 0.32rem;
			font-weight: 700;
			color:rgb(255,255,255);
			line-height:0.32rem;
		}
		h2{
			font-size: 0.28rem;
			font-weight: 700;
			color:rgb(255,255,255);
			line-height: 0.28rem;
			text-align: center;
			position: relative;
			padding-top: 0.56rem;
			padding-bottom: 0.48rem;
			padding-right: 0.72rem;
			padding-left: 0.72rem;
			&:before,&:after{
				   content: '';                
		           position: absolute;          
		           top: 52%;
		           background-color: rgba(255,255,255,0.2); 
		           width:2.24rem;
		           height:0.02rem;

			}
			&:before{
             left: 0.24rem; 
			}
			&:after{
             right: 0.24rem;
			}
		}
		ul{
			font-size: 0.24rem;
			font-weight: 200;
			color:rgb(255,255,255);
			padding-right: 0.96rem;
			padding-left: 0.96rem;
			// padding:0.48rem 1rem 0.56rem 1rem;
			li{
				line-height: 0.24rem;
				padding-bottom: 0.24rem;

				img{
					width: 0.24rem;
					height: 0.24rem;
					padding-right: 0.12rem;

				}
			} 

		}
		p{
     		font-size: 0.24rem;
			font-weight: 200;
			color:rgb(255,255,255);
			line-height: 0.48rem;
			// padding:0.48rem 1rem 1rem  1rem;
			padding-right: 0.96rem;
			padding-left: 0.96rem;
		}
		.icon-close{

			font-size:0.64rem;
			color:rgba(255,255,255,0.9);
			position: absolute;
			bottom: 0.64rem;
			left:50%;
			margin-left:-0.32rem;

		}
		
	}
	
</style>