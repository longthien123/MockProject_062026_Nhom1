import React, { useState } from "react";
import { AuthLayout } from "@/layouts/auth-layout";
import { LoginForm } from "./components/login-form";
import { LoginSuccess } from "./components/login-success";

interface LoginProps {
  onToggleView?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onToggleView }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <AuthLayout>
      {!isSuccess ? (
        <LoginForm 
          onSuccess={() => setIsSuccess(true)} 
          onToggleView={onToggleView} 
        />
      ) : (
        <LoginSuccess onLogout={() => setIsSuccess(false)} />
      )}
    </AuthLayout>
  );
};
