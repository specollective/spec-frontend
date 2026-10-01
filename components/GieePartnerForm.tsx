import { useMemo, useState } from "react";
import Link from "next/link";
import { Form, Formik, Field, type FormikErrors, type FormikTouched } from "formik";
import * as yup from "yup";
import { Trans, useTranslation } from "next-i18next/pages";
import { GieeArrow } from "./GieeGlass";

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

const labelClasses = "text-[15px] font-medium";
const inputClasses =
  "box-border w-full border-[1.5px] bg-white px-[18px] text-[17px] text-giee-navy placeholder:text-giee-muted";
const btnShape =
  "transition-[transform,border-radius] duration-300 ease-giee hover:-translate-y-[2px] hover:!rounded-[26px_10px_26px_26px] motion-reduce:hover:translate-y-0";

function borderFor(hasError: unknown) {
  return hasError ? "border-giee-error" : "border-giee-field-line";
}

function ErrorText({ id, children }: { id: string; children: string }) {
  return (
    <span id={id} className="text-[14px] font-medium text-giee-error">
      {children}
    </span>
  );
}

function TextField({
  name,
  type = "text",
  autoComplete,
  inputMode,
  errors,
  touched,
}: {
  name: "fullName" | "email" | "affiliation";
  type?: string;
  autoComplete: string;
  inputMode?: "email";
  errors: FormikErrors<PartnerInfo>;
  touched: FormikTouched<PartnerInfo>;
}) {
  const { t } = useTranslation("giee");
  const key = name === "fullName" ? "name" : name;
  const err = touched[name] && errors[name];
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`giee-${name}`} className={labelClasses}>
        {t(`partnerForm.fields.${key}.label`)} <span aria-hidden="true">*</span>
      </label>
      <Field
        id={`giee-${name}`}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={t(`partnerForm.fields.${key}.placeholder`)}
        aria-required="true"
        aria-invalid={err ? true : undefined}
        aria-describedby={err ? `giee-${name}-error` : undefined}
        className={`${inputClasses} h-14 ${borderFor(err)}`}
      />
      {err && <ErrorText id={`giee-${name}-error`}>{errors[name] as string}</ErrorText>}
    </div>
  );
}

