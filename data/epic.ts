import { ActionsObservable, combineEpics, ofType } from "redux-observable";
import { from } from "rxjs";
import { ActionType } from "./actionType";
import { getData } from "./api";
import { ignoreElements, map, mergeMap } from "rxjs/operators";
import { setData } from "./actions";
import { Action } from "redux";

const getDataEpic = (action$: ActionsObservable<Action<any>>) =>
  action$.pipe(
    ofType(ActionType.GETDATAASYNC),
    mergeMap(() => from(getData()).pipe(map((response) => setData(response))))
  );

export const epic = combineEpics(getDataEpic);
