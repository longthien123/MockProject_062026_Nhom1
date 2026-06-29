import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { ValidationCommon } from "@/common";
import { isValidEmail } from "@/utils";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  onSuccess: () => void;
  onToggleView?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onToggleView }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = ValidationCommon.EMAIL_REQUIRED;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = ValidationCommon.EMAIL_INVALID;
    }

    if (!formData.password) {
      newErrors.password = ValidationCommon.PASSWORD_REQUIRED;
    } else if (formData.password.length < 6) {
      newErrors.password = ValidationCommon.PASSWORD_MIN_LENGTH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API login
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-8">
      
      {/* Form Content */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 font-medium">
            Sign in to manage care and view updates
          </p>
        </div>

        {/* Social Login Mock Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.12.09 2.27-.57 2.94-1.39z"
              />
            </svg>
            Apple
          </button>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Or use email
          </span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-[13px] font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            Email Address
          </label>
          <Input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            error={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-[13px] font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={!!errors.password}
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-sm font-semibold text-slate-600 select-none cursor-pointer">
              Remember this device
            </label>
          </div>
          <a
            href="#forgot-password"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password?
          </a>
        </div>
      </div>

      {/* Action Button & Toggle */}
      <div className="space-y-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md active:translate-y-[1px] disabled:opacity-75 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer text-[15px]"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {onToggleView && (
          <p className="text-center text-sm font-medium text-slate-500">
            Need a care estimate?{" "}
            <button
              type="button"
              onClick={onToggleView}
              className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-all cursor-pointer"
            >
              Request a Quote
            </button>
          </p>
        )}
      </div>

    </form>
  );
};
