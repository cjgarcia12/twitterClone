import React, { useState } from 'react';
import { updatePost, deletePost } from '../api';
import { TextField, Button, Card, CardContent, CardActions, Typography, Alert } from '@mui/material';
import LikeButton from './LikeButton';
import CreateComment from './CreateComment';
import CommentFeed from './CommentFeed';

const CardPosts = ({ post }) => {
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async () => {
    try {
      await updatePost(post.id, { content, tags });
      setError('');
      setSuccess('Post updated successfully!');
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Update post failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      setError('');
      setSuccess('Post deleted successfully!');
    } catch (error) {
      setError('Failed to delete post. Please try again.');
      console.error('Delete post failed:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Post</Typography>
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
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <LikeButton postId={post.id} initialLiked={post.liked} initialLikesCount={post.likesCount} />
      </CardActions>
      <CreateComment postId={post.id} />
      <CommentFeed postId={post.id} />
    </Card>
  );
};

export default CardPosts;
