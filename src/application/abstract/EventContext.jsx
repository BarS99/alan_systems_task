import { atom } from "recoil";

export const eventListState = atom({
  key: "eventListState",
  default: [],
});

export const categoryListState = atom({
  key: "categoryListState",
  default: [],
});
