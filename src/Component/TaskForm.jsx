import React, { useState } from "react";
import {
  Text,
  Input,
  Button,
  Textarea,
  Select,
  useToast,
} from "@chakra-ui/react";
import { ProjectContextValue } from "../RootContext/ContectProvider";

export const TaskForm = ({ onAddTask, projectName, ProjectId }) => {
  const { userDetaild } = ProjectContextValue();
  const [taskName, setTaskName] = useState("");
  const [tag, setTag] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const toast = useToast();
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);

  const handleAddTask = () => {
    let tagList = [];
    if (tag) tagList.push(tag);
    const newTask = {
      name: taskName,
      description: taskDescription,
      dueDate,
      projectName,
      assignedUser: userDetaild?.name,
      tagList,
      status,
      ProjectId,
    };
    if (
      taskName.trim() == "" ||
      taskDescription.trim() == "" ||
      dueDate == "" ||
      status == ""
    ) {
      toast({
        title: "Form alert",
        description: "Please fill all the required fields",
        position: "top",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    onAddTask(newTask, ProjectId);
    setTaskName("");
    setTaskDescription("");
    setDueDate("");
  };

  return (
    <div key={ProjectId} className="p-4 bg-white shadow rounded-lg">
      <Input
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="mb-2"
      />
      <Textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="mb-2"
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="mb-2"
        min={today}
      />
      <Input
        type="text"
        value={tag}
        placeholder="Tag on task"
        onChange={(e) => setTag(e.target.value)}
        className="mb-2"
      />
      <Select
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Select Task status"
      >
        <option value="Backlog">Backlog</option>
        <option value="In Discussion">In Discussion</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </Select>
      <Button onClick={handleAddTask} mt={3} colorScheme="blue">
        Add Task
      </Button>
    </div>
  );
};
