import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import HeaderBar from './components/HeaderBar';
import { Grid, createTheme, ThemeProvider } from '@mui/material';
import CardPosts from './components/CardPosts';
import FooterBar from './components/FooterBar';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#17153B',
      light: '#5a59ae',
      dark: '#2E236C',
      contrastText: '#e5e6ed',
    },
    secondary: {
      main: '#433D8B',
      light: '#373c70',
      dark: '#1c1a00',
      contrastText: '#e5e6ed',
    },
  },
});

export default function App() {
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts(page);
    }
  }, [page, isAuthenticated]);

  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`/posts?page=${page}`);
      setPosts(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching posts', error);
      setPosts([]);
    }
  };

  const handleEdit = (post) => {
    setPostToEdit(post);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  const handlePostSaved = () => {
    fetchPosts(page);
    setPostToEdit(null);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Clear userId from localStorage
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HeaderBar handleLogout={handleLogout} isAuthenticated={isAuthenticated} onSearchResults={setSearchResults} />
        <Grid container spacing={4} sx={{ paddingTop: '100px', marginBottom: '100px' }} justifyContent='center'>
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <>
                    {searchResults.length > 0 ? (
                      searchResults.map((post) => (
                        <Grid item xs={12} sm={8} key={post.id}>
                          <CardPosts post={post} onEdit={handleEdit} onDelete={handleDelete} />
                        </Grid>
                      ))
                    ) : (
                      posts.map((post) => (
                        <Grid item xs={12} sm={8} key={post.id}>
                          <CardPosts post={post} onEdit={handleEdit} onDelete={handleDelete} />
                        </Grid>
                      ))
                    )}
                    <Grid item xs={12} sm={8}>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button key={i} onClick={() => handlePageChange(i + 1)} disabled={page === i + 1}>
                          {i + 1}
                        </button>
                      ))}
                    </Grid>
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <Grid item xs={12}>
                    <CreatePost setShowCreatePost={() => {}} postToEdit={null} onPostSaved={handlePostSaved} />
                  </Grid>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/edit/:id"
              element={
                isAuthenticated ? (
                  postToEdit ? (
                    <Grid item xs={12}>
                      <EditPost post={postToEdit} onPostSaved={handlePostSaved} />
                    </Grid>
                  ) : (
                    <Navigate to="/" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Grid>
        <FooterBar className="footer" />
      </Router>
    </ThemeProvider>
  );
}
