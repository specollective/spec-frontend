
import type { NextApiRequest, NextApiResponse } from 'next'

// set preview data object with name, email, reason and message

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body

  // response return 200 status code and json data with body object, fullName, reason, email and message
  res.status(201).json({
    data: `${body.fullName} ${body.email} ${body.reason} ${body.message}`
  })
}
