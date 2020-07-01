export default {
  state:{list: {}},

  //Async action
  effects: {
    *addToShopCart({payload}, {put, call}) {
      //
    },
    *loadShopCart({payload}, {put, call}) {
      //
    },
  },


  reducers:{
    save(state, action) {
      return {...state, ...action.payload};
    },
  }
}
