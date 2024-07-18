import React, { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../api';
import { Container, Typography, Card, CardContent, CardActions, Button, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const CommentFeed = ({ postId, comments }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(postId);
        setComments(response.data);
      } catch (error) {
        console.error('Fetch comments failed:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleDelete = async (id) => {
    try {
      await deleteComment(id);
      setError('');
      setSuccess('Comment deleted successfully!');
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      setError('Failed to delete comment. Please try again.');
      console.error('Delete comment failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent>
            <Typography>{comment.content}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(comment.id)}>
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

CommentFeed.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
};

export default CommentFeed;
