import { ActionType } from "./actionType";
import { Action } from "./model";

export const setData: (data: any) => Action = (data) => {
  return { type: ActionType.SETDATA, data };
};

export const getDataAsync: () => Action = () => {
  return { type: ActionType.GETDATAASYNC };
};
