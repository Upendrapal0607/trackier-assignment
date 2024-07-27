import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Project } from "../Pages/Project";
import { Task } from "../Pages/Task";
import { Login } from "../Component/Login";
import { Register } from "../Component/Register";
import { ProjectContextValue } from "../RootContext/ContectProvider";

export const MainRoute = () => {
  const { isAuth } = ProjectContextValue();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project" element={isAuth ? <Project /> : <Login />} />
      <Route path="/task" element={isAuth ? <Task /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
