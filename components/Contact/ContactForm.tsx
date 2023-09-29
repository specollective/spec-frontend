import React, { useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

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

async function sendContactEmail(contactInfo: ContactInfo): Promise<SendContactEmailResponse> {
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

const schema = yup.object().shape({
  fullName: yup.string().required('Required'),
  email: yup.string().email().required('Enter email address'),
  reason: yup
    .string()
    .oneOf(['general', 'work', 'mentor', 'partner', 'praise', 'other'])
    .required('Required'),
  message: yup.string().required('Required'),
});

export default function ContactForm() {
  const [submit, setSubmit] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(values: ContactInfo, { resetForm }: { resetForm: () => void }) {
    const response = await sendContactEmail(values);

    if (response.successful) {
      setSubmit(true);
      resetForm();
    } else {
      setFailed(true);
    }
  }

  return (
    <Formik
      initialValues={{ fullName: '', email: '', reason: '', message: '' }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form role="form" id="contact-form" className="flex flex-col font-semibold font-montserrat gap-y-4 text-base md:text-lg">
          <label htmlFor="fullName">Full Name:</label>
          <Field
            className={`border ${errors.fullName && touched.fullName ? 'border-black shadow-xl' : 'border-black'} 
              rounded-lg p-2 
              focus:outline-none
              focus:border-spec-turquoise
              focus:ring-spec-turquoise
              focus:border-2
              font-normal`}
            name="fullName"
            type="text"
            placeholder="First name Last name"
          />

          <label htmlFor="email">Email Address:*</label>
          <Field
            className={`border ${errors.email && touched.email ? 'border-pink-500 bg-red-200' : 'border-black'} 
              rounded-lg p-2
              focus:outline-none
              focus:border-spec-turquoise
              focus:ring-spec-turquoise
              focus:border-2
              focus:bg-white
              font-normal`}
            name="email"
            type="email"
            placeholder="hello@emailaddress.com"
          />
          {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}

          <label htmlFor="reason">Reason for message:</label>
          <Field
            as="select"
            className={`border ${errors.reason && touched.reason ? 'border-black shadow-xl' : 'border-black'} 
              rounded-lg p-2
              focus:outline-none
              focus:border-spec-turquoise
              focus:ring-spec-turquoise
              focus:border-2
              focus:bg-white
              font-normal`}
            name="reason"
            placeholder="Select Reason"
            rows="8"
          >
            <option value="">Select Reason</option>
            <option value="general" className="hover:bg-pink-500 hover:text-white">
              General Question
            </option>
            <option value="work">I want to work at SPEC</option>
            <option value="mentor">I want to be a mentor</option>
            <option value="partner">My company wants to partner with SPEC</option>
            <option value="praise">Praise</option>
            <option value="other">Other</option>
          </Field>

          <label htmlFor="message">Message:</label>
          <Field
            as="textarea"
            name="message"
            className={`border ${errors.message && touched.message ? 'border-black' : 'border-black'} 
              rounded-lg
              focus:outline-none
              focus:border-spec-turquoise
              focus:ring-spec-turquoise
              focus:border-2
              font-normal`}
            rows="8"
          />

          <div className="flex justify-between">
            {submit && <div>Your message has been sent!</div>}

            <button type="submit" className="underline ml-auto">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
