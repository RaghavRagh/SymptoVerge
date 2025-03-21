import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useChat } from "@/hooks/useChat";
import ChatLayout from "@/components/chat/CHatLayout";
import DoctorList from "@/components/chat/DoctorList";
import ChatPanel from "@/components/chat/ChatPanel";

const ChatPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedDoctorId = searchParams.get("doctorId")
    ? Number(searchParams.get("doctorId"))
    : null;

  const {
    activeDoctor,
    activeSession,
    activeDoctorId,
    chatDoctors,
    selectDoctor,
    sendMessage,
    setActiveDoctorId,
    deleteChat
  } = useChat(selectedDoctorId);

  const handleDoctorSelect = (doctorId: number) => {
    // Update the URL to include the selected doctor ID
    navigate(`/chat?doctorId=${doctorId}`);
    selectDoctor(doctorId);
  };

  const handleDeleteChat = (doctorId: number) => {
    deleteChat(doctorId);
    navigate('/chat');
  };

  return (
    <ChatLayout
      sidebar={
        <DoctorList
          doctors={chatDoctors}
          activeDoctorId={activeDoctorId}
          onSelectDoctor={handleDoctorSelect}
        />
      }
      hasDoctorSelected={!!activeDoctor && !!activeSession}
    >
      {activeDoctor && activeSession && (
        <ChatPanel
          doctor={activeDoctor}
          messages={activeSession.messages}
          onSendMessage={sendMessage}
          onBack={() => setActiveDoctorId(null)}
          onDeleteChat={handleDeleteChat}
        />
      )}
    </ChatLayout>
  );
};

export default ChatPage;