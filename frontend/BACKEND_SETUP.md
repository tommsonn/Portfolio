# Backend Setup Guide

## Quick Start

### 1. Prerequisites
- Node.js v16+ installed
- MongoDB installed locally OR a remote MongoDB connection string
- 5 minutes of setup time

### 2. Install MongoDB

**Windows/Mac:**
- Download from https://www.mongodb.com/try/download/community
- Run the installer and follow setup instructions

**Linux:**
```bash
sudo apt-get install mongodb-org
```

**Using Docker (Recommended):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 3. Start Backend

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Prepare Your CV

Before using the download feature, you need to upload a CV file:

**Option A: Using cURL**
```bash
curl -X POST -F "cv=@/path/to/your/resume.pdf" http://localhost:5000/api/cv/upload
```

**Option B: Create an Admin Dashboard**
You can create a simple admin page to upload CVs to the backend.

### 5. Test CV Download

Once a CV is uploaded, the frontend button will work:
- Click "Download CV" on the portfolio homepage
- The latest CV will be downloaded as `resume.pdf`

## MongoDB Connection

Update the `MONGODB_URI` in `backend/.env`:

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**Remote MongoDB (Atlas):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## API Testing

### List all CVs
```bash
curl http://localhost:5000/api/cv/list
```

### Check server status
```bash
curl http://localhost:5000/api/health
```

### Delete a CV
```bash
curl -X DELETE http://localhost:5000/api/cv/{cv_id}
```

## Production Deployment

### Environment Variables
Update these for production:
```
MONGODB_URI=your_production_mongodb_uri
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### Deploy to Services
- Heroku
- Render
- Railway
- Vercel Functions
- AWS EC2

## Troubleshooting

**"MongoDB connection error"**
- Ensure MongoDB is running
- Check MONGODB_URI is correct
- Verify MongoDB credentials

**"Cannot find module"**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**"CORS error"**
- Update CORS_ORIGIN in `.env` to match your frontend URL
- Restart the backend server

**"Port 5000 already in use"**
```bash
# Change PORT in .env to 5001 or another available port
# Update frontend API URL accordingly
```

## Next Steps

1. Upload your CV file to the backend
2. Test the download functionality
3. Deploy both frontend and backend
4. Update social media links in Hero.jsx
5. Configure production environment variables
