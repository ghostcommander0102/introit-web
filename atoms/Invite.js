import { atom } from "recoil";

export const Invite = atom({
  key: "Invite",
  default: {
    data: null,
    modal: false,
  },
});
