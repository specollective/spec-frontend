import { useState } from "react";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";

// The GIEE intake reuses the existing Nodemailer contact API (no new backend or
// secret required). The partner-specific fields are composed into the email body
// and the chosen area of interest is mapped onto the API's `reason` field.
// Relative by default so the POST hits whatever origin served the page (any dev
// port, the Caddy proxy host, or production) rather than a hardcoded localhost.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/contact";

const ROLES = [
  "K-12 / Higher Ed",
  "Industry / AI Architect",
  "Non-Profit Lead",
  "Community Advocate",
  "Policy Official",
] as const;

const INTERESTS = [
  "News",
  "Case Study Partnership",
  "Research",
  "New Proposal",
  "Other",
] as const;

interface PartnerInfo {
  fullName: string;
  email: string;
  affiliation: string;
  role: string;
  interest: string;
  message: string;
}

const schema = yup.object().shape({
  fullName: yup.string().required("Required"),
  email: yup.string().email("Enter a valid email address").required("Required"),
  affiliation: yup.string().required("Required"),
  role: yup.string().oneOf(ROLES as readonly string[]).required("Required"),
  interest: yup.string().oneOf(INTERESTS as readonly string[]).required("Required"),
  message: yup.string().required("Required"),
});

function CheckCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const labelClasses = "font-giee-sans text-sm font-semibold text-giee-ink";
const baseFieldClasses =
  "rounded-none border bg-giee-white px-4 py-3 font-giee-sans text-base text-giee-ink placeholder:text-giee-slate focus:outline-none focus:border-giee-green focus:ring-1 focus:ring-giee-green";
const errorFieldClasses = "border-giee-red";
const normalFieldClasses = "border-giee-line";

function fieldClasses(hasError: unknown) {
  return `${baseFieldClasses} ${hasError ? errorFieldClasses : normalFieldClasses}`;
}

export default function GieePartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(
    values: PartnerInfo,
    { resetForm }: { resetForm: () => void },
  ) {
    setFailed(false);
    const payload = {
      // Routes the email to GIEE_INQUIRY_EMAIL server-side (see api/contact.ts).
      formType: "giee-partner",
      fullName: values.fullName,
      email: values.email,
      reason: `GIEE Partnership Inquiry — ${values.interest}`,
      message: `Affiliation: ${values.affiliation}
Primary Professional Role: ${values.role}
Area of Interest: ${values.interest}

${values.message}`,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setSubmitted(true);
        resetForm();
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-5 py-6"
      >
        <CheckCircle className="h-12 w-12 text-giee-green" />
        <h3 className="font-giee-serif text-2xl text-giee-ink">
          Thank you — your inquiry has been sent.
        </h3>
        <p className="font-giee-sans text-base leading-relaxed text-giee-ink-soft">
          Our team will review your message and route it to the right Case Study
          Lead. We&rsquo;ll be in touch at the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center justify-center border-2 border-giee-green bg-transparent px-6 py-3 font-giee-sans text-base font-semibold text-giee-green transition-colors hover:bg-giee-green hover:text-giee-white"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        affiliation: "",
        role: "",
        interest: "",
        message: "",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form
          role="form"
          id="giee-partner-form"
          className="flex flex-col gap-6"
          noValidate
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className={labelClasses}>
                Name <span aria-hidden="true" className="text-giee-red">*</span>
              </label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                placeholder="First name Last name"
                autoComplete="name"
                aria-required="true"
                className={fieldClasses(errors.fullName && touched.fullName)}
              />
              {errors.fullName && touched.fullName && (
                <div className="font-giee-sans text-sm text-giee-red" role="alert">
                  {errors.fullName}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClasses}>
                Email <span aria-hidden="true" className="text-giee-red">*</span>
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="hello@institution.org"
                autoComplete="email"
                aria-required="true"
                className={fieldClasses(errors.email && touched.email)}
              />
              {errors.email && touched.email && (
                <div className="font-giee-sans text-sm text-giee-red" role="alert">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="affiliation" className={labelClasses}>
              Affiliation <span aria-hidden="true" className="text-giee-red">*</span>
            </label>
            <Field
              id="affiliation"
              name="affiliation"
              type="text"
              placeholder="Institution, organization, or company"
              autoComplete="organization"
              aria-required="true"
              className={fieldClasses(errors.affiliation && touched.affiliation)}
            />
            {errors.affiliation && touched.affiliation && (
              <div className="font-giee-sans text-sm text-giee-red" role="alert">
                {errors.affiliation}
              </div>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className={labelClasses}>
                Primary Professional Role{" "}
                <span aria-hidden="true" className="text-giee-red">*</span>
              </label>
              <Field
                as="select"
                id="role"
                name="role"
                aria-required="true"
                className={fieldClasses(errors.role && touched.role)}
              >
                <option value="">Select a role</option>
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Field>
              {errors.role && touched.role && (
                <div className="font-giee-sans text-sm text-giee-red" role="alert">
                  {errors.role}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="interest" className={labelClasses}>
                Area of Interest{" "}
                <span aria-hidden="true" className="text-giee-red">*</span>
              </label>
              <Field
                as="select"
                id="interest"
                name="interest"
                aria-required="true"
                className={fieldClasses(errors.interest && touched.interest)}
              >
                <option value="">Select an area</option>
                {INTERESTS.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </Field>
              {errors.interest && touched.interest && (
                <div className="font-giee-sans text-sm text-giee-red" role="alert">
                  {errors.interest}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className={labelClasses}>
              Message <span aria-hidden="true" className="text-giee-red">*</span>
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              rows={6}
              placeholder="Tell us about your collaboration objectives."
              aria-required="true"
              className={`${fieldClasses(errors.message && touched.message)} min-h-32`}
            />
            {errors.message && touched.message && (
              <div className="font-giee-sans text-sm text-giee-red" role="alert">
                {errors.message}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="status" aria-live="polite" className="font-giee-sans text-sm">
              {failed && (
                <span className="font-semibold text-giee-red">
                  Something went wrong. Please try again.
                </span>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-giee-green px-8 py-4 font-giee-sans text-base font-semibold text-giee-white transition-colors hover:bg-giee-green/90"
            >
              Submit Partnership Inquiry
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
