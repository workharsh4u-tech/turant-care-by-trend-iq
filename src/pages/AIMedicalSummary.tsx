import { useState } from "react";
import { Brain, Send, Loader2, User, Stethoscope, Copy, CheckCheck, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { mockAIPrompts, mockAIResponses, mockPatient } from "@/data/mockData";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "ai"; content: string; time: string };
type Mode = "doctor" | "patient";

function formatMarkdown(text: string) {
  return text
    .split('\n')
    .map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-base font-bold text-foreground mt-4 mb-1.5">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-sm font-bold text-foreground mt-3 mb-1">{line.slice(4)}</h3>;
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-foreground text-sm">{line.slice(2, -2)}</p>;
      if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} className="text-sm text-foreground ml-4 list-disc">{line.slice(2)}</li>;
      if (line.startsWith('---')) return <hr key={i} className="border-border my-2" />;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-sm text-foreground leading-relaxed">{line}</p>;
    });
}

export default function AIMedicalSummary() {
  const [mode, setMode] = useState<Mode>("doctor");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: `Hello! I'm the Turant Care AI Medical Assistant.\n\nI'm analyzing **${mockPatient.name}** (${mockPatient.id}).\n\nI can help you with:\n- Complete patient medical summaries\n- Drug interaction analysis\n- Personalized diet and nutrition plans\n- Lifestyle precautions and recommendations\n- Pharmacogenomic profile explanations\n\nHow can I assist you today?`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const getAIResponse = (prompt: string): string => {
    const lower = prompt.toLowerCase();
    if (lower.includes("summary") || lower.includes("medical")) return mockAIResponses.summary;
    if (lower.includes("diet") || lower.includes("nutrition") || lower.includes("food")) return mockAIResponses.diet;
    if (lower.includes("precaution") || lower.includes("lifestyle") || lower.includes("recommendation")) return mockAIResponses.precautions;
    if (lower.includes("drug") || lower.includes("risk") || lower.includes("medication")) return mockAIResponses.summary;
    return `I've analyzed **${mockPatient.name}'s** profile for your query: "${prompt}".\n\n**Key findings:**\n- Patient has CYP2D6 Intermediate Metabolizer status\n- Codeine is CONTRAINDICATED\n- Current medications (Metformin, Amlodipine, Levothyroxine) are pharmacogenomically safe\n- No significant drug-drug interactions detected\n\nWould you like me to generate a specific report? Try asking for a medical summary, diet plan, or precautions.`;
  };

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || isLoading) return;
    setInput("");

    const userMsg: Message = { role: "user", content, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 800));

    const aiMsg: Message = {
      role: "ai",
      content: getAIResponse(content),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const copyMessage = (index: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <DashboardLayout title="AI Medical Summary" subtitle="Turant Care AI Clinical Assistant — Powered by Explainable AI">
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-11rem)]">
        {/* Mode Toggle + Patient Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex rounded-xl border border-border p-1 bg-card">
            <button
              onClick={() => setMode("doctor")}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all", mode === "doctor" ? "text-white shadow-medical-sm" : "text-muted-foreground hover:text-foreground")}
              style={mode === "doctor" ? { background: "var(--gradient-primary)" } : {}}
            >
              <Stethoscope className="w-3.5 h-3.5" /> Doctor Mode
            </button>
            <button
              onClick={() => setMode("patient")}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all", mode === "patient" ? "text-white shadow-medical-sm" : "text-muted-foreground hover:text-foreground")}
              style={mode === "patient" ? { background: "var(--gradient-primary)" } : {}}
            >
              <User className="w-3.5 h-3.5" /> Patient Mode
            </button>
          </div>
          <div className="card-medical px-4 py-2 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
              {mockPatient.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">{mockPatient.name}</p>
              <p className="text-xs text-muted-foreground">{mockPatient.id} · {mockPatient.bloodGroup}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl border border-success/30 bg-success-light">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold text-success">AI Online</span>
          </div>
        </div>

        {/* Quick Prompt Suggestions */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
          {mockAIPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              disabled={isLoading}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary-light transition-all disabled:opacity-50"
            >
              <Brain className="w-3 h-3" />
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto card-medical p-4 space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-3 animate-fade-in", msg.role === "user" ? "justify-end" : "justify-start")}>
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1" style={{ background: "var(--gradient-primary)" }}>
                  <Brain className="w-4 h-4" />
                </div>
              )}
              <div className={cn("max-w-[78%] rounded-2xl p-4 relative group", msg.role === "user" ? "text-white" : "bg-muted/30 border border-border")}
                style={msg.role === "user" ? { background: "var(--gradient-primary)" } : {}}>
                {msg.role === "ai" ? (
                  <div className="space-y-0.5">{formatMarkdown(msg.content)}</div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
                <div className={cn("flex items-center justify-between mt-2 pt-1.5 border-t", msg.role === "user" ? "border-white/20" : "border-border")}>
                  <span className={cn("text-xs", msg.role === "user" ? "text-white/60" : "text-muted-foreground")}>{msg.time}</span>
                  {msg.role === "ai" && (
                    <button
                      onClick={() => copyMessage(i, msg.content)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      {copied === i ? <><CheckCheck className="w-3 h-3 text-success" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                    </button>
                  )}
                </div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1" style={{ background: "hsl(var(--secondary))" }}>
                  {mode === "doctor" ? "Dr" : "P"}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: "var(--gradient-primary)" }}>
                <Brain className="w-4 h-4" />
              </div>
              <div className="bg-muted/30 border border-border rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                <span className="text-sm text-muted-foreground">AI is analyzing patient data...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="card-medical p-3 flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder={mode === "doctor" ? "Ask for patient summary, drug risks, clinical recommendations..." : "Ask about your medications, diet plan, precautions..."}
            rows={2}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-all disabled:opacity-40"
            style={{ background: "var(--gradient-primary)" }}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
