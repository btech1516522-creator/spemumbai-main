'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface QuickReply {
  label: string;
  value: string;
}

/* ──────────────────────────────────────────────
   Knowledge Base – edit / extend as needed
   ────────────────────────────────────────────── */
const QUICK_REPLIES: QuickReply[] = [
  { label: '📅 Upcoming Events', value: 'What are the upcoming events?' },
  { label: '🤝 Membership', value: 'How do I become a member?' },
  { label: '🙋 Volunteering', value: 'How can I volunteer?' },
  { label: '📞 Contact Us', value: 'How can I contact SPE Mumbai?' },
  { label: '🎓 Student Chapters', value: 'Tell me about student chapters' },
  { label: '📊 Reports', value: 'Where can I find reports?' },
];

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ['event', 'upcoming', 'conference', 'workshop', 'seminar', 'webinar', 'technical talk'],
    answer:
      'SPE Mumbai Section organises a variety of events throughout the year including technical talks, workshops, webinars and networking sessions. You can browse all upcoming events on our **Events** page (/events). Sign up for our newsletter to never miss an event!',
  },
  {
    keywords: ['member', 'join', 'membership', 'sign up', 'register', 'enrol', 'enroll'],
    answer:
      'Becoming an SPE member gives you access to a global network of petroleum professionals, discounted events, technical publications and career resources.\n\n**How to join:**\n1. Visit spe.org and create an account.\n2. Choose your membership level (Professional, Student, or Young Professional).\n3. Select "Mumbai Section" as your local section.\n\nNeed help? Reach out via our **Contact** page (/contact).',
  },
  {
    keywords: ['volunteer', 'volunteering', 'help', 'contribute', 'give back'],
    answer:
      "We'd love to have you! SPE Mumbai offers volunteering opportunities in:\n\n- **Education** - mentor students & organise workshops\n- **Events** - plan & execute technical sessions\n- **Communication** - manage content, social media & outreach\n- **Mentoring** - guide young professionals\n\nVisit our **Volunteering** page (/volunteering) to learn more and sign up.",
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'office', 'address', 'location'],
    answer:
      "You can get in touch with SPE Mumbai Section through:\n\n- **Email:** info@spemumbai.org\n- **Phone:** +91-22-XXXX-XXXX\n- **Visit:** Our **Contact** page (/contact) for the full contact form and office address.\n\nWe typically respond within 1-2 business days.",
  },
  {
    keywords: ['student', 'chapter', 'university', 'college', 'academic'],
    answer:
      "SPE Mumbai supports several student chapters across universities in the region. Student chapters provide:\n\n- Networking with industry professionals\n- Technical paper contests\n- Field trips and industrial visits\n- Scholarships and grants\n\nLearn more on our **Students** page (/students).",
  },
  {
    keywords: ['report', 'annual', 'publication', 'document', 'pdf', 'download'],
    answer:
      'Our annual reports, technical publications and newsletters are available for download on the **Reports** page (/reports). These documents cover section activities, financials and technical highlights.',
  },
  {
    keywords: ['leadership', 'board', 'committee', 'chair', 'president', 'officer', 'team'],
    answer:
      "SPE Mumbai Section is led by a dedicated Board of Directors and several sub-committees. Visit the **Leadership** page (/leadership) to meet the current team and learn about their backgrounds.",
  },
  {
    keywords: ['sponsor', 'partnership', 'corporate', 'support', 'funding'],
    answer:
      'SPE Mumbai collaborates with leading energy companies through sponsorships and partnerships. If your organisation is interested in sponsoring an event or initiative, please contact us via the **Contact** page (/contact) or email partnerships@spemumbai.org.',
  },
  {
    keywords: ['gallery', 'photo', 'image', 'picture'],
    answer:
      'Relive the highlights! Our **Gallery** page (/gallery) features photos from past events, conferences and social gatherings.',
  },
  {
    keywords: ['faq', 'question', 'problem', 'issue', 'trouble', 'error', 'bug', 'not working', 'help me'],
    answer:
      "Sorry to hear you're having trouble! Here are some quick tips:\n\n1. **Clear your browser cache** and try again.\n2. Check our **FAQ** page (/faq) for common questions.\n3. If the issue persists, describe it on our **Contact** page (/contact) and our team will assist you.\n\nCan you share more details about what you're experiencing?",
  },
  {
    keywords: ['dashboard', 'analytics', 'data', 'statistics', 'stats'],
    answer:
      "Our **Dashboard** page (/dashboard) provides a visual overview of section activities, membership trends and event statistics. It's updated regularly to reflect the latest data.",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
    answer:
      'Hello! 👋 Welcome to SPE Mumbai Section. How can I help you today? Feel free to ask about events, membership, volunteering, or anything else!',
  },
  {
    keywords: ['thank', 'thanks', 'thank you', 'appreciate'],
    answer:
      "You're welcome! \u{1F60A} Is there anything else I can help you with?",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    answer:
      'Goodbye! Have a great day. Feel free to come back anytime you need help. 👋',
  },
];

