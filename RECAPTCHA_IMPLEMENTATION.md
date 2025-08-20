# reCAPTCHA v2 Implementation

## Overview
reCAPTCHA v2 has been successfully implemented on the careers and request quote forms to protect against spam and automated submissions.

## Implementation Details

### 1. Dependencies Installed
- `react-google-recaptcha` - React component for reCAPTCHA
- `@types/react-google-recaptcha` - TypeScript definitions

### 2. Components Created

#### ReCaptcha Component (`src/components/ReCaptcha.tsx`)
- Reusable reCAPTCHA component
- Uses the provided site key: `6Lf8qKwrAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO`
- Light theme with normal size
- Handles token verification callback

#### API Route (`src/app/api/verify-recaptcha/route.ts`)
- Server-side verification endpoint
- Uses the provided secret key: `6Lf8qKwrAAAAAA7XHML2pcj2tPt_6gJfJWnhiabL`
- Verifies tokens with Google's reCAPTCHA API

### 3. Forms Updated

#### Careers Form (`src/app/careers/page.tsx`)
- Added reCAPTCHA component before submit button
- Client-side validation to ensure reCAPTCHA is completed
- Server-side verification before form submission
- Error handling for incomplete reCAPTCHA

#### Request Quote Form (`src/components/ZohoCRMForm.tsx`)
- Added reCAPTCHA component before submit button
- Client-side validation to ensure reCAPTCHA is completed
- Server-side verification before form submission
- Error handling for incomplete reCAPTCHA

### 4. Layout Updates
- Added reCAPTCHA script to `src/app/layout.tsx`
- Script loads asynchronously to avoid blocking page load

## Features

### Security
- **Client-side validation**: Prevents form submission without reCAPTCHA completion
- **Server-side verification**: Validates reCAPTCHA tokens with Google's API
- **Error handling**: Clear error messages for incomplete verification

### User Experience
- **Non-intrusive**: reCAPTCHA appears naturally in form flow
- **Responsive**: Works on all device sizes
- **Accessible**: Follows accessibility guidelines
- **Error feedback**: Clear messages when reCAPTCHA is not completed

### Technical Implementation
- **TypeScript support**: Full type safety
- **React hooks**: Proper state management
- **Error boundaries**: Graceful error handling
- **Performance**: Minimal impact on page load

## Configuration

### Site Key
```
6Lf8qKwrAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO
```

### Secret Key
```
6Lf8qKwrAAAAAA7XHML2pcj2tPt_6gJfJWnhiabL
```

## Usage

The reCAPTCHA component is automatically included in:
1. **Careers page** (`/careers`) - Job application form
2. **Request quote forms** - All product quote request forms throughout the site

Users must complete the reCAPTCHA verification before submitting these forms.

## Testing

To test the implementation:
1. Visit `/careers` page and try to submit the application form
2. Visit any product page and click "Request Quote"
3. Verify that reCAPTCHA appears and form submission is blocked until completed
4. Check that successful verification allows form submission

## Maintenance

- The reCAPTCHA keys are configured in the component and API route
- To update keys, modify:
  - `src/components/ReCaptcha.tsx` (site key)
  - `src/app/api/verify-recaptcha/route.ts` (secret key)
- Monitor Google reCAPTCHA console for analytics and potential issues
