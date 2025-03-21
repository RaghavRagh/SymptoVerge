import React from "react";
import { cn } from "@/lib/utils";
import { Heart, Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-16 border-b backdrop-blur-xl bg-background/70 flex items-center",
        className
      )}
    >
      <div className="container max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 flex items-center justify-center">
            <span className="absolute h-full w-full rounded-full opacity-20 bg-primary/50 p-5"></span>
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <Link to="/" className="font-semibold text-xl tracking-tight ml-1">
            HealthAssist
          </Link>
          <div className="hidden md:flex items-center ml-4 gap-6">
            <Link
              to="/doctors"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Doctors
            </Link>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors">
            <Menu size={20} />
          </button>
          <a href="#" className="hidden md:block btn-primary">
            Sign In
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
