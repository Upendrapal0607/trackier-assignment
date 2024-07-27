import {
  Box,
  Text,
  Tag,
  Stack,
  Button,
  Progress,
  Flex,
  Input,
  useToast,
} from "@chakra-ui/react";
import { IoChatbubbleOutline } from "react-icons/io5";

import { BsSend } from "react-icons/bs";

import { useState } from "react";
export const TaskCard = ({ task, HandleUpdateComent, index }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const [maxTagsToShow, setMaxTagsToShow] = useState(5);
  const toast = useToast();
  const [comment, setComment] = useState("");
  const handleShowAllTags = (action) => {
    if (action == "Show More") {
      setMaxTagsToShow((prev) => prev + 5);
    } else {
      setMaxTagsToShow(5);
    }
  };

  const HandleAddTage = (action) => {
    if (!comment) {
      toast({
        title: "tag alert",
        description: "Please add comment",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else {
      HandleUpdateComent(index, comment, task?.status, task?.ProjectId);
      setComment("");
    }
  };

  const colorapply = {
    Backlog: 0,
    "In Discussion": 100,
    "In Progress": 100,
    Done: 100,
  };
  const colorSchemApply = {
    Backlog: "gray",
    "In Discussion": "orange",
    "In Progress": "blue",
    Done: "green",
  };

  return (
    <Box
      key={task.status + index}
      className={`${
        colorapply[task.status]
      } p-4 text-black shadow rounded mb-4 text-pretty text-left`}
    >
      {task.status == "Backlog" ? (
        <div className="flex gap-4 w-full  rounded-full">
          <div className="w-[30%] rounded-full h-3"></div>
        </div>
      ) : task.status == "In Discussion" ? (
        <div className="flex gap-4 w-full">
          <div className="w-[30%] rounded-full h-3 bg-orange-300"></div>
        </div>
      ) : task.status == "In Progress" ? (
        <div className="flex gap-4 w-full ">
          <div className={`w-[30%] rounded-full h-3 bg-blue-600`}></div>
          <div className="w-[30%] rounded-full h-3 bg-blue-600"></div>
        </div>
      ) : (
        <div className="flex gap-4 w-full ">
          <div className="w-[30%] rounded-full h-3 bg-green-500"></div>
          <div className="w-[30%] rounded-full h-3 bg-green-500"></div>
          <div className="w-[30%] rounded-full h-3 bg-green-500"></div>
        </div>
      )}

      <Text className="text-2xl mt-4 font-bold text-gray-800 mb-2 text-center">
        {task.name}
      </Text>
      <Text className="text-lg text-gray-700 mb-4">{task.description}</Text>
      <Text className="text-sm text-gray-600 mb-2">
        <span className="font-semibold font-xl">Due Date: </span>
        {task.dueDate}
      </Text>
      <Text className="text-sm text-gray-600 mb-2">
        <span className="font-semibold font-xl">Project: </span>
        {task.projectName}
      </Text>
      <Text className="text-sm text-gray-600">
        <span className="font-semibold font-xl">Assigned to: </span>
        {task.assignedUser}
      </Text>

      <Flex justify="space-around" className="w-full">
        <Flex className="items-center gap-1 w-full p-4 md:w-3/4 lg:w-full">
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="tag on task"
            className="h-6 w-full "
          />
          <BsSend
            onClick={HandleAddTage}
            className="font-bold text-4xl mx-2 cursor-pointer hover:text-green-500"
          />
          <IoChatbubbleOutline className="font-bold text-4xl cursor-pointer hover:text-green-500" />
          <span className="hover:text-green-500 font-bold">
            {task?.tagList.length}
          </span>
        </Flex>
      </Flex>
    </Box>
  );
};
