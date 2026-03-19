# Portfolio Backend API

Node.js/Express backend server for portfolio CV download and contact form functionality with MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB running locally or connection string to a remote MongoDB instance

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Download CV
**GET** `/api/cv/download`
- Downloads the latest CV file
- Returns PDF file

### Upload CV
**POST** `/api/cv/upload`
- Upload a new CV file
- Accepts: PDF files only (max 5MB)
- Returns: CV metadata

### List All CVs
**GET** `/api/cv/list`
- Retrieves all uploaded CVs
- Returns: Array of CV records

### Delete CV
**DELETE** `/api/cv/:id`
- Delete a specific CV by ID
- Returns: Success message

## Contact API Endpoints

### Submit Contact Form
**POST** `/api/contact/submit`
- Submit a contact form message
- Body: `{ name, email, subject, message }`
- Returns: Contact record with ID

### List All Contacts
**GET** `/api/contact/list`
- Retrieve all contact messages (admin only)
- Returns: Array of contact records

### Update Contact Status
**PATCH** `/api/contact/:id/status`
- Update contact message status (new, read, replied)
- Body: `{ status: "read" | "replied" }`
- Returns: Updated contact record

### Delete Contact
**DELETE** `/api/contact/:id`
- Delete a contact message
- Returns: Success message

## Frontend Integration

The frontend calls the download endpoint:
```javascript
const response = await fetch('http://localhost:5000/api/cv/download');
const blob = await response.blob();
// Download file
```

## Database Setup

MongoDB collections:
- `cvs` - Stores CV metadata and file information
- `contacts` - Stores contact form submissions

## Project Structure

```
backend/
├── models/
│   ├── CV.js           # MongoDB CV schema
│   └── Contact.js      # MongoDB Contact schema
├── routes/
│   ├── cvRoutes.js     # CV API routes
│   └── contactRoutes.js # Contact API routes
├── public/
│   └── uploads/        # CV file storage
├── server.js           # Express server setup
├── .env                # Environment variables
└── package.json        # Dependencies
```

## Admin Dashboard

Access the admin panel at `http://localhost:5173/admin`

**Features:**
- Upload new CV files
- View all uploaded CVs
- Delete CVs
- Default password: `admin123`

**Usage:**
1. Click the gear icon (⚙️) in the navigation bar
2. Enter the default password
3. Upload your CV using the form
4. Your CV will be available for download on the portfolio homepage
