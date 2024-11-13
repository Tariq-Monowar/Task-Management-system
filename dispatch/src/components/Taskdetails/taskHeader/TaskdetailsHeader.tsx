import "./TaskdetailsHeader.scss";
import  { useEffect, useState } from "react";
import { Box, Typography, AvatarGroup, Avatar, Button } from "@mui/material";
import {
  amber,
  
  cyan,
  deepOrange,
  
  pink,
  purple,
  teal,
} from "@mui/material/colors";
 
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { User } from "../../../interfaces/auth";
import { useNavigate } from "react-router-dom";
import InviteUserDialog from "../inviteUserDialog/InviteUserDialog";
import RejectUserDialog from "../rejectUserDialog/RejectUserDialog";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const TaskdetailsHeader = () => {
  const navigate = useNavigate();
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  // const { projects } = useSelector((state: RootState) => state.project);
  const { task } = useSelector((state: RootState) => state.task);
  // const [currentDate, setCurrentDate] = useState("");

 

  const colors = [
    amber[400],
    teal[300],
    purple[200],
    cyan[300],
    deepOrange[500],
    pink[300],
  ];

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    // setCurrentDate(formattedDate);
  }, []);

  let deadlineMessage = "No deadline set";
  if (task.timeline?.end) {
    const endDate = new Date(task.timeline.end);
    deadlineMessage = endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // console.log(1213, task)
  return (
    <>
      <Box className="header">
        {/* Total Projects Indicator */}
        <Box className="section projectCountSection">
          <Typography
            onClick={() => navigate(-1)}
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            variant="subtitle2"
            className="label goBack"
          >
            <ChevronLeftIcon /> BACK TO PROJECT
          </Typography>
          <Typography
            sx={{ ml: 1.5 }}
            variant="h5"
            className="countText taskName"
          >
            {task?.title}
          </Typography>
        </Box>

        {/* Today's Date Section */}
        <Box className="section dateSection">
          <Typography
            sx={{ textTransform: "uppercase" }}
            variant="subtitle2"
            className="label"
          >
            Submission deadline
          </Typography>
          <Typography variant="h5" className="dateText  deadline">
            {deadlineMessage}
          </Typography>
        </Box>

        {/* Today's Date Section */}
        <Box className="section dateSection">
          <Typography
            sx={{ textTransform: "uppercase" }}
            variant="subtitle2"
            className="label"
          >
            Total budget
          </Typography>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <MonetizationOnIcon
              style={{ fontSize: "25px", color: "#5e5e5e" }}
            />
            <Typography
              variant="subtitle2"
              className=" deadline"
              sx={{ color: "#5e5e5e", fontSize: '25px', ml: 1, mr: 1 }}
            >
              {task?.amount}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "#5e5e5e" }}
              className="  deadline"
            >
              {task?.currency}
            </Typography>
          </Box>
        </Box>

        {/* People on Project Section */}
        <Box className="section teamSection">
          <Typography variant="subtitle2" className="label" sx={{ ml: "5px" }}>
            PROJECT TEAM
          </Typography>
          <AvatarGroup
            onClick={() => setOpenRejectDialog(true)}
            sx={{
              cursor: "pointer",
              bgcolor: "transparent",
              "&:hover": {
                transform: "scale(1.04)",
              },
              "&:active": {
                transform: "scale(0.99)",
              },
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            max={5}
          >
            {task?.users?.map((user: User, index: number) => (
              <Avatar
                key={user._id}
                sx={{
                  bgcolor: colors[index % colors.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  padding: "0px 1px 1px 1px",
                }}
                alt={user?.userId?.name}
              >
                {user?.userId?.name?.slice(0, 2).toLowerCase()}
              </Avatar>
            ))}
          </AvatarGroup>
        </Box>

        {/* Create Task Button */}
        <Box className="section createTaskSection">
          <Button
            onClick={() => {
              setOpenInviteDialog(true);
            }}
            variant="contained"
            startIcon={<PersonAddIcon />}
            className="createTaskButton"
          >
            invite member
          </Button>
        </Box>
      </Box>
      {/* <CreateTaskDialog openTask={openTask} setOpenTask={setOpenTask} /> */}
      <InviteUserDialog
        openInviteDialog={openInviteDialog}
        setOpenInviteDialog={setOpenInviteDialog}
      />
      <RejectUserDialog
        taskData={task.users}
        openRejectDialog={openRejectDialog}
        setOpenRejectDialog={setOpenRejectDialog}
        projectId={task._id}
      />
    </>
  );
};

export default TaskdetailsHeader;
