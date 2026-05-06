"use client";

import { Mail, MapPin, Send, Code, Briefcase, MessageCircle } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export function Contact() {
  return (
    <section className="py-20 lg:py-28 w-full" id="contact">
      <FadeUp>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-stone-900">
          Let&apos;s <span className="text-amber-600">Connects</span>
        </h2>
        <p className="text-stone-500 text-center max-w-2xl mx-auto mb-16 text-lg">
          I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <FadeUp delay={0.1}>
          <GlassCard className="h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-8 text-stone-900">Contact Information</h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Mail size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-stone-400 mb-1">Email</p>
                  <a href="mailto:hello@example.com" className="text-stone-700 hover:text-amber-600 transition-colors font-medium">
                    hello@example.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                  <MapPin size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-stone-400 mb-1">Location</p>
                  <p className="text-stone-700 font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-stone-900">Socials</h3>
            <div className="flex gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-amber-600 hover:bg-amber-100 transition-colors border border-stone-200 hover:border-amber-300"
                aria-label="GitHub">
                <Code size={22} aria-hidden />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-amber-600 hover:bg-amber-100 transition-colors border border-stone-200 hover:border-amber-300"
                aria-label="LinkedIn">
                <Briefcase size={22} aria-hidden />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-amber-600 hover:bg-amber-100 transition-colors border border-stone-200 hover:border-amber-300"
                aria-label="Twitter">
                <MessageCircle size={22} aria-hidden />
              </a>
            </div>
          </GlassCard>
        </FadeUp>

        <FadeUp delay={0.2}>
          <GlassCard>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-stone-700">Name</label>
                <input
                  type="text" id="name" placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-stone-700">Email</label>
                <input
                  type="email" id="email" placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-stone-700">Message</label>
                <textarea
                  id="message" rows={5} placeholder="How can I help you?"
                  className="w-full px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none"
                />
              </div>
              <Button variant="primary" className="mt-4 gap-2 w-full sm:w-auto self-start">
                Send Message <Send size={18} aria-hidden="true" />
              </Button>
            </form>
          </GlassCard>
        </FadeUp>
      </div>
    </section>
  );
}
