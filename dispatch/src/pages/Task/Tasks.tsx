import './task.scss'
import { useSelector } from "react-redux";
import TaskHeader from "../../components/tasks/taskHeader/TaskHeader";
 
import { RootState } from "../../app/store";
import "./task.scss";
import ProjectCard from "../../components/tasks/projetcCard/ProjectCard";
import { useEffect } from 'react';

const Tasks = () => {
  const { projects, sidebarEnable } = useSelector((state: RootState) => state.project);
  
  useEffect(() => { 

  }, [projects])

  const projectData = projects?.filter(
    (project) => project?.status !== "archived"
  );
  return (
    <main className="taskContainer" style={{marginLeft: sidebarEnable?'260px': '88px', transition: "margin-left 0.3s ease",}}>
      <TaskHeader />

      <div className="project-list">
        {projectData?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </main>
  );
};

export default Tasks;
