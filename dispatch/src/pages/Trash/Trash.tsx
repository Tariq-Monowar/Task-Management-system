import { useDispatch, useSelector } from "react-redux";
import TaskHeader from "../../components/tasks/taskHeader/TaskHeader";
import Avatar from "@mui/material/Avatar";
import { AppDispatch, RootState } from "../../app/store";
import { Box, Typography, Divider, Stack, AvatarGroup } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import "./trash.scss";
import {
  amber,
  cyan,
  deepOrange,
  pink,
  purple,
  teal,
} from "@mui/material/colors";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { CalendarToday } from "@mui/icons-material";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { useState } from "react";
import { deleteProject, updateProject } from "../../features/project/projectSlice";
import { Snackbar, Alert } from "@mui/material";
interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  skills: string[];
  availability: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

const Trash = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { projects, sidebarEnable, users } = useSelector(
    (state: RootState) => state.project
  );
  const dispatch = useDispatch<AppDispatch>();

  const completedProjects = projects?.filter(
    (project) => project?.status === "archived"
  );

  const formatDate = (dateString: any) => {
    const options: any = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRestor = async (id: string) => {
    // let responce = id && (await dispatch(deleteProject(id)));
    // if (responce && responce.type === "projects/delete/fulfilled") {
    //   navigate(-1);
    // }

    const data = {
      status: "active",
    };
    let response = id && (await dispatch(updateProject({ id, data })));

    if (response && response.type === "projects/update/fulfilled") {
      setSnackbarMessage("Project has been restor successfully!");
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async(id: string)=>{
      let responce = id && (await dispatch(deleteProject(id)));
    if (responce && responce.type === "projects/delete/fulfilled") {
      // navigate(-1);
      setSnackbarMessage("Project has been deleted successfully!");
      setOpenSnackbar(true);
    }
  }
  return (
    <>
      <main
        className="taskContainer"
        style={{
          marginLeft: sidebarEnable ? "260px" : "88px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
        }}
      >
        {/* <Box
        className="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          className="headers"
          variant="h4"
          gutterBottom
          sx={{ mb: -0.5 }}
        >
          Team Members
        </Typography>

        <Box className="section teamSection">
          <Typography variant="subtitle2" className="label" sx={{ ml: "5px" }}>
            PROJECT TEAM
          </Typography>
          <AvatarGroup max={5}>
            {users.map((user: User, index: number) => (
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
                alt={user.name}
              >
                {user.name.slice(0, 2).toLowerCase()}
              </Avatar>
            ))}
          </AvatarGroup>
        </Box>
      </Box> */}

        <Box>
          {completedProjects &&
            completedProjects?.map((data: any) => (
              <Box
                key={data._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  mb: 2,
                  boxShadow:
                    "0px 0px 0px -2px rgb(0 0 0 / 25%), 0px 2px 2px 0px rgb(0 0 0 / 0%), 0px 1px 5px 0px rgb(0 0 0 / 6%)",
                  backgroundColor: "#f9f9f9",
                  width: "100%",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box>
                    <h1 className="names">{data?.title}</h1>
                    <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                      <CalendarToday
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography variant="body2" ml={1} color="textSecondary">
                        {formatDate(data?.timeline?.start)} -{" "}
                        {formatDate(data?.timeline?.end)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
                <Box>
                  <SettingsBackupRestoreIcon
                    onClick={() => handleRestor(data._id)}
                    sx={{
                      color: "#3f3d3d",
                      fontSize: "28px",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#1976d2",
                      },
                      "&:active": {
                        transform: "scale(0.95)",
                      },
                    }}
                  />

                  <DeleteSweepIcon
                     onClick={() => handleDelete(data._id)}
                    sx={{
                      color: "#3f3d3d",
                      fontSize: "30px",
                      ml: 2,
                      mr: 1,
                      cursor: "pointer",
                      "&:hover": {
                        color: "#d32f2f",
                      },
                      "&:active": {
                        transform: "scale(0.95)",
                      },
                    }}
                  />
                </Box>
              </Box>
            ))}
        </Box>
      </main>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Trash;
