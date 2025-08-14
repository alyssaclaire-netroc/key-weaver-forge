import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoleSelectionProps {
  onRoleSelected: (role: string) => void;
}

const RoleSelection = ({ onRoleSelected }: RoleSelectionProps) => {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const roles = [
    {
      id: "commander",
      name: "Commander",
      description: "Lead and create challenges for your team",
      icon: "⚡",
      features: ["Create Challenges", "Team Management", "Analytics Dashboard"]
    },
    {
      id: "participant",
      name: "Participant",
      description: "Join and complete challenges",
      icon: "🎯",
      features: ["Join Challenges", "Track Progress", "Earn Rewards"]
    },
    {
      id: "admin",
      name: "Admin",
      description: "Full system administration access",
      icon: "🔧",
      features: ["User Management", "System Settings", "Reports"]
    },
    {
      id: "supporter",
      name: "Supporter",
      description: "Support and mentor participants",
      icon: "🤝",
      features: ["Mentoring", "Support Chat", "Progress Tracking"]
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelected(selectedRole);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Background circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-2xl z-10 relative">
        <Card className="glass-card p-6">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Select Your Role
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Choose the role that best describes how you'll use the platform
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedRole === role.id
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border/30 bg-background/50 hover:border-primary/50 hover:bg-primary/2"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{role.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">
                        {role.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {role.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                onClick={handleContinue}
                disabled={!selectedRole}
                className="w-full glass-button"
              >
                Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.name : "..."}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;