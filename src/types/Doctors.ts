export interface Doctor {
    id: string;
    name: string;
    email: string;
    phone: string;
    specialty: string;
    dateOfBirth: Date;
    availableSlots: { start: string; end: string }[];
}
