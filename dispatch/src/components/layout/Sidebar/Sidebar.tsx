// Sidebar.tsx
import React from "react";
import "./sidebar.scss";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom"; // Import NavLink

// Importing icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import GroupsIcon from "@mui/icons-material/Groups";
import DeleteIcon from "@mui/icons-material/Delete";

// Define the type for navigation items
type NavItem = {
  segment: string;
  title: string;
  icon: React.ReactElement;
  path: string;
} | "divider";

// Sidebar item data
const navItems: NavItem[] = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    segment: "tasks",
    title: "Tasks",
    icon: <AssignmentIcon />,
    path: "/tasks",
  },
  {
    segment: "completed",
    title: "Completed",
    icon: <TaskAltIcon />,
    path: "/completed",
  },
  {
    segment: "in-process",
    title: "In Process",
    icon: <TimelapseIcon />,
    path: "/in-process",
  },
  {
    segment: "team",
    title: "Team",
    icon: <GroupsIcon />,
    path: "/team",
  },
  "divider",
  {
    segment: "trash",
    title: "Trash",
    icon: <DeleteIcon />,
    path: "/trash",
  }
];

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <section className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      <List>
        {navItems.map((item, index) => {
          if (item === "divider") {
            // Render a Divider when the item is "divider"
            return <Divider key={index} />;
          }
          return (
            <ListItem key={index} disablePadding>
              <NavLink to={item.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {isOpen && <ListItemText primary={item.title} />}
                </ListItemButton>
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    </section>
  );
};

export default Sidebar;
