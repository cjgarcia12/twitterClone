import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePost } from '../api';
import { Card, CardContent, Button, TextField, Typography, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const EditPost = ({ post, onPostSaved }) => {
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      await updatePost(post.id, { content, tags });
      setError('');
      setSuccess('Post updated successfully!');
      setTimeout(() => {
        onPostSaved();
        navigate('/'); // Navigate back to the main feed after successful update
      }, 2000); // Navigate back to the main feed after a delay
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Update post failed:', error);
    }
  };

  return (
    <Card elevation={16}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.author}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
          margin="normal"
        />
        {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
      </CardContent>
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Card>
  );
};

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  onPostSaved: PropTypes.func.isRequired,
};

export default EditPost;
