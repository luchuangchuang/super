<template>
	<div class="goods">
		<div class="menu-wrapper" ref = 'menu'>
			<ul>
				<li  v-for="(item,index) in goods" :class="{'current':index === currentIndex}" @click = 'selectmunu(index,$event)'>
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref = 'foods' >
			<ul>
				<li  class="foodlist" v-for="item in goods"  >
					<h1>{{item.name}}</h1>
					<ul>
						<li   v-for="food  in item.foods"  @click ='fooddetails(food)'>
							<img :src="food.icon" alt="">
							<div>
								
								<h2>{{food.name}}</h2>
								<p class="p1">月售{{food.sellCount}}份&nbsp;&nbsp;好评率{{food.rating}}%</p>
								<p class="p2" v-if ='food.description'>{{food.description}}</p>
								<p   class="p3">￥{{food.price}}&nbsp;&nbsp;&nbsp;&nbsp;<del>￥{{food.oldPrice}}</del>
								<span class="cartcontrolwrapper">
								  
											<cartcontrol :food = 'food'></cartcontrol>
									
								</span>
								<!-- <span class="icon-add_circle  add"  @click ='add()'></span>
								<input type="text" v-model ='foodcart'>
								<span class="icon-remove_circle_outline  decrese" v-if= 'foodcart'   @click ='decrese()'></span> -->
								</p>
							</div>
						</li>
					</ul>
					
				</li>
			</ul>
		</div>
		
			
				<shopcart></shopcart>
		
		<showfood :showfood = 'selectfood' ref= 'showdetail'></showfood>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import showfood from '../fooddetails/fooddetails.vue'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'
	import shopcart from '../shopcart/shopcart.vue'

	export default {
		created(){
			this.$store.dispatch('getGoods');
			//  this.$nextTick( () => {
			// 	this._initfoods();
			// 	this._initHeight();
			// })

		},
		components:{
			showfood,
			cartcontrol,
			shopcart

		},
		
		computed:{
			...mapGetters([
				'goods',
				'foodcart',
			]),
			currentIndex(){ //将右侧foods的索引值与左侧menu的索引值相对应
				for ( let i = 0 ; i < this.listHeight.length ; i++ ){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if( !height2 || (this.scrollY >= height1 &&  this.scrollY < height2) ){
						return i;
					}
				}
				return 0;
			}
		} ,
		data () {
			return {
				selectfood:{},
				listHeight : [],//存储每个区间的递增高度
				scrollY : ''
			}
		},
		watch : {
			goods(){
				this.$nextTick( () => {
					// this._initmenulist();
					this._initmenu();
					this._initfoods();
				})
			}
		},
		methods : {
			fooddetails(food){//显示food详情页的方法
				 this.$refs.showdetail.show();
                 this.selectfood = food;
			},

			// _initmenulist () {
			// 	this.menulist = new BScroll( this.$refs.menu , {
			// 		click : true
			// 	});
			// 	this.foodlist = new BScroll( this.$refs.foods , {
			// 		click : true
			// 	})
			// },
			
			_initmenu(){
				this.menu = new BScroll ( this.$refs.menu ,{
					click : true
				});
			},
			_initfoods(){
				this.foods = new BScroll ( this.$refs.foods ,{
					click : true,//插件默认组织点击事件，设置此参数即可点击
					probeType : 3//设置此参数可监测滚动
					// probeType: 1 会截流,只有在滚动结束的时候派发一个 scroll 事件。2在手指 move 的时候也会实时派发 scroll 事件，不会截流。 3除了手指 move 的时候派发scroll事件，在 swipe（手指迅速滑动一小段距离）的情况下，列表会有一个长距离的滚动动画，这个滚动的动画过程中也会实时派发滚动事件
				});
				this.foods.on('scroll', (pos) => {//监听foods滚动，并获取滚动的高度
					this.scrollY =  Math.abs(Math.round(pos.y));//因所获取高度有负数、小数，所以将获取的高度取整、取正，
					console.log(this.scrollY);
					
				})
			},
			_initHeight(){
				// 获取dom元素li，将每个li的递增高度 并存进数组，意思就是假如第一个获取的高度为10，第二个获取的高度为20，则第一个li的高度为10，第二个li的高度为20-10=10；
				let foodlist = this.$refs.foods.getElementsByClassName('foodlist');
				let height = 0;
				this.listHeight.push(height);
				for( let i = 0 ; i < foodlist.length ; i++ ){
					height += foodlist[i].clientHeight;
					this.listHeight.push(height);
				} 
				 
			},
			selectmunu(k,e){//点击menu滚动到指定foods元素位置
				console.log(5);
				let foodlist = this.$refs.foods.getElementsByClassName('foodlist');
				this.foods.scrollToElement(foodlist[k],300);//scrollToElement(el, time, offsetX, offsetY, easing)
// 滚动到某个元素，el（必填）表示 dom 元素，time 表示动画时间，offsetX 和 offsetY 表示坐标偏移量，easing 表示缓动函数

			}
		}

	}
