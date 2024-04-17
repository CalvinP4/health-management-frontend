import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
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


const PatientDetailSection = () => {
    return (
        <section style={{ padding: '1em' }}>
            <Row className="d-flex align-items-stretch">
                <Col sm={6}>
                    <PatientCard />
                </Col>
                <Col sm={6}>
                    <AppointmentCard />
                </Col>
            </Row>
        </section>
    )
}

const PatientCard = () => {
    return (
        <Card className="shadow">
            <Card.Header>Patient Details</Card.Header>
            <Card.Body>
                <Card.Title>Patient Details</Card.Title>
                <Card.Text>
                    <p>Name: John Doe</p>
                    <p>Age: 35</p>
                    <p>MRN: 893971</p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

const AppointmentCard = () => {
    return (
        <Card className="shadow">
            <Card.Header>Appointment</Card.Header>
            <Card.Body>
                <Card.Title>Appointment Details</Card.Title>
                <Card.Text>
                    <p>Doctor: Dr. Jane Doe</p>
                    <p>Date: 2021-10-11</p>
                    <p>Time: 11:00</p>
                    <p>Location: 123 Main St</p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

const PrescriptionCard = () => {
    return (
        <Card className="shadow">
            <Card.Header>Notes</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}

const SuggestionsCard = () => {
    return (
        <Card className="shadow">
            <Card.Header>Suggestions</Card.Header>
            <Card.Body>
                <Card.Text>
                    <p>Medication: Paracetamol</p>
                    <p>Dosage: 500mg</p>
                    <p>Frequency: 3 times a day</p>
                    <p>Duration: 5 days</p>
                </Card.Text>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" style={{ marginRight: '10px' }}>Accept</Button>
                    <Button variant="secondary">Decline</Button>
                </div>
            </Card.Body>
        </Card>
    );

}

const NotesSection = () => {
    return (
        <section style={{ padding: '1em' }}>
            <Row className="d-flex align-items-stretch">
                <Col sm={6}>
                    <PrescriptionCard />
                </Col>
                <Col sm={6}>
                    <SuggestionsCard />
                </Col>
            </Row>
        </section>
    );
}



const Prescription = () => {
    return (
        <div>
            <HeaderSection />
            <PatientDetailSection />
            <NotesSection />
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

    }
};


export default Prescription;