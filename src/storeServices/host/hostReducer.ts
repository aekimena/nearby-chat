const initialState = {
  clients: [],
  hostMessages: [], // {message: '', deviceId: '', socket: '', name: '',}
  port: null,
  inviteCode: null,
  isConnected: false,
};

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addClient":
      return { ...state, clients: [...state.clients, action.payload] };
    case "removeClient":
      //       const index = state.clients.findIndex((c) => c.socket === action.payload);
      // if (index !== -1) clients.splice(index, 1);
      return {
        ...state,
        clients: state.clients.filter((i) => i.socket !== action.payload),
      };
    case "setPort":
      return { ...state, port: action.payload };
    case "setInviteCode":
      return { ...state, inviteCode: action.payload };
    case "newHostMessages":
      return {
        ...state,
        hostMessages: [...state.hostMessages, action.payload],
      };
    default:
      return state;
  }
};

export const selectClients = (state) => state.host.clients;
export const selectPort = (state) => state.host.port;
export const selectInviteCode = (state) => state.host.inviteCode;
export const selectHostMessages = (state) => state.host.hostMessages;
export default hostReducer;
