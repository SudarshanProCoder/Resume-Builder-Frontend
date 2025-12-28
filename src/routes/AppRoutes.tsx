import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from '@/components/Auth/Home';

import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import VerificationPending from '../pages/Auth/VerificationPending';
import VerifyEmail from '../pages/Auth/VerifyEmail';
import NotFound from '@/pages/NotFound';
import { Loader } from '../components/Loader/Loader';
import Dashboard from '@/pages/Dashboard/Dashboard';
import ResumeBuilder from '@/pages/Resume/ResumeBuilder';
import AllResumes from '@/pages/Resume/AllResumes';

export const AppRoutes: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black-600">
          <Loader size="lg" variant={'default'} text={'ResumeAI'} />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification-pending" element={<VerificationPending />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-resume"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-resume/:id"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/get-resumes"
          element={
            <ProtectedRoute>
              <AllResumes />
            </ProtectedRoute>
          }
        />

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </React.Suspense>
  );
};
