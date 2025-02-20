import React from "react";
import { Box, IconButton, Tab, Tabs, TextField } from "@mui/material";
import { Medication, Mic, Notes } from "@mui/icons-material";

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

const NotesTab = (props: {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  setNotes: (notes: string) => void;
}) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 2 }}>
        <Tabs
          value={props.value}
          onChange={props.handleChange}
          aria-label="basic tabs example"
        >
          <Tab icon={<Notes />} label="Notes" />
          <Tab icon={<Medication />} label="Medication" />
        </Tabs>
      </Box>
      <Box sx={{ height: 200, overflowY: "auto" }}>
        <CustomTabPanel value={props.value} index={0}>
          <TextField
            id="outlined-multiline-static"
            label="Please enter your notes here"
            multiline
            rows={4}
            sx={{ width: "95%" }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              event.preventDefault();
              props.setNotes(event.target.value);
            }}
          />
          <IconButton>
            <Mic />
          </IconButton>
        </CustomTabPanel>
        <CustomTabPanel value={props.value} index={1}></CustomTabPanel>
      </Box>
    </>
  );
};

export default NotesTab;
