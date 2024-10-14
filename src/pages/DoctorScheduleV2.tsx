import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Doctor } from "../types/Doctors";
import { Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Hospital } from "../types/Hospital";
import axios from "axios";

const DoctorScheduleV2 = () => {
  const location = useLocation();
  const doctor = location.state as Doctor;

  console.log(doctor);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const fetchHospital = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/hospital`
      );
      setHospitals(response.data);
    };

    fetchHospital();
  }, []);


  return (
    <>
      <Header firstName={"J"} />
      <section style={{height: "80vh"}}>
        <div className="container">
          <p>
            Welcome, Dr. {doctor.firstName} {doctor.lastName}!
          </p>
          <p>Your schedule for the week is as follows:</p>
          <Tabs>
            {[
              { day: "Monday", key: "monday" },
              { day: "Tuesday", key: "tuesday" },
              { day: "Wednesday", key: "wednesday" },
              { day: "Thursday", key: "thursday" },
              { day: "Friday", key: "friday" },
              { day: "Saturday", key: "saturday" },
              { day: "Sunday", key: "sunday" },
            ].map((day) => {
              // TODO: Remove this and add the actual type
              // @ts-ignore
              let schedule = doctor.schedule[day.day];

              return (
                <Tab eventKey={day.key} title={day.day}>
                  {schedule?.map((appointment: any, index: number) => {
                  let location = hospitals.find((hospital) => hospital.id === appointment.hospital)?.name;

                  return (
                    <div key={index} style={{ marginBottom: "1rem" }}>
                    <p><b>Location:</b> {location}</p>
                    <p><b>Slot:</b> {` ${appointment.start}  -  ${appointment.end}`}</p>
                    </div>
                  );
                  })}
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DoctorScheduleV2;
