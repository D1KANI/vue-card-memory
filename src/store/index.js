import { createStore } from 'vuex'

export default createStore({
  state: {
    records: []
  },
  getters: {
    records(state) {
      return state.records
    }
  },
  mutations: {
    setRecord(state, payload) {
      if (payload < 1 || isNaN(+payload)) return
      console.log(payload)
      state.records.push(payload)
      this.commit('sortRecords')
    },
    sortRecords(state) {
      state.records.sort((a,b) => a - b)
    }
  },
  actions: {
  },
  modules: {
  }
})
