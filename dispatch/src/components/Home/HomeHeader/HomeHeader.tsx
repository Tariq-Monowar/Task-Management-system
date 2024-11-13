import "./homeheader.scss";
import Lottie from "lottie-react";
import animationData from "../../../assets/lottie/taskHome.json";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  amber,
  teal,
  purple,
  cyan,
  deepOrange,
  pink,
} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Stack from "@mui/material/Stack";
import { Box, Typography } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const colors = [
  amber[400],
  teal[300],
  purple[200],
  cyan[300],
  deepOrange[500],
  pink[300],
];

const HomeHeader = () => {
  const { projects } = useSelector((state: RootState) => state.project);
  console.log("Projects", projects);

  // Extract full user data for admins and managers
  const extractAdminsAndManagers = () => {
    const adminList: any[] = [];
    const managerList: any[] = [];

    projects?.forEach((project) => {
      project?.users?.forEach((user) => {
        if (user?.role === "admin") {
          adminList.push(user?.userId);
        } else if (user?.role === "manager") {
          managerList.push(user?.userId);
        }
      });
    });

    return { adminList, managerList };
  };

  const { adminList, managerList } = extractAdminsAndManagers();
  console.log("Admin List (Full Data)", adminList);
  console.log("Manager List (Full Data)", managerList);

  function addLeadingZero(num: number) {
    return num < 10 ? "0" + num : num.toString();
  }

  function countUSD(data: any) {
    return data
      .filter((item: { currency: string }) => item.currency === "USD")
      .reduce((total: any, item: { amount: any }) => total + item.amount, 0);
  }

  // Function to count the total amount for BDT
  function countBDT(data: any) {
    return data
      .filter((item: { currency: string }) => item.currency === "BDT")
      .reduce((total: any, item: { amount: any }) => total + item.amount, 0);
  }

  let tottle = countBDT(projects) + countUSD(projects) * 115;

  return (
    <div className="homeHeader">
      <Box>
        <h1 className="headerTitle" style={{marginTop: '16px'}}>Task Management system</h1>

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center", mt: 6 }}
        >
          <Box
            sx={{
              textAlign: "left",
              display: "inline-flex",
              flexDirection: "column",
              ml: 2.5, // পরিবর্তন
              
            }}
          >
            <Typography
              variant="subtitle2"
              className="label"
              sx={{ ml: 0.5, textAlign: "left" }}
            >
              Tote project
            </Typography>
            <Stack sx={{ mt: 0.7, alignItems: "flex-start" }} spacing={4}>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#5d5d5d",
                  fontSize: "25px",
                }}
              >
                <AssignmentIcon
                  sx={{ fontSize: "32px", mr: 1, color: "#6c6c6c" }}
                />{" "}
                {addLeadingZero(Number(projects.length))}{" "}
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              textAlign: "left",
              display: "inline-flex",
              flexDirection: "column",
              ml: 5, // পরিবর্তন
               
            }}
          >
            <Typography
              variant="subtitle2"
              className="label"
              sx={{ ml: 0.5, textAlign: "left", mt: 0.7 }}
            >
              Tottle buject
            </Typography>

            <Stack sx={{ mt: 0.7, alignItems: "flex-start" }} spacing={4}>
              {/* Correcting the typo */}
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#5d5d5d",
                  fontSize: "25px",
                }}
              >
                <MonetizationOnIcon
                  sx={{ fontSize: "32px", mr: 1, color: "#6c6c6c" }}
                />
                {tottle}{" "}
                <span
                  style={{
                    fontSize: "15px",
                    color: "#7b7878",
                    marginLeft: "5px",
                  }}
                >
                  BDT
                </span>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          ml: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              textAlign: "left",
              display: "inline-flex",
              flexDirection: "column",
              ml: 0, // পরিবর্তন
              mt: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              className="label"
              sx={{ ml: 0.5, textAlign: "left" }}
            >
              Admin List
            </Typography>
            <Stack sx={{ mt: 0.7, alignItems: "flex-start" }} spacing={4}>
              {" "}
              {/* পরিবর্তন */}
              <AvatarGroup max={5} spacing="small">
                {adminList?.map((user, index) => (
                  <Avatar
                    key={user._id}
                    sx={{
                      bgcolor: colors[index % colors.length],
                      fontSize: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    alt={user.name}
                  >
                    {user.name.slice(0, 2).toLowerCase()}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Stack>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              textAlign: "left",
              display: "inline-flex",
              flexDirection: "column",
              ml: 0, // পরিবর্তন
              mt: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              className="label"
              sx={{ ml: 0.5, textAlign: "left" }}
            >
              Manager List
            </Typography>
            <Stack sx={{ mt: 0.7, alignItems: "flex-start" }} spacing={4}>
              {" "}
              {/* পরিবর্তন */}
              <AvatarGroup max={5} spacing="small">
                {managerList?.map((user, index) => (
                  <Avatar
                    key={user._id}
                    sx={{
                      bgcolor: colors[index % colors.length],
                      fontSize: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    alt={user.name}
                  >
                    {user.name.slice(0, 2).toLowerCase()}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Stack>
          </Box>
        </Box>
      </Box>

    
      <div style={{ width: "270px", marginRight: "25px" }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default HomeHeader;
