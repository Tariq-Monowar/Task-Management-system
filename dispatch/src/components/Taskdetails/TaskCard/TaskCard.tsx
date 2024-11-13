import "./TaskCard.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { CalendarToday, Edit, Delete } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import UpdateTaskCard from "../updateTaskCard/UpdateTaskCard";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { deletetask, updateTask } from "../../../features/task/taskSlice";
import { Task } from "../../../interfaces/project";
import { TaskErrorResponse } from "../../../interfaces/task";
import { useParams } from "react-router-dom";

export default function TaskCard({ task }: any) {
  const [status, setStatus] = useState(task?.status || "pending");
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  // console.log(task)
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [openUpdate, setOpenUpdate] = useState(false);

  const statusMenuOpen = Boolean(statusMenuAnchorEl);
  const moreMenuOpen = Boolean(moreMenuAnchorEl);

  const formatDate = (dateString: any) => {
    const options: any = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  const handleStatusMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setStatusMenuAnchorEl(event.currentTarget);
  };
  const handleStatusMenuClose = (newStatus?: string) => {
    if (newStatus) setStatus(newStatus);
    setStatusMenuAnchorEl(null);
  };
  useEffect(() => {
    handleStatusMenuClose();
  }, [task]);

  const handleMoreMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };
  const handleOpenUpdateDialog = () => {
    handleMoreMenuClose();
    setOpenUpdate(true);
  };

  const submitData = () => {
    // Create the task data object
    const updatedTask: any = {
      status,
    };

    const projectId = task.projectId;
    const taskId = task._id;

    dispatch(updateTask({ taskId, projectId, data: updatedTask }))
      .unwrap()
      .then((result: Task) => {
        console.log("Update successful:", result);
        setOpenUpdate(false);
      })
      .catch((error: TaskErrorResponse) => {
        console.error("Update failed: ", error);
      });

    console.log("Updated task data:", updatedTask);
  };

  const handleDelete = async () => {
    let taskId = task?._id;
    let res = id && (await dispatch(deletetask({ taskId, id })));
    console.log(res);
  };
  return (
    <>
      <Card className="priority-chip">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              // variant="h5"
              sx={{ fontSize: "1.3rem",  }}
              component="div"
            >
              {task?.taskName}
            </Typography>
            <Chip
              label={task?.priority}
              className={`priority-chip ${task?.priority}`}
              sx={{ height: 25, width: "auto", minWidth: 65 }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1.5 }}>
            {task?.description}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mt={1.5}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "#673ab7",
                  height: 38,
                  width: 38,
                  fontSize: 14,
                  textTransform: "uppercase",
                  border: "1px solid white",
                  mr: "2px",
                }}
                alt={task?.assignedBy?.name}
              >
                {task?.assignedBy?.name?.slice(0, 2).toLowerCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  ml={1}
                  color="textSecondary"
                  sx={{ color: "#363636", mb: "-2px" }}
                >
                  assigned by
                </Typography>
                <Typography variant="body2" ml={1} color="textSecondary">
                  {task?.assignedBy?.name}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center">
              <CalendarToday
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2" ml={1} color="textSecondary">
                {task?.dueDate ? formatDate(task?.dueDate) : "No Date Line"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "#949597",
                  height: 38,
                  width: 38,
                  fontSize: 14,
                  textTransform: "uppercase",
                  border: "1px solid white",
                  mr: "2px",
                }}
                alt={task?.assignedTo?.name}
              >
                {task?.assignedTo?.name?.slice(0, 2).toLowerCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  ml={1}
                  color="textSecondary"
                  sx={{ color: "#363636", mb: "-2px" }}
                >
                  assigned to
                </Typography>
                <Typography variant="body2" ml={1} color="textSecondary">
                  {task?.assignedTo?.name}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    color: "#949597",
                    borderColor: "#949597",
                  }}
                  onClick={handleStatusMenuClick}
                  startIcon={<BorderColorIcon />}
                >
                  {status}
                </Button>
              </Stack>
            </Box>
          </Box>

          <Menu
            anchorEl={statusMenuAnchorEl}
            open={statusMenuOpen}
            onClose={() => handleStatusMenuClose()}
          >
            {["pending", "in-progress", "completed", "on-hold", "archived"].map(
              (statusOption) => (
                <MenuItem
                  key={statusOption}
                  onClick={() => handleStatusMenuClose(statusOption)}
                >
                  {statusOption}
                </MenuItem>
              )
            )}
          </Menu>
        </CardContent>
        <Divider className="divider" />

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Button size="small" onClick={submitData}>
              <ChevronRightIcon />
              Submit
            </Button>
          </Box>

          <Box
            onClick={handleMoreMenuClick}
            sx={{ color: "text.secondary", cursor: "pointer" }}
          >
            <MoreVertIcon />
          </Box>
          <Menu
            anchorEl={moreMenuAnchorEl}
            open={moreMenuOpen}
            onClose={handleMoreMenuClose}
          >
            <MenuItem onClick={handleOpenUpdateDialog}>
              <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </CardActions>
      </Card>
      <UpdateTaskCard
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        data={task}
      />
    </>
  );
}
