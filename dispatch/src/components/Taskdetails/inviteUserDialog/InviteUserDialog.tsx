import "./inviteUserDialog.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { addUserToProject } from "../../../features/task/taskSlice";
import { addUserToProjectInState } from "../../../features/project/projectSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InviteUserDialog({
  openInviteDialog,
  setOpenInviteDialog,
}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.project);
  const { task } = useSelector((state: RootState) => state.task);

  const [selectedUser, setSelectedUser] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("");

  const handleClose = () => {
    setOpenInviteDialog(false);
    setSelectedUser("");
    setSelectedRole("");
  };

  const handleAddUser = async () => {
    if (selectedUser && selectedRole) {
      let response = await dispatch(
        addUserToProject({
          projectId: task._id,
          userId: selectedUser,
          role: selectedRole,
        })
      );
      if (response?.payload?.projectId) {
        dispatch(
          addUserToProjectInState({
            projectId: response.payload.projectId,
            user: response.payload.user,
          })
        );
      }

      console.log(response);
      handleClose();
    }
  };

  // Create a Set of IDs of users who are already in the project
  const existingUserIds = new Set(
    task?.users?.map((user: any) => user?.userId?._id || user?.userId)
  );

  // Filter out users who are already in the project
  const availableUsers = users?.filter(
    (user: any) => !existingUserIds?.has(user._id)
  );

  return (
    <Dialog
      open={openInviteDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="invite-user-dialog-description"
    >
      <DialogTitle className="dialogTitle">Invite User to Project</DialogTitle>
      <DialogContent className="dialogContent">
        <TextField
          select
          label="Select User"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          fullWidth
          margin="normal"
        >
          {availableUsers?.map((user: any) => (
            <MenuItem key={user._id} value={user._id}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar className="avatar">
                  {user.name.slice(0, 2).toUpperCase()}
                </Avatar>
                <Typography>{user.name}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Assign Role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="developer">Developer</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleAddUser}
          color="primary"
          variant="contained"
          disabled={!selectedUser || !selectedRole}
        >
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}
