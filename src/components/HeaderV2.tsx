import { LocalHospital } from "@mui/icons-material";
import {
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useHeader } from "../context/HeaderContext"; // Import the context hook

const HeaderV2 = (props: {
  navigateToProfile: () => void;
  logout: () => void;
}) => {
  const { handleOpenUserMenu, anchorElUser, handleCloseUserMenu } = useHeader();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1em",
        background: "#1565c0",
        borderRadius: "1px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", color: "#ffffff" }}>
        <LocalHospital style={{ color: "#ffffff", fontSize: "3em" }} />
        <Typography variant="h4" style={{ color: "#ffffff" }}>
          MediTech HealthCare
        </Typography>
      </div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={require("../assets/trump.jpg")} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="profile" onClick={props.navigateToProfile}>
              <Typography sx={{ textAlign: "center" }}>Profile</Typography>
            </MenuItem>
            <MenuItem key="logout" onClick={props.logout}>
              <Typography sx={{ textAlign: "center" }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default HeaderV2;
