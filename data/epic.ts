import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { from } from "rxjs";
import { ActionType } from "./actionType";
import { getData, setIncident, setPosition, setSiteEvent } from "./api";
import { ignoreElements, map, mergeMap, tap } from "rxjs/operators";
import { setData } from "./actions";
import { Action } from "redux";

const getDataEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.GETDATAASYNC),
    mergeMap(() => from(getData()).pipe(map((response) => setData(response))))
  );

const setSiteEventEpic = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(ActionType.SETSITEEVENTASYNC),
    mergeMap((action) =>
      from(setSiteEvent((action as any).data)).pipe(ignoreElements())
    )
  );
};

const setIncidentEpic = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(ActionType.SETINCIDENT),
    mergeMap((action) =>
      from(setIncident((action as any).data)).pipe(ignoreElements())
    )
  );
};

const setPositionEpic = (action$: ActionsObservable<any>) => {
  return action$.pipe(
    ofType(ActionType.SETPOSITIONASYNC),
    mergeMap((action) =>
      from(setPosition((action as any).data)).pipe(ignoreElements())
    )
  );
};

export const epic = combineEpics(
  getDataEpic,
  setSiteEventEpic,
  setIncidentEpic,
  setPositionEpic
);
