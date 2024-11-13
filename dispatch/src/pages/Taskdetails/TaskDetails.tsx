// import { useDispatch, useSelector } from "react-redux";
// import "./TaskDetails.scss";
// import { useParams } from "react-router-dom";
// import { AppDispatch, RootState } from "../../app/store";
// import { useEffect } from "react";
// import { getAllTaskInProject } from "../../features/task/taskSlice";
// import TaskdetailsHeader from "../../components/Taskdetails/taskHeader/TaskdetailsHeader";
// import TaskCard from "../../components/Taskdetails/TaskCard/TaskCard";

// import { useNavigate } from "react-router-dom";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Tab from "@mui/material/Tab";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import PrintIcon from "@mui/icons-material/Print";
// import { deleteProject, updateProject } from "../../features/project/projectSlice";
// import { Button, Stack } from "@mui/material";
// import NoteAddIcon from "@mui/icons-material/NoteAdd";
// import AddTask from "../../components/Taskdetails/addTask/AddTask";
// import TaskStatus from "../../components/Taskdetails/TaskStatus/TaskStatus";
// import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

// const TaskDetails = () => {
//   const [value, setValue] = React.useState("1");
//   const [openAddTask, setOpenAddTask] = React.useState(false);
//   const navigate = useNavigate();

//   const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//   };

//   const { sidebarEnable } = useSelector((state: RootState) => state.project);

//   const { task, taskLoading, taskError } = useSelector(
//     (state: RootState) => state.task
//   );

//   const dispatch = useDispatch<AppDispatch>();
//   const { id } = useParams();

//   const fetchTasks = async (projectId: string) => {
//     try {
//       if (id !== task._id) {
//         await dispatch(getAllTaskInProject(projectId));
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchTasks(id);
//     }
//   }, [id]);

//   const handleDelete = async () => {
//     let responce = id && (await dispatch(deleteProject(id)));
//     if (responce && responce.type === "projects/delete/fulfilled") {
//       navigate(-1);
//     }
//   };



//   const areAllTasksCompleted = (data: any) => {
//     return data?.tasks?.length > 0? data?.tasks?.every((x: any) => x?.status === 'completed') : false
//   };
  
//   const result = areAllTasksCompleted(task);

//   const handleComplateTask = async()=>{
//     const data = {
//       status: 'Completed',
//     };
//     let responce = id && (await dispatch(updateProject({ id, data })));
    
//   }

//   console.log(task.tasks)
//   return (
//     <>
//       <div
//         style={{
//           marginLeft: sidebarEnable ? "260px" : "88px",
//           transition: "margin-left 0.3s ease",
//           marginTop: "65px",
//           padding: "10px",
//         }}
//       >
//         <TaskdetailsHeader />
//         <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
//           <TabContext value={value}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box
//                 sx={{
//                   borderBottom: 1,
//                   borderColor: "divider",
//                   width: "199px",
//                   textAlign: "center",
//                 }}
//               >
//                 <TabList
//                   onChange={handleChange}
//                   aria-label="lab API tabs example"
//                   sx={{
//                     padding: 0,
//                     fontSize: "0.8rem",
//                   }}
//                 >
//                   <Tab
//                     label="All Task"
//                     value="1"
//                     sx={{
//                       fontSize: "0.8rem",
//                       padding: "4px 8px 0px 3px",
//                     }}
//                   />
//                   <Tab
//                     label="Task Status"
//                     value="2"
//                     sx={{
//                       fontSize: "0.8rem",
//                       padding: "4px 12px 0px 8px",
//                     }}
//                   />
//                 </TabList>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <PrintIcon
//                   sx={{
//                     color: "#4a4a4a",
//                     fontSize: "30px",
//                     mr: 4,
//                     transition: "color 0.3s, transform 0.1s",

//                     "&:hover": {
//                       transform: "scale(1.1)",
//                     },

//                     "&:active": {
//                       transform: "scale(0.95)", // Slightly shrink icon on click
//                     },
//                   }}
//                 />
//                 <Stack direction="row" spacing={2} sx={{ mr: 3 }}>
//                   <Button
//                     onClick={() => setOpenAddTask(true)}
//                     variant="outlined"
//                     startIcon={<NoteAddIcon />}
//                   >
//                     Add Task
//                   </Button>
//                 </Stack>
//               </Box>
//             </Box>

//             <TabPanel value="1">
//               <div className="taskContainner">
//                 {task?.tasks?.map((data: any, index: number) => {
//                   // console.log(data)
//                   return <TaskCard key={data._id || index} task={data} />;
//                 })}
//               </div>
//             </TabPanel>
//             <TabPanel value="2">
//               <Box sx={{ display: "flex" }}>
//                 <TaskStatus data={task} />
//                 <Box sx={{ ml: 5 }}>
//                   {/* <Box>
//                     <MonetizationOnIcon
//                       style={{ fontSize: "50px", color: "#929090" }}
//                     />
//                   </Box> */}
//                 </Box>
//               </Box>
//               <Button onClick={handleComplateTask} sx={{mt: 2, mb: 1, ml: 4}} disabled={!result}  variant="outlined" startIcon={<TaskAltIcon  />}>Complate Project </Button>
//              <br /> <Button onClick={handleDelete} sx={{mt: 2, mb: 10,  ml: 4}}   variant="outlined" startIcon={<DeleteSweepIcon  />}>delete Project</Button>
//             </TabPanel>
//           </TabContext>
//         </Box>

