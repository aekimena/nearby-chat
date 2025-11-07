const initialState = {
  clientConnected: false,
  clientAccepted: "null", // or false or true or pending
  clientAuthenticated: false,
  authModalVisible: false,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setClientConnected":
      return {
        ...state,
        clientConnected: true,
        clientAccepted: "pending",
        authModalVisible: true,
      };
    case "setClientAccepted":
      return { ...state, clientAccepted: "true" };
    case "setClientAuthenticated":
      return { ...state, clientAuthenticated: "true", authModalVisible: false };
    case "setAuthModalVisible":
      return { ...state, authModalVisible: action.payload };
    case "resetClient":
      return initialState;

    default:
      return state;
  }
};

export default clientReducer;
export const selectClientConnected = (state) => state.client.clientConnected;
export const selectClientAccepted = (state) => state.client.clientAccepted;
export const selectAuthModalVisible = (state) => state.client.authModalVisible;
export const selectClientAuthenticated = (state) =>
  state.client.clientAuthenticated;
