import React from "react";
import {
  Box,
  Grid,
  Typography,
  Container,
  Link,
  Stack,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  MedicalServices as MedicalIcon,
} from "@mui/icons-material";

/**
 * FooterV2 Component
 * 
 * A modern, professional footer for the health management application with:
 * - Company information and mission
 * - Quick navigation links
 * - Contact details with icons
 * - Social media links
 * - Copyright information
 */
const FooterV2: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#e9e9e9",
        borderTop: "3px solid #d0d0d0",
        mt: "auto", // Push footer to bottom
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* About Us Section */}
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <MedicalIcon sx={{ color: "#666", mr: 1, fontSize: 28 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#333",
                      fontSize: "1.25rem",
                    }}
                  >
                    About Us
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.6,
                    fontSize: "0.9rem",
                  }}
                >
                  Making Healthcare Better Together - MediTech Crushers
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#777",
                    mt: 1,
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  Innovative solutions for modern healthcare management.
                </Typography>
              </Box>
            </Grid>

            {/* Quick Links Section */}
            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#333",
                  mb: 3,
                  fontSize: "1.25rem",
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={1.5}>
                {[
                  { label: "Services", href: "#" },
                  { label: "About Us", href: "#" },
                  { label: "Patient Portal", href: "#" },
                  { label: "Doctor Portal", href: "#" },
                  { label: "Contact Us", href: "#" },
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "all 0.2s ease",
                      display: "block",
                      "&:hover": {
                        color: "#333",
                        textDecoration: "underline",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Contact Us Section */}
            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#333",
                  mb: 3,
                  fontSize: "1.25rem",
                }}
              >
                Contact Us
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                  <LocationIcon sx={{ color: "#666", fontSize: 20, mt: 0.2 }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.5 }}
                  >
                    123 Main Street<br />
                    Anytown, USA 12345
                  </Typography>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <EmailIcon sx={{ color: "#666", fontSize: 20 }} />
                  <Link
                    href="mailto:info@meditech.com"
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      "&:hover": { color: "#333", textDecoration: "underline" },
                    }}
                  >
                    info@meditech.com
                  </Link>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <PhoneIcon sx={{ color: "#666", fontSize: 20 }} />
                  <Link
                    href="tel:+11234567890"
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      "&:hover": { color: "#333", textDecoration: "underline" },
                    }}
                  >
                    (123) 456-7890
                  </Link>
                </Box>
              </Stack>
            </Grid>

            {/* Follow Us Section */}
            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#333",
                  mb: 3,
                  fontSize: "1.25rem",
                }}
              >
                Follow Us
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#666", mb: 2, fontSize: "0.9rem" }}
              >
                Stay connected for updates and health tips
              </Typography>
              <Stack direction="row" spacing={1}>
                {[
                  { icon: FacebookIcon, label: "Facebook", href: "#", color: "#1877f2" },
                  { icon: TwitterIcon, label: "Twitter", href: "#", color: "#1da1f2" },
                  { icon: InstagramIcon, label: "Instagram", href: "#", color: "#e4405f" },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      color: "#666",
                      width: 44,
                      height: 44,
                      border: "1px solid #ddd",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: social.color,
                        color: "white",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <social.icon fontSize="small" />
                  </IconButton>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Footer Bottom */}
        <Divider sx={{ borderColor: "#d0d0d0" }} />
        <Box
          sx={{
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#777",
              fontSize: "0.85rem",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Copyright &copy; 2024 MediTech Solutions. All rights reserved.
          </Typography>
          
          <Stack
            direction="row"
            spacing={2}
            sx={{ fontSize: "0.85rem" }}
          >
            <Link
              href="#"
              sx={{
                color: "#777",
                textDecoration: "none",
                "&:hover": { color: "#333", textDecoration: "underline" },
              }}
            >
              Privacy Policy
            </Link>
            <Typography sx={{ color: "#ccc" }}>•</Typography>
            <Link
              href="#"
              sx={{
                color: "#777",
                textDecoration: "none",
                "&:hover": { color: "#333", textDecoration: "underline" },
              }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

  export default FooterV2;