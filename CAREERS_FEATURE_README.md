# Careers Feature Implementation

This document describes the careers feature that has been implemented for the Infinity Automated Solutions website.

## Overview

The careers feature includes:
1. A public careers page where users can view available job positions and submit applications
2. An HR dashboard for managing job positions and reviewing applications
3. Email integration that opens the user's email client with a draft email to HR
4. Application tracking and management system

## Features

### Public Careers Page (`/careers`)

- **Job Positions Display**: Shows all active job positions with details like:
  - Job title and department
  - Location and job type
  - Experience level and salary range
  - Job description

- **Application Form**: Users can submit applications with:
  - Full name, email, and phone number
  - Position interested in (auto-populated when clicking "Apply for this position")
  - Additional information

- **Smart Form Integration**: 
  - Clicking "Apply for this position" automatically scrolls to the form
  - Position field is pre-populated with the selected job title
  - Smooth scrolling animation for better UX

- **Email Integration**: 
  - After form submission, user's email client opens with a draft email to `hr@infinitysols.com`
  - Email includes all application details in a professional format
  - User can attach resume and cover letter before sending

- **Responsive Design**: Works perfectly on all devices with modern UI

### HR Dashboard (`/dashboard/hr`)

- **Job Positions Management**:
  - Add new job positions with detailed information
  - Edit existing positions
  - Toggle active/inactive status
  - Delete positions
  - View all positions in a clean table format

- **Applications Management**:
  - View all submitted applications
  - Update application status (New, Reviewed, Shortlisted, Interviewed, Hired, Rejected)
  - Contact applicants directly via email
  - View application details including additional information
  - Filter and sort applications

- **Status Tracking**: Color-coded status badges for easy identification

## Database Schema

### Job Positions Table
```sql
CREATE TABLE job_positions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    department TEXT,
    location TEXT,
    type TEXT CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
    experience_level TEXT CHECK (experience_level IN ('entry', 'mid', 'senior', 'lead')),
    description TEXT NOT NULL,
    requirements TEXT[],
    responsibilities TEXT[],
    benefits TEXT[],
    salary_range TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### Career Applications Table
```sql
CREATE TABLE career_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    position_interested_in TEXT NOT NULL,
    additional_info TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## API Endpoints

### Career Applications
- `POST /api/career-application` - Submit new application
- `GET /api/career-application` - Get all applications
- `GET /api/career-applications` - Get applications for dashboard
- `PATCH /api/career-applications` - Update application status

### Job Positions
- `GET /api/job-positions` - Get all active job positions
- `POST /api/job-positions` - Create new job position
- `PUT /api/job-positions/[id]` - Update job position
- `DELETE /api/job-positions/[id]` - Delete job position

## Recent Fixes Applied

### 1. Removed ID Number Field
- Removed ID Number field from application form
- Updated database schema to remove id_number column
- Updated all API routes and components accordingly

### 2. Fixed Header Navbar Overlap
- Added proper top padding to main content area
- Updated LayoutContent component to handle padding globally
- Ensured header doesn't overlap with page content

### 3. Enhanced "Apply for this Position" Functionality
- Added smooth scrolling to form when clicking apply button
- Auto-populates position field with selected job title
- Improved user experience with better navigation

### 4. Improved Email Integration
- Enhanced email draft format with professional layout
- Removed ID number from email content
- Better formatting for HR team review

### 5. Dashboard Applications Display
- Added comprehensive applications management in HR dashboard
- Status tracking with color-coded badges
- Direct email contact functionality
- Application details view with all information

## Navigation Integration

- Added "CAREERS" to main navigation menu
- Added "HR Management" to dashboard navigation
- Proper routing and navigation structure

## Sample Data

The system includes sample job positions and applications for testing:
- 3 sample job positions (Senior Mechanical Engineer, Software Engineer, Sales Manager)
- 3 sample applications with different statuses

## Technical Implementation

- Built with Next.js 14 and TypeScript
- Uses Supabase for database and authentication
- Framer Motion for animations
- Tailwind CSS for styling
- Responsive design with mobile-first approach
- SEO optimized with proper meta tags

## Usage Instructions

### For Job Seekers:
1. Visit `/careers` page
2. Browse available positions
3. Click "Apply for this position" on desired job
4. Fill out the application form
5. Submit - email client will open with draft email
6. Attach resume and cover letter, then send email

### For HR Team:
1. Access `/dashboard/hr` (requires authentication)
2. Manage job positions (add/edit/delete)
3. Review applications and update status
4. Contact applicants directly via email
5. Track application progress through status updates

## Security Features

- Form validation on both client and server side
- Database constraints and validation
- Proper error handling and user feedback
- Secure API endpoints with validation
