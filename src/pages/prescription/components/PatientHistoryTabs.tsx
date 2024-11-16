import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PatientHistoryTabs = (props: {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  history: string;
}) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={props.value}
          onChange={props.handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="History" />
          <Tab label="Allergies" />
          <Tab label="Vaccinations" />
          <Tab label="Medications" />
        </Tabs>
      </Box>

      <Box sx={{ height: 200, overflowY: "auto" }}>
        <CustomTabPanel value={props.value} index={0}>
          <Typography>
            {props.history}
          </Typography>
        </CustomTabPanel>
        <CustomTabPanel value={props.value} index={1}>
          <ul>
            <li>
              <Typography>Patient has an allergy to penicillin.</Typography>
            </li>
            <li>
              <Typography>Patient is allergic to nuts.</Typography>
            </li>
          </ul>
        </CustomTabPanel>
        <CustomTabPanel value={props.value} index={2}>
          <ul>
            <li>
              <Typography>
                <span style={{ fontWeight: "bold" }}>COVID-19:</span>{" "}
                <span style={{ fontStyle: "italic" }}>20-02-2020</span>
              </Typography>
            </li>
            <li>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Measles:</span>{" "}
                <span style={{ fontStyle: "italic" }}>16-05-2008</span>
              </Typography>
            </li>
          </ul>
        </CustomTabPanel>
        <CustomTabPanel value={props.value} index={3}>
          <ul>
            <li>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Metformin:</span>{" "}
                <span style={{ fontStyle: "italic" }}>2mg</span>
              </Typography>
            </li>
            <li>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Lisinopril:</span>{" "}
                <span style={{ fontStyle: "italic" }}>5mg</span>
              </Typography>
            </li>
            <li>
              <Typography>
                <span style={{ fontWeight: "bold" }}>Metformin:</span>{" "}
                <span style={{ fontStyle: "italic" }}>2mg</span>
              </Typography>
            </li>
          </ul>
          </CustomTabPanel>
      </Box>
    </>
  );
};

export default PatientHistoryTabs;
