import React from "react";
import { Doctor } from "@/data/doctors";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { MapPin, Phone, UserRound } from "lucide-react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate(`/chat?doctorId=${doctor.id}`);
  }
  
  return (
    <Card
      key={doctor.id}
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <UserRound className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{doctor.name}</CardTitle>
        </div>
        <CardDescription>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {doctor.location}
          </div>
        </CardDescription>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            {doctor.contact}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-3">
        <div className="flex items-center    gap-2">
          <h4 className="text-sm text-muted-foreground font-medium mb-2">
            Specialization
          </h4>
          <Badge className="bg-sky-200/80 text-sky-600">{doctor.specialization}</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <button className="w-full bg-sky-100 text-sky-700 hover:bg-medical-600 hover:text-primary-foreground transition-colors rounded-md py-2 text-sm" onClick={handleChatClick}>
          Connect
        </button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
