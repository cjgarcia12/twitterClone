import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, TextField, IconButton, Typography, Button, Grid } from '@mui/material';
import { EmojiEmotions, Image, Gif, MoreHoriz } from '@mui/icons-material';

const CreatePost = ({ setShowCreatePost }) => { 
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState(''); 

  const handleCommentChange = (event) => {
    if (event.target.value.length <= 500) {
      setComment(event.target.value);
    }
  };

  const handleTitleChange = (event) => { 
    setTitle(event.target.value);
  };

  const handlePostComment = () => {
    if (title.trim() && comment.trim()) {
      // Simulate saving to database
      // Hide the CreatePost component after posting
      setShowCreatePost(false);
    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: 500, margin: '20px auto', padding: 2 }}>
        <CardHeader
          title={<Typography variant="h6">Create a Post</Typography>}
          action={<IconButton><MoreHoriz /></IconButton>}
        />
        <CardContent>
        <TextField
            fullWidth
            placeholder="Title"
            multiline
            rows={1}
            variant="outlined"
            value={comment}
            onChange={handleCommentChange}
            sx={{marginBottom: 2}}
          />
          <TextField
            fullWidth
            placeholder="Title"
            multiline
            rows={1}
            variant="outlined"
            value={title}
            onChange={handleTitleChange} 
            sx={{ marginBottom: 2, fontWeight: 'bold' }} //When entering the title, it becomes Bold. 
          />
          <TextField
            fullWidth
            placeholder="What's on your mind?"
            multiline
            rows={4}
            variant="outlined"
            value={comment}
            onChange={handleCommentChange}
          />
          <Grid container spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
            <Grid item>
              <IconButton color="primary">
                <Image />
              </IconButton>
              <IconButton color="primary">
                <EmojiEmotions />
              </IconButton>
              <IconButton color="primary">
                <Gif />
              </IconButton>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handlePostComment}>Post</Button>
            </Grid>
          </Grid>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {comment.length}/500
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

// Add PropTypes for prop validation
CreatePost.propTypes = {
  setShowCreatePost: PropTypes.func.isRequired,
};

export default CreatePost;
