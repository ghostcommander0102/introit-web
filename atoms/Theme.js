import { atom } from "recoil";

export const Theme = atom({
  key: "theme",
  default: {
    light: true,
  },
});
