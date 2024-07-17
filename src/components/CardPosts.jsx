// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
import { Stack, Card, CardActions, CardContent, Button, Typography, IconButton } from '@mui/material';

export default function CardPosts() {
  return (
    <>
        <Card elevation={16}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                 </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Stack 
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    spacing={2}
                    sx={{width: '95%'}}
                >
                <div>
                    <Button size="small">Like</Button>
                    <Button size="small">Share</Button>
                </div>
                <div>
                    <IconButton aria-label='edit'>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label='delete'>
                        <DeleteIcon />
                    </IconButton>
                </div>          
                </Stack>

            </CardActions>
        </Card>
    </>

  );
}

