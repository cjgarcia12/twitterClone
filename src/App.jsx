import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CreatePost from './components/CreatePost';
import PostFeed from './components/PostFeed';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<PostFeed />} />
        <Route path="/" element={<PostFeed />} />
      </Routes>
    </Router>
  );
};

export default App;
