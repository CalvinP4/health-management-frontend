import { useState, useEffect } from "react";
import axios from "axios";
import { IAppointment } from "../../../types/Appointments";

export const useAppointments = (patientId: number) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    if (!patientId) return;
    const controller = new AbortController();

    const fetchAppointments = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointment?patientId=${patientId}`
          );
  
          setAppointments(response.data);
  
          console.log("Appointments", response.data);
        } catch (error) {
          console.error("Failed to fetch appointments:", error);
        }
      };

    fetchAppointments();

    return () => controller.abort();
  }, [patientId]);

  return appointments;
};
