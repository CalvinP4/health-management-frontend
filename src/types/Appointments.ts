export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  fees: number;
  scheduledAt: Date;
  duration: number;
  status: string;
  cancelledAt: Date;
  cancellation_reason: string;
  note: string;
}
