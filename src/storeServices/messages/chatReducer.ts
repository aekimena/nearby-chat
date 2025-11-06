const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "newMessage":
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

export const selectMessages = (state) => state.chat.messages;
export default chatReducer;
