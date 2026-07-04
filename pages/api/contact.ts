// Reference: https://javascript.plainenglish.io/sending-emails-with-nodemailer-in-next-js-ccada06abfc9

import { sendMail } from "../../service/mailService";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  try {
    const { method } = req;
    if (method === "POST") {
      // GIEE partner inquiries route to a dedicated recipient when configured;
      // every other form keeps going to the Nodemailer account. The recipient is
      // chosen server-side from `formType` (never from a client-supplied address)
      // so the endpoint can't be used as an open relay.
      const isGiee = body.formType === "giee-partner";
      const recipient =
        (isGiee && process.env.GIEE_INQUIRY_EMAIL) ||
        `${process.env.NODE_MAILER_EMAIL}`;
      const subject = isGiee
        ? "GIEE Partnership Inquiry"
        : "Website Contact Form Submission";
      // Do something for POST requests
      await sendMail(
        subject,
        recipient,
        `Name: ${body.fullName}
Email: ${body.email}
Reason: ${body.reason}
Message: ${body.message}`
      );
      // Don't echo the submitted personal data back in the response
      // (data minimization) — the client only checks response.ok.
      res.status(201).json({ data: "Message sent" });
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
