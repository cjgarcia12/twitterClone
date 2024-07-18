import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);
export const createPost = (postData) => api.post('/posts', postData);
export const getPosts = (params) => api.get('/posts', { params });
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const createComment = (postId, commentData) => api.post(`/comments/${postId}`, commentData);
export const getComments = (postId) => api.get(`/comments/${postId}`);
export const deleteComment = (id) => api.delete(`/comments/${id}`);
export const likePost = (postId) => api.post(`/likes/${postId}`);
export const unlikePost = (postId) => api.delete(`/likes/${postId}`);