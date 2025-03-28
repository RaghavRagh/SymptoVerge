import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUp, Bot, Sparkles, Trash, Stethoscope } from "lucide-react";
import { nanoid } from "nanoid";
import ChatMessage, { MessageType, Condition } from "./ChatMessage";
import axios from "axios";
import { Doctor, doctorsData } from "@/data/doctors";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface ChatInterfaceProps {
  className?: string;
}

type ChatMode = "ai" | "doctor";

const EXAMPLE_QUESTIONS = [
  "I've had a headache and fever for the last 2 days",
  "What are the symptoms of the flu?",
  "My throat is sore and I have difficulty swallowing",
  "Should I be concerned about chest pain?",
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [chatMode, setChatMode] = useState<ChatMode>("ai");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: nanoid(),
      content:
        "Hello, I'm your AI health assistant. Please describe your symptoms, and I'll try to help identify possible conditions or answer your health questions.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<Doctor[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // update welcome message when mode changes
  useEffect(() => {
    const welcomeMessage =
      chatMode === "ai"
        ? "Hello, I'm your AI health assistant. Please describe your symptoms, and I'll try to help identify possible conditions or answer your health questions."
        : "Please describe your symptoms, and I'll suggest specialists who can help with your condition.";

    setMessages([
      {
        id: nanoid(),
        content: welcomeMessage,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, [chatMode]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !isLoading) return;

    const userMessage: MessageType = {
      id: nanoid(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    const loadingMessage: MessageType = {
      id: nanoid(),
      content: "",
      sender: "bot",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (chatMode === "ai") {
        const response = await axios.post(
          "http://localhost:5000/chat",
          // "https://sympto-verge-node-backend.vercel.app/chat",
          {
            text: userMessage.content || "",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);

        const aiResponse: MessageType = {
          id: nanoid(),
          content: response.data.response,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) =>
          prev.map((msg) => (msg.id === loadingMessage.id ? aiResponse : msg))
        );
      } else {
        setTimeout(() => {
          const handlePredict = async () => {
            const response = await axios.post(
              "http://localhost:5000/predict",
              {
                text: userMessage.content || "",
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            console.log(response.data);

            const predictedDisease = response.data?.predicted_disease;
            const extractedSymptoms = response.data?.extracted_symptoms;

            console.log(
              "predictedDisease and symptoms",
              predictedDisease,
              extractedSymptoms
            );

            const doctors = doctorsData.filter(
              (doctor) => doctor.disease === predictedDisease
            );
            setSuggestedDoctors(doctors);

            let doctorSuggestion = "";
            if (doctors.length > 0) {
              doctorSuggestion =
                "I've found specialists who can help with these conditions. Click **'View Recommended Doctors'** to see them.";
            }

            let responseText = "";
            if (predictedDisease && extractedSymptoms) {
              responseText = `Based on your symptoms, **${extractedSymptoms.join(
                ", "
              )}**, you may have **${predictedDisease}**. It's always best to consult a doctor for an accurate diagnosis.\n${doctorSuggestion}`;
            } else {
              responseText = response.data;
            }

            const aiResponse: MessageType = {
              id: nanoid(),
              content: responseText,
              sender: "bot",
              timestamp: new Date(),
              suggestedDoctors: doctors.length > 0 ? doctors : undefined,
            };

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === loadingMessage.id ? aiResponse : msg
              )
            );

            setIsLoading(false);
          };
          handlePredict();
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      const errorMessage: MessageType = {
        id: nanoid(),
        content:
          "Sorry, I couldn't process your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? errorMessage : msg))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    const welcomeMessage =
      chatMode === "ai"
        ? "Hello, I'm your AI health assistant. Please describe your symptoms, and I'll try to help identify possible conditions or answer your health questions."
        : "Please describe your symptoms, and I'll suggest specialists who can help with your condition.";

    setMessages([
      {
        id: nanoid(),
        content: welcomeMessage,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setSuggestedDoctors([]);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full max-h-[calc(100vh-6.5rem)]",
        className
      )}
    >
      {/* Mode selector */}
      <div className="px-2 py-2 border-b ">
        <Tabs
          defaultValue="chatMode"
          value="chatMode"
          onValueChange={(value) => setChatMode(value as ChatMode)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger
              value="ai"
              className={`flex items-center gap-2 ${
                chatMode === "ai" && "bg-white"
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>Chat with AI</span>
            </TabsTrigger>
            <TabsTrigger
              value="doctor"
              className={`flex items-center gap-2 ${
                chatMode === "doctor" && "bg-white"
              }`}
            >
              <Stethoscope className="h-4 w-4" />
              <span>Find Doctors</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Chat messages area */}
      <div className="flex-grow overflow-y-auto px-4 chat-container">
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              hasDoctor={
                message.suggestedDoctors && message.suggestedDoctors.length > 0
              }
            />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Example questions (only shown if 2 or fewer messages) */}
      {messages.length <= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="px-4 mb-4"
        >
          <div className="bg-card/30 backdrop-blur-sm rounded-xl px-4 py-3 border">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
              <Sparkles size={14} />
              <span>Try asking about</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {EXAMPLE_QUESTIONS.map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleExampleClick(question)}
                  className="text-sm text-left px-3 py-2 rounded-lg border bg-background hover:bg-secondary transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Chat input */}
      <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <div className="flex gap-2 items-end">
          <div className="relative flex-grow">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                chatMode === "ai"
                  ? "Ask a health question..."
                  : "Describe your symptoms to find specialists..."
              }
              className="w-full rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none min-h-[60px] max-h-[120px]"
              rows={1}
              style={{
                height: "auto",
                overflow: "hidden",
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="absolute right-3 bottom-3 p-1 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 hover:scale-105"
            >
              <ArrowUp size={16} />
            </button>
          </div>
          <button
            onClick={clearChat}
            className="p-3 rounded-xl border bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            title="Clear chat"
          >
            <Trash size={20} />
          </button>
        </div>

        <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            {chatMode === "ai" ? (
              <>
                <Bot size={12} />
                <span>AI Health Assistant</span>
              </>
            ) : (
              <>
                <Stethoscope size={12} />
                <span>Doctor Finder</span>
              </>
            )}
          </div>
          <p>
            This is a demo - not a substitute for professional medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
