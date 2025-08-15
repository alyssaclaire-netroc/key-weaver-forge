import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Upload, Plus, Minus, Check, Search, Calendar, Users, Settings, Trophy, Target, Eye, EyeOff, Star, Award, Gem, Gift, Coins, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CreateChallengeProps {
  onBack: () => void;
}

interface Team {
  id: number;
  name: string;
  logo: File | null;
  members: string[];
  socialMedia: string;
}

interface Stage {
  id: number;
  name: string;
  points: number;
  gems: number;
  hasBadge: boolean;
  badgeName: string;
  badgeIcon: string;
}

interface BadgeTier {
  id: number;
  name: string;
  icon: string;
  minPoints: number;
  maxPoints: number;
}

const CreateChallenge = ({ onBack }: CreateChallengeProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Page 1: Challenge Details
    name: '',
    description: '',
    banner: null as File | null,
    allowLeadership: false,
    targetAudience: '',
    
    // Page 2: Challenge Type
    challengeType: '', // 'individual' or 'team'
    teamSize: 2,
    teams: [] as Team[],
    
    // Page 3: Challenge Visibility
    visibility: '', // 'public' or 'private'
    participantLimit: 100,
    selectedParticipants: [] as string[],
    
    // Page 4: Challenge Structure
    structure: '', // 'multi-stage' or 'single-stage'
    stages: [] as Stage[],
    
    // Page 5: Rewards
    rewardType: '', // 'reward-points' or 'non-reward-points'
    pointsCounter: '', // 'once-off' or 'recurring'
    hasMaxPoints: false,
    maxPointsPerStaff: 0,
    badgeRewards: false,
    badgeTiers: [] as BadgeTier[],
    pointsReward: 0,
    gemsReward: 0,
    gemType: 'bronze',
    
    // Page 6: Summary & Admin Assignment
    admins: [] as string[],
    verifiers: [] as string[],
    supporters: [] as string[],
    publishStart: '',
    publishEnd: '',
    challengeStart: '',
    challengeEnd: ''
  });

  const { toast } = useToast();

  // Target audience options based on persona
  const targetAudienceOptions = {
    community: ['Team leaders', 'Youth', 'Parents', 'Volunteers'],
    company: ['HR', 'Supervisors', 'Managers', 'Employees'],
    education: ['18-24 years'],
    individual: ['Football players', 'Team members'],
    fitnessCoach: ['Members']
  };

  const gemTypes = ['bronze', 'silver', 'gold'];
  const badgeIcons = ['🏆', '🥇', '🥈', '🥉', '⭐', '🎖️', '🏅', '👑'];

  const nextStep = async () => {
    if (validateCurrentStep()) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep(prev => Math.min(prev + 1, 7));
      setIsLoading(false);
      
      toast({
        title: "Step Completed!",
        description: `Moving to step ${Math.min(currentStep + 1, 7)}`,
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) {
          toast({
            title: "Missing Information",
            description: "Please enter a challenge name",
            variant: "destructive"
          });
          return false;
        }
        if (!formData.description.trim()) {
          toast({
            title: "Missing Information", 
            description: "Please enter a description",
            variant: "destructive"
          });
          return false;
        }
        if (!formData.targetAudience) {
          toast({
            title: "Missing Information",
            description: "Please select a target audience",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 2:
        if (!formData.challengeType) {
          toast({
            title: "Missing Information",
            description: "Please select a challenge type",
            variant: "destructive"
          });
          return false;
        }
        if (formData.challengeType === 'team' && formData.teams.length === 0) {
          toast({
            title: "Missing Information",
            description: "Please add at least one team",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 3:
        if (!formData.visibility) {
          toast({
            title: "Missing Information",
            description: "Please select challenge visibility",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 4:
        if (!formData.structure) {
          toast({
            title: "Missing Information",
            description: "Please select challenge structure",
            variant: "destructive"
          });
          return false;
        }
        if (formData.structure === 'multi-stage' && formData.stages.length === 0) {
          toast({
            title: "Missing Information",
            description: "Please add at least one stage",
            variant: "destructive"
          });
          return false;
        }
        break;
      case 5:
        if (!formData.rewardType) {
          toast({
            title: "Missing Information",
            description: "Please select a reward type",
            variant: "destructive"
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'teamLogo', teamId?: number) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      
      if (type === 'banner') {
        setFormData(prev => ({ ...prev, banner: file }));
      } else if (type === 'teamLogo' && teamId) {
        setFormData(prev => ({
          ...prev,
          teams: prev.teams.map(team => 
            team.id === teamId ? { ...team, logo: file } : team
          )
        }));
      }
    }
  };

  const addTeam = () => {
    const newId = formData.teams.length + 1;
    setFormData(prev => ({
      ...prev,
      teams: [...prev.teams, {
        id: newId,
        name: '',
        logo: null,
        members: [],
        socialMedia: ''
      }]
    }));
  };

  const removeTeam = (id: number) => {
    setFormData(prev => ({
      ...prev,
      teams: prev.teams.filter(team => team.id !== id)
    }));
  };

  const updateTeam = (id: number, field: keyof Team, value: any) => {
    setFormData(prev => ({
      ...prev,
      teams: prev.teams.map(team => 
        team.id === id ? { ...team, [field]: value } : team
      )
    }));
  };

  const addStage = () => {
    const newId = formData.stages.length + 1;
    setFormData(prev => ({
      ...prev,
      stages: [...prev.stages, {
        id: newId,
        name: '',
        points: 0,
        gems: 0,
        hasBadge: false,
        badgeName: '',
        badgeIcon: '🏆'
      }]
    }));
  };

  const removeStage = (id: number) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.filter(stage => stage.id !== id)
    }));
  };

  const updateStage = (id: number, field: keyof Stage, value: any) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.map(stage => 
        stage.id === id ? { ...stage, [field]: value } : stage
      )
    }));
  };

  const addBadgeTier = () => {
    const newId = formData.badgeTiers.length + 1;
    setFormData(prev => ({
      ...prev,
      badgeTiers: [...prev.badgeTiers, {
        id: newId,
        name: '',
        icon: '🏆',
        minPoints: 0,
        maxPoints: 100
      }]
    }));
  };

  const removeBadgeTier = (id: number) => {
    setFormData(prev => ({
      ...prev,
      badgeTiers: prev.badgeTiers.filter(tier => tier.id !== id)
    }));
  };

  const updateBadgeTier = (id: number, field: keyof BadgeTier, value: any) => {
    setFormData(prev => ({
      ...prev,
      badgeTiers: prev.badgeTiers.map(tier => 
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    }));
  };

  const publishChallenge = () => {
    toast({
      title: "Challenge Published!",
      description: "Your challenge has been successfully published",
    });
    setCurrentStep(7);
  };

  const createAnother = () => {
    setCurrentStep(1);
    setFormData({
      name: '',
      description: '',
      banner: null,
      allowLeadership: false,
      targetAudience: '',
      challengeType: '',
      teamSize: 2,
      teams: [],
      visibility: '',
      participantLimit: 100,
      selectedParticipants: [],
      structure: '',
      stages: [],
      rewardType: '',
      pointsCounter: '',
      hasMaxPoints: false,
      maxPointsPerStaff: 0,
      badgeRewards: false,
      badgeTiers: [],
      pointsReward: 0,
      gemsReward: 0,
      gemType: 'bronze',
      admins: [],
      verifiers: [],
      supporters: [],
      publishStart: '',
      publishEnd: '',
      challengeStart: '',
      challengeEnd: ''
    });
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {[1, 2, 3, 4, 5, 6].map(step => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              step <= currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {step < currentStep ? <Check className="w-4 h-4" /> : step}
          </div>
        ))}
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
        />
      </div>
    </div>
  );

  // Page 1: Challenge Details
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="rocket-card p-6 text-center mb-6">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Challenge Details</h2>
        <p className="text-muted-foreground">Set up the basic information for your challenge</p>
      </div>

      <div className="space-y-4">

        <div className="rocket-card p-4">
          <label className="block text-sm font-semibold mb-2">Challenge Name 📝 *</label>
        <Input
          placeholder="Enter the name of your challenge"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full"
        />
        </div>

        <div className="rocket-card p-4">
          <label className="block text-sm font-semibold mb-2">Description 📄 *</label>
        <Textarea
          placeholder="Write a brief description explaining what this challenge is all about and what participants can expect"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="min-h-[100px] resize-none"
        />
        </div>

        <div className="rocket-card p-4">
          <label className="block text-sm font-semibold mb-2">Challenge Banner 🖼️</label>
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'banner')}
            className="hidden"
            id="banner-upload"
          />
          <label htmlFor="banner-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              {formData.banner ? formData.banner.name : 'Upload a banner image to visually represent your challenge'}
            </p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
          </label>
        </div>
        </div>

        <div className="rocket-card p-4">
          <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-semibold">Allow Leadership? 👥</label>
          <p className="text-xs text-muted-foreground">Enable leadership roles within the challenge</p>
        </div>
        <Switch
          checked={formData.allowLeadership}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowLeadership: checked }))}
          />
        </div>
        </div>

        <div className="rocket-card p-4">
          <label htmlFor="targetAudience" className="block text-sm font-semibold mb-4">Select Target Audience 🎯 *</label>
          <select
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
          >
            <option value="">Choose target audience...</option>
            <optgroup label="Community">
              {targetAudienceOptions.community.map((audience) => (
                <option key={audience} value={`community-${audience}`}>{audience}</option>
              ))}
            </optgroup>
            <optgroup label="Company">
              {targetAudienceOptions.company.map((audience) => (
                <option key={audience} value={`company-${audience}`}>{audience}</option>
              ))}
            </optgroup>
            <optgroup label="Education">
              {targetAudienceOptions.education.map((audience) => (
                <option key={audience} value={`education-${audience}`}>{audience}</option>
              ))}
            </optgroup>
            <optgroup label="Individual">
              {targetAudienceOptions.individual.map((audience) => (
                <option key={audience} value={`individual-${audience}`}>{audience}</option>
              ))}
            </optgroup>
            <optgroup label="Fitness Coach">
              {targetAudienceOptions.fitnessCoach.map((audience) => (
                <option key={audience} value={`fitnessCoach-${audience}`}>{audience}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );

  // Page 2: Challenge Type
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Challenge Type</h2>
        <p className="text-muted-foreground">Choose the format of your challenge</p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-4">Challenge Format *</label>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="challengeType"
              value="individual"
              checked={formData.challengeType === 'individual'}
              onChange={(e) => setFormData(prev => ({ ...prev, challengeType: e.target.value }))}
              className="w-4 h-4"
            />
            <div>
              <div className="font-medium">Individual Challenge 🧑‍🤝‍🧑</div>
              <div className="text-sm text-muted-foreground">Challenge for individuals only</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="challengeType"
              value="team"
              checked={formData.challengeType === 'team'}
              onChange={(e) => setFormData(prev => ({ ...prev, challengeType: e.target.value }))}
              className="w-4 h-4"
            />
            <div>
              <div className="font-medium">Team Challenge 👥</div>
              <div className="text-sm text-muted-foreground">Challenge for teams with multiple members</div>
            </div>
          </label>
        </div>
      </div>

      {formData.challengeType === 'team' && (
        <div className="space-y-6 border-t pt-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Team Size</label>
            <Input
              type="number"
              min="2"
              placeholder="Specify how many people will be in each team"
              value={formData.teamSize}
              onChange={(e) => setFormData(prev => ({ ...prev, teamSize: parseInt(e.target.value) || 2 }))}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold">Team Details</label>
              <Button
                type="button"
                onClick={addTeam}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Team
              </Button>
            </div>

            {formData.teams.map((team, index) => (
              <div key={team.id} className="border rounded-lg p-4 space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Team {index + 1}</h4>
                  <Button
                    type="button"
                    onClick={() => removeTeam(team.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Team Name</label>
                  <Input
                    placeholder="Enter unique team name"
                    value={team.name}
                    onChange={(e) => updateTeam(team.id, 'name', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Team Logo</label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'teamLogo', team.id)}
                      className="hidden"
                      id={`team-logo-${team.id}`}
                    />
                    <label htmlFor={`team-logo-${team.id}`} className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        {team.logo ? team.logo.name : 'Upload team logo'}
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Social Media Links</label>
                  <Input
                    placeholder="Add social media links for sharing"
                    value={team.socialMedia}
                    onChange={(e) => updateTeam(team.id, 'socialMedia', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Page 3: Challenge Visibility
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Challenge Visibility</h2>
        <p className="text-muted-foreground">Set the visibility options for your challenge</p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-4">Visibility Settings *</label>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={formData.visibility === 'public'}
              onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
              className="w-4 h-4"
            />
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <div>
                <div className="font-medium">Public Challenge 🌐</div>
                <div className="text-sm text-muted-foreground">Open to all with participant limit control</div>
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={formData.visibility === 'private'}
              onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
              className="w-4 h-4"
            />
            <div className="flex items-center space-x-2">
              <EyeOff className="w-5 h-5" />
              <div>
                <div className="font-medium">Private Challenge 🔒</div>
                <div className="text-sm text-muted-foreground">Manually select participants</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {formData.visibility === 'public' && (
        <div>
          <label className="block text-sm font-semibold mb-2">Participant Limit</label>
          <Input
            type="number"
            min="1"
            placeholder="Set maximum number of participants"
            value={formData.participantLimit}
            onChange={(e) => setFormData(prev => ({ ...prev, participantLimit: parseInt(e.target.value) || 100 }))}
          />
        </div>
      )}

      {formData.visibility === 'private' && (
        <div>
          <label className="block text-sm font-semibold mb-2">Select Participants</label>
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users to invite..." />
            </div>
            <p className="text-sm text-muted-foreground">Search and select participants who can join the challenge</p>
          </div>
        </div>
      )}
    </div>
  );

  // Page 4: Challenge Structure
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Challenge Structure</h2>
        <p className="text-muted-foreground">Decide the structure of the challenge</p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-4">Challenge Structure *</label>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="structure"
              value="multi-stage"
              checked={formData.structure === 'multi-stage'}
              onChange={(e) => setFormData(prev => ({ ...prev, structure: e.target.value }))}
              className="w-4 h-4"
            />
            <div>
              <div className="font-medium">Multi-stage Challenge 🏆</div>
              <div className="text-sm text-muted-foreground">Multiple stages where participants unlock new challenges</div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="structure"
              value="single-stage"
              checked={formData.structure === 'single-stage'}
              onChange={(e) => setFormData(prev => ({ ...prev, structure: e.target.value }))}
              className="w-4 h-4"
            />
            <div>
              <div className="font-medium">Single-stage Challenge 🎯</div>
              <div className="text-sm text-muted-foreground">Simple challenge with just one stage or task</div>
            </div>
          </label>
        </div>
      </div>

      {formData.structure === 'multi-stage' && (
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Challenge Stages</label>
            <Button
              type="button"
              onClick={addStage}
              variant="outline"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Stage
            </Button>
          </div>

          {formData.stages.map((stage, index) => (
            <div key={stage.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Stage {index + 1}: {stage.name || 'Unnamed Stage'}</h4>
                <Button
                  type="button"
                  onClick={() => removeStage(stage.id)}
                  variant="ghost"
                  size="sm"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stage Name</label>
                <Input
                  placeholder="e.g., Stage 1: Warm-up"
                  value={stage.name}
                  onChange={(e) => updateStage(stage.id, 'name', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Points</label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Assign points"
                    value={stage.points}
                    onChange={(e) => updateStage(stage.id, 'points', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gems</label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Add gems"
                    value={stage.gems}
                    onChange={(e) => updateStage(stage.id, 'gems', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Badge for this stage</label>
                  <Switch
                    checked={stage.hasBadge}
                    onCheckedChange={(checked) => updateStage(stage.id, 'hasBadge', checked)}
                  />
                </div>

                {stage.hasBadge && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Badge Name</label>
                      <Input
                        placeholder="Badge name"
                        value={stage.badgeName}
                        onChange={(e) => updateStage(stage.id, 'badgeName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Badge Icon</label>
                      <div className="flex flex-wrap gap-2">
                        {badgeIcons.map(icon => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => updateStage(stage.id, 'badgeIcon', icon)}
                            className={`p-2 rounded border text-lg ${
                              stage.badgeIcon === icon ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Page 5: Rewards
  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="rocket-card p-6 text-center mb-6">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mb-4">
          <Gift className="w-8 h-8 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Rewards</h2>
        <p className="text-muted-foreground">Define the rewards for the challenge</p>
      </div>

      <div className="rocket-card p-4">
        <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          Challenge Reward Type *
        </label>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="rewardType"
              value="reward-points"
              checked={formData.rewardType === 'reward-points'}
              onChange={(e) => setFormData(prev => ({ ...prev, rewardType: e.target.value }))}
              className="w-4 h-4"
            />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="font-medium">Reward Point System</div>
                <div className="text-sm text-muted-foreground">Participants earn points for completing tasks</div>
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="rewardType"
              value="non-reward-points"
              checked={formData.rewardType === 'non-reward-points'}
              onChange={(e) => setFormData(prev => ({ ...prev, rewardType: e.target.value }))}
              className="w-4 h-4"
            />
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-medium">Non-Reward Point System</div>
                <div className="text-sm text-muted-foreground">No points, but rewards like gems or badges</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {formData.rewardType === 'non-reward-points' && (
        <div className="rocket-card p-4">
          <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
            <Gem className="w-4 h-4 text-purple-500" />
            Non Reward Points
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Gems</label>
              <Input
                type="number"
                min="0"
                placeholder="Number of gems"
                value={formData.gemsReward}
                onChange={(e) => setFormData(prev => ({ ...prev, gemsReward: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Badge</label>
              <Input placeholder="Badge name" />
            </div>
          </div>
        </div>
      )}

      {formData.rewardType === 'reward-points' && (
        <div className="space-y-6 border-t pt-6">
          <div>
          <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            Points Counter
          </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="pointsCounter"
                  value="once-off"
                  checked={formData.pointsCounter === 'once-off'}
                  onChange={(e) => setFormData(prev => ({ ...prev, pointsCounter: e.target.value }))}
                  className="w-4 h-4"
                />
                <span>Once-off: Points awarded once per achievement</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="pointsCounter"
                  value="recurring"
                  checked={formData.pointsCounter === 'recurring'}
                  onChange={(e) => setFormData(prev => ({ ...prev, pointsCounter: e.target.value }))}
                  className="w-4 h-4"
                />
                <span>Recurring: Points awarded every time achievement is completed</span>
              </label>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <label className="text-sm font-semibold">Maximum Points per Staff</label>
                <p className="text-xs text-muted-foreground">Set a limit on participant points</p>
              </div>
              <Switch
                checked={formData.hasMaxPoints}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasMaxPoints: checked }))}
              />
            </div>
            {formData.hasMaxPoints && (
              <Input
                type="number"
                min="0"
                placeholder="Enter maximum points per staff"
                value={formData.maxPointsPerStaff}
                onChange={(e) => setFormData(prev => ({ ...prev, maxPointsPerStaff: parseInt(e.target.value) || 0 }))}
              />
            )}
          </div>
        </div>
      )}
      <div className="space-y-6 border-t pt-6">
        <div className="rocket-card p-4">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              Badge Rewards
            </label>
            <Switch
              checked={formData.badgeRewards}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, badgeRewards: checked }))}
            />
          </div>

          {formData.badgeRewards && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Badge Tiers</label>
                <Button
                  type="button"
                  onClick={addBadgeTier}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Tier
                </Button>
              </div>

              {formData.badgeTiers.map((tier, index) => (
                <div key={tier.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Tier {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removeBadgeTier(tier.id)}
                      variant="ghost"
                      size="sm"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Badge Name</label>
                      <Input
                        placeholder="e.g., Gold Medal"
                        value={tier.name}
                        onChange={(e) => updateBadgeTier(tier.id, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Badge Icon</label>
                      <div className="flex flex-wrap gap-1">
                        {badgeIcons.slice(0, 4).map(icon => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => updateBadgeTier(tier.id, 'icon', icon)}
                            className={`p-2 rounded border ${
                              tier.icon === icon ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Min Points</label>
                      <Input
                        type="number"
                        min="0"
                        value={tier.minPoints}
                        onChange={(e) => updateBadgeTier(tier.id, 'minPoints', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Max Points</label>
                      <Input
                        type="number"
                        min="0"
                        value={tier.maxPoints}
                        onChange={(e) => updateBadgeTier(tier.id, 'maxPoints', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="rocket-card p-4">
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Coins className="w-4 h-4 text-yellow-500" />
              Points Rewards
            </label>
            <Input
              type="number"
              min="0"
              placeholder="Points to award"
              value={formData.pointsReward}
              onChange={(e) => setFormData(prev => ({ ...prev, pointsReward: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <div className="rocket-card p-4">
            <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
              <Gem className="w-4 h-4 text-purple-500" />
              Gems Rewards
            </label>
            <div className="space-y-2">
              <Input
                type="number"
                min="0"
                placeholder="Number of gems"
                value={formData.gemsReward}
                onChange={(e) => setFormData(prev => ({ ...prev, gemsReward: parseInt(e.target.value) || 0 }))}
              />
              <select
                value={formData.gemType}
                onChange={(e) => setFormData(prev => ({ ...prev, gemType: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                {gemTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Page 6: Summary & Admin Assignment
  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Summary & Admin Assignment</h2>
        <p className="text-muted-foreground">Review details and assign roles</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Assign Admins 🧑‍💻</label>
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users to assign as admins..." />
            </div>
            <p className="text-xs text-muted-foreground">Admins have full control of the challenge</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Assign Verifiers 🛠️</label>
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users to assign as verifiers..." />
            </div>
            <p className="text-xs text-muted-foreground">Verifiers validate progress and results</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Assign Supporters 🙌</label>
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users to assign as supporters..." />
            </div>
            <p className="text-xs text-muted-foreground">Supporters assist in running or promoting the challenge</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-4">Schedule Settings 📅</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Publish Start 🕰️</label>
              <Input
                type="datetime-local"
                value={formData.publishStart}
                onChange={(e) => setFormData(prev => ({ ...prev, publishStart: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground mt-1">When challenge goes live</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Publish End 🕰️</label>
              <Input
                type="datetime-local"
                value={formData.publishEnd}
                onChange={(e) => setFormData(prev => ({ ...prev, publishEnd: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground mt-1">When challenge ends visibility</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Challenge Start 🏁</label>
              <Input
                type="datetime-local"
                value={formData.challengeStart}
                onChange={(e) => setFormData(prev => ({ ...prev, challengeStart: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground mt-1">When challenge begins for participants</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Challenge End 🏁</label>
              <Input
                type="datetime-local"
                value={formData.challengeEnd}
                onChange={(e) => setFormData(prev => ({ ...prev, challengeEnd: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground mt-1">When challenge ends for participants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Page 7: Confirmation
  const renderStep7 = () => (
    <div className="text-center space-y-6">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold">Challenge Published!</h2>
      <p className="text-muted-foreground">
        Your challenge has been successfully published and is now live!
      </p>
      
      <div className="space-y-4 pt-6">
        <Button onClick={createAnother} className="w-full">
          Create Another Challenge
        </Button>
        <Button onClick={onBack} variant="outline" className="w-full">
          Back to Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-6">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                className="hover:bg-white/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold">Create Challenge</h1>
                <p className="text-xs text-muted-foreground">Step {currentStep} of 7</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round((currentStep / 7) * 100)}%
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 bg-muted">
            <div 
              className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
          {currentStep === 7 && renderStep7()}
        </div>

        {currentStep < 7 && (
          <div className="flex gap-4 p-4">
            {currentStep > 1 && (
              <Button
                onClick={prevStep}
                variant="outline"
                className="flex-1"
                disabled={isLoading}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            )}

            <Button
              onClick={currentStep === 6 ? publishChallenge : nextStep}
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  {currentStep === 6 ? 'Publish Challenge' : 'Continue'}
                  {currentStep < 6 && <ChevronRight className="w-4 h-4 ml-1" />}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateChallenge;