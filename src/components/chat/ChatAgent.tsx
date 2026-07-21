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

type QuickReply = { id: string; label: string; userText?: string };

type Flow = null | "call" | "ticket";

const WELCOME =
  "Hi — I'm LaunchNest's assistant. Ask about services, pricing, or our $20 intro offer. I can book a **free 30-min call** or log a support ticket.";

const FAB_BOTTOM =
  "bottom-[calc(1.25rem+var(--mobile-sticky-offset,0px)+env(safe-area-inset-bottom))]";

function getInputConfig(flow: Flow, flowStep: number) {
  if (!flow) {
    return {
      multiline: false,
      type: "text" as const,
      inputMode: undefined as undefined,
      placeholder: "Ask a question…",
      autoComplete: "off",
      enterKeyHint: "send" as const,
    };
  }
  switch (flowStep) {
    case 0:
      return {
        multiline: false,
        type: "text" as const,
        inputMode: undefined,
        placeholder: "Your full name",
        autoComplete: "name",
        enterKeyHint: "next" as const,
      };
    case 1:
      return {
        multiline: false,
        type: "email" as const,
        inputMode: "email" as const,
        placeholder: "you@email.com",
        autoComplete: "email",
        enterKeyHint: "next" as const,
      };
    case 2:
      return {
        multiline: false,
        type: "tel" as const,
        inputMode: "tel" as const,
        placeholder: "Phone or WhatsApp",
        autoComplete: "tel",
        enterKeyHint: "next" as const,
      };
    default:
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
}

export function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(
    CHAT_QUICK_TOPICS.map((t) => ({
      id: t.id,
      label: t.chipLabel,
      userText: t.label,
    })),
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const inputConfig = getInputConfig(flow, flowStep);

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

  useEffect(() => {
    if (!open) {
      document.documentElement.style.removeProperty("--chat-vvh");
      return;
    }
    const vv = window.visualViewport;
    if (!vv) return;

    const syncViewport = () => {
      document.documentElement.style.setProperty("--chat-vvh", `${vv.height}px`);
    };

    syncViewport();
    vv.addEventListener("resize", syncViewport);
    vv.addEventListener("scroll", syncViewport);
    return () => {
      vv.removeEventListener("resize", syncViewport);
      vv.removeEventListener("scroll", syncViewport);
      document.documentElement.style.removeProperty("--chat-vvh");
    };
  }, [open]);

  useEffect(() => {
    if (!open || !flow) return;
    const t = window.setTimeout(() => {
      if (inputConfig.multiline) textareaRef.current?.focus();
      else inputRef.current?.focus();
    }, 80);
    return () => window.clearTimeout(t);
  }, [open, flow, flowStep, inputConfig.multiline]);

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

  const handleQuickReply = async (id: string, label: string, userText?: string) => {
    addUser(userText ?? label);

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

    const topicEntry = CHAT_QUICK_TOPICS.find((t) => t.id === id);
    const topic = topicEntry?.id as ChatTopicId | undefined;
    await fetchReply(userText ?? topicEntry?.label ?? label, topic ?? (id as ChatTopicId));
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
          className={`group fixed left-4 z-50 flex h-14 min-h-[44px] items-center gap-2 rounded-full bg-navy pl-4 pr-4 text-offwhite shadow-lg shadow-black/25 transition-[bottom,transform] duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-6 sm:left-6 sm:pr-5 ${FAB_BOTTOM}`}
          aria-label="Open LaunchNest chat assistant"
        >
          <ChatBubbleIcon />
          <span className="font-heading text-sm font-semibold sm:inline">
            Chat
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
            className="absolute inset-0 bg-navy/50 sm:bg-navy/20"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-[var(--chat-vvh,100dvh)] max-h-[var(--chat-vvh,100dvh)] w-full max-w-md flex-col overflow-hidden rounded-t-2xl border border-navy/10 bg-white shadow-2xl sm:h-[min(560px,85vh)] sm:max-h-[85vh] sm:rounded-2xl">
            <div
              className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-navy/20 sm:hidden"
              aria-hidden="true"
            />
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-navy/10 bg-navy px-4 py-3 text-offwhite">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20">
                  <ChatBubbleIcon className="h-5 w-5 text-gold" />
                </span>
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold">LaunchNest</p>
                  <p className="truncate text-xs text-offwhite/70">Usually replies instantly</p>
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

            {/* Messages */}
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

            {/* Quick replies */}
            {quickReplies.length > 0 && !flow && (
              <div className="shrink-0 border-t border-navy/5 px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      disabled={typing}
                      onClick={() => handleQuickReply(q.id, q.label, q.userText)}
                      className="min-h-[44px] touch-manipulation rounded-full border border-navy/15 bg-white px-4 py-2 font-heading text-sm font-semibold text-navy transition-colors hover:border-gold hover:bg-offwhite disabled:opacity-50"
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

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="flex shrink-0 items-end gap-2 border-t border-navy/10 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
            >
              {inputConfig.multiline ? (
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
                  placeholder={inputConfig.placeholder}
                  rows={2}
                  enterKeyHint={inputConfig.enterKeyHint}
                  disabled={typing}
                  className="min-h-[44px] min-w-0 flex-1 resize-none rounded-lg border border-navy/15 px-3 py-2.5 text-base text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:text-sm"
                />
              ) : (
                <input
                  ref={inputRef}
                  type={inputConfig.type}
                  inputMode={inputConfig.inputMode}
                  enterKeyHint={inputConfig.enterKeyHint}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={inputConfig.placeholder}
                  autoComplete={inputConfig.autoComplete}
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
