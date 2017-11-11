declare let process: any

import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import defaultKeys from './defaultKeys'

Vue.use(Vuex)

const state = {
  keyList: defaultKeys
}

const getters = {
  keyList: state => state.keyList,
}

const actions = {
}

const mutations = {
}

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions
})

export default store
