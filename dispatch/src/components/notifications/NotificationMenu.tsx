import "./notificationManue.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { AppDispatch, RootState } from "../../app/store";
import { count_Incress, getAllNotifications } from "../../features/notification/notificationSlice";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { NavLink } from "react-router-dom";

const NotificationMenu = ({ handleMenuClose }: any) => {
  const { notificationsList, notificationError, notificationLoading, count } =
    useSelector((state: RootState) => state.notifications);

  const dispatch = useDispatch<AppDispatch>();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { user } = useSelector((state: RootState) => state.authorization);
  const userId = user?._id;
  let counts = notificationsList.filter((x: any) => x?.read === false).length;
  // counts
console.log('number', count)
 
  useEffect(() => {
    if (!userId) return;

    const socket: Socket = io("http://localhost:8081");

    socket.emit("register", userId);

    // Listen for the 'new-notification' event from the server
    // socket.on("new-notification", (notification: Notification) => {
    //   setNotifications((prevNotifications) => [
    //     ...prevNotifications,
    //     notification,
    //   ]);
    // });
    socket.on("new-notification", () => {
      dispatch(count_Incress()); 
    });

    return () => {
      socket.off("new-notification");
      socket.disconnect();
    };
  }, [userId, Socket]);

  useEffect(() => {
    dispatch(getAllNotifications());
  }, []);

  // if (notificationsList) {
  //   console.log("notificationsList: ", notificationsList);
  // }

  const handleClickRead = () => {
    handleMenuClose();
  };

 

  return (
    <div className="notification-menu">
      <h1 className="headTitle">Notification</h1>

      {notificationsList &&
        notificationsList?.map((data: any) => {
     
          return (
            <NavLink
              to={`/task/project/${data?.projectId?._id}`}
              style={{ textDecoration: "none", color: "#4a4a4a" }}
              onClick={handleClickRead}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  width: "300px",
                  bgcolor: "gray",
                  m: 1,
                  borderRadius: 2,
                  backgroundColor: "#e0e0e0",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#d3d3d3",
                    // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  },
                  "&:active": {
                    backgroundColor: "#d1d1d1",
                    transform: "scale(0.98)",
                  },
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      height: 47,
                      width: 47,
                      pb: 0.2,
                      fontSize: "25px",
                    }}
                  >
                    {data?.sender?.name?.slice(0, 2)}
                  </Avatar>
                </Stack>
                <Box sx={{ ml: 1.5 }}>
                  <Typography className="notificationTitle">
                    {data?.projectId?.title}
                  </Typography>
                  <Typography>
                    {data?.taskId?.taskName} {"  "}
                    {"  "} {data?.type}
                  </Typography>
                </Box>
              </Box>
            </NavLink>
          );
        })}
    </div>
  );
};

export default NotificationMenu;
