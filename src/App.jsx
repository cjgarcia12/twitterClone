import './App.css';
import HeaderBar from './components/HeaderBar';
import { Grid, createTheme, ThemeProvider } from "@mui/material";
import CardPost from "./components/CardPosts";
import FooterBar from "./components/FooterBar";
import CreatePost from './components/CreatePost';
import LoginPage from './components/LoginPage';

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
})

// use states to store posts, and use effects to load the posts

export default function App() {
  return (
    <ThemeProvider theme={ theme }>

        <HeaderBar />
        <Grid container spacing={4} sx={{ paddingTop: '100px'}} justifyContent='center'>
        <LoginPage />
        <Grid item xs={12}>
          <CreatePost />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardPost />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardPost />
        </Grid>
      </Grid>
      <FooterBar className='footer'/>
    </ThemeProvider>
  );
}
