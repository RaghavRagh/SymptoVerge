import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Card, CardContent } from "../ui/card";

interface ChatLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  hasDoctorSelected: boolean;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  children,
  sidebar,
  hasDoctorSelected,
}) => {
  const navigate = useNavigate();
  return (
    <div className="container py-6 h-[calc(100vh-8rem)]">
      <div className="flex flex-col h-full">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Doctor Conversations</h1>
          <Button variant="outline" onClick={() => navigate("/doctors")}>
            Find More Doctors
          </Button>
        </div>

        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[500px] rounded-lg border shadow-sm"
        >
          <ResizablePanel defaultSize={25} minSize={20}>
            {sidebar}
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75}>
            {hasDoctorSelected ? (
              children
            ) : (
              <div className="flex items-center justify-center p-4 h-full">
                {/* <Card className="w-full max-w-md"> */}
                {/* <CardContent className="pt-6 text-center"> */}
                <div className="flex flex-col mx-auto my-auto items-center justify-center w-1/2">
                  <h3 className="text-xl font-medium mb-2">
                    Welcome to Doctor Chats
                  </h3>
                  <p className="text-muted-foreground mb-4 text-center">
                    Select a doctor from the sidebar to view your conversation
                    or visit the Doctors page to find specialists.
                  </p>
                  <Button
                    className="bg-medical-100/5 text-medical-600 hover:bg-medical-100 hover:text-medical-700 w-full transition-colors"
                    onClick={() => navigate("/doctors")}
                  >
                    Find a Doctor
                  </Button>
                </div>
                {/* </CardContent>
                </Card> */}
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ChatLayout;
