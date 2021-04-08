const state = {
  userInfo: null
}
const actions = {
  setUserInfo(context, userInfo){
    context.commit('setUserInfo', userInfo)
  },
  logOut(context){
    context.commit('logOut')
  }
}

const mutations ={
  setUserInfo(state, userInfo){
    state.userInfo = userInfo;
  },
  logOut(state){
    state.userInfo = null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}