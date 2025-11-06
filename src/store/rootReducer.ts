import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../storeServices/user/userReducer";
import authReducer from "../storeServices/auth/authReducer";
import hostReducer from "../storeServices/host/hostReducer";

const combinedReducer = combineReducers({
  // user: userReducer,
  auth: authReducer,
  host: hostReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
