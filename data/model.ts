export interface Action {
  type: string;
  data?: any;
}

export interface Profile {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthday: Date;
  specialty: string;
}
