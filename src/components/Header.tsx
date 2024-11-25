import { Container, Nav, Navbar, Image, DropdownButton, Dropdown } from "react-bootstrap";
import hospitalSvg from "../assets/hospital.png";

const Header = (props: any) => {
    return (
            <section>
              <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                  <Image
                    src={hospitalSvg}
                    alt="Doctor"
                    style={{ marginLeft: "10px", height: "40px", width: "auto" }}
                  />
                  <Navbar.Brand
                    style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "20px" }}
                  >
                    {" "}
                    MediTech HealthCare
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <DropdownButton variant="Secondary" title={props.firstName[0]}>
                        <Dropdown.Item eventKey={1}>Profile</Dropdown.Item>
                        <Dropdown.Item eventKey={1}>Log out</Dropdown.Item>
                      </DropdownButton>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </section>
    );
}

const styles = {
    profileButton: {
      borderRadius: "50%",
      width: 40,
      height: 40,
      padding: 0,
      oveflow: "hidden",
    },
    profileImage: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
      fontWeight: "bold",
      backgroundColor: "#007bff",
      color: "white",
      borderRadius: "50%",
    },
    buttonGrid: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "50px",
    },
    imageButton: {
      borderRadius: "50%",
      padding: "10px",
      overflow: "hidden",
    },
    image: {
      borderRadius: "50",
      width: "100px",
      height: "100px",
    },
    buttonSection: {
      padding: "20px",
    },
    profileSection: {
      padding: "20px",
      backgroundColor: "#c8f9fa",
      display: "flex",
      justifyContent: "space-between",
    },
  };
  

export default Header;