import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import Layout from "./components/Layout";
import Register from "./page/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Tenants from "./page/Tenants";
import Projects from "./page/projects";
import Tasks from "./page/Tasks";
import Notifications from "./page/Notifications";
import Settings from "./page/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="tenants"
          element={
            <PrivateRoute>
              <Tenants />
            </PrivateRoute>
          }
        />

        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:projectId" element={<Tasks />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
