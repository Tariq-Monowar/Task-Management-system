import "./addtask.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TransitionProps } from "@mui/material/transitions";
import { Avatar, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useParams } from "react-router-dom";
import { createTask } from "../../../features/task/taskSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTask({ openAddTask, setOpenAddTask }: any) {
  const { task } = useSelector((state: RootState) => state.task);
  const { user } = useSelector((state: RootState) => state.authorization);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [taskName, setTaskName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [dueDate, setDueDate] = React.useState<Date | null>(null);

  const handleClose = () => {
    setOpenAddTask(false);
  };

  const handleSubmit = async () => {
    // Data validation (optional)
    if (
      !taskName ||
      !description ||
      !assignedTo ||
      !priority ||
      !status ||
      !dueDate
    ) {
      alert("Please fill in all the fields.");
      return;
    }
    // Prepare the data to be submitted
    const data: any = {
      taskName,
      description,
      assignedTo,
      priority,
      status,
      assignedBy: user._id,
      dueDate: dueDate?.toISOString(), // Ensure dueDate is in correct format
    };

   let responce = id && await dispatch(createTask({ id, data }));
    console.log(responce);
    handleClose()
  };

  return (
    <React.Fragment>
      <Dialog
        open={openAddTask}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Task Name"
              fullWidth
              margin="dense"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              style={{ marginBottom: "16px" }}
            />
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: "16px" }}
            />
            <TextField
              select
              label="Assigned To"
              fullWidth
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
              style={{ marginBottom: "16px" }}
            >
              {task?.users?.map((user: any) => (
                <MenuItem key={user?._id} value={user?.userId?._id}>
                  <Avatar
                    style={{
                      marginRight: "9px",
                      height: "33px",
                      width: "33px",
                      fontSize: "18px",
                      float: "left",
                    }}
                  >
                    {user?.userId?.name?.slice(0, 2)}
                  </Avatar>
                  {user?.userId?.name}
                </MenuItem>
              ))}
            </TextField>

            <Grid container spacing={2} style={{ marginBottom: "16px" }}>
              <Grid item xs={6}>
                <Select
                  displayEmpty
                  fullWidth
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as string)}
                >
                  <MenuItem value="" disabled>
                    <em>Priority</em>
                  </MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                <Select
                  displayEmpty
                  fullWidth
                  value={status}
                  onChange={(e) => setStatus(e.target.value as string)}
                >
                  <MenuItem value="" disabled>
                    <em>Status</em>
                  </MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="on-hold">On Hold</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <TextField
              label="Due Date"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setDueDate(new Date(e.target.value))}
              style={{ marginBottom: "16px" }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
