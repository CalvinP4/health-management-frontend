import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IDoctor } from "../types/Doctors";
import { Button, Card, Modal, Tab, Tabs, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Hospital } from "../types/Hospital";
import axios from "axios";

const DoctorScheduleV2 = () => {
  const location = useLocation();
  const [doctor, setDoctor] = useState<IDoctor>(location.state as IDoctor);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showSlotModal, setShowSlotModal] = useState<boolean>(false);

  const [slotForm, setSlotForm] = useState({
    day: "",
    start: "",
    end: "",
    hospitalId: -1,
  });

  const handleSlotFormChange = (e: any) => {
    const { name, value } = e.target;
    const parsedValue = name === 'hospitalId' ? parseInt(value, 10) : value;

    setSlotForm((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  useEffect(() => {
    const fetchHospital = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/hospital`
      );
      setHospitals(response.data);
    };

    fetchHospital();
  }, []);

  const deleteSlot = async (doctorId: number, day: string, slot: number) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor/delete-slot`,
      {
        doctorId,
        day,
        slot,
      }
    );

    console.log(response.data);
    

    if (response.status === 200) {
      setDoctor(response.data as IDoctor);
    }
  };

  const addSlot = async (
    doctorId: number,
    day: string,
    start: string,
    end: string,
    hospitalId: number
  ) => {
    console.log(doctorId, day, start, end, hospitalId);

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/doctor/add-slot`,
      {
        doctorId,
        day,
        start,
        end,
        hospitalId,
      }
    );

    console.log("Response data = ",response.data);
    

    setShowSlotModal(false);

    if (response.status === 200) {
      setDoctor(response.data as IDoctor);
    }
  };

  return (
    <>
      <Header firstName={"J"} />
      <section style={{ height: "80vh" }}>
        <div className="container">
          <p>
            Welcome, Dr. {doctor.firstName} {doctor.lastName}!
          </p>
          <p>Your schedule for the week is as follows:</p>
          <Button onClick={() => setShowSlotModal(true)}>Add Slot</Button>
          <Modal show={showSlotModal} onHide={() => setShowSlotModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>New slot</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Day</Form.Label>
                  <Form.Select onChange={handleSlotFormChange} name="day">
                    <option>Select a day of the week</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start</Form.Label>
                  <input
                    type="time"
                    name="start"
                    className="form-control"
                    value={slotForm.start}
                    onChange={handleSlotFormChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>End</Form.Label>
                  <input
                    type="time"
                    name="end"
                    className="form-control"
                    value={slotForm.end}
                    onChange={handleSlotFormChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Hospital ID</Form.Label>
                  {/**Fetch the hospitals from the backend */}
                  <Form.Select onChange={handleSlotFormChange} name="hospitalId">
                    <option>Select the hospital</option>
                    <option value={1}>General Hospital</option>
                    <option value={2}>County Medical Center</option>
                    <option value={3}>St. Mary's Hospital</option>
                    <option value={4}>Northside Hospital</option>
                    <option value={5}>City Hospital</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowSlotModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  addSlot(
                    doctor.id,
                    slotForm.day,
                    slotForm.start,
                    slotForm.end,
                    slotForm.hospitalId
                  )
                }
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
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
              let schedule = (doctor.schedule as any)[day.day];

              return (
                <Tab eventKey={day.key} title={day.day} key={day.key}>
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {schedule?.map((appointment: any, index: number) => {
                      let location = hospitals.find(
                        (hospital) => hospital.id === appointment.hospital
                      )?.name;

                      return (
                        <Card key={index} style={{ padding: 2 }}>
                          <Card.Header>
                            <Button
                              variant="primary"
                              onClick={() =>
                                deleteSlot(doctor.id, day.day, index)
                              }
                            >
                              Delete slot
                            </Button>
                          </Card.Header>
                          <Card.Body>
                            <p>
                              <b>Location:</b> {location}
                            </p>
                            <p>
                              <b>Slot:</b>{" "}
                              {` ${appointment.start}  -  ${appointment.end}`}
                            </p>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div>
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
