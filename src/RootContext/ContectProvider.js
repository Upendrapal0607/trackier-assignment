import React, { useState } from "react";
import { GetAllProject, GetAllTask } from "../Controller/Controller";

export const ProjectContext = React.createContext();
export const ContectProvider = ({ children }) => {
  const [userDetaild, setUserDetails] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [tasks, setTask] = useState([]);
  const [token,setToken] = useState("");

  const [projects, setProjects] = React.useState([]);

  const HandleLogOut = () => {
    setIsAuth(false);
    setUserDetails({});
    setToken("");
    localStorage.removeItem("projecttoken");
  };

  const GetAllProjectList = async () => {
    const result = await GetAllProject();
    setProjects(result.data.projectList);
  };
  const GetAllTaskList = async () => {
    const result = await GetAllTask();
    setTask(result.data.taskList);
  };

  return (
    <ProjectContext.Provider
      value={{
        token,
        setToken,
        isAuth,
        setIsAuth,
        projects,
        tasks,
        GetAllProjectList,
        GetAllTaskList,
        userDetaild,
        setUserDetails,
        HandleLogOut,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const ProjectContextValue = () => React.useContext(ProjectContext);
