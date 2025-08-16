import { NextRequest, NextResponse } from 'next/server';

interface ChatbotLeadData {
  name: string;
  email: string;
  phone: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body as ChatbotLeadData;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send minimal data to Zoho CRM (only name, email, phone)
    const first = (name || '').trim().split(/\s+/)[0] || '';
    const parts = (name || '').trim().split(/\s+/);
    const last = parts.length > 1 ? parts[parts.length - 1] : 'Unknown';
    const origin = new URL(request.url).origin;

    const zohoRes = await fetch(`${origin}/api/sendToZoho`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        phone,
        firstName: first,
        lastName: last,
        leadSource: 'Chatbot',
      }),
    });

    const zohoJson = await zohoRes.json().catch(() => ({}));
    if (!zohoRes.ok) {
      console.error('Zoho submit (chatbot) failed:', zohoJson);
      return NextResponse.json(
        { error: zohoJson?.error || 'Failed to submit to Zoho CRM' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead submitted to Zoho successfully',
      zohoId: zohoJson?.zohoId,
    });
  } catch (error: any) {
    console.error('Error in chatbot leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// No GET endpoint since we do not store chatbot leads locally anymore
