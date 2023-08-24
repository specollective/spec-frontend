// Reference: https://javascript.plainenglish.io/sending-emails-with-nodemailer-in-next-js-ccada06abfc9

import { sendMail } from "../../service/mailService";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  try {
    const { method } = req;
    if (method === "POST") {
      // Do something for POST requests
      await sendMail(
        "Website Contact Form Submission",
        `${process.env.NODE_MAILER_EMAIL}`,
        `Name: ${body.fullName} 
Email: ${body.email}  
Reason: ${body.reason} 
Message: ${body.message}`
      );
      res.status(201).json({
        data: `${body.fullName} ${body.email} ${body.reason} ${body.message}`
      });
    } else {
      // Handle all other request methods
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }

  } catch (err) {
    if (err instanceof Error){
      res.status(400).json({
        error_code: "api_one",
        message: err.message,
      })
    }
    else{
      console.log('Unexpected error', err);
    }
    ;
  }
};
