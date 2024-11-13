import { FC, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
// import NavBar from '../components/layout/navbar/Navbar';
import SignupPage from "../pages/SignupPage/SignupPage";
import LoginPage from "../pages/LoginPage/LoginPage";

import { AppDispatch, RootState } from "../app/store";
// import { ProtectedRoute, PublicRoute } from './RouteProtection';
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../features/auth/authSlice";
import NavBar from "../components/layout/navbar/Navbar";

import AppLoading from "../components/appLoading/AppLoading";

import Tasks from "../pages/Task/Tasks";
import Completed from "../pages/Completed/Completed";
import InProcess from "../pages/InProcess/InProcess";
import Team from "../pages/Team/Team";
import Trash from "../pages/Trash/Trash";
import { getAllProjects, getAllUser } from "../features/project/projectSlice";
import TaskDetails from "../pages/Taskdetails/TaskDetails";
 

const ProtectedRoute: FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authorization
  );

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRouter: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, appLoading,  } = useSelector(
    (state: RootState) => state.authorization
  );
  const { projects, users } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    dispatch(setIsAuthenticated());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (projects?.length === 0) dispatch(getAllProjects());
      if (users?.length === 0) dispatch(getAllUser());
    }
  }, [isAuthenticated]);


  return (
    <>
      {/* {isAuthenticated && !appLoading && <Sidebar />} */}

      <BrowserRouter>
        {isAuthenticated && !appLoading && <NavBar />}
        {appLoading ? (
          <Routes>
            <Route path="/" element={<AppLoading />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
            />
            {/* otp verification */}

            <Route
              path="/"
              element={<ProtectedRoute element={<HomePage />} />}
            />

            <Route
              path="/tasks"
              element={<ProtectedRoute element={<Tasks />} />}
            />
            <Route path="/completed" element={<Completed />} />
            <Route path="/in-process" element={<InProcess />} />
            <Route path="/team" element={<Team />} />
            <Route path="/trash" element={<Trash />} />
            <Route path="/task/project/:id" element={<TaskDetails />} />

          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
