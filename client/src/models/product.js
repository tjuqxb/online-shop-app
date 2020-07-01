import {loadProductsInfo} from "../services/products";

export default {
  state:{list: []},

  //Async action
  effects: {
    *loadProduct({payload}, {put, call}) {
      const products = yield call (loadProductsInfo);
      console.log(products);
      yield put({
        type:"save",
        payload: {
          list: products.data
        }
      })
    },
  },


  reducers:{
    save(state, action) {
      return {...state, ...action.payload};
    },
  }
}
