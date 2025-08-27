import React from 'react'
import { Route, Routes } from 'react-router-dom'

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
      </Routes>
    </>
  );
}

export default MainRoutes