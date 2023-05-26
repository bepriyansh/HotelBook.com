# MERN Project - Hotel Booking System

This is a MERN (MongoDB, Express, React, Node.js) project for a Hotel Booking System. It consists of a server, client-side, and admin-side components. Users can create accounts, log in using JWT authentication, and search for hotels and book them within a range of dates. The backend utilizes bcrypt for password encryption and CORS for handling cross-origin requests, while the frontend uses Axios for making API requests.

## Features

### Client Side

- User Registration: Users can create an account with their details.
- User Login: Users can log in using their credentials.
- Authentication: JWT tokens are used for user authentication.
- Password Encryption: User passwords are encrypted using bcrypt.
- Search Hotels: Users can search for hotels based on the desired city and date range.
- City Suggestions: As users type in the search bar, they receive suggestions for cities.

### Admin Side

- Hotel Management: Admin can create, update, and delete hotel information.
- Room Management: Admin can add, upadate and delete rooms for each hotel.
- Admin Profiles: Admin can create additional admin profiles.
- User Profile Deletion: Admin can delete user profiles.

### State Management

- Context API: Context API is used for state management in both the admin and client sides.
- useReducer: useReducer hook is utilized for managing login and search details state.

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- State Management: Context API, useReducer
- Authentication: JWT (JSON Web Tokens)
- Password Encryption: bcrypt
- Cross-Origin Requests: CORS
- HTTP Requests: Axios
- Date Range Selection: React Date Range

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/thepriyansh01/HotelBook.com.git
```

2. Install dependencies for the server-side:

```bash
cd server
npm install
```

3. Install dependencies for the client-side:

```bash
cd client
npm install
```

4. Install dependencies for the admin-side:

```bash
cd admin
npm install
```

5. Set up the environment variables:

Create a .env file in the server directory and add the following variables:

```bash
MONGO_URI=your-mongodb-uri
JWT_SECRET_KEY=your-jwt-secret
```

6. Start the server:

```bash
cd server
nodemon
```

7. Start the client:

```bash
cd client
npm start
```

8. Start the admin:

```bash
cd admin
npm start
```

9. Access the application:
   Open your browser and visit http://localhost:3000 & http://localhost:3001 to access the Hotel Booking System.

## License

This project is licensed under the MIT License.