</script>

<style lang="less" scoped>
	.goods{
		display: flex;
		position: absolute;
		top:3.48rem;
		bottom: 1.2rem;
		overflow: hidden;
		.menu-wrapper{
			flex:0 0 1.6rem;
			width: 1.6rem;
			background-color: #f3f5f7;
			ul{   
				padding-right: 0.24rem;
				padding-left: 0.24rem;
				 li{

				 	  display: table;
				 	  font-size: 0.24rem;
				 	  line-height: 0.28rem;
				 	  color:rgb(0,0,0,0.3);
				 	   &.current{
							 		color:red;

							 	}
				    
				 		span{

				 			width: 1.6rem;
				 			height: 1.08rem;
				 			
				 			// padding:0 0.24rem;
				 			display: table-cell;
				 		    vertical-align: middle;
				 		    border-bottom: 1px solid rgba(7,17,27,0.1);
					 		  
				 			}
						 
				 	
				 }

			}
		}
		.foods-wrapper{
			flex:1;
			ul{
				li{
					h1{
						font-size: 0.24rem;
						color:rgb(147,153,159);
						line-height:0.52rem;
						height: 0.52rem;
						padding-left: 0.28rem;
						background-color:#f3f5f7;
						border-left:0.01rem solid #d9dde1;
						// margin-top:0.4rem ;
					}
					ul{
						 // padding: 0.36rem;
						 padding-right: 0.36rem;
						 padding-left: 0.36rem;

						li{
							position: relative;
							padding-left:1.8rem;
							// padding-right: 0.36rem;
							padding-bottom: 0.36rem;
							padding-top: 0.36rem;
							border-bottom:0.01rem solid rgba(7,17,27,0.2); 
							height:1.4rem ;
							&:last-child{
							 border-bottom:none;
							}
							img{
								position: absolute;
								left: 0rem;
								top: 0.36rem;
								width:1.6rem;
								height:1.4rem ;
								// margin-left:-1.6rem;
								// padding-right: 0.2rem;
							}
							div{
								display:inline-block;
                               

								 
								h2{
									font-size: 0.28rem;
									color:rgb(7,17,27);
									line-height: 0.28rem;
									margin-bottom: 0.16rem;
								}
								.p1{
									font-size: 0.2rem;
									color:rgb(147,153,159);
									line-height: 0.2rem;
									margin-bottom: 0.16rem;
                                   
								}
								.p2{
									width:2rem;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
									font-size: 0.2rem;
									color:rgb(147,153,159);
									line-height: 0.2rem;
									heiht:0.2rem;
									margin-bottom: 0.16rem;

								}
								.p3{
									position: relative;
									padding-right: 0.36rem;
									font-size: 0.28rem;
									color:red;
									font-weight: 700;
									line-height: 0.48rem;
									width: 3rem;
									overflow: hidden;
									del{
										  
										color:rgb(147,153,159);
									}
									.cartcontrolwrapper{
										 position: absolute;
										 display: inline-block;
										 top: 0.08rem;
										 right:0rem;

									}
									 
								}
									
									

							}
						}
					}
				}
			}
		}
	}

</style>