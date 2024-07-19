import { useState } from 'react';
import { createComment } from '../api';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const CreateComment = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment(postId, { content });
      setError('');
      setSuccess('Comment created successfully!');
      setContent('');
      onCommentAdded(response.data); // Call the callback function with the new comment
    } catch (error) {
      setError('Failed to create comment. Please try again.');
      console.error('Create comment failed:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Add Comment
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={2}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Comment
        </Button>
      </form>
    </Container>
  );
};

CreateComment.propTypes = {
  postId: PropTypes.number.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};

export default CreateComment;
