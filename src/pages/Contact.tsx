import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="font-display text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-8">Have a question, suggestion, or want to collaborate? We'd love to hear from you.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-xl border p-5 flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-display font-semibold text-sm">Email</h3>
            <p className="text-sm text-muted-foreground">contact@aplushustler.com</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border p-5 flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-display font-semibold text-sm">Location</h3>
            <p className="text-sm text-muted-foreground">Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="bg-primary/10 rounded-xl p-8 text-center">
          <Send className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="font-display font-semibold text-lg mb-1">Message Sent!</h3>
          <p className="text-sm text-muted-foreground">Thank you for reaching out. We'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
