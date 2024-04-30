export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  fees: number;
  scheduledAt: Date;
  reason: string;
  location: string;
  duration: number;
  status: string;
  cancelledAt: Date;
  cancellation_reason: string;
  note: string;
}
