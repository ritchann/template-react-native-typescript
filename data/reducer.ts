import { ActionType } from "./actionType";
import { Action, BuildingSite, Profile } from "./model";

export interface StateType {
  data?: {};
  buildingSite: BuildingSite;
  profile?: Profile;
  isStarted: boolean;
}

const InitialState: StateType = {
  profile: {
    lastName: 'Иванов',
    firstName: 'Иван',
    patronymic: 'Иванович',
    birthday: new Date(1999, 7, 24),
    specialty: "Строитель",
    snils: '222-233-445 85',
    inn: '3664069397'
  },
  buildingSite: { 
    id: 0, 
    address: "Мира 5", 
    lat: 56, 
    lon: 44, 
    image: require('../assets/img2.png'), 
    title: 'Технострой' 
  },
  isStarted: false
}
export const reducer = (state = InitialState, action: Action) => {
  switch (action.type) {
    case ActionType.SETDATA: {
      return { ...state, data: action.data };
    }
    case ActionType.SETBUILDINGSITE: {
      return { ...state, buildingSite: action.data };
    }
    case ActionType.PROFILE_SETDATA: {
      return { ...state, profile: action.data }
    }
    case ActionType.SETISSTARTED: {
      return { ...state, isStarted: action.data }
    }
    default:
      return state;
  }
};
