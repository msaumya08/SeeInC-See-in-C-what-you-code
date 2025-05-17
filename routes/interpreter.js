const express = require('express');
const router = express.Router();
const { executeCode } = require('../interpreter/cInterpreter');
const auth = require('../middleware/auth');
const Snippet = require('../models/Snippet');

// Execute C code
router.post('/execute', async (req, res) => {
    try {
        const { code } = req.body;
        
        if (!code) {
            return res.status(400).json({ msg: 'No code provided' });
        }

        const result = await executeCode(code);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            msg: 'Error executing code',
            error: err.message 
        });
    }
});

// Save code snippet
router.post('/save', auth, async (req, res) => {
    try {
        const { code, title, description } = req.body;
        if (!code || !title) {
            return res.status(400).json({ msg: 'Title and code are required' });
        }
        const snippet = new Snippet({
            user: req.user.id,
            title,
            description,
            code
        });
        await snippet.save();
        res.json({ msg: 'Code snippet saved successfully', snippet });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router; 