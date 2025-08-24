# reCAPTCHA v2 Implementation Guide

This document describes the implementation of Google reCAPTCHA v2 (checkbox "I'm not a robot") on the Infinity Automated Solutions Next.js website.

## Overview

reCAPTCHA v2 has been successfully integrated into two forms:
1. **Careers Form** - Job application form at `/careers`
2. **Request Quote Form** - Product quote request form (used across multiple pages)

## Implementation Details

### 1. Environment Variables

The following environment variables have been added to `.env.local`:

```bash
# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lf8qKwrAAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO
RECAPTCHA_SECRET_KEY=6Lf8qKwrAAAAAAA7XHML2pcj2tPt_6gJfJWnhiabL
```

### 2. Components Created

#### Reusable reCAPTCHA Component (`src/components/Recaptcha.tsx`)
- **Features**: 
  - Loads reCAPTCHA script dynamically
  - Handles verification callbacks
  - Provides reset functionality
  - Responsive design
  - TypeScript support with proper typing

#### Verification Utility (`src/utils/verifyRecaptcha.ts`)
- **Features**:
  - Server-side token verification
  - Error handling
  - Environment variable validation

### 3. API Routes Updated

#### Careers API (`src/app/api/career-application/route.ts`)
- Added reCAPTCHA token validation
- Enhanced error handling
- Maintains existing functionality

#### Quote Form API (`src/app/api/leads/quote-form/route.ts`)
- Added reCAPTCHA token validation
- Enhanced error handling
- Maintains existing functionality

### 4. Form Integration

#### Careers Form (`src/app/careers/page.tsx`)
- **Features**:
  - Client-side reCAPTCHA validation
  - Error message display
  - Automatic reset on errors
  - Seamless user experience

#### Quote Form (`src/components/ZohoCRMForm.tsx`)
- **Features**:
  - Client-side reCAPTCHA validation
  - Error message display
  - Automatic reset on errors
  - Modal-friendly implementation

### 5. Styling

#### Global CSS (`src/app/globals.css`)
Added responsive reCAPTCHA styles:
```css
/* reCAPTCHA Styles */
.recaptcha-container {
  margin: 1rem 0;
}

/* Mobile responsiveness for reCAPTCHA */
@media (max-width: 640px) {
  .recaptcha-container iframe {
    transform: scale(0.9);
    transform-origin: 0 0;
  }
}

/* Error styling for reCAPTCHA */
.recaptcha-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
}
```

## Security Features

### 1. Client-Side Validation
- Prevents form submission without reCAPTCHA completion
- Clear error messages for user feedback
- Automatic reset on validation errors

### 2. Server-Side Verification
- Validates reCAPTCHA tokens against Google's API
- Prevents bypassing client-side validation
- Comprehensive error handling

### 3. Environment Variable Security
- Secret key stored server-side only
- Public key exposed only to client
- Proper separation of concerns

## User Experience

### 1. Responsive Design
- Works on all device sizes
- Mobile-optimized scaling
- Touch-friendly interface

### 2. Error Handling
- Clear error messages
- Automatic reCAPTCHA reset on errors
- Graceful fallback behavior

### 3. Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility

## Testing

### 1. Development Testing
- Test both forms with reCAPTCHA enabled
- Verify error handling scenarios
- Test responsive behavior

### 2. Production Testing
- Verify environment variables are set correctly
- Test with real reCAPTCHA tokens
- Monitor for any console errors

## Deployment

### 1. Vercel Deployment
- Environment variables automatically included
- No additional configuration required
- Works with Vercel's edge functions

### 2. Environment Variables
Ensure the following are set in Vercel:
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`

## Troubleshooting

### Common Issues

1. **reCAPTCHA not loading**
   - Check if `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
   - Verify internet connection
   - Check browser console for errors

2. **Verification failing**
   - Check if `RECAPTCHA_SECRET_KEY` is set
   - Verify domain is registered in reCAPTCHA console
   - Check server logs for detailed errors

3. **Mobile display issues**
   - Verify CSS scaling is working
   - Test on different mobile devices
   - Check viewport meta tag

### Debug Mode

To enable debug logging, add to environment variables:
```bash
NODE_ENV=development
```

## Maintenance

### 1. Regular Updates
- Monitor reCAPTCHA service status
- Update dependencies as needed
- Review Google's reCAPTCHA documentation

### 2. Performance Monitoring
- Monitor API response times
- Track verification success rates
- Monitor for any security issues

## Security Best Practices

1. **Never expose secret key to client**
2. **Always verify tokens server-side**
3. **Use HTTPS in production**
4. **Monitor for abuse patterns**
5. **Keep dependencies updated**

## Support

For issues related to reCAPTCHA implementation:
1. Check this documentation
2. Review Google's reCAPTCHA documentation
3. Check browser console for errors
4. Verify environment variables are set correctly

## Future Enhancements

Potential improvements:
1. **reCAPTCHA v3 integration** for invisible protection
2. **Rate limiting** for form submissions
3. **Analytics integration** for bot detection
4. **A/B testing** different reCAPTCHA configurations

---

**Implementation Date**: December 2024  
**Version**: 1.0  
**Status**: Production Ready
