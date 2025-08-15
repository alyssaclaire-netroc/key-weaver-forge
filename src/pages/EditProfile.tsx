import { useState } from "react";
import { ArrowLeft, Edit3, Eye, EyeOff, Upload, Save, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EditProfileProps {
  onBack: () => void;
  onLogout: () => void;
  onProfileUpdate?: (data: { name: string; profileImage: string }) => void;
}

const EditProfile = ({ onBack, onLogout, onProfileUpdate }: EditProfileProps) => {
  const [profileData, setProfileData] = useState({
    name: "John Commander",
    address: "123 Main Street, Singapore 123456",
    contact: "+65 9123 4567",
    unitId: "CMD-001",
    email: "john.commander@example.com",
    password: "••••••••"
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const achievements = [
    { icon: "🏆", name: "Challenge Master", earned: true },
    { icon: "⭐", name: "First Place", earned: true },
    { icon: "🔥", name: "Streak Keeper", earned: true },
    { icon: "🎯", name: "Goal Crusher", earned: false },
    { icon: "💎", name: "Elite Status", earned: false },
    { icon: "🚀", name: "Team Leader", earned: true }
  ];

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSave = (field: string, value: string) => {
    setProfileData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      
      // Notify parent component of profile updates
      if (field === 'name' && onProfileUpdate) {
        onProfileUpdate({
          name: value,
          profileImage: profileImage || ""
        });
      }
      
      return newData;
    });
    setEditingField(null);
    
    toast({
      title: "Profile updated successfully",
      description: `Your ${field} has been updated.`,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive"
        });
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfileImage(result);
        setIsUploading(false);
        
        // Notify parent component of profile image update
        if (onProfileUpdate) {
          onProfileUpdate({
            name: profileData.name,
            profileImage: result
          });
        }
        
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const ProfileField = ({ 
    icon, 
    label, 
    field, 
    value, 
    type = "text" 
  }: { 
    icon: string;
    label: string;
    field: string;
    value: string;
    type?: string;
  }) => {
    const [editValue, setEditValue] = useState(value);
    const isEditing = editingField === field;

    return (
      <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-lg">{icon}</span>
          <div className="flex-1">
            <Label className="text-sm text-muted-foreground">{label}</Label>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-1">
                {field === "password" ? (
                  <div className="relative flex-1">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                ) : (
                  <Input
                    type={type}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1"
                  />
                )}
                <Button
                  size="sm"
                  onClick={() => handleSave(field, editValue)}
                  className="px-3"
                >
                  <Save className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <p className="text-sm font-medium mt-1">
                {field === "password" ? "••••••••" : value}
              </p>
            )}
          </div>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(field)}
            className="p-2"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
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
            <h1 className="text-lg font-bold">Edit Profile</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Top Banner with Profile Picture */}
          <Card className="rocket-card overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/20 to-purple-500/20 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
            </div>
            <CardContent className="relative -mt-12 pb-4">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 border-4 border-background">
                    <AvatarImage src={profileImage || undefined} />
                    <AvatarFallback className="text-lg font-bold">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-image-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className={`absolute -bottom-1 -right-1 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors cursor-pointer ${
                      isUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                  </label>
                </div>
                
                <h2 className="text-xl font-bold mb-1">{profileData.name}</h2>
                
                {/* Points Display */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-medium">2,450</span>
                    <span className="text-muted-foreground">Points</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-purple-500">🏆</span>
                    <span className="font-medium">4</span>
                    <span className="text-muted-foreground">Badges</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-blue-500">💎</span>
                    <span className="font-medium">1,250</span>
                    <span className="text-muted-foreground">Gems</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="rocket-card">
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ProfileField
                icon="👤"
                label="Name"
                field="name"
                value={profileData.name}
              />
              <ProfileField
                icon="🏠"
                label="Address"
                field="address"
                value={profileData.address}
              />
              <ProfileField
                icon="📞"
                label="Contact Number"
                field="contact"
                value={profileData.contact}
                type="tel"
              />
              <ProfileField
                icon="🪪"
                label="Unit ID"
                field="unitId"
                value={profileData.unitId}
              />
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="rocket-card">
            <CardHeader>
              <CardTitle className="text-base">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ProfileField
                icon="✉️"
                label="Email"
                field="email"
                value={profileData.email}
                type="email"
              />
              <ProfileField
                icon="🔒"
                label="Password"
                field="password"
                value={profileData.password}
                type="password"
              />
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="rocket-card">
            <CardHeader>
              <CardTitle className="text-base">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center ${
                      achievement.earned 
                        ? "bg-primary/10 border border-primary/20" 
                        : "bg-muted/20 border border-border/20 opacity-50"
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <p className="text-xs font-medium">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pb-6">
            <Button 
              onClick={onBack}
              className="w-full"
            >
              Save Changes
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline"
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be logged out of your account and redirected to the login page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onLogout}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;