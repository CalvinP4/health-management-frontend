import { useState, useEffect } from "react";
import axios from "axios";
import { IHospital } from "../../../types/Hospital";

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState<IHospital[]>([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/hospital`
        );
        setHospitals(response.data);
      } catch (error) {
        console.error("Failed to fetch hospitals:", error);
      }
    };

    fetchHospitals();
  }, []);

  return hospitals;
};
