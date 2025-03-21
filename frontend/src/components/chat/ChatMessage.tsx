import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import TypingIndicator from "./TypingIndicator";
import { ConditionCard } from "../ui/ConditionCard";
import { Doctor } from "@/data/doctors";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import DoctorCard from "./DoctorCard";
import ReactMarkdown from "react-markdown";

export type MessageType = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  conditions?: Condition[];
  suggestedDoctors?: Doctor[];
  isLoading?: boolean;
};

export type Condition = {
  name: string;
  probability: number;
  description: string;
  severity: "low" | "medium" | "high";
};

interface ChatMessageProps {
  message: MessageType;
  className?: string;
  hasDoctor?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  className,
  hasDoctor,
}) => {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full max-w-3xl mx-auto py-3 items-start gap-3",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 rounded-full bg-medical-100 p-2 text-medical-700">
          <Bot size={18} />
        </div>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[80%] md:max-w-[70%] gap-2",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-secondary text-secondary-foreground rounded-tl-none"
          )}
        >
          {message.isLoading ? (
            <TypingIndicator />
          ) : (
            // <p className="whitespace-pre-wrap break-words text-balance">{message.content}</p>
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p
                    {...props}
                    className="whitespace-pre-wrap break-words "
                  />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Render conditions if present */}
        {message.conditions && message.conditions.length > 0 && (
          <div className="w-full space-y-2 mt-1">
            <p className="text-xs text-muted-foreground">
              Possible conditions based on your symptoms:
            </p>
            <AnimatePresence>
              {message.conditions.map((condition, index) => (
                <motion.div
                  key={condition.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ConditionCard condition={condition} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Render suggested doctors if present */}
        {message.suggestedDoctors && message.suggestedDoctors.length > 0 && (
          <div className="w-full mt-2">
            <Sheet>
              <SheetTrigger asChild>
                <button className="bg-medical-100 text-medical-700 hover:bg-medical-200 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
                  View Recommended Doctors
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <div className="space-y-6 py-4">
                  <h3 className="text-lg font-semibold">
                    Recommended Specialists
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your symptoms, these doctors specialize in treating
                    the possible conditions identified:
                  </p>
                  <div className="space-y-4 mt-4">
                    {message.suggestedDoctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        <span className="text-xs text-muted-foreground">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }).format(message.timestamp)}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 text-primary">
          <User size={18} />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
