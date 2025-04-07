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
- **video**: [Task Management System video](https://www.youtube.com/watch?v=Enn_Ewz_b74) 
## Technologies Used

- **Backend**: 
  - **Express.js**  
  - **Socket.io**  
  - **RabbitMQ**
  - **Redis** 
- **Frontend**: 
  - **React.js**  
  - **SCSS**
  - **Socket.io** 
- **Database**:
  - **mongoDB** 
- **Authentication**:  JSON Web Tokens (JWT) & cookie parser
- **TypeScript**
- **Containerization**: Docker for easy deployment


### Setup Instructions

### 1. Clone the Repository
Clone the entire GitHub repository to your local machine:

```bash
git clone https://github.com/Tariq-Monowar/Task-Management-system
```
```bash
cd Task-Management-system
```

### env veriable 
```bash
PORT=8081
DBURL=mongodb+srv://hassainseam:fe3########
WEBTOKEN_SECRET_KEY=Ke3F9Hr4FD
REDIS_URL=redis://default:8fvxV#############
```
