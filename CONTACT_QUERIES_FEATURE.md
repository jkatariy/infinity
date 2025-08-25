# 📧 Contact Queries Management Feature

## Overview

The Contact Queries feature has been added to the admin dashboard to help manage and respond to contact form submissions from the website. This feature provides a comprehensive interface for viewing, filtering, and responding to customer inquiries.

## Features

### ✅ **Contact Queries Dashboard**
- **New Menu Section**: Added "Contact Queries" to the admin dashboard navigation
- **Message List**: Displays all contact form submissions in a clean table format
- **Status Management**: Track message status (New, Read, Replied, Archived)
- **Email Integration**: One-click email client integration for quick responses
- **Modal View**: Click "View" to see full message details in a responsive modal
- **Keyboard Support**: Press Escape key to close the modal
- **Error Handling**: Robust error handling for modal operations

### ✅ **Message Management**
- **View Details**: Click "View" to see full message content in a modal
- **Status Updates**: Change message status directly from the table
- **Reply Functionality**: Click "Reply" to open email client with pre-filled recipient and subject
- **Filtering**: Filter messages by status (All, New, Read, Replied, Archived)

### ✅ **User Experience**
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Status changes are reflected immediately
- **Pagination**: Handles large numbers of messages efficiently
- **Loading States**: Smooth loading animations and feedback

## Technical Implementation

### Bug Fixes Applied
- **Modal Display Issue**: Fixed syntax error with framer-motion components
- **Z-Index Conflicts**: Resolved modal layering issues with proper z-index values
- **Keyboard Accessibility**: Added Escape key support for closing modals
- **Error Handling**: Added try-catch blocks for robust error handling
- **Body Scroll Lock**: Prevented background scrolling when modal is open

### Database Schema
The feature uses the existing `contact_messages` table:
```sql
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    source TEXT DEFAULT 'contact_form',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### API Endpoints

#### GET `/api/contact-messages`
- **Purpose**: Fetch contact messages with pagination and filtering
- **Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `status`: Filter by status (optional)
- **Response**: Messages array with pagination info

#### PATCH `/api/contact-messages`
- **Purpose**: Update message status
- **Body**: `{ id: string, status: string }`
- **Response**: Updated message data

### File Structure
```
src/
├── app/
│   ├── dashboard/
│   │   └── contact-queries/
│   │       └── page.tsx          # Contact queries dashboard page
│   └── api/
│       └── contact-messages/
│           └── route.ts          # API endpoints for contact messages
└── components/
    └── (existing components)
```

## Usage Guide

### Accessing Contact Queries
1. Log in to the admin dashboard
2. Navigate to "Contact Queries" in the sidebar menu
3. View all contact form submissions

### Managing Messages
1. **View Message**: Click "View" to see full message details
2. **Update Status**: Use the status dropdown to change message status
3. **Reply**: Click "Reply" to open email client with recipient pre-filled
4. **Filter**: Use the status filter to view specific message types

### Message Statuses
- **New**: Recently submitted messages (blue badge)
- **Read**: Messages that have been viewed (yellow badge)
- **Replied**: Messages that have been responded to (green badge)
- **Archived**: Completed or closed messages (gray badge)

## Email Integration

The "Reply" functionality uses the `mailto:` protocol to open the user's default email client with:
- **To**: The contact's email address
- **Subject**: "Re: [Original Subject]"
- **Body**: Empty (user can compose their response)

## Styling & Design

The feature follows the existing design system:
- **Colors**: Consistent with the admin dashboard theme
- **Typography**: Uses the same font hierarchy
- **Spacing**: Follows established spacing patterns
- **Animations**: Smooth transitions using Framer Motion
- **Dark Theme**: Compatible with the existing dark theme preference

## Security & Permissions

- **Authentication Required**: Only authenticated admin users can access
- **Data Validation**: All inputs are validated on both client and server
- **Error Handling**: Comprehensive error handling and user feedback
- **Rate Limiting**: API endpoints include rate limiting protection

## Future Enhancements

Potential improvements for future versions:
- **Bulk Actions**: Select multiple messages for batch operations
- **Email Templates**: Pre-defined response templates
- **Auto-Response**: Automatic acknowledgment emails
- **Message Search**: Search functionality for finding specific messages
- **Export Functionality**: Export messages to CSV/PDF
- **Email Integration**: Direct email sending from the dashboard
- **Message Threading**: Group related messages together
- **Analytics**: Message volume and response time analytics

## Testing

The feature has been tested with:
- ✅ Existing contact messages in the database
- ✅ Contact form submissions
- ✅ Status updates
- ✅ Email client integration
- ✅ Responsive design
- ✅ Error handling

## Support

For technical support or feature requests, please contact the development team or create an issue in the project repository.
