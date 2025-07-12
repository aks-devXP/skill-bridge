# SkillBridge Platform

## Overview

SkillBridge is a mini-application designed to facilitate skill exchange among users. The platform enables individuals to offer their own skills and request services or skills they need in return. It's a practical way to build community, exchange expertise, and meet like-minded people.

**This project is being built as part of the Odoo Hackathon.**

### Team Members

* **Abhinav Kumar Saxena** – Team Leader ([abhinav22018@iiitd.ac.in](mailto:abhinav22018@iiitd.ac.in))
* **Akanksh Semar** ([akanksh22046@iiitd.ac.in](mailto:akanksh22046@iiitd.ac.in))
* **Akshat Gian** ([akshat22051@iiitd.ac.in](mailto:akshat22051@iiitd.ac.in))
* **Kunal** ([kunal22260@iiitd.ac.in](mailto:kunal22260@iiitd.ac.in))

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for icons
- **React Hook Form** for form handling
- **Yup** for validation

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Morgan** for logging
- **Express Rate Limit** for API protection
- **Multer** for file uploads

## Features

### User Features

* **Basic Profile Information**:

  * Name
  * Optional location
  * Optional profile photo

* **Skill Listings**:

  * Skills offered
  * Skills wanted

* **Availability**:

  * Users specify when they're available (e.g., weekends, evenings)

* **Profile Visibility**:

  * Option to set profiles as public or private

* **Browsing and Searching**:

  * Users can browse or search other users by specific skills (e.g., "Photoshop", "Excel")

* **Swaps Management**:

  * Users can request swaps, accept or reject incoming requests, and monitor pending swap requests

* **Feedback**:

  * Users can rate and provide feedback after completing a skill swap

### Admin Features

* Reject inappropriate or spammy skill descriptions
* Ban users who violate platform policies
* Monitor pending, accepted, or cancelled swaps
* Send platform-wide messages (feature updates, downtime alerts)
* Download reports (user activity, feedback logs, swap statistics)

## Project Structure

```
skill-bridge/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts (Auth, etc.)
│   │   ├── services/       # API service functions
│   │   └── utils/          # Utility functions
│   └── package.json
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Custom middleware
│   │   └── server.js       # Main server file
│   └── package.json
├── package.json            # Root package.json for scripts
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (version 8 or higher)
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skill-bridge
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   cp env.example .env
   ```
   
   Edit the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:5173
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/skillbridge
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # File Upload Configuration
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   # Start MongoDB service
   mongod
   ```
   
   Or use MongoDB Atlas (cloud service)

### Development

**Start both frontend and backend in development mode:**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

**Start only frontend:**
```bash
npm run dev:frontend
```

**Start only backend:**
```bash
npm run dev:backend
```

### Production

**Build the frontend:**
```bash
npm run build
```

**Start the backend in production:**
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Health Check
- `GET /health` - Server health status
- `GET /` - API status

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run build` - Build frontend for production
- `npm run start` - Start backend in production
- `npm run install:all` - Install dependencies for all packages

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - JWT token expiration time
- `MAX_FILE_SIZE` - Maximum file upload size
- `UPLOAD_PATH` - File upload directory

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for password security
- **CORS Protection** - Configured for frontend-backend communication
- **Rate Limiting** - API protection against abuse
- **Helmet** - Security headers
- **Input Validation** - Server-side validation
- **Error Handling** - Comprehensive error handling

## Future Enhancements

* Detailed analytics dashboard
* Improved user authentication and security
* Integration with social media platforms
* Mobile application support
* Real-time messaging
* Skill verification system
* Advanced search and filtering
* Payment integration for premium features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email the team members or create an issue in the repository.

---

**Happy Skill Exchanging! 🚀**