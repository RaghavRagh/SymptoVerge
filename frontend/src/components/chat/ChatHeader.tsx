import { Doctor } from "@/data/doctors";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "../ui/avatar";

interface ChatHeaderProps {
  doctor: Doctor;
  onBack: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ doctor, onBack }) => {
  return (
    <div className="p-4 flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Avatar className="h-10 w-10">
        <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center">
          {doctor.name.charAt(0)}
        </div>
      </Avatar>
      <div>
        <h2 className="font-medium">{doctor.name}</h2>
        <p className="text-xs text-muted-foreground">{doctor.specialization}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
