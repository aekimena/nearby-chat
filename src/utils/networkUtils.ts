// src/utils/networkUtils.js

/**
 * Generates a random port number between 1024 and 65535.
 * Ports below 1024 are usually reserved for system use.
 */
export const generatePort = () => {
  const min = 1024;
  const max = 65535;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a random 4- to 6-digit invite code.
 * You can adjust the length as needed.
 */
export const generateInviteCode = (length = 4) => {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
};
