# C Programming Learning Platform

A comprehensive web platform for learning C programming language from basics to advanced concepts, featuring an integrated C subset interpreter.

## Features

- Interactive C programming tutorials
- Video-based learning content
- Integrated C subset interpreter
- Practice exercises and quizzes
- Progress tracking
- Code editor with real-time feedback
- Community forum for discussions

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT
- C Interpreter: Custom implementation

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```
3. Create a .env file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_super_secret_key
   PORT=5000
   ```
4. Start the development server:
   ```bash
   npm run dev:full
   ```

## Project Structure

```
├── client/                 # React frontend
├── server/                 # Node.js backend
├── interpreter/           # C subset interpreter
├── public/                # Static files
└── docs/                  # Documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License 