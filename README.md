# WorkHub - Enterprise CRM & Task Management System

WorkHub is a comprehensive Customer Relationship Management (CRM) and task management platform designed for modern businesses. Built with Spring Boot and React, it provides a full-featured solution for managing clients, tasks, meetings, and team collaboration.

## 🌟 Features

### 🔐 Authentication & Authorization
- **User Registration & Login**: Secure user authentication with JWT tokens
- **Google OAuth Integration**: Single Sign-On with Google accounts
- **Password Recovery**: Forgot password functionality with OTP verification via email
- **Role-Based Access Control**: Three-tier permission system
    - `SUPER_ADMIN`: Full system access and user management
    - `ADMIN`: CRM management and team oversight
    - `EMPLOYEE`: Personal task management and assigned work

### 📊 CRM Management
- **Client Database**: Comprehensive client information management
    - Company details with logo integration
    - Contact information (name, email, phone, address)
    - Deal value tracking
    - Client status monitoring
    - Custom metadata fields support
- **Client Tracking**: Visual client tracker for pipeline management
- **Client Details**: Detailed view of individual client information
- **Client Portal**: Dedicated portal for client interactions

### ✅ Task Management
- **Task Creation & Assignment**: Create and assign tasks to team members
- **Task Categories**:
    - General tasks
    - Follow-up tasks
    - Proposal tasks
    - Closing tasks
- **Priority Levels**: High, Medium, Low priority classification
- **Status Tracking**: To-Do, In Progress, Completed
- **Due Date Management**: Calendar-based deadline tracking
- **Attachments**: Support for task-related file attachments
- **My Tasks View**: Personalized task dashboard for employees
- **Company-Linked Tasks**: Associate tasks with specific clients/companies

### 📅 Meeting Management
- **Meeting Scheduler**: Schedule and manage meetings
- **Meeting Links**: Integration with video conferencing platforms
- **Meeting Notes**: Add and track meeting notes
- **Status Tracking**: Scheduled, Completed, Cancelled
- **CRM Integration**: Link meetings to specific client entries
- **Assignment**: Assign meetings to team members
- **Universal Calendar**: Consolidated view of all meetings and tasks

### 📈 Analytics & Reporting
- **Performance Dashboard**: Real-time analytics and insights
- **Admin Performance Tracking**: Monitor team performance metrics
- **Task Completion Statistics**: Track completed tasks per user
- **Deal Value Analytics**: Financial metrics and reporting
- **Activity Monitoring**: User activity tracking and logs

### 👤 User Management
- **User Profiles**: Customizable user profiles with avatars
- **Team Directory**: View all team members
- **Role Management**: Assign and modify user roles (Super Admin only)
- **Performance Tracking**: Individual user statistics

### 🎮 Productivity Features
- **Focus Break Game**: Built-in game to promote healthy work breaks
- **Session Monitoring**: Automatic break reminders after 15 minutes of activity
- **Personal Dashboard**: Customized dashboard for each user role

### 🔒 Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **OTP Verification**: Email-based OTP for password recovery
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Session Management**: Secure session handling

### 📧 Email Integration
- **Email Notifications**: SMTP email service integration
- **OTP Delivery**: Email-based OTP for password recovery
- **Configurable SMTP**: Support for Gmail and other SMTP providers

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**:
    - PostgreSQL (Production)
    - H2 Database (Development/Testing)
- **ORM**: Spring Data JPA with Hibernate
- **Security**: Spring Security with JWT
- **Authentication**:
    - JWT (JSON Web Tokens)
    - Google OAuth 2.0
- **API Documentation**: Springdoc OpenAPI (Swagger UI)
- **Build Tool**: Maven
- **Email**: Spring Boot Mail with SMTP
- **Monitoring**: Spring Boot Actuator

### Frontend
- **Framework**: React 19.2.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **OAuth**: @react-oauth/google

### DevOps
- **Containerization**: Docker with multi-stage builds
- **Health Checks**: Built-in health monitoring
- **Environment Management**: Environment variable configuration

## 📁 Project Structure

