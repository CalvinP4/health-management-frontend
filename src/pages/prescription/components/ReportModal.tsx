import { Close } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";

const ReportModal = (props: {
  isTestModalOpen: boolean;
  handleCloseTestModal: () => void;
  onDocumentLoadSuccess({ numPages }: { numPages: number }): void;
  pdfFile: string;
  bloodReport: string;
}) => {
  return (
    <>
      <Modal
        open={props.isTestModalOpen}
        onClose={props.handleCloseTestModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 750,
            height: 700,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Blood Report</Typography>
            <IconButton onClick={props.handleCloseTestModal}>
              <Close />
            </IconButton>
          </Box>
          <Document
            file={props.pdfFile}
            onLoadSuccess={props.onDocumentLoadSuccess}
            className={"h-screen overflow-y-auto flex justify-center  flex-1 "}
          >
            <Page
              className="pdf-page relative mx-20 z-0 "
              pageNumber={1}
              width={650}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>

          <Box sx={{ marginTop: 2, outline: "1px solid #000", padding: 1 }}>
            <Typography variant="h5">Summary Insights</Typography>
            <Typography>
              {props.bloodReport ? (
                <span dangerouslySetInnerHTML={{ __html: props.bloodReport }} />
              ) : (
                <CircularProgress />
              )}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReportModal;
