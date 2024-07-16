import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardPosts() {
  return (
    <>
        <Card sx={{ width: '60%', marginLeft: '20%' }} elevation={16}>
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
                <Button size="small">Like</Button>
                <Button size="small">Share</Button>
            </CardActions>
        </Card>
    </>

  );
}

