import { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  // State variables
  const [posts, setPosts] = useState([]); // To store the list of posts
  const [content, setContent] = useState(''); // To store the content of a new or edited post
  const [tags, setTags] = useState(''); // To store the tags of a new or edited post
  const [image, setImage] = useState(null); // To store the image file of a new post
  const [page, setPage] = useState(1); // To store the current page number for pagination
  const [totalPages, setTotalPages] = useState(1); // To store the total number of pages
  const [editMode, setEditMode] = useState(false); // To toggle between create and edit mode
  const [editId, setEditId] = useState(null); // To store the ID of the post being edited
  const [error, setError] = useState(null); // To store error messages
  const [success, setSuccess] = useState(null); // To store success messages

  // Fetch posts whenever the page changes
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // Function to fetch posts with pagination
  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      setPosts(response.data.data); // Set the posts state with the fetched data
      setTotalPages(response.data.totalPages); // Set the total pages state
    } catch (error) {
      setError(error.response.data.error || 'Error fetching posts'); // Set error message
    }
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the image state with the selected file
  };

  // Function to handle form submission for creating or updating a post
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a FormData object to send multipart/form-data
    const formData = new FormData();
    formData.append('content', content);
    formData.append('tags', tags);
    if (image) {
      formData.append('image', image);
    }

    try {
      let response;
      if (editMode) {
        // If in edit mode, send a PUT request to update the post
        response = await axios.put(`/api/posts/${editId}`, { content, tags });
        setEditMode(false); // Reset edit mode
        setEditId(null); // Reset the edit ID
      } else {
        // If not in edit mode, send a POST request to create a new post
        response = await axios.post('/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setSuccess('Post saved successfully!'); // Set success message
      setContent(''); // Reset content state
      setTags(''); // Reset tags state
      setImage(null); // Reset image state
      fetchPosts(page); // Refresh the posts list
    } catch (error) {
      setError(error.response.data.error || 'Error saving post'); // Set error message
    }
  };

  // Function to handle editing a post
  const handleEdit = (post) => {
    setEditMode(true); // Set edit mode
    setEditId(post.id); // Set the ID of the post being edited
    setContent(post.content); // Set the content state with the post's content
    setTags(post.tags); // Set the tags state with the post's tags
  };

  // Function to handle deleting a post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`); // Send a DELETE request to delete the post
      setSuccess('Post deleted successfully!'); // Set success message
      fetchPosts(page); // Refresh the posts list
    } catch (error) {
      setError(error.response.data.error || 'Error deleting post'); // Set error message
    }
  };

  // Function to handle changing the page for pagination
  const handlePageChange = (newPage) => {
    setPage(newPage); // Set the new page number
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Post' : 'Create Post'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">{editMode ? 'Update Post' : 'Create Post'}</button>
      </form>

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p><strong>{post.author}</strong> ({post.date})</p>
            <p>{post.content}</p>
            <p><em>{post.tags}</em></p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)} disabled={page === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Posts;
