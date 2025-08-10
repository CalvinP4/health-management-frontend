import { IDoctor } from "./Doctors";
import { IHospital } from "./Hospital";
import { IPatient } from "./Patients";

export interface IAppointment {
  _id: string;
  startTime: Date;
  endTime: Date;
  slotDate: string;
  apptStatus: string | null;
  type: string;
  notes: string;
  symptoms: string;
  reason: string;
  doctor: IDoctor;
  hospital: IHospital;
  patient: IPatient | null;
}
