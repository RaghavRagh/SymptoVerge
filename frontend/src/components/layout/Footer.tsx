import React from "react";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("border-t py-6 bg-background", className)}>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Heart className="h-4 w-4 text-primary" />
            <span className="font-medium">SymptoVerge</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} SymptoVerge. Not a substitute for
              professional medical advice.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
