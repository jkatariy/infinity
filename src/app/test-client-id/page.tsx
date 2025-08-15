'use client';

export default function TestClientId() {
  const clientId = '1000.KPNB9RXVFZUD4HYFM8KZH32PF1MWDD';
  
  const testUrls = [
    {
      datacenter: 'Global (.com)',
      url: `https://accounts.zoho.com/oauth/v2/auth?client_id=${clientId}&response_type=code&redirect_uri=https://infinitysols.vercel.app/api/oauth/callback`,
      console: 'https://api-console.zoho.com/'
    },
    {
      datacenter: 'Europe (.eu)',
      url: `https://accounts.zoho.eu/oauth/v2/auth?client_id=${clientId}&response_type=code&redirect_uri=https://infinitysols.vercel.app/api/oauth/callback`,
      console: 'https://api-console.zoho.eu/'
    },
    {
      datacenter: 'India (.in)',
      url: `https://accounts.zoho.in/oauth/v2/auth?client_id=${clientId}&response_type=code&redirect_uri=https://infinitysols.vercel.app/api/oauth/callback`,
      console: 'https://api-console.zoho.in/'
    },
    {
      datacenter: 'Australia (.com.au)',
      url: `https://accounts.zoho.com.au/oauth/v2/auth?client_id=${clientId}&response_type=code&redirect_uri=https://infinitysols.vercel.app/api/oauth/callback`,
      console: 'https://api-console.zoho.com.au/'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Test Client ID in Different Data Centers</h1>
      
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
        <h2 className="font-semibold text-blue-900 mb-3">Testing Client ID:</h2>
        <code className="text-lg font-mono">{clientId}</code>
      </div>

      <div className="space-y-6">
        {testUrls.map((test, index) => (
          <div key={index} className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{test.datacenter}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Test OAuth URL:</h4>
                <button
                  onClick={() => window.open(test.url, '_blank')}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  🔗 Test OAuth in {test.datacenter}
                </button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Check API Console:</h4>
                <button
                  onClick={() => window.open(test.console, '_blank')}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  🌐 Open {test.datacenter} Console
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
        <h3 className="font-semibold text-yellow-900 mb-3">What to Look For:</h3>
        <div className="space-y-2 text-sm text-yellow-800">
          <div><strong>✅ "Invalid Client"</strong> → App doesn't exist in this data center</div>
          <div><strong>✅ "Invalid redirect URI"</strong> → App exists! Just need to configure redirect URI</div>
          <div><strong>✅ "Missing required parameter"</strong> → App exists and working!</div>
          <div><strong>✅ Login page or consent page</strong> → Perfect! App is fully configured 🎉</div>
        </div>
      </div>

      <div className="mt-8 bg-red-50 border border-red-200 p-6 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-3">If All Show "Invalid Client":</h3>
        <div className="space-y-2 text-sm text-red-800">
          <div>1. The app doesn't exist in any data center</div>
          <div>2. You might need to create a new app</div>
          <div>3. Or you're signed into the wrong Zoho account</div>
          <div>4. The Client ID might have a typo</div>
        </div>
      </div>
    </div>
  );
}
