export interface IPatient {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: Date;
  age: number;
  email: string;
  phoneNo: string;
  address: string;
  password: string;
  history: any[];
}
