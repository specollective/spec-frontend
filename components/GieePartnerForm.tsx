import { useMemo, useState } from "react";
import Link from "next/link";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import { Trans, useTranslation } from "next-i18next/pages";

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

// The stored option VALUES above must stay stable (they feed the email payload
// and the oneOf() whitelist). These maps translate only what the user SEES:
// each stored value → a catalog key under partnerForm.roles / .interests.
const ROLE_LABEL_KEYS: Record<(typeof ROLES)[number], string> = {
  "K-12 / Higher Ed": "k12HigherEd",
  "Industry / AI Architect": "industryAiArchitect",
  "Non-Profit Lead": "nonProfitLead",
  "Community Advocate": "communityAdvocate",
  "Policy Official": "policyOfficial",
};

const INTEREST_LABEL_KEYS: Record<(typeof INTERESTS)[number], string> = {
  News: "news",
  "Case Study Partnership": "caseStudyPartnership",
  Research: "research",
  "New Proposal": "newProposal",
  Other: "other",
};

interface PartnerInfo {
  fullName: string;
  email: string;
  affiliation: string;
  role: string;
  interest: string;
  message: string;
}

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
  const { t } = useTranslation("giee");
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);

  // Built inside the component so every validation message resolves through
  // t(); rebuilt when the active language (t) changes.
  const schema = useMemo(
    () =>
      yup.object().shape({
        fullName: yup.string().required(t("partnerForm.validation.required")),
        email: yup
          .string()
          .email(t("partnerForm.validation.email"))
          .required(t("partnerForm.validation.required")),
        affiliation: yup
          .string()
          .required(t("partnerForm.validation.required")),
        role: yup
          .string()
          .oneOf(ROLES as readonly string[], t("partnerForm.validation.select"))
          .required(t("partnerForm.validation.required")),
        interest: yup
          .string()
          .oneOf(
            INTERESTS as readonly string[],
            t("partnerForm.validation.select"),
          )
          .required(t("partnerForm.validation.required")),
        message: yup.string().required(t("partnerForm.validation.required")),
      }),
    [t],
  );

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
          {t("partnerForm.success.heading")}
        </h3>
        <p className="font-giee-sans text-base leading-relaxed text-giee-ink-soft">
          {t("partnerForm.success.body")}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center justify-center border-2 border-giee-green bg-transparent px-6 py-3 font-giee-sans text-base font-semibold text-giee-green transition-colors hover:bg-giee-green hover:text-giee-white"
        >
          {t("partnerForm.success.button")}
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
                {t("partnerForm.fields.name.label")}{" "}
                <span aria-hidden="true" className="text-giee-red">*</span>
              </label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                placeholder={t("partnerForm.fields.name.placeholder")}
                autoComplete="name"
                aria-required="true"
                aria-invalid={errors.fullName && touched.fullName ? true : undefined}
                aria-describedby={errors.fullName && touched.fullName ? "fullName-error" : undefined}
                className={fieldClasses(errors.fullName && touched.fullName)}
              />
              {errors.fullName && touched.fullName && (
                <div id="fullName-error" className="font-giee-sans text-sm text-giee-red" role="alert">
                  {errors.fullName}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClasses}>
                {t("partnerForm.fields.email.label")}{" "}
                <span aria-hidden="true" className="text-giee-red">*</span>
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder={t("partnerForm.fields.email.placeholder")}
                autoComplete="email"
                aria-required="true"
                aria-invalid={errors.email && touched.email ? true : undefined}
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                className={fieldClasses(errors.email && touched.email)}
              />
              {errors.email && touched.email && (
                <div id="email-error" className="font-giee-sans text-sm text-giee-red" role="alert">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="affiliation" className={labelClasses}>
              {t("partnerForm.fields.affiliation.label")}{" "}
              <span aria-hidden="true" className="text-giee-red">*</span>
            </label>
            <Field
              id="affiliation"
              name="affiliation"
              type="text"
              placeholder={t("partnerForm.fields.affiliation.placeholder")}
              autoComplete="organization"
              aria-required="true"
              aria-invalid={errors.affiliation && touched.affiliation ? true : undefined}
              aria-describedby={errors.affiliation && touched.affiliation ? "affiliation-error" : undefined}
              className={fieldClasses(errors.affiliation && touched.affiliation)}
            />
            {errors.affiliation && touched.affiliation && (
              <div id="affiliation-error" className="font-giee-sans text-sm text-giee-red" role="alert">
                {errors.affiliation}
              </div>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className={labelClasses}>
                {t("partnerForm.fields.role.label")}{" "}
                <span aria-hidden="true" className="text-giee-red">*</span>
              </label>
              <Field
                as="select"
                id="role"
                name="role"
                aria-required="true"
                aria-invalid={errors.role && touched.role ? true : undefined}
                aria-describedby={errors.role && touched.role ? "role-error" : undefined}
                className={fieldClasses(errors.role && touched.role)}
              >
                <option value="">{t("partnerForm.fields.role.placeholder")}</option>
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {t(`partnerForm.roles.${ROLE_LABEL_KEYS[role]}`)}
                  </option>
                ))}
              </Field>
              {errors.role && touched.role && (
                <div id="role-error" className="font-giee-sans text-sm text-giee-red" role="alert">
                  {errors.role}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="interest" className={labelClasses}>
                {t("partnerForm.fields.interest.label")}{" "}
                <span aria-hidden="true" className="text-giee-red">*</span>
              </label>
              <Field
                as="select"
                id="interest"
                name="interest"
                aria-required="true"
                aria-invalid={errors.interest && touched.interest ? true : undefined}
                aria-describedby={errors.interest && touched.interest ? "interest-error" : undefined}
                className={fieldClasses(errors.interest && touched.interest)}
              >
                <option value="">
                  {t("partnerForm.fields.interest.placeholder")}
                </option>
                {INTERESTS.map((interest) => (
                  <option key={interest} value={interest}>
                    {t(`partnerForm.interests.${INTEREST_LABEL_KEYS[interest]}`)}
                  </option>
                ))}
              </Field>
              {errors.interest && touched.interest && (
                <div id="interest-error" className="font-giee-sans text-sm text-giee-red" role="alert">
                  {errors.interest}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className={labelClasses}>
              {t("partnerForm.fields.message.label")}{" "}
              <span aria-hidden="true" className="text-giee-red">*</span>
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              rows={6}
              placeholder={t("partnerForm.fields.message.placeholder")}
              aria-required="true"
              aria-invalid={errors.message && touched.message ? true : undefined}
              aria-describedby={errors.message && touched.message ? "message-error" : undefined}
              className={`${fieldClasses(errors.message && touched.message)} min-h-32`}
            />
            {errors.message && touched.message && (
              <div id="message-error" className="font-giee-sans text-sm text-giee-red" role="alert">
                {errors.message}
              </div>
            )}
          </div>

          <p className="font-giee-sans text-sm text-giee-slate">
            <Trans
              i18nKey="partnerForm.privacyNotice"
              t={t}
              components={{
                privacy: (
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-giee-ink"
                  />
                ),
              }}
            />
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="status" aria-live="polite" className="font-giee-sans text-sm">
              {failed && (
                <span className="font-semibold text-giee-red">
                  {t("partnerForm.error")}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center bg-giee-green px-8 py-4 font-giee-sans text-base font-semibold text-giee-white transition-colors hover:bg-giee-green/90"
            >
              {t("partnerForm.submit")}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
