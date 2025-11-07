import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../storeServices/auth/authReducer";
import hostReducer from "../storeServices/host/hostReducer";
import chatReducer from "../storeServices/messages/chatReducer";
import clientReducer from "../storeServices/client/clientReducer";

const combinedReducer = combineReducers({
  // user: userReducer,
  auth: authReducer,
  host: hostReducer,
  chat: chatReducer,
  client: clientReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
