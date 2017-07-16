import Vue from 'vue'

Vue.filter('date',data => {
			let d=new Date(data);
			return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
		});