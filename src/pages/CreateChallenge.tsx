import { useState } from "react";
import { ArrowLeft, Calendar, Users, Target, Award, Globe, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface CreateChallengeProps {
  onBack: () => void;
}

const CreateChallenge = ({ onBack }: CreateChallengeProps) => {
  const [challengeData, setChallengeData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    participants: "",
    points: "",
    startDate: "",
    endDate: "",
    location: "",
    requirements: ""
  });

  const categories = [
    { value: "fitness", label: "🏃‍♂️ Fitness & Health", color: "bg-green-100 text-green-800" },
    { value: "culinary", label: "🍳 Culinary Adventures", color: "bg-orange-100 text-orange-800" },
    { value: "green", label: "🌱 Go Green", color: "bg-emerald-100 text-emerald-800" },
    { value: "networking", label: "👥 Networking", color: "bg-blue-100 text-blue-800" },
    { value: "learning", label: "📚 Learning & Development", color: "bg-purple-100 text-purple-800" },
    { value: "creativity", label: "🎨 Creative Challenge", color: "bg-pink-100 text-pink-800" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setChallengeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Creating challenge:", challengeData);
    // Here you would normally submit to your backend
    onBack(); // For now, just go back
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.value === challengeData.category);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/20">
          <div className="flex items-center gap-4 p-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold">Create Challenge</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Basic Information */}
          <Card className="rocket-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="w-5 h-5 text-primary" />
                Challenge Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Challenge Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., 30-Day Fitness Journey"
                  value={challengeData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your challenge and what participants will achieve..."
                  value={challengeData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={challengeData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {getSelectedCategory() && (
                  <Badge className={`mt-2 ${getSelectedCategory()?.color}`}>
                    {getSelectedCategory()?.label}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Participants */}
          <Card className="rocket-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-5 h-5 text-primary" />
                Schedule & Participants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={challengeData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={challengeData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="participants">Max Participants</Label>
                  <Input
                    id="participants"
                    type="number"
                    placeholder="50"
                    value={challengeData.participants}
                    onChange={(e) => handleInputChange("participants", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="points">Reward Points</Label>
                  <Input
                    id="points"
                    type="number"
                    placeholder="100"
                    value={challengeData.points}
                    onChange={(e) => handleInputChange("points", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Requirements */}
          <Card className="rocket-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="w-5 h-5 text-primary" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  placeholder="e.g., Office Gym, Virtual, Singapore"
                  value={challengeData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="Any specific requirements or rules for participants..."
                  value={challengeData.requirements}
                  onChange={(e) => handleInputChange("requirements", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {challengeData.title && (
            <Card className="rocket-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Award className="w-5 h-5 text-primary" />
                  Challenge Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-border/20 rounded-lg bg-muted/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">{challengeData.title}</h3>
                    {challengeData.points && (
                      <Badge variant="secondary">{challengeData.points} pts</Badge>
                    )}
                  </div>
                  {challengeData.description && (
                    <p className="text-sm text-muted-foreground mb-3">{challengeData.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {challengeData.participants && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>Max {challengeData.participants}</span>
                      </div>
                    )}
                    {challengeData.startDate && challengeData.endDate && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(challengeData.startDate).toLocaleDateString()} - {new Date(challengeData.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pb-6">
            <Button 
              onClick={handleSubmit}
              className="w-full"
              disabled={!challengeData.title || !challengeData.category}
            >
              Create Challenge
            </Button>
            <Button 
              variant="outline" 
              onClick={onBack}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;