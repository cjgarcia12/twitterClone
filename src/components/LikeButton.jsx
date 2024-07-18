import { useState, useEffect } from 'react';
import { likePost, unlikePost } from '../api';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const LikeButton = ({ postId, initialLiked, initialLikesCount }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  useEffect(() => {
    setLiked(initialLiked);
    setLikesCount(initialLikesCount || 0); // Ensure initial count is zero if undefined
  }, [initialLiked, initialLikesCount]);

  const handleLike = async () => {
    try {
      if (liked) {
        const response = await unlikePost(postId);
        setLiked(false);
        setLikesCount(response.data.likesCount); // Update with the new likes count from the response
      } else {
        const response = await likePost(postId);
        setLiked(true);
        setLikesCount(response.data.likesCount); // Update with the new likes count from the response
      }
    } catch (error) {
      console.error('Failed to update like status:', error);
    }
  };

  return (
    <IconButton onClick={handleLike} color="primary">
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      <span>{likesCount !== undefined && !isNaN(likesCount) ? likesCount : '0'}</span>
    </IconButton>
  );
};

export default LikeButton;
