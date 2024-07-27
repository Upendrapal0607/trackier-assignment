import React, { useState } from "react";
import {
  Text,
  Input,
  Button,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { TaskForm } from "./TaskForm";
import axios from "axios";
import { AddNewTask, DeleteProject } from "../Controller/Controller";
import { MdDelete } from "react-icons/md";

import { ProjectContextValue } from "../RootContext/ContectProvider";

export const ProjectCard = ({ project }) => {
  const { name, description, Task } = project;
  const { GetAllProjectList } = ProjectContextValue();
  const toast = useToast();
  const [taskList, setTaskList] = useState(Task);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const HandleDelete = async (id) => {
    try {
      const response = await DeleteProject(id);
      if (response.data.message === "project has been deleted") {
        toast({
          title: "project alert",
          description: "Project deleted Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        GetAllProjectList();
      } else {
        toast({
          title: "project alert",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleAddTask = async (newTask, id) => {
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    const response = await AddNewTask({ Task: updatedTaskList }, id);
    if (response.data.message === "project has been updated") {
      toast({
        title: "Task alert",
        description: "You add new Task",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      GetAllProjectList();
    } else {
      toast({
        title: "Task alert",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div
      key={project._id}
      className="p-4 bg-white shadow rounded-lg mb-4 h-auto"
    >
      <Text className="text-2xl font-bold text-gray-800 mb-2">{name}</Text>
      <Text className="text-lg text-pretty text-left text-gray-700 mb-4">
        {description}
      </Text>
      <Flex className="justify-around items-center mx-4">
        <Text className=" text-gray-600 mb-4 font-bold text-xl">
          Total Tasks ({Task?.length})
        </Text>
        <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          Add Task
        </Button>

        <MdDelete
          onClick={() => setIsDeleteOpen(true)}
          className="ml-2 font-bold text-2xl text-red-500"
        />
      </Flex>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm
              key={project._id}
              onAddTask={handleAddTask}
              projectName={name}
              ProjectId={project?._id}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this project</ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => HandleDelete(project._id)}>
              Yes
            </Button>
            <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
