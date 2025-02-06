export interface ISlot {
    id: number;
    startTime: string;
    endTime: string;
    slotDate: Date;
    doctorId: number;
    hospitalId: number;
    apptStatus: number;
}

export enum Status {
    Open = 0,
    Booked = 1,
}