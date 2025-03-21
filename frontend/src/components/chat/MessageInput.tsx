import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="p-4 border-t">
      <div className="relative">
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10"
        />
        <Button
          size="icon"
          className="absolute right-1 top-1 h-8 w-8"
          onClick={handleSend}
          disabled={!inputMessage.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
