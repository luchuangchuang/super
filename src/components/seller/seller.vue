 <template>
	<div class="seller"  ref = 'sellerdetails'>
		<div class="">
			<div class="top">
				<div class="top-left">
					 <h1>{{	seller.name}}</h1>
					 <div class="sellerstar">
						 <p>
						 	
						  <stars :score = 'seller.score'  class="stars"></stars><span  class="ratingcount">({{seller.ratingCount}})</span>	&nbsp;&nbsp;<span class="sellcount">月售{{seller.sellCount}}</span>  
						 </p>
					 </div>
				</div>
				<div class="top-right">
					<p @click="collectflag=!collectflag">
						<span class="icon-favorite" :class="{'active':collectflag}"></span><br>
						<span class="text" >{{collectflag?'已收藏':'收藏'}}</span>
					</p>
				</div>
			</div>
			<div class="top-b">
					<div class="d1">
						<p class="text">起送价</p> 
						<p class="num">{{seller.minPrice}} <span>元</span> </p>
					
					</div>
					<div class="d2">
						<p class="text">商家配送</p>
						<p class="num">{{seller.deliveryPrice}} <span>元</span></p>
					</div>
					<div class="d3">
						<p class="text">平均配送时间</p> 
						<p class="num">{{seller.deliveryTime}} <span>分钟</span></p>
					</div>
			</div>
			<div class="divider">
				
			</div>	
			<div class="bulletinAndact">
				<div class="bulletin">
					<h2 class="bulletinhead">公告与活动</h2>
					<p class="bulletininfo">{{seller.bulletin}}</p>
				</div>
				<div class="act">
				  <ul>
				  	<li v-for = '(support,index) in seller.supports'>
				  			<img src="../../../static/img/decrease_1@2x.png" height="24" width="24" alt="">{{support.description}}
				  	</li>
				  </ul>
					
				</div>
				
			</div>
	        <div class="divider"></div>
			<div class="pics"  > 
			   
						<h2>商家实景</h2>
						<div class="sellerpics"  ref ='pic'>
<!-- 							  <div  class=""> -->
								<ul  ref = 'ulimgs'>
									<li  v-for = '(pic,index) in seller.pics'>
										<img :src="pic" alt="">
									</li>
								</ul>
							<!--   </div> -->
						</div>	
				
			</div>
			
	        <div class="divider"></div>	
			<div class="infos">
			  <h2>商家信息</h2>
			  <ul>
			  	<li  v-for = '(info,index) in seller.infos'>
			  		<p>{{info}}</p>
			  	</li>
			  </ul>
				
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
    import stars from '../stars/stars.vue'
	export default {
		created(){
			this.$store.dispatch('getSeller');
			this.$nextTick( () => {
				this._initsellerdetails();
				this._initsellerimgs();
				 
			})
			 
		},
		 data() {
		    return {
		      collectflag: false
		    }
		  },
		
		computed:mapGetters([
			'seller',
			 


		]),
		// watch : {
		// 	 seller(){
		// 		this.$nextTick( () => {
		// 			this._initsellerdetails();
		// 			this._initsellerimgs();
					 
		// 		})
		// 	}
		// },
		 
		methods : {

            _initsellerdetails() {
            	// this.$refs.ulimgs.style.width = 744+'px';
				this.sellerdetails = new BScroll( this.$refs.sellerdetails, {
					click : true
				});
				// this.pic = new BScroll( this.$refs.pic, {
				// 	click : true,
				// 	scrollX:true
				// });
				
			},
			_initsellerimgs() {
            	this.$refs.ulimgs.style.width = 500+'px';
				
				this.pic = new BScroll( this.$refs.pic, {
					click : true,
					scrollX:true,
				});
				
			},
		},
		components:{
			stars
		}

	}
</script>

