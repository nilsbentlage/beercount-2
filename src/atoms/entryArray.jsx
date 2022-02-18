import { atom } from "recoil";

const entryArray = atom({
  key: "app",
  default: [],
});

export default entryArray;
