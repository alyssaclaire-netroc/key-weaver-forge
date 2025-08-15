import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface OTPVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
  purpose: "signup" | "password-reset" | "login";
}

const OTPVerification = ({ email, onVerificationSuccess, onBack, purpose }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp.trim() || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      
      if (otp === "123456") { // Mock OTP for demo
        toast({
          title: "Verification Success!",
          description: "Your email has been verified successfully.",
        });
        onVerificationSuccess();
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }, 1000);
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Sent!",
      description: `A new OTP has been sent to ${email}`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Background circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md z-10 relative">
        <Card className="glass-card p-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-foreground">
              Verify Your Email
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              We've sent a 6-digit code to <br />
              <span className="font-medium text-foreground">{email}</span>
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(value);
                    if (error) setError("");
                  }}
                  className={`glass-input text-center text-lg tracking-widest ${error ? "error" : ""}`}
                  maxLength={6}
                />
                {error && (
                  <p className="text-destructive text-xs mt-1 animate-fade-in">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full glass-button"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Didn't receive code? Resend OTP
              </button>
              
              <div>
                <button
                  onClick={onBack}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ← Back to {purpose === "signup" ? "Sign Up" : purpose === "login" ? "Login" : "Login"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;