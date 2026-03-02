import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import * as yup from 'yup';
import { sendContactEmail } from '../../utils/contact';
import Button from '../Button';

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

  const errorClasses = 'border-red-500 border-2 bg-red-50';
  const normalClasses = 'border border-black';

  return (
    <Formik
      initialValues={{ fullName: '', email: '', reason: '', message: '' }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form role="form" id="contact-form" className="flex flex-col font-semibold font-montserrat gap-y-6 text-base md:text-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName">Full Name: <span aria-hidden="true" className="text-red-500">*</span></label>
            <Field
              className={`
                ${errors.fullName && touched.fullName ? errorClasses : normalClasses}
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
              aria-required="true"
            />
            {errors.fullName && touched.fullName && <div className="text-red-700 text-sm mt-1" role="alert">{errors.fullName}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Address: <span aria-hidden="true" className="text-red-500">*</span></label>
            <Field
              className={`
                ${errors.email && touched.email ? errorClasses : normalClasses}
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
              aria-required="true"
            />
            {errors.email && touched.email && <div className="text-red-700 text-sm mt-1" role="alert">{errors.email}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reason">
              Reason for message: <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              className={`
                ${errors.reason && touched.reason ? errorClasses : normalClasses}
                rounded-lg px-4 py-3
                focus:outline-none
                focus:border-spec-turquoise
                focus:ring-spec-turquoise
                focus:border-2
                focus:bg-white
                font-normal
              `}
              name="reason"
              aria-required="true"
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
            {errors.reason && touched.reason && <div className="text-red-700 text-sm mt-1" role="alert">{errors.reason}</div>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message">Message: <span aria-hidden="true" className="text-red-500">*</span></label>
            <Field
              as="textarea"
              name="message"
              className={`
                ${errors.message && touched.message ? errorClasses : normalClasses}
                rounded-lg px-4 py-3
                focus:outline-none
                focus:border-spec-turquoise
                focus:ring-spec-turquoise
                focus:border-2
                font-normal
                min-h-32
              `}
              rows="8"
              aria-required="true"
            />
            {errors.message && touched.message && <div className="text-red-700 text-sm mt-1" role="alert">{errors.message}</div>}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div role="status" aria-live="polite">
              {submit && <div className="text-green-600 font-semibold">Your message has been sent!</div>}
              {failed && <div className="text-red-600 font-semibold">Failed to send message. Please try again.</div>}
            </div>
            <div className="ml-auto">
              <Button type="submit" variant="primary" size="md">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
