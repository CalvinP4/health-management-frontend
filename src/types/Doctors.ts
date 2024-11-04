export interface IDoctor {
    id: number;
    firstName: string;
    middleName: string;
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
    schedule: object;
}
