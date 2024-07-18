import React, { useState } from 'react';
import { createPost } from '../api';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ content, tags });
      setError('');
      setSuccess('Post created successfully!');
      setContent('');
      setTags('');
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error('Create post failed:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create Post
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Post
        </Button>
      </form>
    </Container>
  );
};

export default CreatePost;
