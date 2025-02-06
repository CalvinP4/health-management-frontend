import { Box, Grid, Typography, Container, Link } from "@mui/material";

const FooterV2 = () => {
    return (
      <footer>
        <Box sx={{ backgroundColor: "#e9e9e9", padding: "1em" }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">About Us</Typography>
                <Typography>
                  Making Healthcare Better Together - MediTech Crushers
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Quick Links</Typography>
                <ul>
                  <li>
                    <Link href="#">Services</Link>
                  </li>
                  <li>
                    <Link href="#">About Us</Link>
                  </li>
                  <li>
                    <Link href="#">Connect with us</Link>
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Contact Us</Typography>
                <Typography>123 Main Street, Anytown, USA</Typography>
                <Typography>Email: info@meditech.com</Typography>
                <Typography>Phone: (123) 456-7890</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h5">Follow Us</Typography>
                <ul>
                  <li>
                    <Link href="#">
                      Facebook<i className="fab fa-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Twitter<i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      Instagram<i className="fab fa-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Typography variant="body2" color="textSecondary" align="center">
                Copyright &copy; 2024 MediTech solutions
              </Typography>
            </Grid>
          </Container>
        </Box>
      </footer>
    );
  };


  export default FooterV2;