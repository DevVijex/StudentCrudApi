# 📚 Student Management API

A RESTful CRUD API built with **Node.js**, **Express**, and **MongoDB Atlas** for managing student records.

This project is part of the **Backend CRUD Application Task** and includes student creation, update, retrieval, deletion, record count.


--------------------------------

## 🚀 Features

- ✅ Create a student record
- 📖 Get all students (with optional pagination and filtering)
- ✏️ Update an existing student
- ❌ Delete a student
- 🔢 Count total students
- ⚙️ MongoDB Atlas as datastore
- 🛡️ Validation & Error Handling
- 📫 Postman Documentation

--------------------------------

## 🏗️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose ODM**


--------------------------------


## 🛠️ Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/DevVijex/StudentCrudApi.git
   cd StudentCrudApi


2. ## Install dependencies
    npm install


3. ## Create a .env file in the root directory
    PORT=3000
    MONGO_URI=your_mongodb_connection_string

4. ## Start the server
    npm run dev


--------------------------------

## API Endpoints
Endpoint                        Method                          Description

/add-students                   POST                            Create a new student

/get-students                   GET                             Get all students

/students/:studentId            PUT                             Update a student by ID

/students/:studentId            DELETE                          Delete a student by ID

/students/count                 GET                             Get total number of students


--------------------------------

## 🔐 Validation & Error Handling
400 Bad Request – Missing or invalid fields

409 Conflict – Email already exists

404 Not Found – Student not found by ID

500 Internal Server Error – Unhandled server errors


--------------------------------


## 📬 Postman Documentation
A full Postman collection is included in the /postman folder with:

Sample requests and expected responses

Status code tests

Easy import for testing

💡 To use it:

Open Postman

Click Import

Select the file StudentCRUDAPI.postman_collection.json


--------------------------------

👤 Author: Vivian Ilechukwu
📍 GitHub Repository:
📫 Assignment submitted for Backend CRUD Project — Due: 1st July, 2025 (9pm)
















/students?lastName=Smith&page=1&limit=10

GET

🔄 (Optional) Filter & Paginate

