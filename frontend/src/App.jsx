import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/home';
import Login from '@pages/login';
import ProjectDetail from '@pages/projectDetail';
import Signup from '@pages/signup';
import UserProfile from '@pages/userProfile';
import Dashboard from '@pages/dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projectdetail" element={<ProjectDetail />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;