//         {/* <TaskCard /> */}
//         {taskLoading && <p>Loading tasks...</p>}
//         {taskError && <p>Error loading tasks: {taskError}</p>}
//         {/* {!taskLoading && !taskError && <div>Task Details</div>} */}
//       </div>
//       <AddTask openAddTask={openAddTask} setOpenAddTask={setOpenAddTask} />
//     </>
//   );
// };

// export default TaskDetails;


import { useDispatch, useSelector } from "react-redux";
import "./TaskDetails.scss";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { getAllTaskInProject } from "../../features/task/taskSlice";
import TaskdetailsHeader from "../../components/Taskdetails/taskHeader/TaskdetailsHeader";
import TaskCard from "../../components/Taskdetails/TaskCard/TaskCard";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PrintIcon from "@mui/icons-material/Print";
import { deleteProject, updateProject } from "../../features/project/projectSlice";
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddTask from "../../components/Taskdetails/addTask/AddTask";
import TaskStatus from "../../components/Taskdetails/TaskStatus/TaskStatus";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Snackbar, Alert } from "@mui/material";

const TaskDetails = () => {
  const [value, setValue] = React.useState("1");
  const [openAddTask, setOpenAddTask] = React.useState(false);
 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const { sidebarEnable } = useSelector((state: RootState) => state.project);

  const { task, taskLoading, taskError } = useSelector(
    (state: RootState) => state.task
  );

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const fetchTasks = async (projectId: string) => {
    try {
      if (id !== task._id) {
        await dispatch(getAllTaskInProject(projectId));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTasks(id);
    }
  }, [id]);

  const handleDelete = async () => {


    // let responce = id && (await dispatch(deleteProject(id)));
    // if (responce && responce.type === "projects/delete/fulfilled") {
    //   navigate(-1);
    // }

    const data = {
      status: 'archived',
    };
    let response = id && (await dispatch(updateProject({ id, data })));

    if (response && response.type === "projects/update/fulfilled") {
 
      setSnackbarMessage("Project has been marked as deleted successfully!");
      setOpenSnackbar(true);
      navigate(-1);
    }

  };

  const areAllTasksCompleted = (data: any) => {
    return data?.tasks?.length > 0 ? data?.tasks?.every((x: any) => x?.status === 'completed') : false;
  };

  const result = areAllTasksCompleted(task);

  const handleCompleteTask = async () => {
    const data = {
      status: 'Completed',
    };
    let response = id && (await dispatch(updateProject({ id, data })));

    if (response && response.type === "projects/update/fulfilled") {
  
      setSnackbarMessage("Project has been marked as completed successfully!");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div
        style={{
          marginLeft: sidebarEnable ? "260px" : "88px",
          transition: "margin-left 0.3s ease",
          marginTop: "65px",
          padding: "10px",
        }}
      >
        <TaskdetailsHeader />
        <Box sx={{ width: "100%", typography: "body1", mt: 2 }}>
          <TabContext value={value}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  width: "199px",
                  textAlign: "center",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  sx={{
                    padding: 0,
                    fontSize: "0.8rem",
                  }}
                >
                  <Tab
                    label="All Task"
                    value="1"
                    sx={{
                      fontSize: "0.8rem",
                      padding: "4px 8px 0px 3px",
                    }}
                  />
                  <Tab
                    label="Task Status"
                    value="2"
                    sx={{
                      fontSize: "0.8rem",
                      padding: "4px 12px 0px 8px",
                    }}
                  />
                </TabList>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PrintIcon
                  sx={{
                    color: "#4a4a4a",
                    fontSize: "30px",
                    mr: 4,
                    transition: "color 0.3s, transform 0.1s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                />
                <Stack direction="row" spacing={2} sx={{ mr: 3 }}>
                  <Button
                    onClick={() => setOpenAddTask(true)}
                    variant="outlined"
                    startIcon={<NoteAddIcon />}
                  >
                    Add Task
                  </Button>
                </Stack>
              </Box>
            </Box>

            <TabPanel value="1">
              <div className="taskContainner">
                {task?.tasks?.map((data: any, index: number) => {
                  return <TaskCard key={data._id || index} task={data} />;
                })}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ display: "flex" }}>
                <TaskStatus data={task} />
                <Box sx={{ ml: 5 }} />
              </Box>
              <Button onClick={handleCompleteTask} sx={{ mt: 2, mb: 1, ml: 4 }} disabled={!result} variant="outlined" startIcon={<TaskAltIcon />}>
                Complete Project
              </Button>
              <br />
              <Button onClick={handleDelete} sx={{ mt: 2, mb: 10, ml: 4 }} variant="outlined" startIcon={<DeleteSweepIcon />}>
                Delete Project
              </Button>
            </TabPanel>
          </TabContext>
        </Box>

        {taskLoading && <p>Loading tasks...</p>}
        {taskError && <p>Error loading tasks: {taskError}</p>}
      </div>

      <AddTask openAddTask={openAddTask} setOpenAddTask={setOpenAddTask} />
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

export default TaskDetails;
