import { atom } from "recoil";

const personalCounter = atom({
  key: "personalCounter",
  default: "0"
});

export default personalCounter;
