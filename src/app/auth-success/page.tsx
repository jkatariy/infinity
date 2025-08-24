export default function AuthSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Successful!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Your Zoho CRM integration has been successfully authenticated. 
          You can now close this window and return to your application.
        </p>
        
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <h3 className="text-sm font-medium text-green-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Your tokens are now securely stored</li>
              <li>• Lead processing will work automatically</li>
              <li>• Tokens will refresh automatically when needed</li>
            </ul>
          </div>
          
          <a 
            href="/test-comprehensive" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
