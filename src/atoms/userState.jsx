import { atom } from "recoil";

const userState = atom({
  key: "user",
  default: {uid: 0},
  dangerouslyAllowMutability: true
});

export default userState
