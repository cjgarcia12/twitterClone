import { useState } from 'react';
import { updatePost, deletePost } from '../api'; // Ensure updatePost and deletePost are imported
import { Stack, Card, CardActions, CardContent, Button, Typography, IconButton, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import CreateComment from './CreateComment';
import CommentFeed from './CommentFeed';

export default function CardPosts({ post, onDelete }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [comments, setComments] = useState([]); // Add comments state
  const [showComments, setShowComments] = useState(false); // State to toggle comments visibility

  const handleUpdate = async () => {
    try {
      await updatePost(post.id, { content: post.content, tags: post.tags });
      setError('');
      setSuccess('Post updated successfully!');
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Update post failed:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post.id); // Use deletePost from the api
      onDelete(post.id);
      setError('');
      setSuccess('Post deleted successfully!');
    } catch (error) {
      setError('Failed to delete post. Please try again.');
      console.error('Delete post failed:', error);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]); // Update comments state with new comment
  };

  return (
    <Card elevation={16}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.author}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Typography variant="body1" component="div">
          {post.content}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          {post.tags}
        </Typography>
        {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
      </CardContent>
      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '95%' }}
        >
          <div>
            <LikeButton postId={post.id} initialLiked={post.liked} initialLikesCount={post.likesCount} />
            <Button size="small" onClick={() => setShowComments(!showComments)}>
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </Button>
          </div>
          <div>
            <IconButton aria-label="edit" onClick={handleUpdate}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Stack>
      </CardActions>
      {showComments && (
        <>
          <CreateComment postId={post.id} onCommentAdded={handleCommentAdded} /> {/* Pass handleCommentAdded */}
          <CommentFeed postId={post.id} comments={comments} /> {/* Pass comments as prop */}
        </>
      )}
    </Card>
  );
}

CardPosts.propTypes = {
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
