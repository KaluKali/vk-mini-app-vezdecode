import * as types from "./actionTypes";

const initialState = {
  vkpay_id: 0,
  image: '',
  form: { collection: '', sum: 0, description: '', target:'', date:'' },
  user: {first_name: 'Матвей', last_name: 'Правосудов', donate:0}
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VKPAY_ID:
      return {
        ...state,
        vkpay_id: action.payload
      };
    case types.SET_VK_COVER:
      return {
        ...state,
        image: action.payload
      };
    case types.SET_VK_FORM:
      return {
        ...state,
        form: {...state.form, ...action.payload}
      };
    case types.SET_VK_USER:
      return {
        ...state,
        user: {...state.user, ...action.payload}
      };
    default:
      return state;
  }
};

export default historyReducer;
