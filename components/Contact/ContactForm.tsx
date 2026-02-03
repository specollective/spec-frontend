import React, { useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { sendContactEmail } from '../../utils/contact';
interface ContactInfo {
  fullName: string;
  email: string;
  reason: 'general' | 'work' | 'mentor' | 'partner' | 'praise' | 'other' | '';
  message: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required('Required'),
  email: yup.string().email().required('Enter email address'),
  message: yup.string().required('Required'),
  reason: yup
    .string()
    .oneOf(['general', 'work', 'mentor', 'partner', 'praise', 'other'])
    .required('Required'),
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
        <Form role="form" id="contact-form" className="flex flex-col font-semibold font-montserrat gap-y-6 text-base md:text-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName">Full Name: <span className="text-red-500" aria-label="required">*</span></label>
            <Field
              className={`
                border ${errors.fullName && touched.fullName ? 'border-pink-500 bg-red-200' : 'border-black'}
                rounded-lg px-4 py-3
                focus:outline-none
                focus:border-spec-turquoise
                focus:ring-spec-turquoise
                focus:border-2
                font-normal
              `}
              name="fullName"
              type="text"
              placeholder="First name Last name"
              autoComplete="name"
            />
            {errors.fullName && touched.fullName && <div className="text-red-500 text-sm mt-1">{errors.fullName}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address: <span className="text-red-500" aria-label="required">*</span></label>
            <Field
              className={`
                border ${errors.email && touched.email ? 'border-pink-500 bg-red-200' : 'border-black'}
                rounded-lg px-4 py-3
                focus:outline-none
                focus:border-spec-turquoise
                focus:ring-spec-turquoise
                focus:border-2
                focus:bg-white
                font-normal
              `}
              name="email"
              type="email"
              placeholder="hello@emailaddress.com"
              autoComplete="email"
            />
            {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reason">
              Reason for message: <span className="text-red-500" aria-label="required">*</span>
            </label>
            <Field
              as="select"
              className={`
                border ${errors.reason && touched.reason ? 'border-black shadow-xl' : 'border-black'}
                rounded-lg px-4 py-3
                focus:outline-none
                focus:border-spec-turquoise
                focus:ring-spec-turquoise
                focus:border-2
                focus:bg-white
                font-normal
              `}
              name="reason"
            >
              <option value="">
                Select Reason
              </option>
              <option value="general">
                General Question
              </option>
              <option value="work">I want to work at SPEC</option>
              <option value="mentor">I want to be a mentor</option>
              <option value="partner">My company wants to partner with SPEC</option>
              <option value="praise">Praise</option>
              <option value="other">Other</option>
            </Field>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message">Message: <span className="text-red-500" aria-label="required">*</span></label>
            <Field
              as="textarea"
              name="message"
              className={`
                border ${errors.message && touched.message ? 'border-black' : 'border-black'}
                rounded-lg px-4 py-3
                focus:outline-none
                focus:border-spec-turquoise
                focus:ring-spec-turquoise
                focus:border-2
                font-normal
                min-h-32
              `}
              rows="8"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div role="status" aria-live="polite">
              {submit && <div className="text-green-600 font-semibold">Your message has been sent!</div>}
              {failed && <div className="text-red-600 font-semibold">Failed to send message. Please try again.</div>}
            </div>
            <button type="submit" className="underline ml-auto hover:text-spec-turquoise transition-colors focus:outline-none focus:ring-2 focus:ring-spec-turquoise focus:ring-offset-2 px-2">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
