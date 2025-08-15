'use client';

export default function TestOAuthMinimal() {
  const testUrls = [
    {
      name: "1. Basic Zoho OAuth (No Client ID)",
      url: "https://accounts.zoho.com/oauth/v2/auth",
      description: "Should show Zoho OAuth page (may show error about missing client_id)"
    },
    {
      name: "2. With Client ID Only",
      url: "https://accounts.zoho.com/oauth/v2/auth?client_id=1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK",
      description: "Should show error about missing response_type or redirect_uri if app exists"
    },
    {
      name: "3. Minimal Working OAuth",
      url: "https://accounts.zoho.com/oauth/v2/auth?client_id=1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK&response_type=code&redirect_uri=https://infinitysols.vercel.app/api/oauth/callback",
      description: "Should work if app exists and redirect URI is configured"
    },
    {
      name: "4. Full OAuth URL (From Debug)",
      url: "https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL%2CZohoCRM.settings.ALL%2CZohoCRM.users.READ&client_id=1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK&response_type=code&access_type=offline&redirect_uri=https%3A%2F%2Finfinitysols.vercel.app%2Fapi%2Foauth%2Fcallback&state=infinity_automated_solutions_2024&prompt=consent",
      description: "Your full OAuth URL from the debug page"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">OAuth Minimal Test</h1>
      
      <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-8">
        <h2 className="font-semibold text-yellow-900 mb-3">Testing Strategy:</h2>
        <p className="text-yellow-800 text-sm">
          We'll test each URL progressively to identify exactly where the issue occurs.
          Open each link in a new tab and note what happens.
        </p>
      </div>

      <div className="space-y-6">
        {testUrls.map((test, index) => (
          <div key={index} className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{test.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{test.description}</p>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open(test.url, '_blank')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                🔗 Test This URL
              </button>
              <div className="text-xs font-mono text-gray-500 break-all">
                {test.url.length > 100 ? `${test.url.substring(0, 100)}...` : test.url}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-red-50 border border-red-200 p-6 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-3">What Each Result Means:</h3>
        <div className="space-y-2 text-sm text-red-800">
          <div><strong>✅ "Page not found"</strong> → App doesn't exist or wrong Zoho account</div>
          <div><strong>✅ "Invalid client"</strong> → App exists but has issues</div>
          <div><strong>✅ "Invalid redirect URI"</strong> → App exists but redirect URI not configured</div>
          <div><strong>✅ "Missing required parameter"</strong> → App exists and working</div>
          <div><strong>✅ Login page or consent page</strong> → Everything is working! 🎉</div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">If App Doesn't Exist:</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div>1. Go to <a href="https://api-console.zoho.com/" target="_blank" className="underline">Zoho API Console</a></div>
          <div>2. Make sure you're in the right Zoho account</div>
          <div>3. Look for Client ID: 1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK</div>
          <div>4. If not found, we may need to create a new app</div>
        </div>
      </div>
    </div>
  );
}
