const Student = require('../models/student.model');

// Create Student
const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, age } = req.body;

        //Validate inputs
        if (!firstName || !lastName || !email || !age) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const existing = await Student.findOne({ email });
        if (existing) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const student = new Student({ firstName, lastName, email, age });
        await student.save();

        return res.status(201).json({ message: 'Student created successfully', student });

    } catch (error) {
        console.log('Error creating student', error);
        return res.status(500).json({ message: 'Internal Server error' });
    }
};

// Update Student
const updateStudent = async (req, res) => {
    const { studentId } = req.params;
    const { firstName, lastName, email, age } = req.body;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.firstName = firstName || student.firstName;
        student.lastName = lastName || student.lastName;
        student.email = email || student.email;
        student.age = age || student.age;

        await student.save();
        return res.status(200).json({ message: "Student updated successfully", student });

    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get All Students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json({ students });
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Student
const deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findByIdAndDelete(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Count Students
const countStudents = async (req, res) => {
    try {
        const count = await Student.countDocuments();
        res.status(200).json({ count });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createStudent,
    updateStudent,
    getAllStudents,
    deleteStudent,
    countStudents
};
