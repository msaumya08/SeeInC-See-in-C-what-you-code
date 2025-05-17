import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const TUTORIALS = [
  {
    title: 'Code With Harry - C Programming',
    url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9ah7DDtYtflgwMwpT3xmjXY9',
    thumbnail: 'https://i.ytimg.com/vi/irqbmMNs2Bo/hqdefault.jpg',
  },
  {
    title: 'Apna College - C Programming',
    url: 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ',
    thumbnail: 'https://i.ytimg.com/vi/BmghcMOB6Jc/hqdefault.jpg',
  },
  {
    title: 'College Wallah - C Programming',
    url: 'https://www.youtube.com/playlist?list=PLXl2lQ_4b6rHq0lH1Q6U5z4Jk9l6A2kzK',
    thumbnail: 'https://i.ytimg.com/vi/3Cg6nFq7l2k/hqdefault.jpg',
  },
];

const VideoTutorials = () => (
  <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
    <Typography variant="h4" gutterBottom>
      C Programming Video Tutorials
    </Typography>
    <Grid container spacing={3}>
      {TUTORIALS.map((tut, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <Card>
            <CardMedia
              component="img"
              height="180"
              image={tut.thumbnail}
              alt={tut.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>{tut.title}</Typography>
              <Button variant="contained" color="primary" href={tut.url} target="_blank" rel="noopener noreferrer">
                Watch Playlist
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default VideoTutorials; 