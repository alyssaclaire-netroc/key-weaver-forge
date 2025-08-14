import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PersonaSelectionProps {
  onComplete: () => void;
}

const PersonaSelection = ({ onComplete }: PersonaSelectionProps) => {
  const [selectedPersona, setSelectedPersona] = useState<string>("");
  const [selectedSubOption, setSelectedSubOption] = useState<string>("");
  const [age, setAge] = useState<number[]>([15]);

  const personas = {
    community: {
      icon: "👥",
      title: "Community",
      description: "Connect and engage with your community",
      subOptions: ["Team Leaders", "Youth", "Parents", "Volunteers"]
    },
    company: {
      icon: "🏢",
      title: "Company",
      description: "Enhance workplace engagement and productivity",
      subOptions: ["HR", "Supervisor", "Manager", "Employees"]
    },
    education: {
      icon: "🎓",
      title: "Education",
      description: "Make learning fun and interactive",
      subOptions: []
    }
  };

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona);
    setSelectedSubOption("");
  };

  const handleSubOptionSelect = (subOption: string) => {
    setSelectedSubOption(subOption);
  };

  const canContinue = selectedPersona && (
    (selectedPersona === "education") ||
    (selectedPersona !== "education" && selectedSubOption)
  );

  const handleContinue = () => {
    if (canContinue) {
      onComplete();
    }
  };

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
        <Card className="glass-card p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome!
            </h1>
            <p className="text-muted-foreground text-sm">
              Help us personalize your experience by choosing your persona and audience.
            </p>
          </div>

          {/* Persona Cards */}
          <div className="space-y-4 mb-6">
            {Object.entries(personas).map(([key, persona]) => (
              <div key={key}>
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedPersona === key
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'glass-card hover:shadow-md'
                  }`}
                  onClick={() => handlePersonaSelect(key)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{persona.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{persona.title}</h3>
                        <p className="text-sm text-muted-foreground">{persona.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sub-options for Community and Company */}
                {selectedPersona === key && persona.subOptions.length > 0 && (
                  <div className="mt-3 ml-4 space-y-2 animate-fade-in">
                    {persona.subOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSubOptionSelect(option)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                          selectedSubOption === option
                            ? 'glass-button text-primary-foreground'
                            : 'glass-input hover:bg-white/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {/* Age Slider for Education */}
                {selectedPersona === key && key === "education" && (
                  <div className="mt-3 ml-4 animate-fade-in">
                    <div className="glass-card p-4">
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium text-foreground">Age Range</label>
                        <span className="text-sm text-primary font-semibold">{age[0]} years</span>
                      </div>
                      <Slider
                        value={age}
                        onValueChange={setAge}
                        min={5}
                        max={25}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>5 years</span>
                        <span>25 years</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full ${canContinue ? 'glass-button' : 'opacity-50 cursor-not-allowed'}`}
          >
            Continue to App
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PersonaSelection;