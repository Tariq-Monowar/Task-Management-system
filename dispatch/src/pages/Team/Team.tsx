import { useSelector } from "react-redux";
import TaskHeader from "../../components/tasks/taskHeader/TaskHeader";
import Avatar from "@mui/material/Avatar";
import { RootState } from "../../app/store";
import { Box, Typography, Divider, Stack, AvatarGroup } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import "./tame.scss";
import {
  amber,
  cyan,
  deepOrange,
  pink,
  purple,
  teal,
} from "@mui/material/colors";
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

const Team = () => {
  const { sidebarEnable, users } = useSelector(
    (state: RootState) => state.project
  );

  
  const colors = [
    amber[400],
    teal[300],
    purple[200],
    cyan[300],
    deepOrange[500],
    pink[300],
  ];
  return (
    <main
      className="taskContainer"
      style={{
        marginLeft: sidebarEnable ? "260px" : "88px",
        transition: "margin-left 0.3s ease",
        padding: "20px",
      }}
    >
      {/* <TaskHeader /> */}
      <Box
        className="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
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
                  fontSize: "22px", // Adjust font size as needed

                  padding: "0px 1px 1px 1px",
                }}
                alt={user.name}
              >
                {user.name.slice(0, 2).toLowerCase()}
              </Avatar>
            ))}
          </AvatarGroup>
        </Box>
      </Box>

      <Box>
        {users &&
          users.map((data: User) => (
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
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {data.name.slice(0, 2)}
                </Avatar>
                <Box>
                  <Typography
                    className="name"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    {data.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {data.email}
                  </Typography>
                </Box>
              </Stack>
              <Typography
                className="active"
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: data.availability ? "green" : "red",
                }}
              >
                {data.availability ? "Active" : "Inactive"}
              </Typography>
            </Box>
          ))}
      </Box>
    </main>
  );
};

export default Team;
