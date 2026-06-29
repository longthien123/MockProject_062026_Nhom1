import React from "react";
import bgImage from "@/assets/caregiver_background.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-6xl rounded-[32px] overflow-hidden shadow-2xl bg-slate-950 flex flex-col lg:flex-row relative min-h-[680px] border border-slate-800/80">
        
        {/* Left Section - Hero Visual & Copy */}
        <div className="lg:w-7/12 relative min-h-[350px] lg:min-h-0 flex flex-col justify-between p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Background Image with Warm Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={bgImage} 
              alt="ElderCare Compassionate Caregivers" 
              className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-105"
            />
            {/* Multi-layered premium overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-950/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent to-transparent hidden lg:block" />
          </div>

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
              E
            </div>
            <span className="text-xl font-bold text-white tracking-wider">ElderCare</span>
          </div>

          {/* Branding Content */}
          <div className="relative z-10 space-y-6 mt-16 lg:mt-0">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs uppercase tracking-widest font-semibold w-fit shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              Secure Portal
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] max-w-lg">
              Caring for our elders with dignity and love.
            </h1>

            {/* Subtext */}
            <p className="text-slate-200/90 text-sm md:text-base max-w-md font-medium leading-relaxed">
              Log in to access personalized care monitoring, doctor appointments, real-time tracking, and comprehensive health records.
            </p>

            {/* Highlight Bullets */}
            <ul className="space-y-3 pt-4 border-t border-white/10 hidden md:block">
              {[
                "24/7 Compassionate Care & Medical Support",
                "Personalized Nutrition & Exercise Tracking",
                "Direct Connection with Qualified Doctors & Nurses"
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Footer inside Left Pane */}
          <div className="relative z-10 pt-8 text-xs text-slate-400/80 hidden lg:block">
            &copy; {new Date().getFullYear()} ElderCare Inc. All rights reserved.
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="lg:w-5/12 bg-white flex flex-col justify-between p-8 md:p-10 lg:p-12 relative z-10 transition-all duration-500">
          {children}
        </div>

      </div>
    </div>
  );
};
