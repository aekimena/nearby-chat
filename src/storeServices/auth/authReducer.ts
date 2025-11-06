const initialState = {
  // token: null,
  isSplashSeen: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    case "setSplashSeen":
      return { ...state, isSplashSeen: action.payload };
    default:
      return state;
  }
};

export const selectSplashSeen = (state) => state.auth.isSplashSeen;
export const selectUser = (state) => state.auth.user;

export default authReducer;
