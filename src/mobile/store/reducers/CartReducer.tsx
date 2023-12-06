const initialState: {
  cartData: any[];
  addToCartData: any[];
  addressData: "";
  restaurentId: number;
} = {
  cartData: [],
  addToCartData: [],
  addressData: "",
  restaurentId: 0,
};

const CartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ACTION_ADD_TO_CART":
      if (state.restaurentId === 0) {
        return {
          ...state,
          restaurentId: action.payload.restaurentId,
          cartData: [action.payload.data],
        };        
      } else {
        if (state.restaurentId == action.payload.restaurentId) {
          return {
            ...state,
            cartData: [...state.cartData, action.payload.data],
          };
        } else {
          return {
            ...state,
            restaurentId: action.payload.restaurentId,
            cartData: [action.payload.data],
          };
        }
      }
    case "ACTION_INCREMENT_TO_CART":
      let data: any[] = [];
      state.cartData.map((item: any) => {
        if (item.id == action.payload.id &&  JSON.stringify(item.attributes) ===
        JSON.stringify(action.payload.attributes)) {
          let temp = { ...action.payload, quantity: item.quantity + 1 };
          data.push(temp);
        } else {
          data.push(item);
        }
      });
      return { ...state, cartData: data };

    case "ACTION_DECREMENT_TO_CART":
      let decData: any[] = [];
      state.cartData.map((item: any) => {
        if (item.id == action.payload.id &&  JSON.stringify(item.attributes) ===
        JSON.stringify(action.payload.attributes)) {
          decData.push({ ...item, quantity: item.quantity - 1 });
        } else {
          decData.push(item);
        }
      });
      return { ...state, cartData: decData };
    case "ACTION_REMOVE_TO_CART":
      let deleteData: any[] = [];
      state.cartData.filter((item: any) => {
        if (
          !(
            item.id == action.payload.id &&
            JSON.stringify(item.attributes) ===
              JSON.stringify(action.payload.attributes)
          )
        ) {
          deleteData.push({ ...item });
        }
      });
      return { ...state, cartData: deleteData };
    case "ACTION_SEND_ADD_TO_CART":
      return { ...state, cartData: action.payload };
    case "ACTION__ADD_RESTRO_ID":
      return { ...state, restaurentId: action.payload };
    case "ACTION_EMPTY_CART":
      return { ...state, cartData: [] };

    case "ACTION_SAVE_ADDRESS":
      return { ...state, addressData: action.payload };

    default:
      return state;
  }
};
export default CartReducer;
