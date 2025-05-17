import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  Code as CodeIcon,
  School as SchoolIcon,
  PlayCircle as PlayIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
          >
            Learn C Programming
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
          >
            Master the fundamentals of C programming with our interactive platform.
            Practice coding, watch video tutorials, and build your skills with our
            integrated C subset interpreter.
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/courses"
            >
              Start Learning
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={RouterLink}
              to="/interpreter"
            >
              Try Interpreter
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/syllabus')}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" component="h2" gutterBottom>
                    Structured Learning
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Follow our carefully designed curriculum to master C programming
                    from basics to advanced concepts.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/video-tutorials')}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <PlayIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" component="h2" gutterBottom>
                    Video Tutorials
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Learn through high-quality video tutorials with practical
                    examples and real-world applications.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/dsa-practice')}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <CodeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" component="h2" gutterBottom>
                    Interactive Coding
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Practice coding directly in your browser with our integrated
                    code editor and instant feedback.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/interpreter')}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <BuildIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" component="h2" gutterBottom>
                    C Interpreter
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Test and run your C code with our built-in interpreter that
                    supports a subset of C language features.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 