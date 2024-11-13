import "./CreateTaskDialog.scss";
import * as React from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slide,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { createProject } from "../../../features/project/projectSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Corrected interface declaration
// interface IProjectData {
//   title: string;
//   description: string;
//   timeline: {
//     start: string;
//     end: string;
//   };
//   priority: string;
//   status: string;
//   budget: {
//     amount: number;
//     currency: string;
//   };
// }

export default function CreateTaskDialog({ openTask, setOpenTask }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("active");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("BDT");

  const handleClose = () => setOpenTask(false);

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !startDate || !endDate) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after the end date.");
      return;
    }

    // Ensure projectData conforms to the IProjectData interface
    const projectData: any = {
      title,
      description,
      timeline: {
        start: startDate,
        end: endDate,
      },
      priority,
      status,
      currency,
      amount, 
    };

    // Dispatch the action to create a project
    dispatch(createProject(projectData));

    console.log("Project Data:", projectData);
    handleClose(); // Close the dialog after saving
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog
      open={openTask}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="create-project-dialog-description"
    >
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <TextField
          label="Project Title"
          fullWidth
          variant="outlined"
          margin="dense"
          sx={{ mb: "10px" }}
          value={title}
          required={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          variant="outlined"
          margin="dense"
          sx={{ mb: "10px" }}
          multiline
          rows={4}
          value={description}
          required={true}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Start Date"
          type="date"
          fullWidth
          variant="outlined"
          margin="dense"
          sx={{ mb: "15px" }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: today } }}
        />
        <TextField
          label="End Date"
          type="date"
          fullWidth
          variant="outlined"
          margin="dense"
          sx={{ mb: "10px" }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: today } }}
        />
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>

          
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Budget Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            sx={{ mb: "10px" }}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              label="Currency"
            >
              <MenuItem value="BDT">BDT</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: "15px", mr: "15px" }}>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
