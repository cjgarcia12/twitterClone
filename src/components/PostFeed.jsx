import React, { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import CardPosts from './CardPosts';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        const fetchedPosts = response.data;
        if (Array.isArray(fetchedPosts)) {
          setPosts(fetchedPosts);
        } else {
          setPosts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Fetch posts failed:', error);
        setError('Failed to fetch posts. Please try again.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Post Feed
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <CardPosts key={post.id} post={post} />
        ))
      ) : (
        <Alert severity="info">No posts available.</Alert>
      )}
    </Container>
  );
};

export default PostFeed;
