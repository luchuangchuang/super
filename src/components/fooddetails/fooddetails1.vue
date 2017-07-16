<template>
    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
	<div class="fooddetails" v-show = 'showdetail'  ref = 'details'>
	<div class=""> 
		<div class="imgs">
             <img :src="showfood.image" @click ='foodhide()' alt="">
        </div>
        <div class="desc">
                <h2>{{showfood.name}}</h2>
                <p>
                    <span class="sellcount">月售{{showfood.sellCount}}份</span>
                    <span class="rating">好评率{{showfood.rating}}%</span>
                </p>
             	
        </div>
		
	    <div class="price">
	        <div class="price-left">
	        	
	          	<span class="curprice">￥{{showfood.price}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	          	<span class="oldprice">￥<del>{{showfood.oldPrice}}</del></span>
	        </div>
	        <div class="price-right" @click ='cartcontrolflag' v-show="!flag">
	        	<span>加入购物车</span>
	        </div>
	        <div class="cartcontrolwrapper" v-show="flag">
	        	
	        	<!-- <keep-alive> -->
	        	   <cartcontrol   :food = 'showfood' class='cartcontrol' ></cartcontrol>	
	        	<!-- </keep-alive> -->
	        </div>
	    </div>
	    <div class="divider">
	    	
	    </div>
	    <div class="foodinfo">
	    	<h2>商品介绍</h2>
	    	<p class="info">{{showfood.info}}</p>
	    </div>	
	     <div class="divider">
	    	
	    </div>
	    <div class="foodrating">
	    	<h2>商品评价</h2>
	    	<div class="ratings">
	        	<ul>
	        		<li class="all"  @click = 'showall()'>全部&nbsp;<span>57</span></li>
	        		<li class="satisfy"  @click = 'showsatisfy()' 满意&nbsp;<span>47</span></li>
	        		<li class="unsatisfy" @click = 'showunsatisfy()' >不满意&nbsp;<span>10</span></li>
	        	</ul>
	        	<p> <span class="icon-check_circle" class = "{'active':only}"></span>只看有内容的评价</p>
            </div>
            <div class="foodratingcontent">
	    	   <ul>
	    	   	<li  v-for = '(rating,index) in ratingselect'>
	    	   		 <div class="userinfo">
	    	   		 	<span class="ratingtime">{{rating.rateTime | date}}</span>
	    	   		 	<span class="username">{{rating.username}}</span>
	    	   		 	<img :src=rating.avatar alt="" class="useravatar">
	    	   		 </div>
	    	   		 <div class="ratingcontent">
	    	   		  <span class="icon-thumb_up  icon"></span>
                      <span class="text">{{rating.text}}</span>	    	   		 	
	    	   		 </div>
	    	   	</li>
	    	   </ul>
	        </div>	
	    </div>	
	</div>   
	</div>
    </transition>
</template>
<script>
	import Vue from 'vue'
    import 'animate.css/animate.css'
    import '../../filter/time.js'
    import cartcontrol from '../cartcontrol/cartcontrol.vue'
	export default{
		props:['showfood'],
		created(){
			this.$nextTick( () => {
					setTimeout(() => {
						if(!this.details){
				     	this.details = new BScroll( this.$refs.details, {
					 		click : true})
				     
				     	
				     }else {
				     	this.details.refresh();
				     }
				 },200)
			})
			
		     

		},
		data(){
			return{
				showdetail:false,
				ratingselect:[],

			}
		},
		computed:{
           flag(){
           	 if(this.showfood.count){
                return  true;
           	 }
           	 else{
           	 	return false;
           	 }
           }
		},
		// watch : {
		// 	 showfood(){
		// 		this.$nextTick( () => {
		// 			this._initfooddetails();
					 
		// 		})
		// 	}
		// },
		methods:{
			cartcontrolflag(){
				this.flag = true;
				if(!this.show.count){
	              Vue.set(this.showfood, 'count',1);
	        	}else{
	        		this.food.count++;
	        	}

			},
			// _initfooddetails() {
			// 	this.details = new BScroll( this.$refs.details, {
			// 		click : true
			// 	});
				
			// },
			show(){
				this.showdetail = true;
			},
			foodhide(){
				this.showdetail = false;
			},
			showall(){
				console.log(1111);
				this.ratingselect = this.showfood.ratings;
			},
			showsatisfy(){
	        	console.log(2222);
	            var arr=[];
				for(var i=0;i<this.showfood.ratings.length;i++){
					var rating =this.showfood.ratings[i];
					 if(rating.rateType ==0){
	                    arr.push(rating);
					 }

				}
				this.ratingselect =arr;
			},
			showunsatisfy(){
            	console.log(333);
                var arr=[];
				for(var i=0;i<this.showfood.ratings.length;i++){
					var rating =this.showfood.ratings[i];
					 if(rating.rateType ==1){
                        arr.push(rating);
					 }

				}
				this.ratingselect =arr;
			 
 
			},


		},
		components:{
			cartcontrol,
		}
	}
</script>
<style lang = 'less' scoped>
	.fooddetails{
		position:fixed;
		top:0rem;
		left:0rem;
		bottom:0rem;
		right:0rem;
		/* background-color:rgba(7,17,27,0.8); */
		background-color: #fff;
		overflow: hidden;
		.imgs{
			position: relative;
			width: 100%;
			height: 0rem;
			padding-bottom: 100%;
			img{
				position: absolute;
				width: 100%;
				height: 100%;
			}
		 		}
		 		.desc{
		 			padding:0.36rem;
		 			h2{
		                font-size: 0.28rem;
		                font-weight: 700;
		                color:rgb(7,17,27);
		                line-height: 0.28rem;
		                padding-bottom: 0.16rem;
		               
		 			}
		 			p{  
		 				font-size: 0rem;
		
		 				.sellcount,.rating{
		 					display:inline-block;
		 					padding-right: 0.24rem;
		 					font-size: 0.2rem;
		 					color:rgb(147,153,159);
		                     
		 				}
		 			}
		
		 		}
		 		.price{
		 			padding:0.36rem;
		 			padding-top: 0rem;
		 			border-bottom:0.01rem solid rgba(7,17,27,0.1);
		 			display:flex;
		 			justify-content:space-between;
		 			.price-left{
		                    font-size: 0;
			 				.curprice{
			 				font-size: 0.28rem;
			 				font-weight: 700;
			 				color:rgb(240,20,20);
			 				color:red;
			 				line-height:0.48rem;
		
		 			}
		 			.oldprice{
		 				font-size: 0.2rem;
		 				font-weight: normal;
		 				color:rgb(47,153,159);
		 				color:rgba(7,17,27,0.5);
		 				line-height: 0.48rem;
		 			}
		 			}
		 			.price-right{
		 				/* width: 1.48rem; */
		 				/* height: 0.48rem; */
		 				padding:0.12rem 0.24rem;
		 				border-radius:0.24rem;
		 				background-color: rgb(0,160,220);
		 				font-size: 0.2rem;
		 				color:#fff;
		 				text-align:center;
		 				line-height: 0.24rem;
		 				
		                .cartcontrol{
                                 background-color: #fff;
		                        }
		 			}
		 			.cartcontrolwrapper{
		 				font-size: 0rem;
		 			}
		 			
		 		}
		 		.divider{
		            width: 100%;
		            height:0.32rem;
		            background-color:#f3f5f7;
		 			border-bottom:0.01rem solid rgba(7,17,27,0.1);
		
		 		}
		 		.foodinfo{
		 			padding:0.36rem;
		 			h2{
		 				font-size: 0.28rem;
		 				color:rgb(7,17,27);
		 				line-height: 0.28rem;
		 			}
		 			.info{
		                padding-top: 0.12rem;
		                padding-left: 0.16rem;
		                padding-right: 0.16rem;
		                font-size: 0.24rem;
		                font-weight:200;
		                color:rgb(77,85,93);
		                line-height: 0.48rem;
		
		
		 			}
		 		}
		 		.foodrating{
		           padding-top: 0.36rem;
		           /* padding-right: 0.36rem;
		           padding-left: 0.36rem; */
		           /* overflow: hidden; */
		           /* border: 1px solid #000; */

			           h2{
			 				font-size: 0.28rem;
			 				color:rgb(7,17,27);
			 				line-height: 0.28rem;
			 				padding-bottom: 0.12rem;
			 				padding-left: 0.36rem;
			 			}
			 		.ratings{	 
			 					padding-right: 0.36rem;
		                        padding-left: 0.36rem;	
			           			padding-bottom: 0.24rem;
			           			/* padding-top:0.36rem ; */
			           			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
			           			/* border: 1px solid #000; */
		
		           	 ul{
		           	   /* border: 1px solid #000; */
		           	   padding-top:0.24rem ; 
		              
		               padding-bottom: 0.36rem;
		               border-bottom: 0.01rem solid rgba(7,17,27,0.1);
		               font-size: 0;
			               li{
			               	display: inline-block;
			                /* width: 1.2rem; */
			               	/* height: 0.6rem; */
			               	padding:0.16rem 0.24rem;
			               	background-color:#ccc;
			               	margin-right: 0.16rem;
			               	line-height:0.32rem ;
			               	font-size: 0.24rem;
			                text-align: center;
				               &.all{
				               	background-color: rgba(0,160,220,0.4);
				               	  &.active{
					               	 		background-color:rgba(0,160,220,0.8);
					               }
				               }
				               &.satisfy{
				               	background-color:rgba(0,160,220, 0.2);
								      &.active{
					               	 		background-color:rgb(0,160,220);
					               	 }
				               }
				               &.unsatisfy{
				               	background-color: rgba(77,85,93,0.2);
				               	    &.active{
					               	 		background-color:rgba(7,17,27,0.5);
					               	}

				               }
				               span{
				               	    font-size: 0.12rem;
				               }
		
		
			               }
		           }
		           p{
		           	  padding-top: 0.24rem;
		           	  padding-left: 0.24rem;
		           	  font-size: 0.24rem;
		           	  line-height: 0.48rem;
		           	  color:rgba(7,17,27,0.5);
		           	  	  .circle{
		           	             
		           	  	  	  &.active{
		           	      	 		color:green;
		           	      	 }
		           	  	  }

		           }
			        }
			        .foodratingcontent{
			        	ul{   
			        		padding-top:0.36rem;
			        		padding-left: 0.36rem;
			        		padding-right: 0.36rem;
			        		li{ 
			        			padding-top: 0.32rem;
			        			padding-bottom: 0.32rem;
		                border-bottom: 0.01rem solid rgba(7,17,27,0.1);
		
			        			div.userinfo{
			        				display: flex;
						    justify-content:space-between;
			        				padding-top: 0.32rem;
			        				padding-bottom: 0.12rem;
			        				padding-right: 0.36rem;
			        				font-size:0.2rem;
		                            color:rgb(147,153,159);
		                            line-height:0.24rem;
		                            position: relative;
			        				.ratingtime{
			        				  display:block;
		                              
			        				}
			        				.username{
			        				  display:block;
		
		                              
			        				}
			        				.useravatar{
			        					position: absolute;
			        					top:0.32rem;
			        					right:0rem;
			        					width: 0.24rem;
			        					height:0.24rem;
		                                border-radius:0.12rem;
		
			        				}
			        			}
			        			div.ratingcontent{
			        				font-size: 0rem;
			        				.icon{
			        					display:inline-block;
			        					padding-right: 0.08rem;
		                                font-size: 0.24rem;
		                                color:rgb(0,160,220);
		                                line-height: 0.48rem;
			        				}
			        				.text{
		                                font-size: 0.24rem;
		                                color:rgb(7,17,27);
		                                line-height: 0.32rem;
			        				}
			        			}
			        		}
			        	}
			        }
		 		}
		
 
	}
</style>