function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  labelFor,
  value,
  error,
}: {
  name: "role" | "interest";
  legend: string;
  options: readonly T[];
  labelFor: (v: T) => string;
  value: string;
  error?: string | false;
}) {
  return (
    <fieldset
      className="m-0 flex flex-col gap-3 border-0 p-0"
      aria-describedby={error ? `giee-${name}-error` : undefined}
    >
      <legend className={`mb-3 p-0 ${labelClasses}`}>
        {legend} <span aria-hidden="true">*</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={`relative inline-flex h-[46px] cursor-pointer items-center px-[18px] text-[15px] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-giee-royal ${
                checked
                  ? "bg-giee-navy text-white shadow-[inset_0_0_0_1.5px_#111322]"
                  : `bg-white text-giee-navy hover:bg-giee-cream ${
                      error
                        ? "shadow-[inset_0_0_0_1.5px_#B3261E]"
                        : "shadow-[inset_0_0_0_1.5px_#CFCDC6]"
                    }`
              }`}
            >
              <Field
                type="radio"
                name={name}
                value={opt}
                aria-invalid={error ? true : undefined}
                className="absolute inset-0 m-0 cursor-pointer opacity-0"
              />
              {labelFor(opt)}
            </label>
          );
        })}
      </div>
      {error && <ErrorText id={`giee-${name}-error`}>{error}</ErrorText>}
    </fieldset>
  );
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
        fullName: yup.string().trim().required(t("partnerForm.validation.required")),
        email: yup
          .string()
          .trim()
          .email(t("partnerForm.validation.email"))
          .required(t("partnerForm.validation.required")),
        affiliation: yup
          .string()
          .trim()
          .required(t("partnerForm.validation.required")),
        role: yup
          .string()
          .oneOf(ROLES as readonly string[], t("partnerForm.validation.select"))
          .required(t("partnerForm.validation.select")),
        interest: yup
          .string()
          .oneOf(
            INTERESTS as readonly string[],
            t("partnerForm.validation.select"),
          )
          .required(t("partnerForm.validation.select")),
        message: yup.string().trim().required(t("partnerForm.validation.required")),
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
        className="flex min-h-[560px] flex-col justify-between gap-10 lg:min-h-[760px]"
      >
        <span
          aria-hidden="true"
          className="flex h-[96px] w-[96px] items-center justify-center rounded-[20px_20px_80px_80px] bg-[#459B3D] text-giee-navy lg:h-[132px] lg:w-[132px] lg:rounded-[20px_20px_110px_110px]"
        >
          <svg width="56" height="56" viewBox="0 0 20 20" fill="none" focusable="false">
            <path
              d="M4.5 10.5 8.5 14.5 15.5 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="square"
            />
          </svg>
        </span>
        <div className="flex flex-col gap-[18px]">
          <h2 className="m-0 text-[36px] font-bold leading-[0.98] tracking-[-0.04em] lg:text-[56px]">
            {t("partnerForm.success.heading")}
          </h2>
          <p className="m-0 max-w-[520px] text-[17px] leading-[1.55] text-giee-ink-2 lg:text-[19px]">
            {t("partnerForm.success.body")}
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className={`mt-3 inline-flex h-14 items-center self-start rounded-[10px_10px_28px_10px] px-[26px] text-[17px] font-[650] shadow-[inset_0_0_0_1.5px_#111322] ${btnShape}`}
          >
            {t("partnerForm.success.button")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Formik<PartnerInfo>
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
      {({ errors, touched, values, isSubmitting }) => (
        <Form
          id="giee-partner-form"
          aria-labelledby="giee-form-title"
          className="flex flex-col gap-7"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <h2
              id="giee-form-title"
              className="m-0 text-[32px] font-bold leading-none tracking-[-0.03em] lg:text-[40px]"
            >
              {t("partnerForm.title")}
            </h2>
            <p className="m-0 text-[15px] text-giee-muted">{t("partnerForm.requiredNote")}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField name="fullName" autoComplete="name" errors={errors} touched={touched} />
            <TextField
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              errors={errors}
              touched={touched}
            />
          </div>

          <TextField
            name="affiliation"
            autoComplete="organization"
            errors={errors}
            touched={touched}
          />

          <ChoiceGroup
            name="role"
            legend={t("partnerForm.fields.role.label")}
            options={ROLES}
            labelFor={(v) => t(`partnerForm.roles.${ROLE_LABEL_KEYS[v]}`)}
            value={values.role}
            error={touched.role && errors.role}
          />

          <ChoiceGroup
            name="interest"
            legend={t("partnerForm.fields.interest.label")}
            options={INTERESTS}
            labelFor={(v) => t(`partnerForm.interests.${INTEREST_LABEL_KEYS[v]}`)}
            value={values.interest}
            error={touched.interest && errors.interest}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="giee-message" className={labelClasses}>
              {t("partnerForm.fields.message.label")} <span aria-hidden="true">*</span>
            </label>
            <Field
              as="textarea"
              id="giee-message"
              name="message"
              rows={5}
              placeholder={t("partnerForm.fields.message.placeholder")}
              aria-required="true"
              aria-invalid={touched.message && errors.message ? true : undefined}
              aria-describedby={
                touched.message && errors.message ? "giee-message-error" : undefined
              }
              className={`${inputClasses} min-h-[150px] resize-y py-4 leading-[1.5] ${borderFor(
                touched.message && errors.message,
              )}`}
            />
            {touched.message && errors.message && (
              <ErrorText id="giee-message-error">{errors.message}</ErrorText>
            )}
          </div>

          <div className="flex flex-col gap-4 border-t border-giee-rule pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="m-0 mt-4 max-w-[260px] text-[14px] leading-[1.45] text-giee-muted">
              <Trans
                i18nKey="partnerForm.privacyNotice"
                t={t}
                components={{
                  privacy: (
                    <Link
                      href="/privacy"
                      className="font-medium text-giee-navy underline decoration-[1.5px] underline-offset-[3px]"
                    />
                  ),
                }}
              />
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 inline-flex h-[60px] items-center justify-center gap-[10px] whitespace-nowrap rounded-[10px_10px_30px_10px] bg-giee-navy px-7 text-[17px] font-[650] text-white disabled:opacity-60 ${btnShape}`}
            >
              {t("partnerForm.submit")}
              <GieeArrow className="h-4 w-4" />
            </button>
          </div>

          <div role="status" aria-live="polite" className="text-[15px]">
            {failed && (
              <span className="font-semibold text-giee-error">{t("partnerForm.error")}</span>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