const DEFAULT_ANSWER =
  "I'm not sure I understood that. Could you try rephrasing your question? You can also use the quick‑reply buttons below, or visit our **FAQ** page (/faq) for common questions.\n\nIf you need direct assistance, please reach out through our **Contact** page (/contact).";

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch ? bestMatch.answer : DEFAULT_ANSWER;
}

/** very small markdown‑like renderer (bold, links to pages) */
function renderMarkdown(text: string) {
  // Convert **bold** to <strong>
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Convert (/path) page links to anchor tags
  html = html.replace(
    /\((\/([\w-]+))\)/g,
    '(<a href="$1" class="underline text-spe-blue-500 hover:text-spe-navy font-medium">$1</a>)',
  );
  // Convert newlines to <br>
  html = html.replace(/\n/g, '<br/>');
  return html;
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: "Hello! 👋 I'm the SPE Mumbai assistant. How can I help you today? Ask me about events, membership, volunteering, or any issues you're facing.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMsg: Message = {
        id: generateId(),
        role: 'user',
        text: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      // Simulate a short thinking delay
      setTimeout(() => {
        const answer = findAnswer(text);
        const botMsg: Message = {
          id: generateId(),
          role: 'bot',
          text: answer,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 600 + Math.random() * 600);
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (value: string) => {
    sendMessage(value);
  };

  /* ── Badge count for unopened chat ── */
  const [hasUnread, setHasUnread] = useState(true);
  useEffect(() => {
    if (isOpen) setHasUnread(false);
  }, [isOpen]);

  return (
    <>
      {/* ── Floating Button ── */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-spe-navy to-spe-blue-500 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-spe-blue-400 focus:ring-offset-2"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.svg
              key="close"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
            1
          </span>
        )}
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border border-spe-gray-200 bg-white flex flex-col overflow-hidden"
            style={{ height: 520, maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-spe-navy to-spe-blue-500 px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="white"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm leading-tight">SPE Mumbai Assistant</h3>
                <p className="text-blue-200 text-xs mt-0.5">Ask me anything about SPE Mumbai</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-spe-gray-50/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-spe-navy to-spe-blue-500 text-white rounded-br-md'
                        : 'bg-white text-spe-gray-700 shadow-sm border border-spe-gray-100 rounded-bl-md'
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                    />
                    <span
                      className={`block mt-1 text-[10px] ${
                        msg.role === 'user' ? 'text-blue-200' : 'text-spe-gray-400'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-spe-gray-100">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-spe-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-spe-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-spe-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 bg-white border-t border-spe-gray-100">
                <p className="text-[11px] text-spe-gray-400 font-medium mb-1.5 uppercase tracking-wide">Quick Actions</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr.value}
                      onClick={() => handleQuickReply(qr.value)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-spe-blue-50 text-spe-blue-500 hover:bg-spe-blue-100 hover:text-spe-navy transition-colors duration-200 border border-spe-blue-100"
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 py-3 bg-white border-t border-spe-gray-100 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                className="flex-1 px-4 py-2.5 text-sm bg-spe-gray-50 rounded-xl border border-spe-gray-200 focus:outline-none focus:ring-2 focus:ring-spe-blue-400 focus:border-transparent placeholder:text-spe-gray-400 transition-shadow"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-spe-navy to-spe-blue-500 text-white disabled:opacity-40 hover:shadow-md transition-all duration-200 flex-shrink-0"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
