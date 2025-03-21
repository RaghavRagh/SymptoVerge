import { ScrollArea } from "../ui/scroll-area";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "doctor";
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