```
workhub/
├── server/                          # Backend Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/incial/crm/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST API controllers
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── UserController.java
│   │   │   │   │   ├── CrmController.java
│   │   │   │   │   ├── TaskController.java
│   │   │   │   │   └── MeetingController.java
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # JPA Entities
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── CrmEntry.java
│   │   │   │   │   ├── Task.java
│   │   │   │   │   ├── Meeting.java
│   │   │   │   │   └── Otp.java
│   │   │   │   ├── exception/       # Custom exceptions
│   │   │   │   ├── repository/      # Spring Data repositories
│   │   │   │   ├── security/        # Security configuration
│   │   │   │   │   ├── JwtUtil.java
│   │   │   │   │   └── JwtAuthenticationFilter.java
│   │   │   │   └── service/         # Business logic services
│   │   │   │       ├── AuthService.java
│   │   │   │       ├── UserService.java
│   │   │   │       ├── CrmService.java
│   │   │   │       ├── TaskService.java
│   │   │   │       ├── MeetingService.java
│   │   │   │       ├── EmailService.java
│   │   │   │       └── OtpService.java
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── .env.example
│   │   └── test/                   # Unit and integration tests
│   ├── Dockerfile                  # Docker configuration
│   └── pom.xml                     # Maven dependencies
│
└── client/                         # Frontend React application
    ├── components/                 # Reusable React components
    │   ├── client-tracker/
    │   ├── companies/
    │   ├── crm/
    │   ├── layout/
    │   ├── meetings/
    │   ├── tasks/
    │   └── ui/
    ├── context/                    # React Context providers
    │   ├── AuthContext.tsx
    │   ├── ToastContext.tsx
    │   └── LayoutContext.tsx
    ├── pages/                      # Page components
    │   ├── LoginPage.tsx
    │   ├── CRMPage.tsx
    │   ├── CompaniesPage.tsx
    │   ├── TasksPage.tsx
    │   ├── MeetingTrackerPage.tsx
    │   ├── ClientTrackerPage.tsx
    │   ├── ClientDetailsPage.tsx
    │   ├── AnalyticsPage.tsx
    │   ├── AdminPerformancePage.tsx
    │   ├── MyDashboardPage.tsx
    │   ├── ClientPortalPage.tsx
    │   ├── UniversalCalendarPage.tsx
    │   ├── ProfilePage.tsx
    │   └── GamePage.tsx
    ├── services/                   # API service layer
    ├── App.tsx                     # Main application component
    ├── types.ts                    # TypeScript type definitions
    ├── package.json
    └── vite.config.ts
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/google-login` - Google OAuth login
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/verify-otp` - Verify OTP
- `POST /api/v1/auth/change-password` - Change password

### User Management
- `GET /api/v1/users/all` - Get all users (Admin only)
- `GET /api/v1/users/me` - Get current user profile
- `GET /api/v1/users/{id}` - Get user by ID

### CRM Management
- `GET /api/v1/crm/all` - Get all CRM entries
- `GET /api/v1/crm/details/{id}` - Get CRM entry details
- `POST /api/v1/crm/create` - Create new CRM entry
- `PUT /api/v1/crm/update/{id}` - Update CRM entry
- `DELETE /api/v1/crm/delete/{id}` - Delete CRM entry

### Task Management
- `GET /api/v1/tasks/all` - Get all tasks
- `GET /api/v1/tasks/my-tasks` - Get current user's tasks
- `POST /api/v1/tasks/create` - Create new task
- `PUT /api/v1/tasks/update/{id}` - Update task
- `DELETE /api/v1/tasks/delete/{id}` - Delete task

### Meeting Management
- `GET /api/v1/meetings/all` - Get all meetings
- `POST /api/v1/meetings/create` - Create new meeting
- `PUT /api/v1/meetings/update/{id}` - Update meeting
- `DELETE /api/v1/meetings/delete/{id}` - Delete meeting

**Interactive API Documentation**: Access Swagger UI at http://localhost:8080/swagger-ui.html for detailed API documentation and testing.

## 🔧 Configuration

### Database Configuration
The application supports both PostgreSQL (production) and H2 (development):

**PostgreSQL (Production)**:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/workhub
    username: your_username
    password: your_password
    driver-class-name: org.postgresql.Driver
```

### Email Configuration
Configure SMTP settings for email notifications:

```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: your_email@gmail.com
    password: your_app_password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

**Note**: For Gmail, you need to generate an [App Password](https://support.google.com/accounts/answer/185833).

### JWT Configuration
```yaml
jwt:
  secret: your_secure_secret_key_minimum_64_characters
```

### Google OAuth Configuration
```yaml
google:
  client:
    id: your_google_client_id
```

## 🏗️ Building for Production

### Backend
```bash
cd server
./mvnw clean package -DskipTests
```
The JAR file will be created at `target/backend-1.0.0.jar`

### Frontend
```bash
cd client
npm run build
```
The production build will be in the `dist/` directory.

## 🔐 Default User Roles

The application uses a three-tier role system:

1. **ROLE_SUPER_ADMIN**:
    - Full system access
    - User management
    - Role assignment
    - System configuration

2. **ROLE_ADMIN**:
    - CRM management
    - Task assignment
    - Meeting scheduling
    - Team oversight
    - Analytics access

3. **ROLE_EMPLOYEE**:
    - Personal task management
    - View assigned tasks
    - Update task status
    - Access personal dashboard


### Health Monitoring
The application includes Spring Boot Actuator for health monitoring:
- Health endpoint: `/actuator/health`
- Info endpoint: `/actuator/info`

## 📄 License

This project is licensed under the License - see the LICENSE file for details.


