export default {
  state:{},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((pathname, query)=> {
        console.log(pathname); // user authorization required for some paths
      })
    }
  },
  reducers:{
    save(state, action) {
      return {...state, ...action.payload};
    },
  }
}
