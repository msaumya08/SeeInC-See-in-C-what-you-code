const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const auth = require('../middleware/auth');

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find().populate('lessons');
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('lessons')
            .populate('quizzes');
        
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }
        
        res.json(course);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.status(500).send('Server error');
    }
});

// Create new course (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, level, lessons, quizzes } = req.body;

        const newCourse = new Course({
            title,
            description,
            level,
            lessons,
            quizzes
        });

        const course = await newCourse.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update course (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, description, level, lessons, quizzes } = req.body;

        let course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        course = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, level, lessons, quizzes },
            { new: true }
        );

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Enroll in a course (authenticated users)
router.post('/:id/enroll', auth, async (req, res) => {
    try {
        const courseId = req.params.id;
        const user = await require('../models/User').findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ msg: 'Already enrolled in this course' });
        }
        user.enrolledCourses.push(courseId);
        await user.save();
        res.json({ msg: 'Enrolled successfully', enrolledCourses: user.enrolledCourses });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router; 