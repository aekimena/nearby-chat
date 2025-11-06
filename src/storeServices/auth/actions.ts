const setToken = (value) => ({
  type: "setToken",
  payload: value,
});
const setUser = (value) => ({
  type: "setUser",
  payload: value,
});

const setSplashSeen = (value) => ({
  type: "setSplashSeen",
  payload: value,
});

export { setUser, setSplashSeen };