<style lang="less" scoped>
	  .seller{
			position: absolute;
			top:3.48rem;
			bottom: 1.2rem;
			width: 100%;
			overflow: hidden;
			  	.top{
			  		padding:0.36rem;
			  		// border: 1px solid #000;
			  		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
			  		font-size: 0rem;
                    position: relative;
			  	 	.top-left{
				  	 	h1{
		                    font-size: 0.28rem;
		                    color: rgb(7,17,27);
		                    line-height:0.28rem;
		                    padding-bottom: 0.16rem;
		                    // border: 1px solid #000;

				  	 	}
				  	 	.sellerstar{
		                        height: 0.36rem;
		                        font-size: 0.2rem;
		                        color: rgb(77,85,93);
		                        line-height: 0.36rem;
		                        display:inline-block;

		                        // border: 1px solid #000;
		                        p{
			                        	.stars{
			                        	  	 display:inline-block;
											 margin-bottom: 0rem;
				                        	   .star{

						                        	margin-bottom: 0rem;
						                        }
			                        	}
				                        .ratingcount{
				                        	padding-left: 0.16rem;
				                        	padding-right: 0.24rem;
				                        	margin-top: -0.2rem;
				                        	font-size: 0.2rem;
				                        }
				                        .sellCount{

				                        }

		                        }
		                     

			  	 	    }

			  	    } 
			  	    .top-right{
                          position: absolute;
                          top: 0.36rem;
                          right:0.36rem;
                          text-align: center;

                          .icon-favorite{
                          	font-size: 0.48rem;
                          	color:rgba(7,17,27,0.4);
                          	line-height: 0.48rem;
                          	display: inline-block;
                          	padding-bottom: 0.08rem;
                          	&.active{
                          		color:rgb(240,20,20) !important;
                          	}
                          }
                          .text{
                               font-size: 0.2rem;
                               color:rgb(77,85,93);
                               line-height: 0.2rem;
                          }

			  	    }
			    }
			    .top-b{
			    	padding: 0.36rem;
			    	display:flex;
			    	justify-content:space-between;
			    	text-align: center;
			    	// border: 1px solid #000;
			    	div{
			    		flex:1;
			    		height:0.76rem;
			    		// border: 1px solid #000;
			    		font-size: 0rem;
			    		border-right: 0.01rem solid rgba(7,17,27,0.1);
			    		.text{
			    			font-size: 0.2rem;
			    			color: rgb(147,153,159);
			    			line-height: 0.2rem;
			    			display: inline-block;
			    			padding-bottom: 0.08rem;
			    		} 
			    		.num{
                            font-size: 0.48rem;
                            font-weight: 200;
                            color: rgb(7,17,27);
                            line-height: 0.48rem;
                            span{
                            	font-size: 0.2rem;
                            }
			    		}
			    	}
			    	.d3{
                    border-right:none;
			    	}
			    }
			    .divider{
					width: 100%;
					height: 0.32rem;
					background-color:rgba(7,17,27,0.1);
				}
				.bulletinAndact{
					padding:0.36rem ;
					padding-bottom: 0rem;
					.bulletin{
						.bulletinhead{
	                                font-size: 0.28rem;
				                    color: rgb(7,17,27);
				                    line-height:0.28rem;
				                  
						}
						.bulletininfo{
 									font-size: 0.24rem;
 									font-weight:200;
				                    color: rgb(240,20,20);
				                    line-height:0.48rem;
				                    padding:0.16rem 0.24rem 0.32rem;
				                    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
						}

					}
					.act{
						ul{
							
							li{  
								 position:relative;
                                 padding-top: 0.32rem;
                                 padding-bottom: 0.32rem;
                                 padding-left: 0.68rem;
                                 font-size: 0.24rem;
                                 font-weight: 200;
                                 color: rgb(7,17,27);
                                 line-height:0.32rem ;
                                 border-bottom: 0.01rem solid rgba(7,17,27,0.1);
                                 img{
                                 	position: absolute;
                                 	top: 0.32rem;
                                 	left: 0.24rem;
                                 	width: 0.32rem;
                                 	height: 0.32rem;


                                 }
							}
						}
					}
				}
				.pics{
					padding-top: 0.36rem;
					padding-bottom: 0.36rem;
					padding-left: 0.36rem;
					h2{
						font-size: 0.28rem;
	                    color: rgb(7,17,27);
	                    line-height:0.28rem;
					}
					.sellerpics{
							ul{ 
								width: 7.44rem;
								padding-top: 0.24rem;
								font-size: 0rem;
								overflow: hidden;
								white-space: nowrap;
								li{
                                    display: inline-block;
                                    // width: 2.52rem;
                                    padding-right: 0.12rem;
									img{ 

										width: 2.4rem;
										height: 1.8rem;

									}
								}
							}
					}
				}
				.infos{
					padding:0.36rem ;
					h2{
						font-size: 0.28rem;
	                    color: rgb(7,17,27);
	                    line-height:0.28rem;
					}
					ul{
						padding-top: 0.24rem;
						li{
                           padding: 0.32rem 0.24rem;
                           border-top:0.01rem solid rgba(7,17,27,0.1);
                           font-size: 0.24rem;
                           font-weight: 200;
                           color: rgb(7,17,27);
                           line-height: 0.32rem; 

						}
					}

				}




		}

</style>