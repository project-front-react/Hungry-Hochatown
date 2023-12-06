import { combineReducers } from "redux";
import CommonReducer from "./CommonReducer";
import CartReducer from "./CartReducer"
import DeliveryReducer from "./DeliveryReducer";

const rootReducer = combineReducers({
  CommonReducer,
  CartReducer,
  DeliveryReducer
  });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>