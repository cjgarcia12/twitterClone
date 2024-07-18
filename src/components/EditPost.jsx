import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../api'; // Ensure getPostById and updatePost are imported
import { Card, CardContent, Button, TextField, Typography, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const EditPost = ({ onPostSaved }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ content: '', tags: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(`Fetching post with ID: ${id}`); // Log the post ID being fetched
        const response = await getPostById(id);
        console.log('Fetched post:', response.data); // Log the fetched post data
        setPost(response.data);
        setError(''); // Clear error if data is fetched successfully
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post. Please try again.');
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, post);
      setError('');
      setSuccess('Post updated successfully!');
      setTimeout(() => {
        onPostSaved();
        navigate('/'); // Navigate back to the main feed after successful update
      }, 2000);
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Update post failed:', error);
    }
  };

  return (
    <Card elevation={16}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.User?.username || 'Updated Post'}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleUpdate}>
          <TextField
            label="Content"
            name="content"
            value={post.content}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tags"
            name="tags"
            value={post.tags}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

EditPost.propTypes = {
  onPostSaved: PropTypes.func.isRequired,
};

export default EditPost;
