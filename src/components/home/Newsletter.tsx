"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail("");
    }, 1200);
  };

  return (
    <section className="py-24 bg-white border-b border-[var(--border-hairline)]">
      <div className="max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
        <div className="w-12 h-12 rounded-full bg-[var(--bg-canvas-alt)] flex items-center justify-center border border-[var(--border-hairline)]">
          <Mail className="w-5 h-5 text-[var(--ink-900)]" />
        </div>

        <div>
          <span className="text-xs font-black tracking-widest text-[var(--ink-600)] uppercase">
            Stay Updated
          </span>
          <h2 className="text-grotesk text-3xl font-black uppercase tracking-tight mt-1 text-[var(--ink-900)]">
            THE TRANSMISSION EDIT
          </h2>
          <p className="text-xs text-[var(--ink-600)] max-w-xs mx-auto mt-2 leading-relaxed">
            Register below to receive periodic catalogues detailing new releases, drop notifications, and editorial notes.
          </p>
        </div>

        {/* Input Morph area */}
        <div className="w-full mt-4">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="email-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col sm:flex-row gap-3 w-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-2 rounded-[var(--radius-md)] focus-within:border-[var(--ink-900)] transition-colors"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter email coordinate..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow bg-transparent border-none outline-none text-sm px-3 py-2 text-[var(--ink-900)] placeholder:text-[var(--ink-300)]"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[var(--ink-900)] text-white hover:bg-[var(--ink-600)] active:scale-98 disabled:opacity-50 px-6 py-2.5 rounded-[var(--radius-md)] text-xs font-bold uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center min-w-[120px]"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-box"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full bg-[var(--accent-lime)] text-[var(--ink-900)] p-4 rounded-[var(--radius-md)] flex items-center justify-center gap-2.5 border border-[var(--border-hairline)] shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[var(--ink-900)] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider">
                  Transmission established. Check inbox.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
