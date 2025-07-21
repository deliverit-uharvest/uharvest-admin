/*---------------Libraries-----------------*/
import { createContext, useContext } from "react";

/*---------------Stores--------------------*/

import CommonStore from "./commonStore";
import CouponStore from "./couponStore";
import CustomerStore from "./customerStore";

import UserStore from "./userStore";
import ProductStore from "./productStore";




interface Store {

  commonStore: CommonStore;
  couponStore: CouponStore;
  customerStore: CustomerStore;
  userStore: UserStore;
  productStore: ProductStore;
}

export const store: Store = {

  commonStore: new CommonStore(),
  couponStore: new CouponStore(),
  customerStore: new CustomerStore(),

 
  userStore: new UserStore(),
  productStore: new ProductStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
