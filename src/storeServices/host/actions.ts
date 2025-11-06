const addClient = (value) => ({
  type: "addClient",
  payload: value,
});

const removeClient = (value) => ({
  type: "removeClient",
  payload: value,
});

export { addClient, removeClient };
