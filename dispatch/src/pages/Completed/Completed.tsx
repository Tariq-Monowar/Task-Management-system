import "../Task/task.scss";
import { useSelector } from "react-redux";
import TaskHeader from "../../components/tasks/taskHeader/TaskHeader";

import { RootState } from "../../app/store";

import ProjectCard from "../../components/tasks/projetcCard/ProjectCard";

const Completed = () => {
  const { projects, sidebarEnable } = useSelector(
    (state: RootState) => state.project
  );

  const completedProjects = projects?.filter(
    (project) => project.status === "Completed"
  );
  console.log(completedProjects);
  return (
    <main
      className="taskContainer"
      style={{
        marginLeft: sidebarEnable ? "260px" : "88px",
        transition: "margin-left 0.3s ease",
      }}
    >
      {/* <TaskHeader /> */}

      <div className="project-list">
        {completedProjects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </main>
  );
};

export default Completed;
