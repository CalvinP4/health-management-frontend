export interface IHospital {
  _id: string;
  name: string;
  address: string;
  phone: string;
  county: string;
  state: string;
  bedsTotal: number;
  bedsAvailable: number;
  departments: {
    name: string;
    staffCount: number;
    equipmentAvailable: boolean;
  }[];
}


export const hospitalMapping: { [id: string]: string } = {
  "1": "City General Hospital",
  "2": "County Medical Center",
  "3": "St. Mary's Hospital",
  "4": "Northside Hospital",
  "5": "City Medical Center",
};