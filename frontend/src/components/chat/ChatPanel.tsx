import { Doctor } from "@/data/doctors";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "doctor";
  timestamp: Date;
}

interface ChatPanelProps {
  doctor: Doctor;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onBack: () => void;
  onDeleteChat: (doctorId: number) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  doctor,
  messages,
  onSendMessage,
  onBack,
  onDeleteChat,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center border-b">
        <ChatHeader doctor={doctor} onBack={onBack} />

        {onDeleteChat && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 mr-2"
                title="Delete chat"
              >
                <Trash className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Chat</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this chat with {doctor.name}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDeleteChat(doctor.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <ChatMessages messages={messages} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatPanel;
