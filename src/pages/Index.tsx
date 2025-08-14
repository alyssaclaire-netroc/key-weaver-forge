import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import PersonaSelection from "@/components/PersonaSelection";
import CommanderDashboard from "@/components/commander/CommanderDashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPersonaSelection, setShowPersonaSelection] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleSignupSuccess = () => {
    setShowPersonaSelection(true);
  };

  const handlePersonaComplete = () => {
    setShowPersonaSelection(false);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowPersonaSelection(false);
  };

  if (showPersonaSelection) {
    return <PersonaSelection onComplete={handlePersonaComplete} />;
  }

  if (!isAuthenticated) {
    return <AuthModal onAuthSuccess={handleAuthSuccess} onSignupSuccess={handleSignupSuccess} />;
  }

  return <CommanderDashboard onLogout={handleLogout} />;
};

export default Index;