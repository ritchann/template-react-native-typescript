import { setData } from "./actions";
import { ActionType } from "./actionType";
import { Action, BuildingSite, Profile } from "./model";

export interface StateType {
  data?: {};
  buildingSite: BuildingSite;
 profile: Profile;
}

const InitialState: StateType = {
  profile: {
    lastName: 'Иванов',
    firstName: 'Иван',
    patronymic: 'Иванович',
    birthday: new Date(1999, 7, 24),
    specialty: "Строитель"
  },
  buildingSite: { id: 0, address: "Мира 5", lat: 56, lon: 44 },
}
export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETDATA: {
      return { ...state, data: action.data };
    }
    case ActionType.SETBUILDINGSITE: {
      return { ...state, buildingSite: action.data };
    }
    default:
      return state;
  }
};
