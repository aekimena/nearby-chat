const initialState = {
  authenticatedClients: [],
  // hostMessages: [], // {message: '', deviceId: '', socket: '', name: '',}
  port: null,
  inviteCode: null,
  isConnected: false,
  acceptedClients: [],
  approvalModalVisible: false,
};

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addClient":
      return {
        ...state,
        authenticatedClients: [...state.authenticatedClients, action.payload],
      };
    case "acceptClient":
      return {
        ...state,
        acceptedClients: [...state.acceptedClients, action.payload],
      };
    case "removeClient":
      //       const index = state.authenticatedClients.findIndex((c) => c.socket === action.payload);
      // if (index !== -1) authenticatedClients.splice(index, 1);
      return {
        ...state,
        authenticatedClients: state.authenticatedClients.filter(
          (i) => i.socket !== action.payload
        ),
      };
    case "setPort":
      return { ...state, port: action.payload };
    case "setInviteCode":
      return { ...state, inviteCode: action.payload };
    // case "newHostMessages":
    //   return {
    //     ...state,
    //     hostMessages: [...state.hostMessages, action.payload],
    //   };
    case "setApprovalModalVisible":
      return { ...state, approvalModalVisible: action.payload };
    default:
      return state;
  }
};

export const selectClients = (state) => state.host.authenticatedClients;
export const selectAcceptedClients = (state) => state.host.acceptedClients;
export const selectPort = (state) => state.host.port;
export const selectInviteCode = (state) => state.host.inviteCode;
export const selectApprovalModalVisible = (state) =>
  state.host.approvalModalVisible;
// export const selectHostMessages = (state) => state.host.hostMessages;
export default hostReducer;
