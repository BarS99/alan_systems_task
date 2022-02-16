import { atom } from "recoil";

export const eventListState = atom({
  key: "eventListState",
  default: [],
});

export const eventPaginationState = atom({
  key: "eventPaginationState",
  default: 1,
});
