import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING (state, loading: boolean) {
      state.loading = loading
    }
  },
  actions: {},
  modules: {
    user
  }
})
