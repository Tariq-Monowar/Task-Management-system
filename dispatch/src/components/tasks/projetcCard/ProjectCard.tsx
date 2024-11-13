import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
  AvatarGroup,
  Divider,
} from "@mui/material";
import { CalendarToday, Star } from "@mui/icons-material";
import {
  deepPurple,
  teal,
  purple,
  cyan,
  deepOrange,
  pink,
} from "@mui/material/colors";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./ProjectCard.scss";
import { useNavigate } from "react-router-dom";
 

const ProjectCard = ({ project }: any) => {
  const { title, description, timeline, users, priority, status } = project;
  const navigate = useNavigate();
  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const formatDate = (dateString: any) => {
    const options: any = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  const colors = [
    deepPurple[500],
    teal[300],
    purple[200],
    cyan[300],
    deepOrange[500],
    pink[300],
  ];
  // /task/project/
 
  
  return (
    <Card
      onClick={() => navigate(`/task/project/${project._id}`)}
      className="project-card"
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: 3,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, background-color 0.3s",
        backgroundColor: "#f4f3f8",

        "&:hover": {
          transform: "translateY(-5px)",
          backgroundColor: "#f8f9fa",
        },
      }}
    >
      {/* Card Header */}
      <CardContent sx={{ pb: 0, flexGrow: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* <Typography variant="h6" fontWeight="bold" color="textPrimary">
            {title}
          </Typography> */}
          <Typography
            gutterBottom
            variant="h5"
            sx={{ fontSize: "1.3rem" }}
            component="div"
          >
            {title}
          </Typography>
          <Chip
            sx={{
              fontSize: 12,
              padding: 0,
              color: status === "active" ? "success.main" : "text.secondary",
            }}
            label={capitalize(status)}
            icon={<FiberManualRecordIcon sx={{ fontSize: 12 }} />}
            variant="outlined"
          />
        </Box>
        <Typography variant="body2" color="textSecondary" mt={1} mb={2}>
          {description}
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <CalendarToday fontSize="small" sx={{ color: "text.secondary" }} />
            <Typography variant="body2" ml={1} color="textSecondary">
              {formatDate(timeline.start)} - {formatDate(timeline.end)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Divider light />
      {/* Card Footer */}
      <CardContent sx={{ pt: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1.5,
          }}
        >
          <Box sx={{ textAlign: "left" }}>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="textSecondary"
            >
              Team Members
            </Typography>
            <AvatarGroup
              sx={{ float: "left", marginLeft: "-2px" }}
              spacing="small"
            >
              {users.slice(0, 5).map((user: any, index: number) => (
                <Avatar
                  key={user?.userId?._id}
                  sx={{
                    bgcolor: colors[index % colors.length],
                    height: 34,
                    width: 34,
                    fontSize: 14,
                    textTransform: "uppercase",
                    border: "1px solid white",
                  }}
                  alt={user?.userId?.name}
                >
                  {user?.userId?.name?.slice(0, 2).toLowerCase()}
                </Avatar>
              ))}
            </AvatarGroup>
          </Box>
          <Chip
            label={capitalize(priority)}
            color={priority === "high" ? "error" : "warning"}
            icon={<Star fontSize="small" sx={{ marginRight: -0.5 }} />}
            variant="outlined"
            className="chap"
            sx={{
              backgroundColor: priority === "high" ? "#fdecea" : "#fff4e5",
              color: priority === "high" ? "error.main" : "warning.main",
              fontSize: "0.875rem",
              fontWeight: "500",
              paddingX: "6px",
              ".MuiChip-icon": {
                color: priority === "high" ? "error.main" : "warning.main",
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
