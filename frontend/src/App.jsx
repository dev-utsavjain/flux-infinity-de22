import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/home';
import Dashboard from '@pages/dashboard';
import Login from '@pages/login';
import Signup from '@pages/signup';
import ProjectDetail from '@pages/projectDetail';
import UserProfile from '@pages/userProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/projectdetail" element={<ProjectDetail />} />
      <Route path="/userprofile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;