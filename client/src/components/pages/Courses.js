import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        if (res.data.length === 0) {
          setCourses([
            {
              _id: '1',
              title: 'Code With Harry - C Programming',
              description: 'Comprehensive C programming course by Code With Harry on YouTube.',
              level: 'beginner',
              thumbnail: 'https://i.ytimg.com/vi/irqbmMNs2Bo/hqdefault.jpg',
              videoUrl: 'https://www.youtube.com/playlist?list=PLu0W_9lII9ah7DDtYtflgwMwpT3xmjXY9',
            },
            {
              _id: '2',
              title: 'Apna College - C Programming',
              description: 'C programming course by Apna College for beginners and intermediates.',
              level: 'beginner',
              thumbnail: 'https://i.ytimg.com/vi/BmghcMOB6Jc/hqdefault.jpg',
              videoUrl: 'https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ',
            },
            {
              _id: '3',
              title: 'College Wallah - C Programming',
              description: 'Learn C programming from scratch with College Wallah.',
              level: 'beginner',
              thumbnail: 'https://i.ytimg.com/vi/3Cg6nFq7l2k/hqdefault.jpg',
              videoUrl: 'https://www.youtube.com/playlist?list=PLXl2lQ_4b6rHq0lH1Q6U5z4Jk9l6A2kzK',
            },
            {
              _id: '4',
              title: 'Coursera: Introduction to Programming in C',
              description: 'A Coursera course from Duke University covering C programming basics and problem solving.',
              level: 'beginner',
              thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://www.coursera.org/maestro/api/course/6.002x/asset/logo.png?auto=format%2Ccompress&dpr=1',
              videoUrl: 'https://www.coursera.org/learn/c-programming',
            },
            {
              _id: '5',
              title: 'Coursera: C for Everyone: Programming Fundamentals',
              description: 'A Coursera course from University of California, Santa Cruz, for absolute beginners.',
              level: 'beginner',
              thumbnail: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://www.coursera.org/maestro/api/course/6.002x/asset/logo.png?auto=format%2Ccompress&dpr=1',
              videoUrl: 'https://www.coursera.org/learn/c-for-everyone',
            },
            {
              _id: '6',
              title: 'Udemy: C Programming For Beginners',
              description: 'A highly rated Udemy course for learning C programming from scratch.',
              level: 'beginner',
              thumbnail: 'https://img-b.udemycdn.com/course/240x135/543600_64d1_4.jpg',
              videoUrl: 'https://www.udemy.com/course/c-programming-for-beginners-',
            },
            {
              _id: '7',
              title: 'NPTEL: Programming in C',
              description: 'NPTEL online course for C programming, suitable for Indian university students.',
              level: 'beginner',
              thumbnail: 'https://nptel.ac.in/content/storage2/courses/106104128/nptel.jpg',
              videoUrl: 'https://nptel.ac.in/courses/106104128',
            },
          ]);
        } else {
          setCourses(res.data);
        }
      } catch (err) {
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course._id}>
            <Card>
              {course.thumbnail && (
                <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Level: {course.level}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/courses/${course._id}`)}>
                  View Details
                </Button>
                {course.videoUrl && (
                  <Button size="small" href={course.videoUrl} target="_blank" rel="noopener noreferrer">
                    Watch/Go to Course
                  </Button>
                )}
                <Button size="small" variant="contained" color="primary">
                  Enroll
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses; 