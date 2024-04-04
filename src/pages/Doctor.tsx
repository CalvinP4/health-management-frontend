import React from 'react';
import { Button, Card, Carousel, Container, Nav, NavDropdown, Navbar, Table } from 'react-bootstrap';

import profileLogo from '../assets/profile-user.png';
import Footer from '../components/Footer';

const HeaderSection = () => {
    return (
        <section>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Doctor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <NavDropdown title="Appointments" id="appointment-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Past Appointments</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Book Slot
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Pharmacy" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Appointment History</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Past Appointments
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Button variant="outline-primary" style={styles.profileButton}>
                                <img src={profileLogo} alt='Profile' style={styles.profileImage} />
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </section>
    )
}

const PastAppointments = () => {
    return (
        <section style={{marginTop: "4rem", marginBottom: "4rem", padding: "2rem"}}>
            <h1>Past Appointments</h1>
            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Appointment date</th>
                        <th>Appointment time</th>
                        <th>Issue</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>24</td>
                        <td>12/12/2021</td>
                        <td>12:00</td>
                        <td>Headache</td>
                        <td>Take rest</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>28</td>
                        <td>12/12/2021</td>
                        <td>12:00</td>
                        <td>Headache</td>
                        <td>Take rest</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>Bird</td>
                        <td>32</td>
                        <td>12/12/2021</td>
                        <td>12:00</td>
                        <td>Headache</td>
                        <td>Take rest</td>
                    </tr>
                </tbody>
            </Table>
        </section>
    )
}


const UpcomingAppointments = () => {
    return (
        <section style={{marginTop: "4rem", marginBottom: "4rem", padding: "2rem"}}>
            <h1>Upcoming Appointments</h1>
            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Appointment date</th>
                        <th>Appointment time</th>
                        <th>Issue</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>24</td>
                        <td>12/12/2021</td>
                        <td>12:00</td>
                        <td>Headache</td>
                        <td> 
                            <Button variant="success" className="mr-2">Accept</Button>
                            <Button variant="danger">Reject</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>28</td>
                        <td>12/12/2021</td>
                        <td>12:00</td>
                        <td>Headache</td>
                        <td> 
                            <Button variant="success" className="mr-2">Accept</Button>
                            <Button variant="danger">Reject</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry</td>
                        <td>Bird</td>
                        <td>32</td>
                        <td>12/12/2021</td>
                        <td>12:00</td>
                        <td>Headache</td>
                        <td> 
                            <Button variant="success" className="mr-2">Accept</Button>
                            <Button variant="danger">Reject</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </section>
    )
}



const DoctorProfile = () => {
    return (
        <section style={styles.profileSection}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={profileLogo} />
                <Card.Body>
                    <Card.Title>Dr. John Doe</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Card style={{width:'18rem'}}>
                <Card.Body>
                    <Card.Title>Actions</Card.Title>
                    <Button variant="primary" className="mb-3">Update Schedule</Button>
                    <Button variant="secondary" className="mb-3">Update Profile</Button>
                    <Button variant="secondary">Update Profile</Button>
                </Card.Body>
            </Card>
        </section>
    );
}



const Doctor = () => {
    return (
        <div>
            <HeaderSection />
            <DoctorProfile />
            <PastAppointments />
            <UpcomingAppointments />
            <Footer />
        </div>
    );
};

const styles = {
    profileButton: {
        borderRadius: '50%',
        width: 40,
        height: 40,
        padding: 0,
        oveflow: 'hidden'
    },
    profileImage: {
        width: '100%',
        height: '100%',

    },
    buttonGrid: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '50px',
    },
    imageButton: {
        borderRadius: '50%',
        padding: '10px',
        overflow: 'hidden'
    },
    image: {
        borderRadius: '50',
        width: '100px',
        height: '100px',
    },
    buttonSection: {
        padding: '20px',
    },
    profileSection: {
        padding: '20px',
        backgroundColor: '#c8f9fa',
        display: 'flex',
        justifyContent: 'space-between'
    }
};

export default Doctor;