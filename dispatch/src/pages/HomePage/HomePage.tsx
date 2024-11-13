import "./homepage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import HomeHeader from "../../components/Home/HomeHeader/HomeHeader";
import Chart from "../../components/Home/Chart/Chart";
import { Box } from "@mui/material";
// import Chart1 from "../../components/Home/Chart/Chart1";
// import { useEffect } from "react";
// import { getAllProjects, getAllUser } from "../../features/project/projectSlice";

const HomePage = () => {
 
  const { projects, users, sidebarEnable} = useSelector((state: RootState) => state.project);
 
  console.log(projects);
  return (
    <div
      className="home-root"
      style={{
        marginLeft: sidebarEnable ? "260px" : "88px",
        transition: "margin-left 0.3s ease",
        marginTop: "65px",
        padding: "10px",
      }}
    >
      <HomeHeader />
      <Box sx={{  width: '100%', margin: '0 auto' }}>
        <Chart />
      </Box>

      {/* <Chart1 /> */}
    </div>
  );
};

export default HomePage;
