import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Courses from './components/pages/Courses';
import CourseDetail from './components/pages/CourseDetail';
import Interpreter from './components/pages/Interpreter';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/pages/Dashboard';
import Chatbot from './components/layout/Chatbot';
import Syllabus from './components/pages/Syllabus';
import VideoTutorials from './components/pages/VideoTutorials';
import DSAPractice from './components/pages/DSAPractice';
import DSAQuestionDetail from './components/pages/DSAQuestionDetail';

// Context
import { AuthProvider } from './context/AuthContext';

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/interpreter" element={<Interpreter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/video-tutorials" element={<VideoTutorials />} />
            <Route path="/dsa-practice" element={<DSAPractice />} />
            <Route path="/dsa-practice/:id" element={<DSAQuestionDetail />} />
          </Routes>
          <Chatbot />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 