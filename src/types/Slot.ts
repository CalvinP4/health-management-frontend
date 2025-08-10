export interface ISlot {
    id: string;
    startTime: string;
    endTime: string;
    slotDate: Date;
    doctorId: string;
    hospitalId: string;
    apptStatus: number;
}

export enum Status {
    Open = 0,
    Booked = 1,
}