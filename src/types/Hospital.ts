export interface IHospital {
  id: number;
  name: string;
  county: string;
  state: string;
  bedsTotal: number;
  bedsAvailable: number;
}


export const hospitalMapping: { [id: number]: string } = {
  1: "City General Hospital",
  2: "County Medical Center",
  3: "St. Mary's Hospital",
  4: "Northside Hospital",
  5: "City Medical Center",
};