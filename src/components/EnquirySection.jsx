import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Phone } from "lucide-react";
import { registerGSAP } from "../animations/gsapSetup";
import { fadeUp } from "../animations/textAnimations";
import { clipReveal } from "../animations/imageAnimations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { business } from "../data/business";
import { aboutImages } from "../data/gallery";
import SectionHeading from "../ui/SectionHeading";
import AnimatedButton from "../ui/AnimatedButton";
import styles from "./EnquirySection.module.css";

registerGSAP();

const ENQUIRY_TYPES = ["General visit", "Group enquiry"];

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  visitDate: "",
  people: "",
  enquiryType: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!/^[\d\s+\-()]{8,}$/.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!values.visitDate) errors.visitDate = "Please choose a preferred visit date.";
  if (!values.people.trim()) {
    errors.people = "Please enter the number of people.";
  } else if (Number(values.people) < 1 || !Number.isFinite(Number(values.people))) {
    errors.people = "Please enter a valid number of people.";
  }
  if (!values.enquiryType) errors.enquiryType = "Please select an enquiry type.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export default function EnquirySection() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [callPrompt, setCallPrompt] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => {
        const next = validate({ ...values, [name]: value });
        return { ...prev, [name]: next[name] };
      });
    }
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const next = validate(values);
    setErrors((prev) => ({ ...prev, [name]: next[name] }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched(
      Object.keys(INITIAL).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      const field = sectionRef.current?.querySelector(`[name="${first}"]`);
      field?.focus();
      return;
    }

    // No verified public email — route enquiries to phone
    if (!business.email) {
      setCallPrompt(true);
      window.location.href = business.phone.tel;
      return;
    }
  };

  useGSAP(
    () => {
      if (!sectionRef.current || reduced) return undefined;

      fadeUp(sectionRef.current.querySelector(`.${styles.headingWrap}`), {
        y: 32,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      const media = sectionRef.current.querySelector(`.${styles.atmosphere}`);
      if (media) {
        clipReveal(media, {
          scrollTrigger: {
            trigger: media,
            start: "top 85%",
          },
        });
      }

      fadeUp(sectionRef.current.querySelector(`.${styles.panel}`), {
        y: 40,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      return undefined;
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  const fieldError = (name) =>
    touched[name] && errors[name] ? errors[name] : null;

  return (
    <section
      id="enquiry"
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="enquiry-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.headingWrap}>
          <SectionHeading
            id="enquiry-heading"
            eyebrow="Enquiries"
            title={["MEET. CONNECT."]}
            italicLine="TAKE A BREAK."
            className={styles.enquiryHeading}
          />
        </div>

        <div className={styles.split}>
          <div className={styles.left}>
            <div className={styles.atmosphere}>
              <img
                src={aboutImages.primary.src}
                alt={aboutImages.primary.alt}
                loading="lazy"
              />
            </div>
            <p className={styles.sideTitle}>
              Plan a visit, gather your team, or simply stop by for coffee.
            </p>
          </div>

          <div className={styles.panel}>
            <p className={styles.phoneNotice} role="note">
              Online enquiries are currently by phone until a public email is
              verified. Call{" "}
              <a href={business.phone.tel}>{business.phone.display}</a>.
            </p>

            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="enquiry-name">Name</label>
                <input
                  id="enquiry-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(fieldError("name"))}
                  aria-describedby={fieldError("name") ? "err-name" : undefined}
                />
                {fieldError("name") ? (
                  <p id="err-name" className={styles.error} role="alert">
                    {fieldError("name")}
                  </p>
                ) : null}
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="enquiry-email">Email</label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={Boolean(fieldError("email"))}
                    aria-describedby={
                      fieldError("email") ? "err-email" : undefined
                    }
                  />
                  {fieldError("email") ? (
                    <p id="err-email" className={styles.error} role="alert">
                      {fieldError("email")}
                    </p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label htmlFor="enquiry-phone">Phone</label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={Boolean(fieldError("phone"))}
                    aria-describedby={
                      fieldError("phone") ? "err-phone" : undefined
                    }
                  />
                  {fieldError("phone") ? (
                    <p id="err-phone" className={styles.error} role="alert">
                      {fieldError("phone")}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="enquiry-date">Preferred visit date</label>
                  <input
                    id="enquiry-date"
                    name="visitDate"
                    type="date"
                    value={values.visitDate}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={Boolean(fieldError("visitDate"))}
                    aria-describedby={
                      fieldError("visitDate") ? "err-date" : undefined
                    }
                  />
                  {fieldError("visitDate") ? (
                    <p id="err-date" className={styles.error} role="alert">
                      {fieldError("visitDate")}
                    </p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label htmlFor="enquiry-people">Number of people</label>
                  <input
                    id="enquiry-people"
                    name="people"
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={values.people}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={Boolean(fieldError("people"))}
                    aria-describedby={
                      fieldError("people") ? "err-people" : undefined
                    }
                  />
                  {fieldError("people") ? (
                    <p id="err-people" className={styles.error} role="alert">
                      {fieldError("people")}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="enquiry-type">Enquiry type</label>
                <select
                  id="enquiry-type"
                  name="enquiryType"
                  value={values.enquiryType}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(fieldError("enquiryType"))}
                  aria-describedby={
                    fieldError("enquiryType") ? "err-type" : undefined
                  }
                >
                  <option value="">Select enquiry type</option>
                  {ENQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {fieldError("enquiryType") ? (
                  <p id="err-type" className={styles.error} role="alert">
                    {fieldError("enquiryType")}
                  </p>
                ) : null}
              </div>

              <div className={styles.field}>
                <label htmlFor="enquiry-message">Message</label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(fieldError("message"))}
                  aria-describedby={
                    fieldError("message") ? "err-message" : undefined
                  }
                />
                {fieldError("message") ? (
                  <p id="err-message" className={styles.error} role="alert">
                    {fieldError("message")}
                  </p>
                ) : null}
              </div>

              <div className={styles.actions}>
                <AnimatedButton type="submit" variant="primary">
                  Submit enquiry
                </AnimatedButton>
              </div>

              {callPrompt ? (
                <div className={styles.callCta} role="status">
                  <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                  <p>
                    Enquiries are by phone until email is verified. Please call{" "}
                    <a href={business.phone.tel}>{business.phone.display}</a>{" "}
                    to complete your request.
                  </p>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
