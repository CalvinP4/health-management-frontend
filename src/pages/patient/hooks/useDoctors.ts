import { useState, useEffect } from "react";
import axios from "axios";
import { IDoctor } from "../../../types/Doctors";

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Make a GET request to fetch appointment data from the backend
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor`
        );

        console.log("Doctors", response.data);

        // Set the fetched appointment data in the state
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchDoctors();
  }, []);

  return doctors;
};
