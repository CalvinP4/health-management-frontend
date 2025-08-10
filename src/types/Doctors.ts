export interface IDoctor {
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
  specialization: string;
  licensedYear: Date;
  licensedBy: string;
  rating: string;
  departments: {
    _id: string;
    department: number;
  }[];
}
