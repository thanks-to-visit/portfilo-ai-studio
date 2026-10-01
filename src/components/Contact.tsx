import React, { useState } from 'react';
import { SiteSettings } from '../types';
import { api } from '../services/api';
import { useToast } from '../hooks/useToast';
import { Mail, Github, Linkedin, Copy, Check, Send, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  settings: SiteSettings;
}

export const Contact: React.FC<ContactProps> = ({ settings }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(settings.email);
    setCopied(true);
    toast('Email address copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || 'General Inquiry',
        message: form.message.trim(),
      });
      setSubmitted(true);
      toast('Message dispatched successfully. I will get back to you shortly.', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast('Failed to dispatch message. Please email me directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F4F4F2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#666666] font-semibold mb-2">
            06 &middot; Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717]">
            Let&apos;s build something meaningful.
          </h2>
          <p className="text-sm text-[#666666] mt-2 max-w-xl">
            Whether discussing distributed systems, backend architectures, potential engineering roles, or research collaborations, my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Direct channels & info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="bg-white border border-[#DCDCDC] p-6 rounded-sm shadow-2xs space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#666666]">
                Direct Email
              </h3>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${settings.email}`}
                  className="font-mono text-sm font-medium text-[#171717] hover:text-[#1B4332] break-all transition-colors"
                >
                  {settings.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-[#666666] hover:text-[#171717] border border-[#E5E5E0] bg-[#F9F9F8] rounded transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#1B4332]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-[#666666] pt-1">
                Typical response latency: within 24 hours.
              </p>
            </div>

            {/* Social channels */}
            <div className="bg-white border border-[#DCDCDC] p-6 rounded-sm shadow-2xs space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#666666]">
                Online Presence
              </h3>
              <div className="space-y-3">
                <a
                  href={settings.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs text-[#171717] hover:text-[#1B4332] group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#666666] group-hover:text-[#1B4332]" />
                    <span className="font-medium">GitHub Repository & Code</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#888888]" />
                </a>

                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs text-[#171717] hover:text-[#1B4332] group transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#666666] group-hover:text-[#1B4332]" />
                    <span className="font-medium">LinkedIn Profile</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#888888]" />
                </a>

                {settings.xUrl && (
                  <a
                    href={settings.xUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs text-[#171717] hover:text-[#1B4332] group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#666666] group-hover:text-[#1B4332] px-1">𝕏</span>
                      <span className="font-medium">Technical Notes / X</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#888888]" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#DCDCDC] p-6 sm:p-8 rounded-sm shadow-2xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#1B4332]/10 text-[#1B4332] mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-[#171717]">
                  Message Received
                </h3>
                <p className="text-xs text-[#555555] max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. I have logged your message and will review it promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#1B4332] underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase text-[#555555] mb-1.5">
                      Your Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ada Lovelace"
                      className="w-full px-3.5 py-2 text-xs text-[#171717] bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#1B4332] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase text-[#555555] mb-1.5">
                      Your Email <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ada@example.com"
                      className="w-full px-3.5 py-2 text-xs text-[#171717] bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#1B4332] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono uppercase text-[#555555] mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Distributed systems architecture / Role inquiry"
                    className="w-full px-3.5 py-2 text-xs text-[#171717] bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#1B4332] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase text-[#555555] mb-1.5">
                    Message <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your note or question here..."
                    className="w-full px-3.5 py-2 text-xs text-[#171717] bg-[#FDFDFD] border border-[#DCDCDC] rounded focus:border-[#1B4332] focus:outline-none transition-colors resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-medium text-white bg-[#171717] hover:bg-[#1B4332] disabled:opacity-50 rounded transition-colors flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
