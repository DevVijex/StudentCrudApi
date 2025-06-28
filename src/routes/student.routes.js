const express = require('express');
const router = express.Router();

const {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    countStudents
} = require('../controllers/ student.controller');


// Routes
router.post('/add-student', createStudent);
router.get('/get-students', getAllStudents);
router.get('/students/count', countStudents);
router.put('/students/:studentId', updateStudent);
router.delete('/students/:studentId', deleteStudent);


module.exports = router;