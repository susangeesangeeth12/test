"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Heading,
  VStack,
  useToast,
  Link,
  IconButton,
  Flex,
  useColorMode,
} from "@chakra-ui/react";
import AddTask from "./addTask";
import TaskList from "./tasks";
import { task } from "types/todo";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Todo = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState<task[]>([]);

  const initialRender = useRef(true);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") as string) || [];
    setTasks(tasks);
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  };

  const deleteTaskAll = () => {
    setTasks([]);
  };

  const checkTask = (id: string) => {
    const newTasksCheck: task[] = tasks.map((task) => {
      if (task.id === id) {
        task.check = !task.check;
      }
      return task;
    });
    setTasks(newTasksCheck);
  };

  const updateTask = (id: string, body: string, onClose: () => void) => {
    const info = body.trim();
    if (!info) {
      toast({
        title: "Enter your task",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTasksUpdate: task[] = tasks.map((task) => {
      if (task.id === id) {
        task.body = body;
        task.check = false;
      }
      return task;
    });
    setTasks(newTasksUpdate);
    onClose();
  };

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <VStack p={4} minH="100vh" pb={20}>
      <Heading
        p=""
        fontWeight="bold"
        size="xl"
        bgColor="#003366"
        bgClip="text"
        alignContent="center"
      >
        Susangee Sangeeth Vidyalaya
      </Heading>
      <AddTask addTask={addTask} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        deleteTaskAll={deleteTaskAll}
        checkTask={checkTask}
      />
      <Flex position="absolute" bottom="5">
        <p>Web App @ Dinith Dissanayaka</p>
      </Flex>
    </VStack>
  );
};
export default Todo;
