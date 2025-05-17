import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { PlayArrow as PlayIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Interpreter = ({ initialCode }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [code, setCode] = useState(initialCode || `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [saveDescription, setSaveDescription] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const executeCode = async () => {
    setLoading(true);
    setError('');
    setOutput('');

    try {
      const res = await axios.post('/api/interpreter/execute', { code });
      if (res.data.success) {
        setOutput(res.data.output);
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error executing code');
    }

    setLoading(false);
  };

  const handleOpenSaveDialog = () => {
    setSaveTitle('');
    setSaveDescription('');
    setSaveStatus('');
    setSaveDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setSaveDialogOpen(false);
  };

  const handleSaveSnippet = async () => {
    setSaveStatus('');
    try {
      const res = await axios.post('/api/interpreter/save', {
        code,
        title: saveTitle,
        description: saveDescription,
      });
      if (res.data.snippet) {
        setSaveStatus('Saved successfully!');
        setTimeout(() => setSaveDialogOpen(false), 1000);
      } else {
        setSaveStatus('Failed to save.');
      }
    } catch (err) {
      setSaveStatus(err.response?.data?.msg || 'Failed to save.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        C Subset Interpreter
      </Typography>
      <Typography variant="body1" paragraph>
        Write and execute C code directly in your browser. Our interpreter supports
        a subset of C language features for learning and practice.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Code Editor
            </Typography>
            <TextField
              multiline
              fullWidth
              rows={18}
              value={code}
              onChange={handleCodeChange}
              variant="outlined"
              inputProps={{ style: { fontFamily: 'monospace', whiteSpace: 'pre', tabSize: 4 } }}
              sx={{
                '& .MuiInputBase-root': {
                  fontFamily: 'monospace',
                },
              }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              {isAuthenticated && (
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  onClick={handleOpenSaveDialog}
                  disabled={loading}
                >
                  Save Code
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayIcon />}
                onClick={executeCode}
                disabled={loading}
              >
                {loading ? 'Running...' : 'Run Code'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Output
            </Typography>
            <Box
              sx={{
                bgcolor: '#f5f5f5',
                p: 2,
                borderRadius: 1,
                minHeight: '200px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
              }}
            >
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                output || 'Output will appear here...'
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={saveDialogOpen} onClose={handleCloseSaveDialog}>
        <DialogTitle>Save Code Snippet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={saveTitle}
            onChange={e => setSaveTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={saveDescription}
            onChange={e => setSaveDescription(e.target.value)}
          />
          {saveStatus && (
            <Alert severity={saveStatus === 'Saved successfully!' ? 'success' : 'error'} sx={{ mt: 2 }}>
              {saveStatus}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveDialog}>Cancel</Button>
          <Button onClick={handleSaveSnippet} disabled={!saveTitle || !code} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Supported Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Data Types
              </Typography>
              <Typography variant="body2">
                int, char, float, double
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Control Structures
              </Typography>
              <Typography variant="body2">
                if, else, while, for
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Operators
              </Typography>
              <Typography variant="body2">
                +, -, *, /, %, =, ==, !=, {'<'} , {'>'}, {'<='}, {'>='}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Functions
              </Typography>
              <Typography variant="body2">
                printf, scanf, main
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Interpreter; 