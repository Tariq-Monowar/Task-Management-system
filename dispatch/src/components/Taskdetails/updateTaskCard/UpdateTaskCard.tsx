import './UpdateTaskCard.scss';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { updateTask } from '../../../features/task/taskSlice';
import { Task } from '../../../interfaces/project';
import { TaskErrorResponse } from '../../../interfaces/task';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateTaskCard({ openUpdate, setOpenUpdate, data }: any) {
  const [taskName, setTaskName] = React.useState(data.taskName || '');
  const [description, setDescription] = React.useState(data.description || '');
  const [priority, setPriority] = React.useState(data.priority || 'medium');
  const [status, setStatus] = React.useState(data.status || 'pending');
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setOpenUpdate(false);
  };

  const handleUpdate = () => {
    // Create the task data object
    const updatedTask: any = {
      taskName,
      description,
      priority,
      status,
    };
  
    const projectId = data.projectId;
    const taskId = data._id; // Renamed `id` for clarity and consistency
    
    // Dispatch the action with the correct arguments
    dispatch(updateTask({ taskId, projectId, data: updatedTask }))
      .unwrap()
      .then((result: Task) => {
        console.log("Update successful:", result); // Log the successful result
        setOpenUpdate(false); // Close the dialog on success
      })
      .catch((error: TaskErrorResponse) => {
        // Handle the error if needed
        console.error("Update failed: ", error);
      });
  
    console.log('Updated task data:', updatedTask);
  };
  

  
 
  // const handleSubmit = () => {
  //   const updatedData = { name, email, bio, password, skills };
  //   console.log("Updated data to dispatch:", updatedData);
  
  //   // Dispatch the updateUser action
  //   dispatch(updateUser(updatedData))
      // .unwrap()
      // .then((result: any) => {
      //   console.log("Update successful:", result); // Log the successful result
      //   setOpenProfil(false); // Close the profile dialog on success
      // })
      // .catch((error: any) => {
      //   // Handle the error if needed
      //   console.error("Update failed: ", error);
      // });
  // };
  return (
    <React.Fragment>
      <Dialog
        open={openUpdate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="update-task-dialog-title"
      >
        <DialogTitle id="update-task-dialog-title">Update Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <Grid container spacing={2} style={{ marginTop: '-10px' }}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="on-hold">On Hold</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
