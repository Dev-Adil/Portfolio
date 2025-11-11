/**
 * Contact Component
 * 
 * Displays contact form with Earth 3D model visualization.
 * Includes form validation, error handling, and accessibility features.
 * 
 * @component
 */

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import { Suspense } from "react";
import { EarthCanvas } from "./canvas";
import { useInView } from "../utils/useInView";
import { slideIn } from "../utils/motion";
import { error as logError } from "../utils/logger";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [mountEarth, setMountEarth] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Validates form input fields
   * @returns {boolean} True if form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (form.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (form.email.trim().length > 254) {
      newErrors.email = "Email must be less than 254 characters";
    }

    // Message validation
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (form.message.trim().length > 5000) {
      newErrors.message = "Message must be less than 5000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles input field changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Sanitize input (basic XSS prevention)
    const sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    setForm({ ...form, [name]: sanitizedValue });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
    
    // Reset submit status
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitStatus("idle");

    try {
      // Dynamically import emailjs to reduce initial bundle size
      const { default: emailjs } = await import("@emailjs/browser");
      
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service not configured");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name.trim(),
          to_name: "Adil",
          from_email: form.email.trim(),
          to_email: "adil@quantonimus.com",
          message: form.message.trim(),
        },
        publicKey
      );

      setForm({ name: "", email: "", message: "" });
      setSubmitStatus("success");
      
      // Clear any existing timeout before setting a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Reset success message after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setSubmitStatus("idle");
        timeoutRef.current = null;
      }, 5000);
    } catch (err) {
      logError("Failed to send contact form", err, { 
        context: "Contact",
        form: { name: form.name, email: form.email } 
      });
      setSubmitStatus("error");
      
      // Clear any existing timeout before setting a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Reset error message after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setSubmitStatus("idle");
        timeoutRef.current = null;
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const { ref, inView } = useInView({ rootMargin: "1000px" });
  useEffect(() => {
    if (!inView) return;
    setMountEarth(true);
  }, [inView]);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.1, 0.55)}
        style={{ willChange: "transform, opacity" }}
        className="flex-[.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <p className={styles.sectionHeadText}>Contact.</p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Please enter your name"
              required
              minLength={2}
              maxLength={100}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ${
                errors.name ? "border border-red-500" : ""
              }`}
            />
            {errors.name && (
              <span id="name-error" className="text-red-400 text-sm mt-1" role="alert">
                {errors.name}
              </span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Please enter your email address"
              required
              maxLength={254}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium ${
                errors.email ? "border border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                {errors.email}
              </span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to talk about?"
              required
              minLength={10}
              maxLength={5000}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium resize-y ${
                errors.message ? "border border-red-500" : ""
              }`}
            />
            {errors.message && (
              <span id="message-error" className="text-red-400 text-sm mt-1" role="alert">
                {errors.message}
              </span>
            )}
          </label>

          {submitStatus === "success" && (
            <div className="bg-green-500/20 border border-green-500/50 text-green-400 py-3 px-4 rounded-lg text-sm">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}
          
          {submitStatus === "error" && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-400 py-3 px-4 rounded-lg text-sm">
              ✗ Something went wrong. Please try again or contact me directly at adil@quantonimus.com
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            aria-label={loading ? "Sending message" : "Send message"}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <div ref={ref} className="w-full h-full">
          {mountEarth ? <EarthCanvas /> : <div className="w-full h-full bg-gradient-to-b from-[#0b0b1e] to-[#050816]" />}
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
