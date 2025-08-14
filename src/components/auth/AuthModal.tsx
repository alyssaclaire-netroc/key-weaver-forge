import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface AuthModalProps {
  onAuthSuccess: () => void;
  onSignupSuccess: () => void;
}

const AuthModal = ({ onAuthSuccess, onSignupSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulate login
      onAuthSuccess();
    } else {
      // Simulate signup - show persona selection
      onSignupSuccess();
    }
  };

  const canSubmit = email && password && (isLogin || (confirmPassword && acceptedTerms));

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Floating Background Circles */}
      <div className="floating-circles">
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
      </div>

      <div className="w-full max-w-md">
        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLogin ? "Welcome Back!" : "Join the Adventure!"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {isLogin 
                ? "Sign in to continue your challenge journey" 
                : "Create your account to start networking and challenges"
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground font-medium">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="glass-input text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <div className="flex items-start space-x-3 p-4 glass-card rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-sm text-foreground leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <button type="button" className="text-primary underline hover:text-primary/80 font-medium">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button type="button" className="text-primary underline hover:text-primary/80 font-medium">
                      Privacy Policy
                    </button>
                  </Label>
                </div>
              )}

              <Button
                type="submit"
                disabled={!canSubmit}
                className={`w-full transition-all duration-300 ${
                  canSubmit 
                    ? 'glass-button hover:scale-105 shadow-lg' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setAcceptedTerms(false);
                  }}
                  className="text-primary hover:text-primary/80 font-medium underline transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthModal;