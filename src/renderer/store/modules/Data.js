const state = {
  name: '',
  data: [],
  varnames: []
}

const mutations = {
  LOAD_DATASET (state, name, data, vars) {
    state.name = name
    state.data = data
    state.varnames = vars
    // then change the view to `/main`
  }
}

const actions = {
  load ({commit}) {
    commit('LOAD_DATASET')
  }
}

export default {
  state,
  mutations,
  actions
}
