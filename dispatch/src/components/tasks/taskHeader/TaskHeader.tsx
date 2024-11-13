import "./TaskHeader.scss";

import   { useEffect, useState } from "react";
import { Box, Typography, AvatarGroup, Avatar, Button } from "@mui/material";
import {
  amber,
 
  cyan,
  deepOrange,
 
  pink,
  purple,
  teal,
} from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import CreateTaskDialog from "../createTaskDialog/CreateTaskDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { User } from "../../../interfaces/auth";

const TaskHeader = () => {
  
  const { projects, users } = useSelector((state: RootState) => state.project);
  const [currentDate, setCurrentDate] = useState("");
  const [openTask, setOpenTask] = useState(false);
  const totalProjects = projects.length;

  // List of colors for avatars
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
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <Box className="header">
        {/* Total Projects Indicator */}
        <Box className="section projectCountSection">
          <Typography variant="subtitle2" className="label">
            TOTAL PROJECTS
          </Typography>
          <Typography variant="h5" className="countText">
            {totalProjects}
          </Typography>
        </Box>

        {/* Today's Date Section */}
        <Box className="section dateSection">
          <Typography variant="subtitle2" className="label">
            TODAY'S DATE
          </Typography>
          <Typography variant="h5" className="dateText">
            {currentDate}
          </Typography>
        </Box>

        {/* People on Project Section */}
        <Box className="section teamSection">
          <Typography variant="subtitle2" className="label" sx={{ ml: "5px" }}>
            PROJECT TEAM
          </Typography>
          <AvatarGroup max={5} >
            {users.map((user: User, index: number) => (
              <Avatar
                key={user._id}
                sx={{
                  bgcolor: colors[index % colors.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px", // Adjust font size as needed
                  
                  padding: "0px 1px 1px 1px"
                }}
                alt={user.name}
              >
                {user.name.slice(0, 2).toLowerCase()}
              </Avatar>
            ))}
          </AvatarGroup>
        </Box>

        {/* Create Task Button */}
        <Box className="section createTaskSection">
          <Button
            onClick={() => {
              setOpenTask(true);
            }}
            variant="contained"
            startIcon={<AddIcon />}
            className="createTaskButton"
          >
            Create Task
          </Button>
        </Box>
      </Box>
      <CreateTaskDialog openTask={openTask} setOpenTask={setOpenTask} />
    </>
  );
};

export default TaskHeader;
