"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CHAT_QUICK_TOPICS, type ChatTopicId } from "@/lib/chat-knowledge";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: { label: string; href: string }[];
};

type QuickReply = { id: string; label: string };

type Flow = null | "call" | "ticket";

const WELCOME =
  "Hi — I'm LaunchNest's assistant. I know our services, pricing, and intro offers. I can book a **free 30-minute call**, log a support ticket, or answer questions. How can I help?";

export function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(
    CHAT_QUICK_TOPICS.map((t) => ({ id: t.id, label: t.label })),
  );
  const [typing, setTyping] = useState(false);
  const [flow, setFlow] = useState<Flow>(null);
  const [flowStep, setFlowStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          text: WELCOME,
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollBottom();
  }, [messages, typing, flow, scrollBottom]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const addAssistant = (text: string, links?: Msg["links"], replies?: QuickReply[]) => {
    setMessages((m) => [
      ...m,
      { id: `${Date.now()}-a`, role: "assistant", text, links },
    ]);
    if (replies) setQuickReplies(replies);
  };

  const addUser = (text: string) => {
    setMessages((m) => [...m, { id: `${Date.now()}-u`, role: "user", text }]);
  };

  const fetchReply = async (message: string, topic?: ChatTopicId) => {
    setTyping(true);
    setQuickReplies([]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "message", message, topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      const reply = data.reply;
      addAssistant(reply.text, reply.links, reply.quickReplies);
    } catch {
      addAssistant(
        "Sorry — I hit a snag. Try again or use WhatsApp / the contact page.",
        [{ label: "Contact", href: "/contact" }],
        [{ id: "call", label: "Book 30-min call" }],
      );
    } finally {
      setTyping(false);
    }
  };

  const handleQuickReply = async (id: string, label: string) => {
    addUser(label);

    if (id === "start_call_form") {
      setFlow("call");
      setFlowStep(0);
      setFormData({ name: "", email: "", phone: "", message: "" });
      addAssistant(
        "Let's book your **free 30-minute call**. What's your **full name**?",
        undefined,
        [],
      );
      return;
    }

    if (id === "start_ticket_form") {
      setFlow("ticket");
      setFlowStep(0);
      setFormData({ name: "", email: "", phone: "", message: "" });
      addAssistant(
        "I'll log a support ticket. What's your **full name**?",
        undefined,
        [],
      );
      return;
    }

    const topic = CHAT_QUICK_TOPICS.find((t) => t.id === id)?.id as ChatTopicId | undefined;
    await fetchReply(label, topic ?? (id as ChatTopicId));
  };

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || typing) return;

    if (flow) {
      await handleFlowInput(text);
      setInput("");
      return;
    }

    setInput("");
    addUser(text);
    await fetchReply(text);
  };

  const handleFlowInput = async (text: string) => {
    setFormError("");
    const steps =
      flow === "call"
        ? (["name", "email", "phone", "message"] as const)
        : (["name", "email", "phone", "message"] as const);

    const current = steps[flowStep];
    const next = { ...formData, [current]: text };
    setFormData(next);

    if (flowStep < steps.length - 1) {
      setFlowStep(flowStep + 1);
      const prompts: Record<"name" | "email" | "phone", string> = {
        name: "Thanks! What's your **email**?",
        email: "And your **phone or WhatsApp** number?",
        phone:
          flow === "call"
            ? "What would you like to cover on the call? (project, existing site, timeline…)"
            : "Describe the issue — what's broken or what do you need help with?",
      };
      if (current !== "message") {
        addAssistant(prompts[current], undefined, []);
      }
      return;
    }

    // Submit
    setTyping(true);
    addAssistant("Submitting…", undefined, []);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          lead: {
            requestType: flow === "call" ? "call-30min" : "ticket",
            name: next.name,
            email: next.email,
            phone: next.phone,
            message: next.message,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMessages((m) => m.slice(0, -1));
      addAssistant(data.reply.text, undefined, data.reply.quickReplies);
      setFlow(null);
      setFlowStep(0);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setMessages((m) => m.slice(0, -1));
      setFormError(err instanceof Error ? err.message : "Submission failed.");
      addAssistant(
        `Something went wrong: ${err instanceof Error ? err.message : "try again"}.`,
        [{ label: "Contact page", href: "/contact" }],
        [{ id: "start_call_form", label: "Try booking again" }],
      );
      setFlow(null);
    } finally {
      setTyping(false);
    }
  };

  const cancelFlow = () => {
    setFlow(null);
    setFlowStep(0);
    setFormData({ name: "", email: "", phone: "", message: "" });
    addAssistant("No problem — cancelled. What else can I help with?", undefined, [
      { id: "services", label: "Services" },
      { id: "pricing", label: "Pricing" },
      { id: "call", label: "Book a call" },
    ]);
  };

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group fixed bottom-24 left-5 z-50 flex h-14 items-center gap-2 rounded-full bg-navy pl-4 pr-5 text-offwhite shadow-lg shadow-black/25 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-6 sm:left-6"
          aria-label="Open LaunchNest chat assistant"
        >
          <ChatBubbleIcon />
          <span className="hidden font-heading text-sm font-semibold sm:inline">
            Chat with us
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-end sm:justify-start sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="LaunchNest chat assistant"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/40 sm:bg-transparent"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-[min(100dvh,640px)] w-full max-w-md flex-col overflow-hidden rounded-t-2xl border border-navy/10 bg-white shadow-2xl sm:h-[min(560px,85vh)] sm:rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/10 bg-navy px-4 py-3 text-offwhite">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20">
                  <ChatBubbleIcon className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold">LaunchNest</p>
                  <p className="text-xs text-offwhite/70">Usually replies instantly</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-offwhite/80 hover:bg-white/10 hover:text-offwhite"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-navy text-offwhite"
                        : "rounded-bl-md border border-navy/10 bg-offwhite text-navy"
                    }`}
                  >
                    <MessageText text={m.text} />
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.links.map((l) =>
                          l.href.startsWith("http") ? (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-gold underline underline-offset-2"
                            >
                              {l.label} ↗
                            </a>
                          ) : (
                            <Link
                              key={l.href}
                              href={l.href}
                              className="text-xs font-semibold text-gold underline underline-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              {l.label} →
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="mb-3 flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-navy/10 bg-offwhite px-4 py-3">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {quickReplies.length > 0 && !flow && (
              <div className="flex gap-2 overflow-x-auto border-t border-navy/5 px-4 py-2">
                {quickReplies.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    disabled={typing}
                    onClick={() => handleQuickReply(q.id, q.label)}
                    className="shrink-0 rounded-full border border-navy/15 bg-white px-3 py-1.5 font-heading text-xs font-semibold text-navy transition-colors hover:border-gold hover:bg-offwhite disabled:opacity-50"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {flow && (
              <div className="border-t border-navy/5 px-4 py-2">
                <button
                  type="button"
                  onClick={cancelFlow}
                  className="text-xs font-medium text-slate underline underline-offset-2"
                >
                  Cancel {flow === "call" ? "booking" : "ticket"}
                </button>
              </div>
            )}

            {formError && (
              <p className="px-4 pb-1 text-xs font-medium text-navy" role="alert">
                {formError}
              </p>
            )}

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex gap-2 border-t border-navy/10 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  flow
                    ? flowStep === 0
                      ? "Your name…"
                      : flowStep === 1
                        ? "you@email.com"
                        : flowStep === 2
                          ? "+1 555…"
                          : "Your message…"
                    : "Ask about services, pricing, or book a call…"
                }
                className="min-w-0 flex-1 rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                autoComplete={flowStep === 1 ? "email" : flowStep === 0 ? "name" : "off"}
                disabled={typing}
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold text-navy transition-opacity hover:opacity-90 disabled:opacity-40"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function MessageText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-bounce rounded-full bg-slate/40"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}

function ChatBubbleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M16 2 8 10M16 2l-5 14-3-6-6-3 14-5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
