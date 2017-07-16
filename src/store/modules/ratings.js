import types from '../types.js'
import axios from 'axios'

const state={
	goods:[],
	 
}

const getters={
	goods(state){
		return state.goods;
	},
	foodcart(){
		return state.foodcart;
	}
}

const actions={
	getGoods({commit,state}){
		axios.get('/api/goods').then(resp => {
			if(resp.data.errno==0){
				commit(types.GET_GOODS,resp.data.data);
			}
		});
	},
	add({commit,state}){
		 commit(types.GET_ADD);
	},
	decrese({commit,state}){
		 commit(types.GET_DECRESE);
	},
}
// GET_ADD,
// GET_DECRESE

const mutations={
	[types.GET_GOODS](state,data){
		state.goods=data;
	},
	[types.GET_ADD](state){
		state.foodcart++;
	},
	[types.GET_DECRESE](state){
		state.foodcart--;
	}
	
}

export default {
	state,
	getters,
	actions,
	mutations
}