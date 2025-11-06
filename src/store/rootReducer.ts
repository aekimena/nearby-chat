import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../storeServices/auth/authReducer";
import hostReducer from "../storeServices/host/hostReducer";
import chatReducer from "../storeServices/messages/chatReducer";

const combinedReducer = combineReducers({
  // user: userReducer,
  auth: authReducer,
  host: hostReducer,
  chat: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
