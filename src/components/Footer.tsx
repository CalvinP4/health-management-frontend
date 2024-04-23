import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#777777", padding: '1em' }}>
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <h5>About Us</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eros sed mi pretium, at dictum ex cursus.</p>
                    </Col>
                    <Col md={3}>
                        <h5>Quick Links</h5>
                        <ul>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Connect with us</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>Contact Us</h5>
                        <p>123 Main Street, Anytown, USA</p>
                        <p>Email: info@meditech.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </Col>
                    <Col md={3}>
                        <h5>Follow Us</h5>
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; 2022 MediTech solutions
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;