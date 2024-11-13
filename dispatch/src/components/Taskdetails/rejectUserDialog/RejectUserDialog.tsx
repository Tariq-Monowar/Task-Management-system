import './RejectUserDialog.scss';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import { AppDispatch } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { rejectUsersFromProject } from '../../../features/project/projectSlice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface User {
  userId: {
    _id: string;
    name: string;
    email: string;
    availability: boolean;
    bio?: string;
  };
  role: string;
  _id: string;
}

export default function RejectUserDialog({ openRejectDialog, setOpenRejectDialog, taskData, projectId }: { openRejectDialog: boolean, setOpenRejectDialog: React.Dispatch<React.SetStateAction<boolean>>, taskData: User[], projectId: string }) {
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setOpenRejectDialog(false);
  };

  const handleUserSelect = (id: string) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]);
  };

  const handleReject = () => {
    if (selectedUsers.length > 0) {
      // Dispatch the rejectUsersFromProject action
      dispatch(rejectUsersFromProject({ projectId, userIds: selectedUsers }));
      setOpenRejectDialog(false); 
      console.log({userIds: selectedUsers})// Close dialog after action
    } else {
      alert('Please select at least one user to reject.');
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={openRejectDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle className="dialog-title">Review User List</DialogTitle>
        <DialogContent className='scroller' style={{width: 'min(96vw, 500px)'}}>
          <List>
            {taskData?.map(user => (
              <ListItem
                key={user?._id}
                className={`user-item ${selectedUsers.includes(user?._id) ? 'selected-user' : ''}`}
              >
                <Checkbox
                  edge="start"
                  checked={selectedUsers.includes(user?._id)}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleUserSelect(user?._id)}
                />
                <ListItemAvatar>
                  <Avatar>
                    {user?.userId?.name.slice(0, 2).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user?.userId?.name}
                  secondary={user?.userId?.email}
                />
                <Chip label={user?.role} color="default" variant="outlined" className="role-chip" />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose}>Close</Button>
          {selectedUsers.length > 0 && (
            <Button onClick={handleReject} color="error" variant="contained" className="delete-all-btn">
              Delete All
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
