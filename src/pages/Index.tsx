import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import NewUserDialog from "@/components/auth/NewUserDialog";
import PasswordResetDialog from "@/components/auth/PasswordResetDialog";
import OTPVerification from "@/components/auth/OTPVerification";
import RoleSelection from "@/components/auth/RoleSelection";
import PasswordResetFlow from "@/components/auth/PasswordResetFlow";
import PersonaSelection from "@/components/PersonaSelection";
import CommanderDashboard from "@/components/commander/CommanderDashboard";

type AuthStep = 
  | "auth" 
  | "new-user-check" 
  | "password-reset-check" 
  | "otp-verification" 
  | "role-selection" 
  | "password-reset" 
  | "persona-selection" 
  | "dashboard";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>("auth");
  const [userEmail, setUserEmail] = useState("");
  const [otpPurpose, setOtpPurpose] = useState<"signup" | "password-reset">("signup");
  const [userRole, setUserRole] = useState("");

  const handleLoginSubmit = (email: string) => {
    setUserEmail(email);
    setCurrentStep("dashboard");
  };

  const handleSignupSubmit = (email: string) => {
    setUserEmail(email);
    setOtpPurpose("signup");
    setCurrentStep("otp-verification");
  };

  const handleNewUser = () => {
    setCurrentStep("password-reset-check");
  };

  const handleExistingUser = () => {
    setCurrentStep("dashboard");
  };

  const handleDidResetPassword = () => {
    setCurrentStep("dashboard");
  };

  const handleNeedPasswordReset = () => {
    setOtpPurpose("password-reset");
    setCurrentStep("otp-verification");
  };

  const handleOTPVerificationSuccess = () => {
    if (otpPurpose === "signup") {
      setCurrentStep("role-selection");
    } else {
      setCurrentStep("password-reset");
    }
  };

  const handleRoleSelected = (role: string) => {
    setUserRole(role);
    if (role === "commander") {
      setCurrentStep("dashboard");
    } else {
      setCurrentStep("persona-selection");
    }
  };

  const handlePasswordResetSuccess = () => {
    setCurrentStep("auth");
  };

  const handlePersonaComplete = () => {
    setCurrentStep("dashboard");
  };

  const handleLogout = () => {
    setCurrentStep("auth");
    setUserEmail("");
    setUserRole("");
  };

  const handleBackToAuth = () => {
    setCurrentStep("auth");
  };

  // Render based on current step
  switch (currentStep) {
    case "auth":
      return (
        <AuthModal 
          onAuthSuccess={handleLoginSubmit} 
          onSignupSuccess={handleSignupSubmit}
        />
      );

    case "password-reset-check":
      return (
        <PasswordResetDialog
          open={true}
          onDidReset={handleDidResetPassword}
          onNeedReset={handleNeedPasswordReset}
        />
      );

    case "otp-verification":
      return (
        <OTPVerification
          email={userEmail}
          purpose={otpPurpose}
          onVerificationSuccess={handleOTPVerificationSuccess}
          onBack={handleBackToAuth}
        />
      );

    case "role-selection":
      return (
        <RoleSelection
          onRoleSelected={handleRoleSelected}
        />
      );

    case "password-reset":
      return (
        <PasswordResetFlow
          onPasswordResetSuccess={handlePasswordResetSuccess}
          onBack={handleBackToAuth}
        />
      );

    case "persona-selection":
      return (
        <PersonaSelection 
          onComplete={handlePersonaComplete} 
        />
      );

    case "dashboard":
      return (
        <CommanderDashboard 
          onLogout={handleLogout} 
        />
      );

    default:
      return (
        <AuthModal 
          onAuthSuccess={handleLoginSubmit} 
          onSignupSuccess={handleSignupSubmit}
        />
      );
  }
};

export default Index;