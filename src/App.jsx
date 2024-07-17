import { useState } from 'react'; // Ensure this import is correct
import './App.css';
import HeaderBar from './components/HeaderBar';
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CardPost from "./components/CardPosts";
import FooterBar from "./components/FooterBar";
import CreatePost from './components/CreatePost';

const theme = createTheme({
  palette: {
    primary: {
      main: '#17153B',
      light: '#5a59ae',
      dark: '#2E236C',
      contrastText: '#e5e6ed'
    },
    secondary: {
      main: '#433D8B',
      light: '#373c70',
      dark: '#1c1a00',
      contrastText: '#e5e6ed'
    }
  }
});

export default function App() {
  const [showCreatePost, setShowCreatePost] = useState(false); // Added state to control CreatePost visibility

  const handleMenuClick = (option) => {
    if (option === 'Create Post') {
      setShowCreatePost(true);
    } else {
      setShowCreatePost(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar handleMenuClick={handleMenuClick} /> {/* Pass handleMenuClick to HeaderBar */}
      <Grid container spacing={4} sx={{ paddingTop: '100px' }}>
        {showCreatePost && ( // Conditionally render CreatePost component
          <Grid item xs={12}>
            <CreatePost setShowCreatePost={setShowCreatePost} /> {/* Pass setShowCreatePost to CreatePost */}
          </Grid>
        )}
        <Grid item xs={12}>
          <CardPost />
        </Grid>
        <Grid item xs={12}>
          <CardPost />
        </Grid>
      </Grid>
      <FooterBar className='footer' />
    </ThemeProvider>
  );
}
