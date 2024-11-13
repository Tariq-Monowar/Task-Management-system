// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';

// export default function TaskStatus({data}: any) {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const tasks = data?.tasks
//   const handleNext = () => {
//     if (activeStep === tasks.length - 1) {
//       setActiveStep(0); // Reset to first task if it's the last step
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return (
//     <Box sx={{ maxWidth: 400 }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {tasks.map((task, index) => (
//           <Step key={task._id}>
//             <StepLabel
//               optional={
//                 index === tasks.length - 1 ? (
//                   <Typography variant="caption">Last task</Typography>
//                 ) : null
//               }
//             >
//               {task.taskName}
//             </StepLabel>
//             <StepContent>
//               {/* Task Description */}
//               <Typography>{task.description}</Typography>

//               {/* AssignedTo Avatar */}
//               <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
//                 <Avatar>
//                   {task.assignedTo ? task.assignedTo.name.slice(0, 2).toUpperCase() : 'NA'}
//                 </Avatar>
//                 <Typography variant="body2">
//                   {task.assignedTo ? task.assignedTo.name : 'Not Assigned'}
//                 </Typography>
//               </Stack>

//               {/* Buttons */}
//               <Box sx={{ mb: 2 }}>
//                 {activeStep !== tasks.length ? (
//                   <>
//                     <Button
//                       variant="contained"
//                       onClick={handleNext}
//                       sx={{ mt: 1, mr: 1 }}
//                     >
//                       {index === tasks.length - 1 ? 'Complete' : 'Continue'}
//                     </Button>
//                     <Button
//                       disabled={index === 0}
//                       onClick={handleBack}
//                       sx={{ mt: 1, mr: 1 }}
//                     >
//                       Back
//                     </Button>
//                   </>
//                 ) : null}
//               </Box>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

 
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Divider } from "@mui/material";

type Task = {
  _id: string;
  taskName: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "on-hold" | "archived";
};

type TaskStatusProps = {
  data: {
    tasks: Task[];
  };
};

export default function TaskStatus({ data }: TaskStatusProps) {
  const tasks = data?.tasks || [];

  // Define the order of statuses
  const statusOrder: Record<Task["status"], number> = {
    completed: 0,
    "in-progress": 1,
    pending: 2,
    "on-hold": 3,
    archived: 4,
  };

  // Sort a copy of the tasks array to avoid mutating the original array
  const sortedTasks = [...tasks].sort((a, b) => {
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "blue";
      case "pending":
        return "gray";
      case "on-hold":
        return "orange";
      case "archived":
        return "purple";
      default:
        return "black";
    }
  };

  return (
    <Box sx={{ width: tasks.length === 0? 0: "320px" }}>
      <Stepper activeStep={1} orientation="vertical">
        {sortedTasks.map((task) => (
          <Step key={task._id}>
            <Box>
              <StepLabel
                sx={{
                  color: getStatusColor(task.status),
                  fontWeight: task.status === "completed" ? "bold" : "normal",
                }}
              >
                <Typography sx={{ float: "left", mt: 0.3 }}>
                  {task.taskName}
                </Typography>

                {task.status === "completed" && (
                  <CheckCircleIcon
                    sx={{
                      color: "green",
                      marginLeft: 0.5,
                      fontSize: 18,
                      mt: 0.5,
                    }}
                  />
                )}
              </StepLabel>
            </Box>
            <Box sx={{ mb: 2, ml: 4 }}>
              <Typography variant="body2">
                Status:{" "}
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </Typography>
              <Divider sx={{ borderColor: '#cfcfcf', margin: '5px 0px 5px 0px' }} />
              <Typography sx={{ fontWeight: "normal", color: '#363636', fontStyle: 'oblique', fontSize: '15px' }}>
                {task?.description}
              </Typography>
            </Box>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
