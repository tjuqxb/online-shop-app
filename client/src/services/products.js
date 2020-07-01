import {get} from '../utils/request';

export function loadProductsInfo() {
  return get("http://localhost:3005/api/products");
}
