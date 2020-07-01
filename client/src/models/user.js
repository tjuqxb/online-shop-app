export default {
  state:{info: {}},

  //Async action
  effects: {
    *login({payload}, {put, call}) {
      //
    },
    *reg({payload}, {put, call}) {

    }
  },

  reducers:{
    save(state, action) {
      return {...state, ...action.payload};
    },
  }
}
