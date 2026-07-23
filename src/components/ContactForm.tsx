"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { site } from "@/content/site";
import { experiences } from "@/content/experiences";
import { spots } from "@/content/spots";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const experience = String(data.get("experience") || "");
    const spot = String(data.get("spot") || "");
    const message = String(data.get("message") || "");
    const date = String(data.get("date") || "");

    const subject = encodeURIComponent(
      `Booking inquiry — ${experience || "Experience"} — ${site.name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Preferred date: ${date || "Flexible"}`,
        `Experience: ${experience || "Not specified"}`,
        `Spot: ${spot || "Not specified"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date" name="date" type="date" />
        <div>
          <label htmlFor="experience" className="label">
            Experience
          </label>
          <select id="experience" name="experience" className="input">
            <option value="">Select…</option>
            {experiences.map((e) => (
              <option key={e.slug} value={e.title}>
                {e.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="spot" className="label">
          Spot
        </label>
        <select id="spot" name="spot" className="input">
          <option value="">Select or tell us in the message…</option>
          {spots.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Custom / other">Custom / other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="input resize-y"
          placeholder="Occasion, group size, sunset preference…"
        />
      </div>

      <Button type="submit" cursorLabel="Send" className="w-full sm:w-auto">
        Send inquiry
      </Button>

      {status === "sent" && (
        <p className="text-sm opacity-70">
          Your email client should open with the inquiry. If nothing happened,
          write us at{" "}
          <a className="underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="input"
      />
    </div>
  );
}
