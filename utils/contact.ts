const API_URL = process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:3000/api/contact';

interface ContactInfo {
  fullName: string;
  email: string;
  reason: 'general' | 'work' | 'mentor' | 'partner' | 'praise' | 'other' | '';
  message: string;
}

interface SendContactEmailResponse {
  successful: boolean;
  json: any;
}

export async function sendContactEmail(contactInfo: ContactInfo): Promise<SendContactEmailResponse> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactInfo),
    });
    const json = await response.json();

    return {
      successful: response.ok,
      json,
    };
  } catch (e) {
    return {
      successful: false,
      json: {},
    };
  }
}