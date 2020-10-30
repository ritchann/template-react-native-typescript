import { ActionType } from "./actionType";
import { Action, Profile, BuildingSite } from "./model";

export const setData: (data: any) => Action = (data) => {
  return { type: ActionType.SETDATA, data };
};

export const getDataAsync: () => Action = () => {
  return { type: ActionType.GETDATAASYNC };
};
export const setProfileData: (data: Profile) => Action = (data) => {
  return { type: ActionType.PROFILE_SETDATA, data };
}

export const setBuildingSite: (data: BuildingSite) => Action = (data) => {
  return { type: ActionType.SETBUILDINGSITE, data };
};