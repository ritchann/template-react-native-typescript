import axios from "axios";
import { IncidentRequest, SiteEventRequest, PositionRequest } from "./model";

const url = "http://swapi.dev/api/planets/1";

export const getData = () => axios.get(url);

export const setSiteEvent = (data: SiteEventRequest) => {
  return axios.post("http://drop-table.tech/api/site-event", data);
};

export const setIncident = (data: IncidentRequest) => {
  return axios.post("http://drop-table.tech/api/site-event", data);
};

export const setPosition = (data: PositionRequest) => {
  return axios.post("http://drop-table.tech/api/position", data);
};
