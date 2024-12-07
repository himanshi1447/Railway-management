# Railway Management System

## Project Overview

This is a Railway Management System inspired by IRCTC, built using a modern web stack including Node.js, Express.js, MySQL, and React.js. The application allows users to check train availability, book seats, and provides admin functionalities for managing trains.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Frontend:** React.js
- **Authentication:** JSON Web Tokens (JWT)

## Prerequisites

- Node.js (v14 or later)
- MySQL
- npm or yarn

## Installation

### Backend Setup

1. Clone the repository

```bash
git clone https://github.com/your-username/railway-management-system.git
cd railway-management-system/backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=railway_management
JWT_SECRET=your_jwt_secret_key
ADMIN_API_KEY=your_secret_admin_api_key
```

4. Set up MySQL Database

```bash
# Create the database
CREATE DATABASE railway_management;

# Use the database
USE railway_management;

# Create necessary tables (example)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE trains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  train_name VARCHAR(255) NOT NULL,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL
);
```

5. Run the backend server

```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory

```bash
cd ../frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the frontend directory

```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Run the frontend development server

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Admin Endpoints (Protected by API Key)

- `POST /api/admin/trains` - Add a new train
- `PUT /api/admin/trains/:id` - Update train details

### User Endpoints (Protected by JWT)

- `GET /api/trains` - Get train availability between stations
- `POST /api/bookings` - Book a seat
- `GET /api/bookings/:id` - Get specific booking details

## Key Features

- User registration and authentication
- Role-based access control (Admin and User roles)
- Real-time seat availability tracking
- Optimized booking system to handle race conditions
- Secure admin endpoints with API key

## Assumptions

- Seat booking is a first-come, first-served process
- Admin can add and modify train details
- Users can book seats only if availability > 0

## Race Condition Handling

Implemented using database transactions and row-level locking to prevent simultaneous seat bookings.

## Security Measures

- JWT for user authentication
- API key for admin endpoints
- Bcrypt for password hashing
- Input validation and sanitization

## Testing

```bash
# Run backend tests
npm run test:backend

# Run frontend tests
npm run test:frontend
```

## Deployment

Refer to individual deployment guides for backend and frontend:

- Backend: Heroku, AWS, or DigitalOcean
- Frontend: Netlify, Vercel, or AWS S3

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/your-username/railway-management-system](https://github.com/your-username/railway-management-system)
