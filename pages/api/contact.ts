
import type { NextApiRequest, NextApiResponse } from 'next'

// set preview data object with name, email, reason and message

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body

  // Use these environment variables to configure NodeMailer
  // In development you can create a .env.local file with these variables
  // Add use your own email to test that it works. The production values
  // will be set in DigitalOcean App Platform.
  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_MAILER_EMAIL)
    console.log(process.env.NODE_MAILER_PASSWORD)
    console.log(process.env.CONTACT_EMAIL)
  }

  // response return 200 status code and json data with body object, fullName, reason, email and message
  res.status(201).json({
    data: `${body.fullName} ${body.email} ${body.reason} ${body.message}`
  })
}
