const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Create Student
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, age, password } = req.body;

    if (!firstName || !lastName || !email || !age || !password) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password should be at least 6 characters long' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await Student.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const student = new Student({
      firstName,
      lastName,
      email: normalizedEmail,
      age,
      password: hashedPassword
    });

    await student.save();

    return res.status(201).json({
      message: 'Student created successfully',
      student: {
        id: student._id,
        firstName,
        lastName,
        email: normalizedEmail,
        age
      }
    });

  } catch (error) {
    console.error('Error creating student:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update Student
const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const { firstName, lastName, email, age, password } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.firstName = firstName || student.firstName;
    student.lastName = lastName || student.lastName;
    student.email = email ? email.trim().toLowerCase() : student.email;
    student.age = age || student.age;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password should be at least 6 characters long' });
      }
      student.password = await bcrypt.hash(password, saltRounds);
    }

    await student.save();

    return res.status(200).json({
      message: 'Student updated successfully',
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        age: student.age
      }
    });

  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password');
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
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Count Students
const countStudents = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    return res.status(200).json({ count });
  } catch (err) {
    console.error("Error counting students:", err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createStudent,
  updateStudent,
  getAllStudents,
  deleteStudent,
  countStudents
};
