import React from "react";
import { CheckCircle } from "lucide-react";

interface LoginSuccessProps {
  onLogout: () => void;
}

export const LoginSuccess: React.FC<LoginSuccessProps> = ({ onLogout }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in py-12">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
        <CheckCircle className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-extrabold text-slate-900">
          Authentication Successful
        </h3>
        <p className="text-slate-500 text-sm max-w-sm font-medium">
          Welcome to ElderCare! You have logged in successfully. Redirecting you to the dashboard...
        </p>
      </div>
      
      <div className="w-full max-w-[200px] h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 bg-indigo-600 rounded-full animate-[loading-bar_1.5s_ease-in-out_forwards]" style={{ width: '100%' }}></div>
      </div>
      
      <button
        onClick={onLogout}
        className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-all cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
};
