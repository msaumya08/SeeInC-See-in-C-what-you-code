import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, Button, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am your AI helper. Ask me anything about C programming or DSA.' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/chatbot', { message: input });
      setMessages(msgs => [...msgs, { from: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'AI service unavailable. Please try again later.' }]);
      setError('AI service unavailable.');
    }
    setInput('');
    setLoading(false);
  };

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}>
        <IconButton color="primary" size="large" onClick={handleOpen} sx={{ bgcolor: 'white', boxShadow: 3 }}>
          <ChatIcon fontSize="large" />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>AI Chatbot Helper</DialogTitle>
        <DialogContent>
          <Paper sx={{ maxHeight: 300, overflowY: 'auto', mb: 2, p: 1 }}>
            <List>
              {messages.map((msg, idx) => (
                <ListItem key={idx} alignItems={msg.from === 'user' ? 'right' : 'left'}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color={msg.from === 'user' ? 'primary' : 'secondary'}>
                        <b>{msg.from === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
              {loading && (
                <ListItem>
                  <ListItemText primary={<CircularProgress size={20} />} />
                </ListItem>
              )}
            </List>
          </Paper>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              disabled={loading}
            />
            <Button variant="contained" onClick={handleSend} disabled={loading}>Send</Button>
          </Box>
          {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot; 