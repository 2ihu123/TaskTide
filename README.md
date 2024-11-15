# Task Management Application

This application allows users to create, manage, and track their tasks with features like prioritization, due dates, and completion tracking.

## Project Overview

Here’s a screenshot of the app running:

![Screenshot (57)](https://github.com/user-attachments/assets/dabb68c7-4aaa-4b19-bda5-c0f6e4340664)
![Screenshot (59)](https://github.com/user-attachments/assets/0f3bec87-0027-4365-b026-1628c7a8e66d)

## Features
- User authentication (Login/Register)
- Task management with due dates and priority levels
- Tasks can be marked as completed or deleted
- Filter and sort tasks by priority and due date

## Technologies
- **Frontend**: React.js, Bootstrap, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Token)

## Setup Instructions
- Navigate to the index directory (cd index.js)
- Install the dependencies (npm install)
- Start the backend server (node index.js)
- Navigate to the client directory (cd client)
- Install the dependencies (npm install)
- Start the frontend application (npm start)
- The frontend will be running at http://localhost:3000
- Create a .env file in the server directory with the following content
  MONGO_URI= mongodb+srv://abhi9161shukla:poonam@cluster0.k0pn8.mongodb.net/?retryWrites=true&w=majority&     appName=Cluster0
  SECRET_KEY="poonamyadavfrommnnitallahabad20214120"

### Prerequisites:
- Node.js (v14 or above)
- MongoDB (locally or via MongoDB Atlas)

### Additional Information
- The application supports JWT authentication, so users can log in and create tasks.
- MongoDB is used for storing user and task data.
- The frontend is built using React, and the backend is built with Express and Node.js.
  
