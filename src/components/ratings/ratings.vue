<template>
	<div class="ratings"  ref = 'rate'>
	  <div class=""> 
		  <div class="top">
		  	
				<div class="top-left">
					<h1>3.9</h1>
					<p class="p1">综合评分</p>
					<p class="p2">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="top-right">
					<p class="p1">服务态度&nbsp;&nbsp;<stars :score = 'seller.serviceScore' class = 'stars'></stars><span>{{seller.serviceScore}}</span></p>
					<p class="p2">服务态度&nbsp;&nbsp;<stars :score = 'seller.foodScore' class = 'stars'></stars><span>{{seller.foodScore}}</span></p>
					<p class="p3">送达时间&nbsp;&nbsp;<span>{{seller.deliveryTime}}分钟</span></p>
				</div>
		  </div>
		  <div class="divider"></div>
	      <div class="ratingscontent">
	        <div class="ratingmark">
	        	<ul>
	        		<li class="all"   @click = 'showall()' :class = "{'active':all}" >全部&nbsp;<span>{{ratingnumall}}</span></li>
	        		<li class="satisfy"  @click = 'showsatisfy()' :class = "{'active':satisfy}" >满意&nbsp;<span>{{ratingnumsatisfy}}</span></li>
	        		<li class="unsatisfy"  @click = 'showunsatisfy()' :class = "{'active':unsatisfy}" >不满意&nbsp;<span>{{ratingnumunsatisfy}}</span></li>
	        	</ul>
	        	<p @click = 'onlycontent'> 
	        	    <span class="icon-check_circle circle" :class = "{'active':only}"></span>
	        	    <span  class="text" >只看有内容的评价</span>
	        	</p>
	        </div>
	        <div class="contents" ref = 'ratingscontent'>
	        	<ul>
	        		<!-- <li class="" v-for='(rating,k) in ratingselect' v-if = '(rating.type == flag1 || flag2) && rating.text != flag3'> -->
	        		<li class="" v-for='(rating,k) in ratingselect'  >
	        			<img class="useravatar" :src=rating.avatar alt="">
	        			<p class="user"><span class="username">{{rating.username}}</span><span class="ratetime">{{rating.rateTime | date}}</span> </p>
	        			<p class="stars"><stars :score = 'rating.score' class = 'score'></stars> <span  v-show = 'rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span></p>
	        			<p class="text">{{rating.text}}</p>
	        			<ul>
	        			   <span class="icon-thumb_up iconup" v-if ='rating.score>3'></span>
	        			   <span class="icon-thumb_down icondown" v-if ='rating.score<=3'></span>
	        				<li v-for='(recommenditem,k) in rating.recommend'>
	        				<p class="recommend">{{recommenditem}}</p>
	        				</li>
	        			</ul>
	        		</li>
	        	</ul>
	        </div>
	      	
	      </div>
      </div>  
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import '../../filter/time.js'
    import stars from '../stars/stars.vue'
	export default {
		 
		created(){
			this.$store.dispatch('getRatings');
			this.$nextTick( () =>{
					setTimeout(()=>{
			               this.ratingselect = this.ratings;
			               this.showall();
			               this.showsatisfy();
			               this.showunsatisfy();
			               if(!this.rate){
						     	this.rate = new BScroll( this.$refs.rate, {
							 		click : true})
						     
						     	
						    }else {
						     	this.rate.refresh();
						    }

				},200);
			});
			
			 
		},
		data(){
            return{

           		ratingselect:this.ratings,
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
			...mapGetters([
			'ratings',
			'seller'
			 ]),
			



		
		},
		// watch : {
		//    ratings(){
		// 		this.$nextTick( () => {
		// 			 this._initratingscontent();
					 
		// 		})
		// 	}


		// },
		 
		methods : {
   //        	_initratingscontent(){
   //        		console.log(5);
			// 	// this.content = new BScroll( this.$refs.ratingscontent , {
			// 	// 	click : true
			// 	// });
			// 	this.rate = new BScroll( this.$refs.rate, {
			// 		click : true
			// 	});
				
			// },
            showall(){
            	console.log(111);
            	var arr=[];
            	if(this.flag4){
            		console.log('flag41');
                   for(var i=0;i<this.ratings.length;i++){
						var rating = this.ratings[i];
						 if(rating.text !=""){
	                        arr.push(rating);
	                        console.log(arr.length);
						 }

					}
					this.ratingselect = arr;
            	}else{
            		this.ratingselect = this.ratings;
            	}
            	
            	this.ratingnumall = this.ratings.length;
            	// this.flag  = true;
            	this.flag1  = true ;
            	this.all = true;
            	this.satisfy = false;
            	this.unsatisfy = false;

            },
			showsatisfy(){
            	console.log(2222);
                var arr=[];
                if(this.flag4){
                	     console.log('flag43');
	                	for(var i=0;i<this.ratings.length;i++){
								var rating = this.ratings[i];
								 if(rating.rateType ==0 && rating.text != ""){
			                        arr.push(rating);
	                        		console.log(arr.length);

								 }

					   }
                }else{
	                	for(var i=0;i<this.ratings.length;i++){
								var rating = this.ratings[i];
								 if(rating.rateType ==0){
			                        arr.push(rating);
	                        		console.log(arr.length);

								 }

					    }
                }
				this.ratingselect =arr;
				this.ratingnumsatisfy = arr.length;
				// this.flag  = true;
				this.flag2  = true ;
				this.all = false;
            	this.satisfy = true;
            	this.unsatisfy = false;

			},
			showunsatisfy(){
            	console.log(333);
                var arr=[];
                 if(this.flag4){
                 	    console.log('flag43');
	                	for(var i=0;i<this.ratings.length;i++){
								var rating = this.ratings[i];
								 if(rating.rateType ==1 && rating.text != ""){
			                        arr.push(rating);
	                        		console.log(arr.length);

								 }

					   }
                }else{

						for(var i=0;i<this.ratings.length;i++){
							var rating = this.ratings[i];
							 if(rating.rateType ==1){
		                        arr.push(rating);
	                        	console.log(arr.length);

							 }

						}
				}
				this.ratingselect =arr;
				this.ratingnumunsatisfy = arr.length;
				// this.flag  = true;
				this.flag3  = true ;
				this.all = false;
            	this.satisfy = false;
            	this.unsatisfy = true;

 
			},
			onlycontent(){
				// console.log(444);
				// console.log(this.flag);

                var arr=[];
     //            if(this.flag1 || this.flag2 || this.flag3){
                	 
		   //              	for(var j = 0; j < this.ratingselect.length; j++){
		   //              		 var rating = this.ratingselect[j];
		   //              		 // console.log(rating);
		   //                       if(rating.text != ''){
		   //                          arr.push(rating);
		   //                       }
		   //              	}

                     
     //            }else{

					// for(var i=0;i<this.ratings.length;i++){
					// 	var rating = this.ratings[i];
					// 	 if(rating.text !=""){
	    //                     arr.push(rating);
					// 	 }

					// }
     //            }
				this.flag4 = !this.flag4;
                       if(this.flag1 && this.flag4){
                       	           console.log(1);
                                	for(var j = 0; j < this.ratingselect.length; j++){
				                		 var rating = this.ratingselect[j];
				                         if(rating.text != ''){
				                		 console.log(arr.length);
				                            arr.push(rating);
				                         }
				                	}
                       } else  if(this.flag2 && this.flag4){
                       				console.log(2);
                                	for(var j = 0; j < this.ratingselect.length; j++){
				                		 var rating = this.ratingselect[j];
				                         if(rating.text != ''){
				                		 console.log(arr);
				                            arr.push(rating.length);
				                         }
				                	}
                       } else  if(this.flag3 && this.flag4){
                       				console.log(3);
                                	for(var j = 0; j < this.ratingselect.length; j++){
				                		 var rating = this.ratingselect[j];
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
          //                          console.log(4);
          //                          if(this.flag1 || this.flag2 || this.flag3){
					     //            	        console.log(41);
							   //              	// for(var j = 0; j < this.ratingselect.length; j++){
							   //              	// 	 var rating = this.ratingselect[j];
							   //              	// 	 // console.log(rating);
							   //               //         if(rating.text ==''){
							   //               //            arr.push(rating);
							   //               //         }
							   //              	// }
							   //              	arr = this.ratingselect

					                     
					     //            }else{
          //                               console.log(42);
                                        
										// // for(var i=0;i<this.ratings.length;i++){
										// // 	var rating = this.ratings[i];
										// // 	 if(rating.text != ''){
						    // //                     arr.push(rating);
										// // 	 }

										// // }
										// arr = this.ratings;
					     //            }
                              

                   			

                       

            					
                  // }         
				this.ratingselect = arr;
				// this.flag = ;
				this.only = !this.only;
			
			 }
		},
		components:{
			stars
		}
			
			

	}
</script>

<style lang="less" scoped>
	 .ratings{
		position: absolute;
		top:3.48rem;
		bottom: 1.2rem;
		overflow: hidden;
		width: 100%;
		font-size: 0rem;
		height: 10rem;
		.top{
			display:flex;
			justify-content: space-between;
			.top-left{
				// flex:0 0 2.75rem;
				// display: inline-block;
				// width:2.75rem;
				padding-top: 0.36rem;
				padding-bottom: 0.36rem;
				padding-left: 0.48rem;
				// border: 0.01rem solid #000;
				h1{
					font-size:0.48rem;
					color:rgb(255,153,0);
					line-height: 0.56rem;
					padding-bottom: 0.12rem;
					text-align: center;


				}
				.p1{
					font-size: 0.24rem;
					line-height: 0.24rem;
					padding-bottom: 0.16rem;
					text-align:center;
				}
				.p2{
					font-size: 0.2rem;
					color:rgb(7,17,27);
					line-height: 0.2rem;
					padding-bottom: 0.12rem;
					text-align:center;
				}

			 
			}
			.top-right{
				// flex:0 0 4.74rem;
				// width:4.74rem;
				// display: inline-block;
				padding: 0.36rem 0.48rem;
				overflow: hidden;
                // border: 0.01rem solid #000;
	            p{
	            	font-size: 0.24rem;
	            	line-height: 0.36rem;
	            	margin-bottom: 0.16rem;
	            	.stars{
	            		display: inline-block;
	            		margin-bottom: 0rem;
	            		margin-left:0.24rem ;
	            		height: 0.24rem;
	            		padding-right: 0.24rem;


	            	}
	            	span{
	            		margin-left:-0.24rem ;
	            		font-size: 0.24rem;
	            		color: rgb(255,153,0);
	            		line-height:0.36rem;
	            	}
	            }
	            .p3{ 
	            	margin-bottom: 0rem;
	            	span{
						margin-left:0.24rem ;
		            	font-size: 0.24rem;
		            	color: rgb(147,153,159);
		            	line-height: 0.36rem;
	            	}

	            }
			 
			}
		}
		.divider{
			width: 100%;
			height: 0.32rem;
			background-color:rgba(7,17,27,0.1);
		}
	   .ratingscontent{
	   	    width: 100%;
	    	padding-top: 0.36rem;
	    	padding-bottom: 0.36rem;
           .ratingmark{		
           			padding-bottom: 0.36rem;
           			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	           	 ul{
	               margin-right: 0.36rem;
	               margin-left: 0.36rem;
	               padding-bottom: 0.36rem;
	               border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	               // font-size: 0;
	               li{
	               	display: inline-block;
	               	width: 1.2rem;
	               	height: 0.6rem;
	               	background-color:#ccc;
	               	margin-right: 0.2rem;
	               	padding: 0.05rem;
	               	line-height:0.6rem ;
	               	font-size: 0.2rem;
	               text-align: center;
	               &.all{
	               	background-color:rgba(0,160,220,0.4);
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
	               	background-color:rgba(77,85,93,0.2);
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
	           	  padding-top: 0.36rem;
	           	  padding-left: 0.36rem;
	           	  font-size: 0.3rem;
	           	  line-height: 0.24rem;
	           	  color:rgba(7,17,27,0.5);
	           	  .circle{
                       
	           	  	  &.active{
	               	 		color:green;
	               	 }
	           	  }
	           }
           }
           .contents{
           		 // height: 6rem;
           	     padding-top:0.36rem;
           	     padding-bottom: 0.36rem;
           	     padding-right: 0.36rem;
           	     padding-left:1.16rem;
                 background-color: #fff;
                 overflow: hidden;

           	ul{ 
           		// border-bottom: 0.01rem solid rgba(7,17,27,0.1);
           		li{ 
           		    margin-top:0.36rem;
           		    margin-bottom: 0.36rem;

           			position: relative;
           			border-bottom: 0.01rem solid rgba(7,17,27,0.1);
					.useravatar{
                          position: absolute;
                          left:-0.8rem;
                          top:0rem;
                          // margin-left:-0.56rem;
                          width: 0.56rem;
                          border-radius: 0.28rem;
                          // padding-right: 0.24rem;
                          margin-right: 0.24rem;
					}
					.user{
						display: flex;
						justify-content:space-between;

						.username{
                          display: block;
                          font-size: 0.2rem;
                          line-height: 0.24rem;
                          color:rgb(7,17,27);

						}
						.ratetime{
                          display: block;
                          font-size: 0.2rem;
                          font-weight: 200;
                          color: rgb(147,153,159);
                          line-height: 0.24rem;


						}
					}
					.stars{
						
	            		font-size: 0rem;
	            		padding-top: 0.08rem;
	            		padding-bottom: 0.12rem;
	            		padding-right: 0.12rem;
	            		.score{
                          display: inline-block;
                          margin-bottom: 0rem;

	            		}
	            		span{
                             font-size: 0.2rem;
                             font-weight: 200;
                             color: rgb(147,153,159);
                             line-height: 0.24rem;
	            		}
					}
					.text{
                          font-size: 0.24rem;
                           color:rgb(7,17,27);
                           line-height: 0.36rem;
                           padding-bottom: 0.16rem;

					}
					ul{ 
                          
                         padding-left: 0.36rem;
                         padding-right: 0.24rem;
                         padding-bottom: 0.36rem;
                         position: relative;
                         margin-bottom: 0.2rem;
                          // white-space:nowrap; 
						  // overflow:hidden;

                         .iconup{  
                         	        position: absolute;
                         	        top:0.12rem;
                         	        left:0rem;
									// margin-left:-0.12rem;
									font-size: 0.24rem;
									color:rgb(0,160,200);
		                            // padding-right: 0.16rem;


							} 
						.icondown{
									// margin-left: -0.24rem;
									position: absolute;
                         	        top:0.12rem;
                         	        left:0rem;
									font-size: 0.24rem;
									color:rgba(7,17,27,0.5);
		                            padding-right: 0.16rem;


							}

						li{
						  margin-top: 0.12rem;
						  padding-right: 0.12rem;
						  padding-left: 0.12rem;
						  padding-top:0.02rem;
						  padding-bottom: 0.02rem; 
						  border: 0.01rem solid rgba(7,17,27,0.1);
						  border-radius: 0.02rem;
						  background-color: #fff;
						  display: inline-block;
						  margin-right: 0.16rem;
						  margin-bottom: 0rem;
						  // white-space:nowrap; 
						  // overflow:hidden;
						  // text-overflow:ellipsis;

							
							.recommend{
								       font-size: 0.18rem;
								       color: rgb(147,153,159);
								       line-height: 0.32rem;
                                 

							}
						}
					}

           		}
           	}

           }
          
	   }
	}

</style>