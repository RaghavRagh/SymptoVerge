import { useState, useEffect } from 'react';
import { doctorsData, Doctor } from '@/data/doctors';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: Date;
}

export interface ChatSession {
  doctorId: number;
  messages: ChatMessage[];
}

const LOCAL_STORAGE_KEY = 'doctor-chats';

export function useChat(initialDoctorId: number | null) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeDoctorId, setActiveDoctorId] = useState<number | null>(initialDoctorId);
  
  // Load chat sessions from local storage
  useEffect(() => {
    const savedSessions = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedSessions) {
      try {
        const sessions = JSON.parse(savedSessions);
        // Convert string timestamps back to Date objects
        const parsedSessions = sessions.map((session: ChatSession) => ({
          ...session,
          messages: session.messages.map((msg: ChatMessage) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        
        // Ensure no duplicate doctor sessions by using a Map
        // Explicitly cast the result to ChatSession[] to resolve the TypeScript error
        const uniqueSessions = Array.from(
          new Map(parsedSessions.map((session: ChatSession) => [session.doctorId, session])).values()
        ) as ChatSession[];
        
        setChatSessions(uniqueSessions);
      } catch (error) {
        console.error('Error parsing saved chat sessions:', error);
      }
    }
  }, []);
  
  // Handle initial doctor selection
  useEffect(() => {
    if (initialDoctorId) {
      // Check if we already have a chat session with this doctor
      const existingSession = chatSessions.find(session => session.doctorId === initialDoctorId);
      
      if (!existingSession) {
        // Only create a new session if one doesn't exist
        const doctor = doctorsData.find(doc => doc.id === initialDoctorId);
        if (doctor) {
          const newSession: ChatSession = {
            doctorId: initialDoctorId,
            messages: [
              {
                id: Date.now().toString(),
                text: `Hello, I'm ${doctor.name}. How can I help you today?`,
                sender: 'doctor',
                timestamp: new Date()
              }
            ]
          };
          setChatSessions(prevSessions => [...prevSessions, newSession]);
        }
      }
      
      // Set this doctor as active
      setActiveDoctorId(initialDoctorId);
    }
  }, [initialDoctorId]);
  
  // Save chat sessions to local storage whenever they change
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatSessions));
    }
  }, [chatSessions]);
  
  const sendMessage = (message: string) => {
    if (!message.trim() || !activeDoctorId) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatSessions(prevSessions => 
      prevSessions.map(session => 
        session.doctorId === activeDoctorId
          ? {
              ...session,
              messages: [...session.messages, userMessage]
            }
          : session
      )
    );
    
    // Simulate doctor response after a short delay
    setTimeout(() => {
      const activeDoctor = doctorsData.find(doc => doc.id === activeDoctorId);
      if (!activeDoctor) return;
      
      const doctorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `Thank you for sharing. I'd like to discuss this further. Could you provide more details about your symptoms?`,
        sender: 'doctor',
        timestamp: new Date()
      };
      
      setChatSessions(prevSessions => 
        prevSessions.map(session => 
          session.doctorId === activeDoctorId
            ? {
                ...session,
                messages: [...session.messages, doctorMessage]
              }
            : session
        )
      );
    }, 1000);
  };
  
  const selectDoctor = (doctorId: number) => {
    // Check if this doctor already has a chat session
    if (!chatSessions.some(session => session.doctorId === doctorId)) {
      // Only create a new session if one doesn't exist
      const doctor = doctorsData.find(doc => doc.id === doctorId);
      if (doctor) {
        const newSession: ChatSession = {
          doctorId,
          messages: [
            {
              id: Date.now().toString(),
              text: `Hello, I'm ${doctor.name}. How can I help you today?`,
              sender: 'doctor',
              timestamp: new Date()
            }
          ]
        };
        setChatSessions(prevSessions => [...prevSessions, newSession]);
      }
    }
    
    setActiveDoctorId(doctorId);
  };

  const deleteChat = (doctorId: number) => {
    setChatSessions(prevSession => prevSession.filter(session => session.doctorId !== doctorId));

    if (activeDoctorId === doctorId) {
      setActiveDoctorId(null);
    }

    // const updateSessions = chatSessions.filter()
    if (chatSessions.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatSessions));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
  
  const getActiveSession = () => {
    return chatSessions.find(session => session.doctorId === activeDoctorId);
  };
  
  const getDoctorById = (id: number): Doctor | undefined => {
    return doctorsData.find(doctor => doctor.id === id);
  };
  
  const activeSession = getActiveSession();
  const activeDoctor = activeDoctorId ? getDoctorById(activeDoctorId) : undefined;
  
  // Get all doctors the user has chatted with, ensuring uniqueness
  const chatDoctors = Array.from(
    new Map(
      chatSessions
        .map(session => getDoctorById(session.doctorId))
        .filter(Boolean)
        .map(doctor => [doctor!.id, doctor])
    ).values()
  ) as Doctor[];
  
  return {
    activeDoctorId,
    activeDoctor,
    activeSession,
    chatDoctors,
    selectDoctor,
    sendMessage,
    setActiveDoctorId,
    deleteChat
  };
}
