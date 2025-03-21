import { Doctor } from "@/data/doctors";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar } from "../ui/avatar";

interface DoctorListProps {
  doctors: Doctor[];
  activeDoctorId: number | null;
  onSelectDoctor: (doctorId: number) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  activeDoctorId,
  onSelectDoctor,
}) => {
  return (
    <div className="h-full border-r">
      <div className="p-4 border-b">
        <h2>Recent Conversations</h2>
      </div>
      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="p-2">
          {doctors.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No conversations yet. Get connected with a doctor now.
            </div>
          ) : (
            <div className="space-y-1">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => onSelectDoctor(doctor.id)}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                    activeDoctorId === doctor.id
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <div className="bg-primary text-primary-foreground rounded-full h-full w-full flex items-center justify-center">
                      {doctor.name.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{doctor.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DoctorList;
