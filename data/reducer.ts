import { ActionType } from "./actionType";
import { Action, Profile } from "./model";

export interface StateType {
  data?: {};
  profile: Profile;
}

const InitialState: StateType = {
  profile: {
    lastName: 'Иванов',
    firstName: 'Иван',
    patronymic: 'Иванович',
    birthday: new Date(1999, 7, 24),
    specialty: "Строитель"
  }
};

export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETDATA: {
      return { ...state, data: action.data };
    }
    default:
      return state;
  }
};
