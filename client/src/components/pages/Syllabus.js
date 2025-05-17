import React from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const SYLLABUS = [
  {
    topic: 'Introduction to C',
    details: 'History, features, structure of a C program, compiling and running C programs.'
  },
  {
    topic: 'Variables and Data Types',
    details: 'int, float, char, double, variable declaration, initialization, scope.'
  },
  {
    topic: 'Operators and Expressions',
    details: 'Arithmetic, relational, logical, assignment, increment/decrement, conditional, bitwise.'
  },
  {
    topic: 'Input and Output',
    details: 'printf, scanf, format specifiers.'
  },
  {
    topic: 'Control Statements',
    details: 'if, if-else, nested if, switch, loops (for, while, do-while), break, continue.'
  },
  {
    topic: 'Functions',
    details: 'Defining, declaring, calling, arguments, return values, recursion.'
  },
  {
    topic: 'Arrays and Strings',
    details: '1D, 2D arrays, string handling, common string functions.'
  },
  {
    topic: 'Pointers',
    details: 'Pointer basics, pointer arithmetic, pointers and arrays, pointers to functions.'
  },
  {
    topic: 'Structures and Unions',
    details: 'Defining, declaring, accessing members, arrays of structures.'
  },
  {
    topic: 'File Handling',
    details: 'Opening, closing, reading, writing files, file pointers.'
  },
  {
    topic: 'Dynamic Memory Allocation',
    details: 'malloc, calloc, realloc, free.'
  },
  {
    topic: 'Common C Programs',
    details: 'Factorial, Fibonacci, palindrome, prime number, sorting, searching.'
  }
];

const Syllabus = () => (
  <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
    <Typography variant="h4" gutterBottom>
      C Programming Syllabus
    </Typography>
    <Typography variant="body1" color="text.secondary" paragraph>
      This syllabus covers all the essential topics for first-year students learning C programming. Each topic includes definitions, explanations, and example programs.
    </Typography>
    <Paper sx={{ p: 3 }}>
      <List>
        {SYLLABUS.map((item, idx) => (
          <ListItem key={idx} alignItems="flex-start">
            <ListItemText
              primary={<Typography variant="h6">{item.topic}</Typography>}
              secondary={<Typography variant="body2" color="text.secondary">{item.details}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Sample C Program</Typography>
      <Paper sx={{ p: 2, bgcolor: '#f5f5f5', fontFamily: 'monospace', fontSize: 15 }}>
        {`#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`}
      </Paper>
    </Box>
  </Container>
);

export default Syllabus; 