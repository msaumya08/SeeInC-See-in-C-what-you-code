import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  LinearProgress,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  PlayCircle as PlayIcon,
  Code as CodeIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import DashboardIllustration from '../../assets/dashboard_illustration.png';
import { useTheme } from '@mui/material/styles';

// DSA Questions Data
const DSA_QUESTIONS = [
  {
    title: 'Reverse an Array',
    description: 'Write a C program to reverse an array in place.',
    code: `void reverse(int arr[], int n) {
    int start = 0, end = n - 1;
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}`
  },
  {
    title: 'Find the Maximum Element',
    description: 'Write a C function to find the maximum element in an array.',
    code: `int findMax(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}`
  },
  {
    title: 'Check for Palindrome String',
    description: 'Write a C function to check if a string is a palindrome.',
    code: `int isPalindrome(char str[]) {
    int l = 0, r = strlen(str) - 1;
    while (l < r) {
        if (str[l] != str[r]) return 0;
        l++; r--;
    }
    return 1;
}`
  },
  {
    title: 'Binary Search',
    description: 'Implement binary search in C for a sorted array.',
    code: `int binarySearch(int arr[], int n, int key) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == key) return m;
        if (arr[m] < key) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`
  },
  {
    title: 'Fibonacci (Recursion)',
    description: 'Write a recursive C function to print the nth Fibonacci number.',
    code: `int fib(int n) {
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data to get enrolled courses
        const userRes = await axios.get('/api/auth/user');
        const enrolled = userRes.data.enrolledCourses || [];
        // Fetch all courses, then filter to only enrolled
        const coursesRes = await axios.get('/api/courses');
        const allCourses = coursesRes.data;
        const enrolledCoursesList = allCourses.filter(course => enrolled.includes(course._id));
        setEnrolledCourses(enrolledCoursesList);
        // Fetch progress if needed
        try {
          const progressRes = await axios.get('/api/progress');
          setProgress(progressRes.data);
        } catch {
          setProgress({});
        }
      } catch (err) {
        setEnrolledCourses([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getCourseProgress = (courseId) => {
    const courseProgress = progress[courseId] || {
      completedLessons: 0,
      totalLessons: 0,
      quizScores: [],
    };
    return (courseProgress.completedLessons / courseProgress.totalLessons) * 100 || 0;
  };

  // Generate random streak data for 6 weeks (42 days)
  const today = new Date();
  const streakData = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (41 - i));
    return {
      date: d,
      count: Math.floor(Math.random() * 3), // 0, 1, or 2 activities
    };
  });

  if (loading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <img src={DashboardIllustration} alt="Dashboard Illustration" style={{ maxWidth: '350px', width: '100%' }} />
      </Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user?.username}!
      </Typography>

      {/* Progress Overview */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Your Progress
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {enrolledCourses.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Courses Enrolled
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {Object.values(progress).reduce(
                  (acc, curr) => acc + curr.completedLessons,
                  0
                )}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Lessons Completed
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary">
                {Object.values(progress).reduce(
                  (acc, curr) => acc + curr.quizScores.length,
                  0
                )}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Quizzes Taken
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Streak Calendar */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Activity Streak
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'row' }}>
          {Array.from({ length: 7 }).map((_, col) => (
            <Box key={col} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {streakData.slice(col * 6, (col + 1) * 6).map((cell, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: 18,
                    height: 18,
                    bgcolor:
                      cell.count === 0
                        ? theme.palette.grey[300]
                        : cell.count === 1
                        ? theme.palette.success.light
                        : theme.palette.success.main,
                    borderRadius: 1,
                    border: '1px solid ' + theme.palette.grey[200],
                  }}
                  title={`${cell.date.toLocaleDateString()}: ${cell.count} activity`}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Enrolled Courses */}
      <Typography variant="h5" gutterBottom>
        Your Courses
      </Typography>
      <Grid container spacing={3}>
        {enrolledCourses.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                You are not enrolled in any courses yet.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => navigate('/courses')}
              >
                Browse Courses
              </Button>
            </Paper>
          </Grid>
        ) : (
          enrolledCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getCourseProgress(course._id)}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<PlayIcon />}
                    onClick={() => navigate(`/courses/${course._id}`)}
                  >
                    Continue Learning
                  </Button>
                  <Button
                    size="small"
                    startIcon={<CodeIcon />}
                    onClick={() => navigate('/interpreter')}
                  >
                    Practice
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PlayIcon />}
              onClick={() => navigate('/courses')}
            >
              Browse Courses
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<CodeIcon />}
              onClick={() => navigate('/interpreter')}
            >
              Open Interpreter
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AssignmentIcon />}
              onClick={() => navigate('/assignments')}
            >
              View Assignments
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* DSA Practice Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          DSA Practice
        </Typography>
        <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', pb: 1 }}>
          <Box sx={{ display: 'inline-flex', gap: 2 }}>
            {DSA_QUESTIONS.slice(0, 10).map((q, idx) => (
              <Paper key={idx} sx={{ p: 2, minWidth: 300, maxWidth: 350, display: 'inline-block' }}>
                <Typography variant="h6" gutterBottom>{q.title}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>{q.description}</Typography>
                <Box sx={{ bgcolor: '#f5f5f5', p: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: 13, whiteSpace: 'pre-wrap' }}>
                  {q.code}
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/dsa-practice')}>
            Browse All DSA Questions
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard; 