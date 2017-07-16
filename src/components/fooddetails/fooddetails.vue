<template>
    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
	<div class="fooddetails" v-show = 'showdetail'  ref = 'details'>
			<!-- <div class="">  -->
				<div class="imgs">
				     	<span class="icon-arrow_lift"  @click ='foodhide()'></span>
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
			        	
			        	<keep-alive>
			        	   <cartcontrol   :food = 'showfood' class='cartcontrol' ></cartcontrol>	
			        	</keep-alive>
			        </div>
			    </div>
			    <div class="divider">
			    	
			    </div>
			    <div class="foodinfo" >
			    	<h2>商品介绍</h2>
			    	<p class="info" v-if = 'showfood.info'>{{showfood.info}}</p>
			    	<p class="info" v-if = '!showfood.info'>暂无介绍</p>
			    </div>	
			     <div class="divider">
			    	
			    </div>
			    <div class="foodrating">
			    	<h2>商品评价</h2>
			    	<div class="ratings">
			        	<ul>
			        		<li class="allratings"   @click = 'showall()' :class = "{'active':all}" >全部&nbsp;<span>{{ratingnumall}}</span></li>
			        		<li class="satisfyratings"  @click = 'showsatisfy()' :class = "{'active':satisfy}">满意&nbsp;<span>{{ratingnumsatisfy}}</span></li>
			        		<li class="unsatisfyratings"  @click = 'showunsatisfy()' :class = "{'active':unsatisfy}" >不满意&nbsp;<span>{{ratingnumunsatisfy}}</span></li>
			        	</ul>
			        	<p @click = 'onlycontent'> <span class="icon-check_circle circle" :class = "{'active':only}"></span>只看有内容的评价</p>
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
			    	   		  <span class="icon-thumb_up  iconup"  v-if ='rating.score>3'></span>
			    	   		  <span class="icon-thumb_down icondown" v-if ='rating.score<=3'></span>
		                      <span class="text">{{rating.text}}</span>	    	   		 	
			    	   		 </div>
			    	   	</li>
			    	   </ul>
			        </div>	
			    </div>	
			<!-- </div>    -->
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
		 
			// this.$nextTick( () => {
			// 	this._initfooddetails();
				 
			// })
			this.$nextTick( () => {
					 
					setTimeout(() => {
						this.showall();
			            this.showsatisfy();
			            this.showunsatisfy();
						if(!this.detail){
							console.log(111);
				     	this.detail = new BScroll( this.$refs.details, {
					 		click : true})
				     
				     	
				     }else {
				     	console.log(222);
				     	this.detail.refresh();
				     }
				 },200)

             })
		},
		data(){
			return{
				showdetail:false,
				showdetail:false,
				ratingselect:[],
				ratingnumall:0,
			    ratingnumsatisfy:0,
			    ratingnumunsatisfy:0,
			    all:false,
			    satisfy:false,
			    unsatisfy:false,
			    only:false,
			    flag1:false,
			    flag2:false,
			    flag3:false,
			    flag4:false,
				 

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
			_initfooddetails() {
				this.details = new BScroll( this.$refs.details, {
					click : true
				});
				
			},
			show(){
				this.showdetail = true;
			},
			foodhide(){
				this.showdetail = false;
			},
			showall(){
				console.log(1111);
				this.all = true;
            	this.satisfy = false;
            	this.unsatisfy = false;
				// this.ratingselect = this.showfood.ratings;
				var arr=[];
            	if(this.flag4){
            		console.log('flag41');
                   for(var i=0;i<this.showfood.ratings.length;i++){
						var rating = this.showfood.ratings[i];
						 if(rating.text !=""){
	                        arr.push(rating);
	                        console.log(arr.length);
						 }

					}
            	}else{
            		// this.ratingselect = this.showfood.ratings;
            		arr = this.showfood.ratings;
            	}
			    this.ratingselect = arr;
            	this.ratingnumall = arr.length;
            	this.flag1  = true ;
            	

			},
			showsatisfy(){
	        	console.log(2222);
	        	  var arr=[];
	        	this.all = false;
            	this.satisfy = true;
            	this.unsatisfy = false;
                if(this.flag4){
                	     console.log('flag43');
	                	for(var i=0;i<this.showfood.ratings.length;i++){
								var rating = this.showfood.ratings[i];
								console.log(rating);
								 if(rating.rateType == 0 && rating.text != ""){
			                        arr.push(rating);
	                        		console.log(arr.length);

								 }

					   }
                }else{
	                	for(var i=0;i<this.showfood.ratings.length;i++){
								var rating = this.showfood.ratings[i];
								console.log(rating);
								 if(rating.rateType == 0){
			                        arr.push(rating);
	                        		console.log(arr.length);

								 }

					    }
                }
				this.ratingselect =arr;
				this.ratingnumsatisfy = arr.length;
				this.flag2  = true ;
			
	      
			},
			showunsatisfy(){
            	console.log(333);
            	this.all = false;
            	this.satisfy = false;
            	this.unsatisfy = true;
             var arr=[];
                 if(this.flag4){
                 	    console.log('flag43');
	                	for(var i=0;i<this.showfood.ratings.length;i++){
								var rating = this.showfood.ratings[i];
								console.log(rating);
								 if(rating.rateType == 1 && rating.text != ""){
			                        arr.push(rating);
	                        		console.log(arr.length);

								 }

					   }
                }else{

						for(var i=0;i<this.showfood.ratings.length;i++){
							var rating = this.showfood.ratings[i];
							console.log(rating);
							 if(rating.rateType ==1){
		                        arr.push(rating);
	                        	console.log(arr.length);

							 }

						}
				}
				this.ratingselect =arr;
				this.ratingnumunsatisfy = arr.length;
				this.flag3  = true ;
				

 
			},
			onlycontent(){
                var arr=[];
				this.flag4 = !this.flag4;
                       if(this.flag1 && this.flag4){
                       	           console.log(1);
                                	for(var j = 0; j < this.ratingselect.length; j++){
				                		 var rating = this.ratingselect[j];
				                		 console.log(rating);
				                         if(rating.text != ''){
				                		 console.log(arr.length);
				                            arr.push(rating);
				                         }
				                	}
                       } else  if(this.flag2 && this.flag4){
                       				console.log(2);
                                	for(var j = 0; j < this.ratingselect.length; j++){
				                		 var rating = this.ratingselect[j];
				                		 console.log(rating);
				                         if(rating.text != ''){
				                		 console.log(arr);
				                            arr.push(rating.length);
				                         }
				                	}
                       } else  if(this.flag3 && this.flag4){
                       				console.log(3);
                                	for(var j = 0; j < this.ratingselect.length; j++){
				                		 var rating = this.ratingselect[j];
				                		 console.log(rating);
				                         if(rating.text != ''){
				                            arr.push(rating);
				                		    console.log(arr.length);
				                         }
				                	}
                       } else if(this.flag1 || this.flag4){
                       	   
                       		    arr = this.ratingselect
                       }else if(this.flag2 || this.flag4){
                       	        arr = this.ratingselect
                       }else if(this.flag3 || this.flag4){
                       		    arr = this.ratingselect
                       }
				this.ratingselect = arr;
				this.only = !this.only;
			
			 }




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
			.icon-arrow_lift{
				color:#fff;
				position: absolute;
				z-index:2;
				top:0.4rem;
				left:0.4rem;
				font-size: 0.4rem;
				/* border: 1px solid #000; */
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
				               &.allratings{
				               	background-color: rgba(0,160,220,0.4);
				               	   &.active{
					               	 		background-color:rgba(0,160,220,0.8);
					               }
				               }
				               &.satisfyratings{
				               	background-color:rgba(0,160,220, 0.2);
				               	 &.active{
					               	 		background-color:rgb(0,160,220);
					               	 }
				               }
				               &.unsatisfyratings{
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
			        		/* padding-top:0.36rem; */
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
			        				.iconup{
			        					display:inline-block;
			        					padding-right: 0.08rem;
		                                font-size: 0.24rem;
		                                color:rgb(0,160,220);
		                                line-height: 0.48rem;
			        				}
			        				.icondown{
			        					display:inline-block;
			        					padding-right: 0.08rem;
		                                font-size: 0.24rem;
		                                color:rgb(7,17,27,0.5);
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