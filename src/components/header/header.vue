<template>
 <div>
 	
        <div class="header">
        	<div class="header_top">
        		
            <div id="d1">
        		  <img class="avatar"  @click="showDetail"  :src="seller.avatar" alt="" >
        		    
        			<h2><img src="../../../static/img/brand@2x.png" alt="">{{seller.name}}</h2>
        			<p id="p1">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        			<p id="p2" v-if = 'seller.supports'><img src="../../../static/img/decrease_1@2x.png"  alt="">{{seller.supports[0].description}}
               
                  
              			<span class="s1" v-if = 'seller.supports' @click="showDetail">{{seller.supports.length}}个
                     <span class="s2 icon-keyboard_arrow_right"></span></span>
                   
                
              </p>
            </div>
          
        		
        	</div>
           <div class="header_botm">
           	<p><img src="../../../static/img/bulletin@2x.png"   alt="">{{seller.bulletin}}个  ></p>  
           </div>
        
        <v-Details></v-Details>
        </div>
 </div>
         
		
	 
</template>
<script>
    import {mapGetters} from 'vuex'
    import Details from  '../details/details.vue'
	export default{
      created(){
      	this.$store.dispatch('getSeller');
      },
      computed:{
      	...mapGetters(['seller']),
      },
      components:{
          'v-Details':Details,
      },
      methods:{
      	  showDetail(){
				this.$store.dispatch('showDetail');
			}
      }
	}

</script>
<style lang='less' scoped>

 .header{
 
  
 	    background-color: rgba(7,17,27,0.5);

        .header_top{
                   
                    // height: 2.12rem;
                    font-size: 0rem;
                    // padding-left: 1.76rem;
                    // padding-top: 0.48rem;
                    // padding-right:0.24rem ;
                    // padding-bottom: 0.36rem;
                    // position: relative;

          #d1{    
                           
                          // display:inline-block;
                          // font-size: 0;
                          padding-left:2.08rem;
                          padding-right:0.24rem;
                          padding-top: 0.48rem;
                          padding-bottom: 0.36rem;
                          // border: 1px solid #000;
                          position: relative;
                					img.avatar{
                					           
                					 		width: 1.28rem;
                					 		height:1.28rem;
                					 		border-radius:0.04rem;
                					 	  position: absolute;
                              // margin-left:-1.28rem;
                					 		left:0.48rem;
                              top: 0.48rem;
                             // border: 1px solid #000;
                					 	
                				 	    }
                          
	                        h2{
		                        		img{
                                  margin:0rem;
                                  
			                        		padding-right: 0.12rem;
			                        		width:0.6rem;
			                        		height: 0.36rem;
			                        		vertical-align:middle;

			                        	

		                        	   }
                        		
                        		font-size: 0.32rem;
                        		color:rgb(255,255,255);
                        		font-weight: bold;
                        		line-height: 0.36rem;
                        		vertical-align:middle;
                            // border: 1px solid #000;
                        	}
                        	#p1{
                        		padding-top: 0.16rem;
                            padding-bottom: 0.2rem;
                        		font-size: 0.24rem;
                        		color:rgb(255,255,255);
                        		font-weight: 200;
                        		line-height: 0.24rem;

                        	}
                        	#p2{ 
                               

                        		img{
			                        	
			                        		margin:0rem;
                                  margin-top:-0.04rem;
			                        		width:0.24rem;
			                        		height:0.22rem;
                                  padding-right: 0.08rem;
			                        	  vertical-align:middle;
			                        		 

		                        	   }
                        		// border: 1px solid #000;
                        		font-size: 0.2rem;
                        		color:rgb(255,255,255);
                        		font-weight: 200;
                        		line-height: 0.24rem;
                            height:0.24rem;
                            vertical-align:middle;
                            
                            
                                
                                .s1{  
                                     position: absolute;
                                     right: 0.24rem;
                                     top:1.28rem ;
                                      display: inline-block;
                                      font-size: 0.2rem;
                                      color:rgb(255,255,255);
                                      font-weight:200;
                                      line-height: 0.24rem;
                                      height:0.24rem;
                                      padding: 0.14rem 0.16rem;
                                      border-radius:0.16rem ;
                                      background-color:rgba(0,0,0,0.2);
                                      
                                      .s2{
                                             padding-right: 0.04rem;
                                       }
                                }
                                

                           
                          }
                         


				     }
				 	 
 


        }
        .header_botm{
                   // height: 0.56rem;
                   background-color:rgba(7,17,27,0.2);

                   p{
	                   	  img{
	                   	  	width:0.44rem;
	                   	  	height:0.24rem; 
	                   	  	margin-left: 0.24rem;
	                   	  	margin-right: 0.08rem;
	                   	  	vertical-align:middle;

	                   	  	}

                   	  margin-right: 0.24rem;
	                   	font-size:0.2rem;
	                   	color:rgb(255,255,255);
	                   	font-weight: 200;
	                   	line-height: 0.56rem; 
	                   	display:block;
	                   	white-space:nowrap; 
	                   	overflow:hidden;
	                    text-overflow:ellipsis;
                   }




        }

 		
 

 	 
 }
	

	
</style>