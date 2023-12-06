const initialState = {
    currentOrderData: "",
    saveDeliveryData: "",
    saveDeliveryOrderStatusList: "",
    saveAvailability: false,
    saveEarning: ""
  };
  
  const DeliveryReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "ACTION_SAVE_CURRENT_ORDER":
        return { ...state, currentOrderData: action.payload };
      case "ACTION_SAVE_DELIVERY_DATA":
        return { ...state, saveDeliveryData: action.payload };
      case "ACTION_SAVE_DELIVERY_ORDER_STATUS_LIST":
        return { ...state, saveDeliveryOrderStatusList: action.payload };
      case "ACTION_SAVE_AVAILABLITY":
        return { ...state, saveAvailability: action.payload };
      case "ACTION_SAVE_DELIVERY_EARNING":
        return { ...state, saveEarning: action.payload };
     
      default:
        return state;
    }
  };
  export default DeliveryReducer;
  