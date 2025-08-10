import { useState, useEffect } from "react";
import axios from "axios";
import { IAppointment } from "../../../types/Appointments";

export const useAppointments = (doctorId: string) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    if (!doctorId) return;
    const controller = new AbortController();

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/appointment/doctor/${doctorId}`,
          { signal: controller.signal }
        );

        console.log("Fetched appointments:", response.data);
        setAppointments(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to fetch appointments:", error);
        }
      }
    };

    fetchAppointments();

    return () => controller.abort();
  }, [doctorId]);

  return appointments;
};
