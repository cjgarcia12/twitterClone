import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../api'; // Ensure deletePost is imported
import { Stack, Card, CardActions, CardContent, Button, Typography, IconButton, TextField, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import CreateComment from './CreateComment';
import CommentFeed from './CommentFeed';

export default function CardPosts({ post, onDelete }) {
  const [showComments, setShowComments] = useState(false); // State to toggle comments visibility
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDelete = async () => {
    try {
      await deletePost(post.id); // Use deletePost from the api
      onDelete(post.id);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${post.id}`, { state: { post } }); // Navigate to EditPost with post data
  };

  return (
    <Card elevation={16}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.author}
        </Typography>
        <TextField
          label="Content"
          value={post.content}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Tags"
          value={post.tags}
          fullWidth
          margin="normal"
          disabled
        />
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
            <IconButton aria-label="edit" onClick={handleEdit}>
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
          <CreateComment postId={post.id} />
          <CommentFeed postId={post.id} />
        </>
      )}
    </Card>
  );
}

CardPosts.propTypes = {
  post: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
