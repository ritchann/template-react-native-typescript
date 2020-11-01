import { ActionType } from "./actionType";
import {
  Action,
  Profile,
  BuildingSite,
  SiteEventRequest,
  IncidentRequest,
  PositionRequest,
} from "./model";

export const setData: (data: any) => Action = (data) => {
  return { type: ActionType.SETDATA, data };
};

export const getDataAsync: () => Action = () => {
  return { type: ActionType.GETDATAASYNC };
};
export const setProfileData: (data: Profile) => Action = (data) => {
  return { type: ActionType.PROFILE_SETDATA, data };
};

export const setBuildingSite: (data: BuildingSite) => Action = (data) => {
  return { type: ActionType.SETBUILDINGSITE, data };
};

export const setIsStarted: (data: boolean) => Action = (data) => {
  return { type: ActionType.SETISSTARTED, data };
};

export const setSiteEventAsync: (data: SiteEventRequest) => Action = (data) => {
  return { type: ActionType.SETSITEEVENTASYNC, data };
};

export const setIncidentAsync: (data: IncidentRequest) => Action = (data) => {
  return { type: ActionType.SETINCIDENT, data };
};

export const setPositionAsync: (data: PositionRequest) => Action = (data) => {
  return { type: ActionType.SETPOSITIONASYNC, data };
};
