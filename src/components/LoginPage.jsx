import { Box, Card, Grid, Stack, Typography, Button }from '@mui/material';
import TextField from '@mui/material/TextField';

export default function LoginPage() {
  return (
    <Card>
        <Box
        sx={{
            width: 500,
            maxWidth: '100%',
        }}
        >   
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <Typography variant="h4" component="h2">
                        Login
                    </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Username" id="fullWidth" />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth label="Password" id="fullWidth" />
                    </Grid>
                    <Grid item xs={8}>
                    <Button variant="contained">Login</Button>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    </Card>

  );
}