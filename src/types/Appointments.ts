export interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  hospitalId: number;
  startTime: Date;
  endTime: Date;
  type: string;
  reason: string;
  notes: string;
  symptoms: string;
}
