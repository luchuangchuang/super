<template>
 <div>
 	
        <div class="footer">
         <div id="d1">
          <div>
          
            <span class="icon-shopping_cart cart"></span>
          </div>
            <span class="s2">￥0</span>
         </div>
         <div id="d2">
            另需配送费￥4元
         </div>
         <div id="d3">
           ￥20起送
         </div>
        </div>
 </div>
         
		
	 
</template>
<script>
  import {mapGetters} from 'vuex'
     
	export default{
      created(){
      	 
      },
      computed:{
      	...mapGetters(['seller']),
      },
      components:{
          
      },
      methods:{
      	  
			}
      
	}

</script>
<style lang='less' scoped>
  .footer{
    position: absolute;
    bottom: 0rem;
    width: 100%;
    // height:1rem;
    overflow: hidden; 
    background-color:#141d27;
    text-align: center;
    #d1{
       float: left;
       width:30%;
       font-size: 0.32rem;
       color:rgba(255,255,255,0.4);
       font-weight: 700;
       line-height: 1rem;
       div{
             
            //  position:relative;
            //  left: 0.24rem;
            //  bottom:1.04rem;
            //  width: 1rem;
            //  height: 1rem;
            // border-radius: 0.5rem; 
            //  background-color:#141d27;
            .cart{
              // display: inline-block;
              position: absolute;
              left: 0.36rem;
              bottom:0.16rem;
              width: 0.88rem;
              height: 0.88rem;
              border-radius: 0.44rem; 
              font-size: 0.48rem;
              line-height: 0.88rem;
             background-color:rgba(255,255,255,0.2);
           }
       }
       .s2{}
       
    }
    #d2{
      float: left;
       width:40%;
       font-size: 0.32rem;
       color:rgba(255,255,255,0.4);
       font-weight: 700;
       line-height: 1rem;

    }
    #d3{
      float: left;
      width:30%; 
      font-size: 0.32rem;
       color:rgba(255,255,255,0.4);
       font-weight: 700;
       line-height: 1rem;


    }
    
  }
 

	
</style>