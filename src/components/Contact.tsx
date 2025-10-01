import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
// defer emailjs to reduce initial bundle

import { styles } from "../style";
import { SectionWrapper } from "../hoc";
import { Suspense } from "react";
import { EarthCanvas } from "./canvas";
import { useInView } from "../utils/useInView";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [mountEarth, setMountEarth] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement & { name: string; value: string };

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
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
          from_name: form.name,
          to_name: "Adil",
          from_email: form.email,
          to_email: "adil@quantonimus.com",
          message: form.message,
        },
        publicKey
      );
      setForm({ name: "", email: "", message: "" });
      alert("Message sent successfully! I will get back to you soon.");
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const { ref, inView } = useInView({ rootMargin: "1000px" });
  useEffect(() => {
    if (!inView) return;
    setMountEarth(true);
  }, [inView]);
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
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Please enter your email address"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to talk about?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
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
          <Suspense fallback={null}>{mountEarth ? <EarthCanvas /> : null}</Suspense>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
