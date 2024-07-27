// import React, { useEffect, useState } from "react";
// import { TaskCard } from "../Component/TaskCard";
// import {
//   Box,
//   Text,
//   Tag,
//   Stack,
//   Flex,
//   useToast,
//   useStatStyles,
// } from "@chakra-ui/react";
// import { IoMdAdd } from "react-icons/io";
// import { ProjectContextValue } from "../RootContext/ContectProvider";
// import { AddNewTask } from "../Controller/Controller";

// export const Task = () => {
//   const [loading, setLoading] = useState(false);
//   const { GetAllTaskList, tasks, GetAllProjectList } = ProjectContextValue();
//   const toast = useToast();
//   const groupedTasks = tasks?.reduce((acc, task) => {
//     if (!acc[task.status]) {
//       acc[task.status] = [];
//     }
//     acc[task.status].push(task);
//     return acc;
//   }, {});
//   const HandleUpdateComent = async (index, comment, action, id) => {
//     let TempTage = [];
//     if( groupedTasks[action]){
//       TempTage = groupedTasks[action]?.map((task, i) =>
//         i === index ? { ...task, tagList: [...task.tagList, comment] } : task
//       );
//     }
    
//     let FinalTag = [...TempTage];
//     for (let key in groupedTasks) {
//       if (key !== action) {
//         if(groupedTasks[key]){
//           FinalTag = [...FinalTag, ...groupedTasks[key]];
//         }
//       }
//     }

//     const response = await AddNewTask({ Task: FinalTag }, id);
//     if (response.data.message === "project has been updated") {
//       toast({
//         title: "Tag Added",
//         description: "YOu add new comment",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });

//       GetAllProjectList();
//       GetAllTaskList();
//     } else {
//       toast({
//         title: "Comment alert",
//         description: response.data.message,
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     GetAllTaskList();
//     setLoading(false);
//   }, []);

//   const colorapply = {
//     Backlog: "text-gray-500",
//     "In Discussion": "text-orange-500",
//     "In Progress": "text-blue-500",
//     Done: "text-green-500",
//   };

//   return (
//     <div className="container mx-auto p-4 min-h-[89vh]">
//       {loading ? (
//         <div className="flex justify-center items-center h-[50vh]">
//           <h1 className="text-green-500 font-bold text-2xl">Loading...</h1>
//         </div>
//       ) : tasks?.length <= 0 ? (
//         <div className="flex justify-center items-center h-[50vh]">
//           <h1 className="text-green-500 font-bold text-2xl">Task not found</h1>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
//           {["Backlog", "In Discussion", "In Progress", "Done"].map((status) => (
//             <div key={status}>
//               <div className="flex justify-between items-center">
//                 <Text
//                   fontSize="2xl"
//                   fontWeight="bold"
//                   ml={4}
//                   className={`mb-4 ${colorapply[status]}`}
//                 >
//                   {status}
//                 </Text>
//               </div>
//               {groupedTasks[status].length>=0&&groupedTasks[status]?.map((task, index) => (
//                 <TaskCard
//                   key={index}
//                   task={task}
//                   index={index}
//                   HandleUpdateComent={HandleUpdateComent}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { TaskCard } from "../Component/TaskCard";
import {
  Box,
  Text,
  Tag,
  Stack,
  Flex,
  useToast,
  useStatStyles,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { ProjectContextValue } from "../RootContext/ContectProvider";
import { AddNewTask } from "../Controller/Controller";

export const Task = () => {
  const [loading, setLoading] = useState(false);
  const { GetAllTaskList, tasks, GetAllProjectList } = ProjectContextValue();
  const toast = useToast();
  
  const groupedTasks = tasks?.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {}) || {};

  const HandleUpdateComent = async (index, comment, action, id) => {
    let TempTage = [];
    if (groupedTasks[action]) {
      TempTage = groupedTasks[action]?.map((task, i) =>
        i === index ? { ...task, tagList: [...task.tagList, comment] } : task
      );
    }
    
    let FinalTag = [...TempTage];
    for (let key in groupedTasks) {
      if (key !== action) {
        if (groupedTasks[key]) {
          FinalTag = [...FinalTag, ...groupedTasks[key]];
        }
      }
    }

    const response = await AddNewTask({ Task: FinalTag }, id);
    if (response.data.message === "project has been updated") {
      toast({
        title: "Tag Added",
        description: "You added a new comment",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      GetAllProjectList();
      GetAllTaskList();
    } else {
      toast({
        title: "Comment Alert",
        description: response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    GetAllTaskList().finally(() => setLoading(false));
  }, []);

  const colorapply = {
    Backlog: "text-gray-500",
    "In Discussion": "text-orange-500",
    "In Progress": "text-blue-500",
    Done: "text-green-500",
  };

  return (
    <div className="container mx-auto p-4 min-h-[89vh]">
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-green-500 font-bold text-2xl">Loading Data...</h1>
        </div>
      ) : tasks?.length <= 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-green-500 font-bold text-2xl">Task not found</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {["Backlog", "In Discussion", "In Progress", "Done"].map((status) => (
            <div key={status}>
              <div className="flex justify-between items-center">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  ml={4}
                  className={`mb-4 ${colorapply[status]}`}
                >
                  {status}
                </Text>
              </div>
              {groupedTasks[status]?.length > 0 && groupedTasks[status].map((task, index) => (
                <TaskCard
                  key={index}
                  task={task}
                  index={index}
                  HandleUpdateComent={HandleUpdateComent}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
