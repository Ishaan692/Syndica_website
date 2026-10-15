"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { tweenArtStage } from "@/lib/effects";

const REASONS = [
  "Pilot BrokerOS",
  "Design partner for Atlas or Fabric",
  "Research collaboration",
  "Investment",
  "Something else",
];

function ContactForm() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest");

  const [selectedReason, setSelectedReason] = useState("Pilot BrokerOS");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (interestParam === "brokeros") {
      setSelectedReason("Pilot BrokerOS");
    }
  }, [interestParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct mailto link
    const subject = encodeURIComponent(`[${selectedReason}] from ${name || "Syndica Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nReason: ${selectedReason}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:hello@syndica.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Form or Confirmation */}
      <div className="lg:col-span-8">
        {submitted ? (
          <div className="p-8 bg-[#111113] border border-[rgba(236,232,223,0.14)] flex flex-col gap-4">
            <span className="font-mono text-xs text-[#38E08C] uppercase tracking-wider">
              INQUIRY RECORDED
            </span>
            <h3 className="heading-sub text-[#ECE8DF]" data-reading>
              Thank you, {name || "there"}.
            </h3>
            <p className="body-l text-[rgba(236,232,223,0.78)]" data-reading>
              Your default email client has been opened with your inquiry formatted to hello@syndica.com. Our founders review every message directly and reply within 24 hours.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="font-mono text-xs text-[rgba(236,232,223,0.44)] hover:text-[#ECE8DF] underline"
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-12">
            {/* Name Field */}
            <div className="flex flex-col gap-2 relative group">
              <label
                htmlFor="contact-name"
                className="font-mono text-[11px] uppercase tracking-wider text-[rgba(236,232,223,0.44)]"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-transparent border-b border-[rgba(236,232,223,0.14)] focus:border-[#FF4F2B] outline-none py-3 text-xl font-body text-[#ECE8DF] placeholder-[rgba(236,232,223,0.2)] transition-colors"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2 relative group">
              <label
                htmlFor="contact-email"
                className="font-mono text-[11px] uppercase tracking-wider text-[rgba(236,232,223,0.44)]"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-transparent border-b border-[rgba(236,232,223,0.14)] focus:border-[#FF4F2B] outline-none py-3 text-xl font-body text-[#ECE8DF] placeholder-[rgba(236,232,223,0.2)] transition-colors"
              />
            </div>

            {/* Radio List: What brings you here? */}
            <div className="flex flex-col gap-4 pt-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[rgba(236,232,223,0.44)]">
                What brings you here?
              </span>

              <div className="flex flex-col gap-3">
                {REASONS.map((reason) => {
                  const isSelected = selectedReason === reason;
                  return (
                    <button
                      type="button"
                      key={reason}
                      onClick={() => setSelectedReason(reason)}
                      className="flex items-center gap-3.5 py-2 text-left group cursor-pointer focus-visible:outline-none"
                    >
                      <span
                        className={`w-[11px] h-[11px] flex-shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#ECE8DF]"
                            : "border border-[rgba(236,232,223,0.3)] bg-transparent group-hover:border-[#ECE8DF]"
                        }`}
                      />
                      <span
                        className={`font-body text-base transition-colors ${
                          isSelected
                            ? "text-[#ECE8DF] font-medium"
                            : "text-[rgba(236,232,223,0.68)] group-hover:text-[#ECE8DF]"
                        }`}
                      >
                        {reason}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col gap-2 relative group">
              <label
                htmlFor="contact-message"
                className="font-mono text-[11px] uppercase tracking-wider text-[rgba(236,232,223,0.44)]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you are working on or what you would like to discuss."
                className="w-full bg-transparent border-b border-[rgba(236,232,223,0.14)] focus:border-[#FF4F2B] outline-none py-3 text-xl font-body text-[#ECE8DF] placeholder-[rgba(236,232,223,0.2)] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="group relative inline-flex items-center justify-between h-[52px] px-6 rounded-[2px] bg-[#ECE8DF] text-[#0A0A0B] overflow-hidden select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F2B]"
              >
                <span
                  className="absolute inset-0 bg-[#111113] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                />

                <span
                  className="relative z-10 font-display text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 group-hover:text-[#ECE8DF]"
                  style={{ fontStretch: "110%" }}
                >
                  Send
                </span>

                <svg
                  className="relative z-10 ml-4 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#ECE8DF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Info: Columns 9-12 */}
      <div className="lg:col-span-4 border-l border-[rgba(236,232,223,0.14)] pl-0 lg:pl-10 py-2 flex flex-col gap-8">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[rgba(236,232,223,0.44)] block mb-2">
            Direct Contact
          </span>
          <a
            href="mailto:hello@syndica.com"
            className="font-mono text-sm text-[#ECE8DF] hover:text-[#FF4F2B] underline transition-colors"
          >
            hello@syndica.com
          </a>
        </div>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[rgba(236,232,223,0.44)] block mb-2">
            Pilot Locations
          </span>
          <p className="body-default text-sm text-[rgba(236,232,223,0.68)]">
            We work directly with commercial brokerages across India and internationally.
          </p>
        </div>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[rgba(236,232,223,0.44)] block mb-2">
            Turnaround
          </span>
          <p className="body-default text-sm text-[rgba(236,232,223,0.68)]">
            Every inquiry goes directly to the founders. You will hear back within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  useEffect(() => {
    // Set ArtStage track to "contact"
    tweenArtStage("contact");
  }, []);

  return (
    <div className="w-full bg-transparent text-[#ECE8DF] flex flex-col pt-32 pb-36 min-h-[90vh]">
      <div className="container-grid">
        {/* Folio & Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-[11px] text-[#ECE8DF]">01</span>
          <span className="folio-label">CONTACT</span>
        </div>

        <h1 data-skew className="heading-hero mb-6 text-[#ECE8DF]" data-reading>
          Pilot with us. Or just talk.
        </h1>

        <p className="body-l text-[rgba(236,232,223,0.78)] max-w-2xl mb-16" data-reading>
          Reach out to participate in the BrokerOS pilot, discuss research collaborations on Fabric and Vector, or learn more about Syndica.
        </p>

        <div className="w-full h-[1px] bg-[rgba(236,232,223,0.14)] mb-16" />

        <Suspense fallback={<div className="font-mono text-xs text-[rgba(236,232,223,0.44)]">Loading form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
