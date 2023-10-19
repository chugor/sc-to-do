import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import firebase from "firebase/compat/app";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { styled } from "@mui/material/styles";
import { useState } from "react";

dayjs.extend(isSameOrAfter);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddTaskDialog = ({ open, onClose, submitNewTask }) => {
  const today = dayjs();
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(today);
  const isValidDate = newTaskDate
    ? newTaskDate?.isValid() && newTaskDate.isSameOrAfter(today, "day")
    : false;

  const handleSubmitNewTask = (event) => {
    event.preventDefault();

    if (!newTaskName || !isValidDate) return;

    const newTask = {
      name: newTaskName,
      date: firebase.firestore.Timestamp.fromDate(newTaskDate.toDate()),
      done: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    submitNewTask(newTask);

    setNewTaskName("");
    setNewTaskDate(dayjs());
    onClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New to do item
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmitNewTask}>
          <DialogContent
            dividers
            sx={{
              minWidth: {
                sm: "400px",
              },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography>Item name</Typography>
            <TextField
              label="Item name"
              variant="outlined"
              onChange={(e) => setNewTaskName(e.target.value)}
              required
              fullWidth
            />
            <Typography>Due date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select date"
                value={newTaskDate}
                onChange={(date) => setNewTaskDate(date)}
                sx={{
                  width: "100%",
                }}
              />
              {!isValidDate && (
                <Typography
                  sx={{
                    color: "red",
                  }}
                >
                  The date must not be earlier than today.
                </Typography>
              )}
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
};

export default AddTaskDialog;
