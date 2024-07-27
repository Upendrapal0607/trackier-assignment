// import React, { useEffect, useState } from "react";
// import { ProjectContextValue } from "../RootContext/ContectProvider";
// import { ProjectCard } from "../Component/ProjectCard";
// import { Button, useToast } from "@chakra-ui/react";
// import { AddNewProject } from "../Controller/Controller";

// export const Project = () => {
//   const { projects, GetAllProjectList } = ProjectContextValue();
//   const [createProjectShow, setCreateProjectShow] = useState(false);
//   const [projectName, setProjectName] = useState("");
//   const [ProjectDescription, setProjectDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();
//   useEffect(() => {
//     setLoading(true);
//     GetAllProjectList();
//     setLoading(false);
//   }, []);

//   const CreateNewProjectList = async () => {
//     if (projectName.trim() === "" || ProjectDescription.trim() === "") {
//       toast({
//         title: "Error message",
//         description: "Please fill the name and description",
//         status: "warning",
//         duration: 9000,
//         isClosable: true,
//       });
//       return;
//     }
//     const NewProject = {
//       name: projectName,
//       description: ProjectDescription,
//       tasks: [],
//     };
//     try {
//       const data = await AddNewProject(NewProject);
//       if (data.data.message == "new project created succesful") {
//         setCreateProjectShow(false);
//         setProjectName("");
//         toast({
//           title: "project update",
//           description: data.data.message,
//           status: "success",
//           duration: 9000,
//           isClosable: true,
//         });
//         GetAllProjectList();
//       } else {
//         toast({
//           title: " Error message",
//           description: data.data.message,
//           status: "error",
//           duration: 9000,
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       toast({
//         title: " Error message",
//         description: error?.message,
//         status: "error",
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 min-h-[89vh] ">
//       <div className="">
//         <h1 className="text-black text-2xl font-bold px-4">Projects List</h1>
//         <div className=" flex md:flex-row gap-4 my-4 flex-col justify-between">
//           <button
//             onClick={() => setCreateProjectShow(!createProjectShow)}
//             className="bg-green-500 text-white rounded-md p-2 w-40"
//           >
//             Create New Project
//           </button>
//           {createProjectShow && (
//             <div className="flex gap-2 w-[100%] md:w-[60%] xl-w-[70%]">
//               <input
//                 onChange={(e) => setProjectName(e.target.value)}
//                 value={projectName}
//                 type="text"
//                 placeholder="project name"
//                 className="border-2 border-gray-400 rounded-md p-2 w-full"
//               />
//               <input
//                 onChange={(e) => setProjectDescription(e.target.value)}
//                 type="text"
//                 placeholder="project description"
//                 className="border-2 border-gray-400 rounded-md p-2 w-full"
//               />
//               <button
//                 onClick={CreateNewProjectList}
//                 value={ProjectDescription}
//                 className="bg-green-500 p-2 rounded-md"
//               >
//                 Create
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       {loading?(
//         <div className="flex justify-center items-center h-[50vh]">
//           <h1 className="text-green-500 font-bold text-2xl">
//             Loading data....
//           </h1>
//         </div>
//       ):projects?.length <= 0 ? (
//         <div className="flex justify-center items-center h-[50vh]">
//           <h1 className="text-green-500 font-bold text-2xl">
//             Project not found create new Project
//           </h1>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
//           {projects?.map((project) => (
//             <ProjectCard key={project._id} project={project} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


// import React, { useEffect, useState } from "react";
// import { ProjectContextValue } from "../RootContext/ContextProvider";
// import { ProjectCard } from "../Component/ProjectCard";
// import { Button, useToast } from "@chakra-ui/react";
// import { AddNewProject } from "../Controller/Controller";

import React, { useEffect, useState } from "react";
import { ProjectContextValue } from "../RootContext/ContectProvider";
import { ProjectCard } from "../Component/ProjectCard";
import { Button, useToast } from "@chakra-ui/react";
import { AddNewProject } from "../Controller/Controller";


export const Project = () => {
  const { projects, GetAllProjectList } = ProjectContextValue();
  const [createProjectShow, setCreateProjectShow] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [ProjectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      await GetAllProjectList();
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const CreateNewProjectList = async () => {
    if (projectName.trim() === "" || ProjectDescription.trim() === "") {
      toast({
        title: "Error message",
        description: "Please fill the name and description",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const NewProject = {
      name: projectName,
      description: ProjectDescription,
      tasks: [],
    };
    try {
      const data = await AddNewProject(NewProject);
      if (data.data.message === "new project created succesful") {
        setCreateProjectShow(false);
        setProjectName("");
        setProjectDescription("");
        toast({
          title: "Project update",
          description: data.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        GetAllProjectList();
      } else {
        toast({
          title: "Error message",
          description: data.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error message",
        description: error?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-[89vh]">
      <div>
        <h1 className="text-black text-2xl font-bold px-4">Projects List</h1>
        <div className="flex md:flex-row gap-4 my-4 flex-col justify-between">
          <button
            onClick={() => setCreateProjectShow(!createProjectShow)}
            className="bg-green-500 text-white rounded-md p-2 w-40"
          >
            Create New Project
          </button>
          {createProjectShow && (
            <div className="flex gap-2 w-[100%] md:w-[60%] xl-w-[70%]">
              <input
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                type="text"
                placeholder="Project name"
                className="border-2 border-gray-400 rounded-md p-2 w-full"
              />
              <input
                onChange={(e) => setProjectDescription(e.target.value)}
                value={ProjectDescription}
                type="text"
                placeholder="Project description"
                className="border-2 border-gray-400 rounded-md p-2 w-full"
              />
              <button
                onClick={CreateNewProjectList}
                className="bg-green-500 p-2 rounded-md"
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-green-500 font-bold text-2xl">Loading data...</h1>
        </div>
      ) : projects?.length <= 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-green-500 font-bold text-2xl">Project not found, create a new project</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};
