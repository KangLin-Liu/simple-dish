import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phone:"",
    password:"",
    rePassword:"",
    loginFlag:false,
    collectArr:[],
  },
  mutations: {
    collectDish(state,id){
      state.collectArr.push(id);
    },
    removeDish(state,id){
      state.collectArr = state.collectArr.filter(v=>v!=id)
    }
  },
  actions: {
  },
  modules: {
  }
})
