import React from 'react';
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from 'yup';



export default function ContactForm() {
    const [submit, setSubmit] = React.useState(false)
    const schema = yup.object().shape({
        fullName: yup.string().required("Required"),
        email: yup.string().email().required("Enter email address"),
        reason: yup
            .string()
            .oneOf(["general", "work", "mentor", "partner", "praise", "other"])
            .required("Required"),
        message: yup.string().required("Required")
    })
    function onSubmit(values, { resetForm }) {
        setSubmit(true)
        resetForm()

    }


    return (
        <Formik
            initialValues={{ fullName: "", email: "", reason: "", message: "" }}
            validationSchema={schema}

            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form className='flex flex-col'>
                    <label htmlFor="fullName">Full Name:</label>
                    <Field
                        className={`border ${errors.fullName && touched.fullName ? 'border-black bg-gray-300' : 'border-black'} rounded`}
                        name="fullName"
                        type="text"
                        placeholder="Full name Last name"
                    />
                    <label htmlFor="email">Email Address*:</label>
                    <Field
                        className={`border ${errors.email && touched.email ? 'border-pink-500 bg-red-200' : 'border-black'} rounded`}
                        name="email"
                        type="email"
                        placeholder="hello@emailaddress.com"
                    />
                    {errors.email && touched.email ? <div className='text-red-500'>{errors.email}</div> : null}
                    <label htmlFor="reason">Reason for message:</label>
                    <Field
                        as="select"
                        className={`border ${errors.reason && touched.reason ? 'border-black bg-gray-300' : 'border-black'} rounded`}
                        name="reason"
                        placeholder="Select Reason"
                    >
                        <option value="">Select Reason</option>
                        <option value="general">General Question</option>
                        <option value="work">I want to work at SPEC</option>
                        <option value="mentor">I want to be a mentor</option>
                        <option value="partner">My company wants to partner with SPEC</option>
                        <option value="praise">Praise</option>
                        <option value="other">Other</option>
                    </Field>

                    <label htmlFor="message">Message:</label>
                    <Field
                        as='textarea'
                        name="message"
                        className={`border ${errors.message && touched.message ? 'border-black bg-gray-300' : 'border-black'} rounded`}

                    />

                    <button type="submit" className='underline'>
                        Submit
                    </button>

                    {submit && <div>Your message has been sent!</div>}
                </Form>
            )}
        </Formik>
    )
}