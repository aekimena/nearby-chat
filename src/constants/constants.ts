import { Dimensions } from "react-native";

const USER_TOKEN = "USER_TOKEN";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const NAME_REGEX = /^[\p{L}\-'\s]{2,50}$/u;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;
const PLACEHOLDER_TOKEN = "987654323578";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export {
  USER_TOKEN,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  PLACEHOLDER_TOKEN,
  screenWidth,
  screenHeight,
};
