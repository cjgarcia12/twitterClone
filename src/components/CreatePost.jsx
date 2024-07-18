import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, TextField, IconButton, Typography, Button, Grid } from '@mui/material';
import { EmojiEmotions, Image, Gif, MoreHoriz } from '@mui/icons-material';
import axios from 'axios';

const CreatePost = ({ setShowCreatePost, postToEdit, onPostSaved }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (postToEdit) {
      setContent(postToEdit.content);
      setTags(postToEdit.tags);
      setTitle(postToEdit.title || '');
    }
  }, [postToEdit]);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login first');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('title', title);
    if (image) {
      formData.append('image', image);
    }

    try {
      let response;
      if (postToEdit) {
        response = await axios.put(`/posts/${postToEdit.id}`, { content, tags, title }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post('/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }
      onPostSaved();
      setShowCreatePost(false);
      navigate('/'); // Navigate to the posts page after successful post creation
    } catch (error) {
      console.error('Error saving post', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto', padding: 2 }}>
      <CardHeader
        title={<Typography variant="h6">{postToEdit ? 'Edit Post' : 'Create Post'}</Typography>}
        action={<IconButton><MoreHoriz /></IconButton>}
      />
      <CardContent>
        <TextField
          fullWidth
          placeholder="Title"
          multiline
          rows={1}
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
          sx={{ marginBottom: 2, fontWeight: 'bold' }}
        />
        <TextField
          fullWidth
          placeholder="What's on your mind?"
          multiline
          rows={4}
          variant="outlined"
          value={content}
          onChange={handleContentChange}
        />
        <TextField
          fullWidth
          placeholder="Tags"
          variant="outlined"
          value={tags}
          onChange={handleTagsChange}
          sx={{ marginTop: 2 }}
        />
        <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
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
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {postToEdit ? 'Update Post' : 'Post'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CreatePost.propTypes = {
  setShowCreatePost: PropTypes.func.isRequired,
  postToEdit: PropTypes.object,
  onPostSaved: PropTypes.func.isRequired,
};

export default CreatePost;
