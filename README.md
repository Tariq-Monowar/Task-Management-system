## Task Management System

### Overview
The **Task Management System** is a full-stack web application that allows users to create and manage projects, assign tasks, track progress, and receive real-time notifications. Users can sign up, create projects, assign roles, and track task completion.

### Workflow:
1. **Sign Up**: Users can sign up to become a part of the system.
2. **Create Projects**: After signing up, users can create new projects.
3. **Add Users**: Project creators can add users with roles such as Admin or Developer.
4. **Assign Tasks**: Create tasks and assign them to users. Assigned users will receive real-time notifications for task updates.
5. **Task Completion**: Once a task is completed, admins and managers will be notified.
6. **Mark Project as Complete**: After all tasks are completed, the project "Complete" button becomes active, allowing the project to be marked as finished.

### Live Demo:
- **Live Demo**: [Task Management System Live](https://font.toufikhasan.com)
 
## Technologies Used

- **Frontend**: 
  - **React.js** for building the user interface
  - **SCSS** for styling and responsive design
- **Backend**: 
  - **Express.js** for building the REST API
  - **Socket.io** for real-time communication and notifications
  - **RabbitMQ** for handling background tasks and message queues
- **Database**: MongoDB (with Mongoose for data modeling)
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication
- **TypeScript**: Type-safe development with TypeScript for better maintainability
- **Containerization**: Docker for easy deployment


### Setup Instructions

### 1. Clone the Repository
Clone the entire GitHub repository to your local machine:

```bash
git clone https://github.com/Tariq-Monowar/Task-Management-system
