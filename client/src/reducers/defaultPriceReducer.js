import { GET_DEFAULT_PRICE, UPDATE_DEFAULT_PRICE } from "../actions/TYPES2";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_DEFAULT_PRICE:
      console.log("in reducer", action.payload);
      return action.payload;
    case UPDATE_DEFAULT_PRICE:
      console.log("in reducer", action.payload);
      return action.payload;
    default:
      return state;
  }
};
