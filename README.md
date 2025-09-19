# Simple MVC Backend API

## Overview
This is a Node.js Express backend API with SQLite database, featuring user authentication and CRUD operations for items.
## Architecture
- **Backend**: Node.js with Express framework
- **Database**: SQLite with database.sqlite file
- **Authentication**: JWT tokens with bcrypt password hashing

## API Endpoints
- `GET /api/hello` - Test endpoint
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/items` - Get all items (requires auth)
- `POST /api/items` - Create new item (requires auth)
- `GET /api/compare` - Compare functionality

## Default User
- Username: `admin`
- Password: `admin123`

## Project Structure
- `server.js` - Main server file with Express setup
- `db.js` - Database connection and query helpers
- `config.js` - Configuration settings
- `controllers/` - Business logic controllers
- `middleware/` - Authentication middleware
- `models/` - Data models
- `routes/` - API route definitions

## Recent Changes
- **2025-09-19**: Initial setup
  - Installed Node.js dependencies
  - Configured workflow for backend server
  - Set up deployment configuration for VM target
  - Verified API endpoints and authentication system

## Configuration
- **Workflow**: Server runs with `npm start` command
- **Deployment**: Configured for VM target with persistent state
- **Environment**: Development and production ready