import React from 'react';
import { Button, Card, Carousel, Container, Nav, NavDropdown, Navbar, Table } from 'react-bootstrap';

import profileLogo from '../assets/profile-user.png';
import healthCareLogo from '../assets/health-care.svg';
import history from '../assets/history.svg';
import medicine from '../assets/medicine.svg';
import Footer from '../components/Footer';


const HeaderSection = () => {
    return (
        <section>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Patient</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <NavDropdown title="Appointments" id="appointment-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Past Appointments</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Book Appointment
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Pharmacy" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Past Purchases</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Store
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

const CarouselSection = () => {
    return (
        <section>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x400"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x400"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x400"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </section>
    )
}

const AppointmentSection = () => {
    return (
        <section>
            <Table striped bordered hover responsive="sm">
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dr. John Doe</td>
                        <td>2021-10-10</td>
                        <td>10:00</td>
                        <td>123 Main St</td>
                    </tr>
                    <tr>
                        <td>Dr. Jane Doe</td>
                        <td>2021-10-11</td>
                        <td>11:00</td>
                        <td>123 Main St</td>
                    </tr>
                </tbody>
            </Table>
        </section>
    );
}

const QuoteSection = () => {
    return (
        <section style={{padding: '20px'}}>
            <Card>
                <Card.Header>Quote</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                            posuere erat a ante.{' '}
                        </p>
                        <footer className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </section >
    );
}

const ButtonGridSection = () => {
    return (
        <section style={styles.buttonSection}>
            <h3>Explore our services</h3>
            <div style={styles.buttonGrid}>
                <Button style={styles.imageButton}>
                    <img src={healthCareLogo} alt='Image 1' style={styles.image} />
                </Button>
                <Button style={styles.imageButton}>
                    <img src={medicine} alt='Image 2' style={styles.image} />
                </Button>
                <Button style={styles.imageButton}>
                    <img src={history} alt='Image 3' style={styles.image} />
                </Button>
            </div>
        </section>
    );
}

const Patient = () => {
    return (
        <div>
            <HeaderSection />
            <CarouselSection />
            <AppointmentSection />
            <ButtonGridSection />
            <QuoteSection />
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
    }
};

export default Patient;