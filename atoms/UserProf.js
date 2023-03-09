import { atom } from "recoil";

export const UserProf = atom({
  key: "UserProf",
  default: { users: [], results: 0, pages: 0 },
});
