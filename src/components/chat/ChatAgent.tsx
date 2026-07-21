"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CHAT_QUICK_TOPICS, type ChatTopicId } from "@/lib/chat-knowledge";
import { isNonEmpty, isValidEmail } from "@/lib/form-validation";

type Msg = {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: { label: string; href: string }[];
};

type QuickReply = { id: string; label: string; userText?: string };

type Flow = null | "call" | "ticket";

type ChatProfile = { name: string; email: string };

const PROFILE_KEY = "launchnest-chat-profile";

const WELCOME =
  "Hi — I'm LaunchNest's assistant. Ask about services, pricing, or our $20 intro offer. I can book a **free 30-min call** or log a support ticket.";

const FAB_BOTTOM =
  "bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:bottom-6";

const BUBBLE_CLASS =
  "fixed left-4 z-[70] flex w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_12px_48px_-12px_rgba(11,31,58,0.45)]";

function loadProfile(): ChatProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChatProfile;
    if (isNonEmpty(parsed.name) && isValidEmail(parsed.email)) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

function saveProfile(profile: ChatProfile) {
  sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function getFlowInputConfig(flow: Flow, flowStep: number) {
  if (flowStep === 0) {
    return {
      multiline: false,
      type: "tel" as const,
      inputMode: "tel" as const,
      placeholder: "Phone or WhatsApp",
      autoComplete: "tel",
      enterKeyHint: "next" as const,
    };
  }
  return {
    multiline: true,
    type: "text" as const,
    inputMode: undefined,
    placeholder:
      flow === "call"
        ? "What would you like to discuss?"
        : "What's broken or what do you need?",
    autoComplete: "off",
    enterKeyHint: "send" as const,
  };
}

export function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<ChatProfile | null>(null);
  const [introName, setIntroName] = useState("");
  const [introEmail, setIntroEmail] = useState("");
  const [introError, setIntroError] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>([]);
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const chatReady = profile !== null;
  const flowInput = flow ? getFlowInputConfig(flow, flowStep) : null;

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const initChat = useCallback(() => {
    setMessages([{ id: "welcome", role: "assistant", text: WELCOME }]);
    setQuickReplies(
      CHAT_QUICK_TOPICS.map((t) => ({
        id: t.id,
        label: t.chipLabel,
        userText: t.label,
      })),
    );
  }, []);

  useEffect(() => {
    if (open && chatReady && messages.length === 0) {
      initChat();
    }
  }, [open, chatReady, messages.length, initChat]);

  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages, typing, flow, scrollBottom]);

  useEffect(() => {
    if (!open || !flow) return;
    const t = window.setTimeout(() => {
      if (flowInput?.multiline) textareaRef.current?.focus();
      else inputRef.current?.focus();
    }, 80);
    return () => window.clearTimeout(t);
  }, [open, flow, flowStep, flowInput?.multiline]);

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
        [{ id: "call", label: "Book call" }],
      );
    } finally {
      setTyping(false);
    }
  };

  function handleIntroSubmit(e: FormEvent) {
    e.preventDefault();
    const name = introName.trim();
    const email = introEmail.trim();
    if (!isNonEmpty(name)) {
      setIntroError("Please enter your full name.");
      return;
    }
    if (!isValidEmail(email)) {
      setIntroError("Please enter a valid email address.");
      return;
    }
    const next = { name, email };
    saveProfile(next);
    setProfile(next);
    setFormData((prev) => ({ ...prev, name, email }));
    setIntroError("");
    initChat();
  }

  const startCallOrTicket = (type: "call" | "ticket") => {
    if (!profile) return;
    setFlow(type);
    setFlowStep(0);
    setFormData({ name: profile.name, email: profile.email, phone: "", message: "" });
    addAssistant(
      type === "call"
        ? "Let's book your **free 30-minute call**. What's your **phone or WhatsApp** number?"
        : "I'll log a support ticket. What's your **phone or WhatsApp** number?",
      undefined,
      [],
    );
  };

  const handleQuickReply = async (id: string, label: string, userText?: string) => {
    addUser(userText ?? label);

    if (id === "start_call_form") {
      startCallOrTicket("call");
      return;
    }
    if (id === "start_ticket_form") {
      startCallOrTicket("ticket");
      return;
    }
    if (id === "call") {
      startCallOrTicket("call");
      return;
    }
    if (id === "ticket") {
      startCallOrTicket("ticket");
      return;
    }

    const topicEntry = CHAT_QUICK_TOPICS.find((t) => t.id === id);
    const topic = topicEntry?.id as ChatTopicId | undefined;
    await fetchReply(userText ?? topicEntry?.label ?? label, topic ?? (id as ChatTopicId));
  };

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || typing || !chatReady) return;

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
    if (!profile) return;
    setFormError("");
    const steps = ["phone", "message"] as const;
    const current = steps[flowStep];
    const next = { ...formData, [current]: text };
    setFormData(next);

    if (flowStep < steps.length - 1) {
      setFlowStep(flowStep + 1);
      addAssistant(
        flow === "call"
          ? "What would you like to cover on the call? (project, existing site, timeline…)"
          : "Describe the issue — what's broken or what do you need help with?",
        undefined,
        [],
      );
      return;
    }

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
            name: profile.name,
            email: profile.email,
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
      setFormData({ name: profile.name, email: profile.email, phone: "", message: "" });
    } catch (err) {
      setMessages((m) => m.slice(0, -1));
      setFormError(err instanceof Error ? err.message : "Submission failed.");
      addAssistant(
        `Something went wrong: ${err instanceof Error ? err.message : "try again"}.`,
        [{ label: "Contact page", href: "/contact" }],
        [{ id: "start_call_form", label: "Try again" }],
      );
      setFlow(null);
    } finally {
      setTyping(false);
    }
  };

  const cancelFlow = () => {
    setFlow(null);
    setFlowStep(0);
    if (profile) {
      setFormData({ name: profile.name, email: profile.email, phone: "", message: "" });
    }
    addAssistant("No problem — cancelled. What else can I help with?", undefined, [
      { id: "services", label: "Services" },
      { id: "pricing", label: "Pricing" },
      { id: "call", label: "Book call" },
    ]);
  };

  const bubblePosition = `${BUBBLE_CLASS} ${FAB_BOTTOM} h-[min(520px,calc(100dvh-7rem))]`;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`group fixed left-4 z-50 flex h-14 min-h-[44px] items-center gap-2 rounded-full bg-navy pl-4 pr-4 text-offwhite shadow-lg shadow-black/25 transition-[bottom,transform] duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-6 sm:left-6 sm:pr-5 ${FAB_BOTTOM}`}
          aria-label="Open LaunchNest chat assistant"
        >
          <ChatBubbleIcon />
          <span className="font-heading text-sm font-semibold">Chat</span>
        </button>
      )}

      {open && (
        <div
          className={bubblePosition}
          role="dialog"
          aria-modal="false"
          aria-label="LaunchNest chat assistant"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-navy/10 bg-navy px-4 py-3 text-offwhite">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20">
                <ChatBubbleIcon className="h-5 w-5 text-gold" />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-sm font-semibold">LaunchNest</p>
                <p className="truncate text-xs text-offwhite/70">
                  {chatReady ? "Usually replies instantly" : "Quick intro first"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-offwhite/80 hover:bg-white/10 hover:text-offwhite"
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          {!chatReady ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5">
              <p className="font-heading text-base font-semibold text-navy">
                Before we start
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">
                Share your name and email so we can follow up if you book a call or
                raise a ticket.
              </p>
              <form onSubmit={handleIntroSubmit} className="mt-5 flex flex-col gap-3">
                <div>
                  <label htmlFor="chat-intro-name" className="mb-1.5 block text-sm font-semibold text-navy">
                    Full name
                  </label>
                  <input
                    id="chat-intro-name"
                    type="text"
                    value={introName}
                    onChange={(e) => setIntroName(e.target.value)}
                    autoComplete="name"
                    required
                    minLength={2}
                    placeholder="Jordan Avery"
                    className="min-h-[44px] w-full rounded-lg border border-navy/15 px-3 py-2.5 text-base text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="chat-intro-email" className="mb-1.5 block text-sm font-semibold text-navy">
                    Email
                  </label>
                  <input
                    id="chat-intro-email"
                    type="email"
                    value={introEmail}
                    onChange={(e) => setIntroEmail(e.target.value)}
                    autoComplete="email"
                    required
                    placeholder="you@email.com"
                    className="min-h-[44px] w-full rounded-lg border border-navy/15 px-3 py-2.5 text-base text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
                  />
                </div>
                {introError && (
                  <p className="text-sm font-medium text-navy" role="alert">
                    {introError}
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-1 min-h-[44px] touch-manipulation rounded-lg bg-gold px-4 py-3 font-heading text-sm font-semibold text-navy transition-opacity hover:opacity-90"
                >
                  Start chat
                </button>
              </form>
              <p className="mt-4 text-center text-xs text-slate">
                We only use this to reply to you — no spam.
              </p>
            </div>
          ) : (
            <>
              <div
                ref={listRef}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
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

              {quickReplies.length > 0 && !flow && (
                <div className="shrink-0 border-t border-navy/5 px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        disabled={typing}
                        onClick={() => handleQuickReply(q.id, q.label, q.userText)}
                        className="min-h-[40px] touch-manipulation rounded-full border border-navy/15 bg-white px-3 py-1.5 font-heading text-xs font-semibold text-navy transition-colors hover:border-gold hover:bg-offwhite disabled:opacity-50 sm:min-h-[44px] sm:px-4 sm:text-sm"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {flow && (
                <div className="shrink-0 border-t border-navy/5 px-4 py-2.5">
                  <button
                    type="button"
                    onClick={cancelFlow}
                    className="min-h-[44px] touch-manipulation text-sm font-medium text-slate underline underline-offset-2"
                  >
                    Cancel {flow === "call" ? "booking" : "ticket"}
                  </button>
                </div>
              )}

              {formError && (
                <p className="shrink-0 px-4 pb-1 text-sm font-medium text-navy" role="alert">
                  {formError}
                </p>
              )}

              <form
                onSubmit={handleSend}
                className="flex shrink-0 items-end gap-2 border-t border-navy/10 p-3"
              >
                {flow && flowInput?.multiline ? (
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void handleSend();
                      }
                    }}
                    placeholder={flowInput.placeholder}
                    rows={2}
                    enterKeyHint={flowInput.enterKeyHint}
                    disabled={typing}
                    className="min-h-[44px] min-w-0 flex-1 resize-none rounded-lg border border-navy/15 px-3 py-2.5 text-base text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
                  />
                ) : (
                  <input
                    ref={inputRef}
                    type={flow ? flowInput?.type : "text"}
                    inputMode={flow ? flowInput?.inputMode : undefined}
                    enterKeyHint={flow ? flowInput?.enterKeyHint : "send"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      flow ? flowInput?.placeholder : "Ask a question…"
                    }
                    autoComplete={flow ? flowInput?.autoComplete : "off"}
                    disabled={typing}
                    className="min-h-[44px] min-w-0 flex-1 rounded-lg border border-navy/15 px-3 py-2.5 text-base text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
                  />
                )}
                <button
                  type="submit"
                  disabled={typing || !input.trim()}
                  className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg bg-gold text-navy transition-opacity hover:opacity-90 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <SendIcon />
                </button>
              </form>
            </>
          )}
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
