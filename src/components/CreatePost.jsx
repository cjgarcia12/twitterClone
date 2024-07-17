import { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, IconButton, Typography, Button, Grid } from '@mui/material';
import { EmojiEmotions, Image, Gif, MoreHoriz } from '@mui/icons-material';

const CreatePost = () => {
  const [comment, setComment] = useState('');
  const [postedComments, setPostedComments] = useState([]);

  const handleCommentChange = (event) => {
    if (event.target.value.length <= 500) {
      setComment(event.target.value);
    }
  };

  const handlePostComment = () => {
    if (comment.trim()) {
      setPostedComments([...postedComments, comment]);
      setComment('');
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
      <div>
        {postedComments.map((postedComment, index) => (
          <Card key={index} sx={{ maxWidth: 500, margin: '20px auto', padding: 2 }}>
            <CardContent>
              <Typography>{postedComment}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
