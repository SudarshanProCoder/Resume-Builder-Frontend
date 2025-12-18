// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "@/pages/NotFound";
import { Loader } from "../components/Loader/Loader";
import Dashboard from "@/pages/Dashboard/Dashboard";
// import ForgotPassword from '../pages/Auth/ForgotPassword';

// Resume Pages (create these later)
// const ResumeTemplates = React.lazy(() => import('../pages/Resume/ResumeTemplates'));
// const CreateResume = React.lazy(() => import('../pages/Resume/CreateResume'));
// const MyResumes = React.lazy(() => import('../pages/Resume/MyResumes'));

// Other Pages
const Landing = React.lazy(() => import("../pages/Landing/Landing"));
// const NotFound = React.lazy(() => import('../pages/NotFound'));

export const AppRoutes: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black`-600">
          <Loader size="lg" variant={"default"} text={"ResumeAI"} />
        </div>
      }
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

        {/* Protected Routes */}
        {/* <Route
          path="/resume/templates"
          element={
            <ProtectedRoute>
              <ResumeTemplates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume/create"
          element={
            <ProtectedRoute>
              <CreateResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume/my-resumes"
          element={
            <ProtectedRoute>
              <MyResumes />
            </ProtectedRoute>
          }
        /> */}

        {/* 404 Page */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </React.Suspense>
  );
};
