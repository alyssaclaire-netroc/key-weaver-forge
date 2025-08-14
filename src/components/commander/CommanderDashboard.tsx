import { useState, useEffect } from 'react';
import { Rocket, MapPin, Phone, Globe, Plus, Users, Calendar, Award, Menu, LogOut, Trophy, Gamepad2, Gift, Star, TrendingUp } from 'lucide-react';
import { BannerCarousel } from '@/components/BannerCarousel';
import { ChallengeCard } from '@/components/ChallengeCard';
import { RewardCard } from '@/components/RewardCard';
import { FriendCard } from '@/components/FriendCard';
import { ScrollableContainer } from '@/components/ScrollableContainer';

// Sample data
const challenges = {
  active: [
    { id: 1, title: "Morning Energy Boost", icon: "🌅", progress: 75, points: 45, role: "participant" as const, participants: 24 },
    { id: 2, title: "10K Steps Daily", icon: "👟", progress: 60, points: 30, role: "team-leader" as const, status: "Leading 12 astronauts" },
    { id: 3, title: "Weekend Warrior", icon: "🏃‍♂️", progress: 45, points: 22, role: "admin" as const, status: "Managing challenge" },
    { id: 4, title: "Yoga Mindfulness", icon: "🧘‍♀️", progress: 90, points: 67, role: "observer" as const, status: "Watching progress" },
    { id: 5, title: "Cycling Challenge", icon: "🚴‍♂️", progress: 30, points: 15, role: "participant" as const, status: "Just started!" },
  ],
  culinary: [
    { id: 6, title: "Healthy Lunch Week", icon: "🥗", progress: 80, points: 40, role: "participant" as const, participants: 18 },
    { id: 7, title: "No Takeout Challenge", icon: "🚫🥡", progress: 55, points: 27, role: "team-leader" as const, status: "Leading 8 astronauts" },
    { id: 8, title: "Meal Prep Master", icon: "📦", progress: 70, points: 35, role: "admin" as const, status: "Managing recipes" },
    { id: 9, title: "Hydration Station", icon: "💧", progress: 95, points: 47, role: "observer" as const, status: "Nearly complete!" },
    { id: 10, title: "Local Ingredients", icon: "🌽", progress: 40, points: 20, role: "participant" as const, status: "Exploring markets" },
  ],
  goGreen: [
    { id: 11, title: "Green Office Challenge", icon: "🏢", progress: 65, points: 32, role: "team-leader" as const, status: "Leading sustainability" },
    { id: 12, title: "Zero Waste Week", icon: "♻️", progress: 85, points: 42, role: "participant" as const, participants: 32 },
    { id: 13, title: "Plant a Tree", icon: "🌳", progress: 100, points: 50, role: "admin" as const, status: "Challenge completed!" },
    { id: 14, title: "Eco Transport", icon: "🚲", progress: 50, points: 25, role: "observer" as const, status: "Tracking progress" },
    { id: 15, title: "Plastic-Free Living", icon: "🚫🥤", progress: 35, points: 17, role: "participant" as const, status: "Learning alternatives" },
  ]
};

const friends = [
  { name: "Alex Chen", avatar: "👨‍💼", challenges: 12 },
  { name: "Sarah Kim", avatar: "👩‍💻", challenges: 8 },
  { name: "Mike Johnson", avatar: "👨‍🚀", challenges: 15 },
  { name: "Emily Davis", avatar: "👩‍🎨", challenges: 6 },
];

const pastChallenges = [
  { title: "Summer Fitness Journey", status: "Completed", participants: 500, avgPoints: 85 },
  { title: "Healthy Habits Month", status: "Expired", participants: 320, avgPoints: 72 },
  { title: "Green Week Initiative", status: "Completed", participants: 450, avgPoints: 90 },
  { title: "Team Building Quest", status: "Completed", participants: 200, avgPoints: 95 },
  { title: "Innovation Challenge", status: "Expired", participants: 150, avgPoints: 78 },
  { title: "Wellness Wednesday", status: "Completed", participants: 380, avgPoints: 82 },
];

interface CommanderDashboardProps {
  onLogout: () => void;
}

const CommanderDashboard = ({ onLogout }: CommanderDashboardProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("active");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showPastChallenges, setShowPastChallenges] = useState(false);

  const handleRoleClick = (challengeId: number, role: string) => {
    console.log(`Opening ${role} panel for challenge ${challengeId}`);
  };

  const handleInvite = () => {
    console.log("Opening invite modal");
  };

  const handleAddChallenge = () => {
    window.location.href = '/create-challenge';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full min-h-screen flex relative">
        {/* Sidebar */}
        <div className={`fixed left-0 top-0 h-full transition-all duration-300 ease-out z-40 ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="w-80 h-full flex flex-col bg-background/95 backdrop-blur-sm border-r border-border/20">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-border/20">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Menu</h2>
                <button
                  onClick={() => setSidebarVisible(false)}
                  className="hover:bg-white/10 p-1 rounded transition-colors"
                  aria-label="Close sidebar"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-4">
                {/* Gamification Module */}
                <div className="rocket-card p-4">
                  <h3 className="text-md font-bold mb-3 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-primary" />
                    Gamification
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Leaderboard</span>
                      </div>
                      <span className="text-xs text-muted-foreground">#5</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Star className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Achievements</span>
                      </div>
                      <span className="text-xs text-muted-foreground">12/20</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Progress</span>
                      </div>
                      <span className="text-xs text-muted-foreground">85%</span>
                    </div>
                  </div>
                </div>

                {/* Rewards Module */}
                <div className="rocket-card p-4">
                  <h3 className="text-md font-bold mb-3 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    Rewards
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">💎</span>
                        <span className="text-sm font-medium">Premium Gems</span>
                      </div>
                      <p className="text-xs text-muted-foreground">You have 1,250 gems</p>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">⭐</span>
                        <span className="text-sm font-medium">Bonus Points</span>
                      </div>
                      <p className="text-xs text-muted-foreground">2,450 points available</p>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">🎟️</span>
                        <span className="text-sm font-medium">Vouchers</span>
                      </div>
                      <p className="text-xs text-muted-foreground">3 vouchers ready to claim</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay */}
        {sidebarVisible && (
          <div 
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setSidebarVisible(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          <div className="max-w-md mx-auto px-6">
            {/* Top Bar */}
            <div className="top-bar">
              <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                className="hover:bg-white/10 p-1 rounded transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-semibold">Challenge Commander</h1>
              <button
                onClick={onLogout}
                className="hover:bg-white/10 p-1 rounded transition-colors flex items-center gap-1"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs">Logout</span>
              </button>
            </div>

            <div className="space-y-6 p-4">
              {/* Header Section */}
              <div className="relative gradient-banner">
                <div className="network-pattern"></div>
                <div className="relative z-10 p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Network Rocket</h1>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      Accelerating business connections through networking and challenges
                    </p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-center gap-2 text-white">
                      <Globe className="w-3 h-3" />
                      <span>www.networkrocket.com</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-white/80">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">456 Business Hub Ave, Singapore</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-white/80">
                      <Phone className="w-3 h-3" />
                      <span>+65 (555) 987-6543</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Banner Carousel */}
              <BannerCarousel />

              {/* Friends Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <span>👨‍🚀</span>
                      My Fellow Astronauts
                    </h2>
                    <p className="text-sm text-muted-foreground">Friends who joined Network Rocket's challenges</p>
                  </div>
                  <button
                    onClick={() => console.log("View all friends")}
                    className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium whitespace-nowrap"
                  >
                    View All
                  </button>
                </div>
                <ScrollableContainer>
                  {friends.map((friend, index) => (
                    <FriendCard key={index} {...friend} />
                  ))}
                  <div className="challenge-card min-w-[140px] text-center space-y-3 border-dashed border-2 border-muted">
                    <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center text-lg">
                      ➕
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Invite Friends</h4>
                      <p className="text-xs text-muted-foreground">Expand your network</p>
                    </div>
                    <button
                      onClick={handleInvite}
                      className="w-full bg-primary text-primary-foreground text-xs py-2 px-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                      Invite Now
                    </button>
                  </div>
                </ScrollableContainer>
              </div>

              {/* Special Rewards */}
              <div className="space-y-4">
                <div className="text-left">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span>✨</span>
                    Special Rewards
                  </h2>
                  <p className="text-sm text-muted-foreground">Win these amazing prizes in current challenges</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <RewardCard
                    icon="💎"
                    title="500 Gems"
                    subtitle="Morning Energy"
                    background="bg-gradient-to-br from-purple-50 to-purple-100"
                  />
                  <RewardCard
                    icon="⭐"
                    title="1000 Points"
                    subtitle="Green Office"
                    background="bg-gradient-to-br from-yellow-50 to-yellow-100"
                  />
                  <RewardCard
                    icon="🎟️"
                    title="$50 Voucher"
                    subtitle="Healthy Lunch"
                    background="bg-gradient-to-br from-green-50 to-green-100"
                  />
                </div>
              </div>

              {/* Current Challenges */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="text-left">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <span>🎯</span>
                      Current Challenges
                    </h2>
                    <p className="text-sm text-muted-foreground">Join the adventure today!</p>
                  </div>
                  <button
                    onClick={handleAddChallenge}
                    className="bg-primary text-primary-foreground rounded-full p-3 hover:bg-primary/90 transition-colors shadow-lg sticky top-4"
                    aria-label="Add new challenge"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Challenge Categories */}
                {Object.entries(challenges).map(([key, challengeList]) => (
                  <div key={key} className="rocket-card">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
                      className="w-full p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{key === 'active' ? '💪' : key === 'culinary' ? '🍳' : '🌱'}</span>
                        <span className="font-semibold">{key.toUpperCase()}</span>
                      </div>
                      <span className={`transition-transform duration-200 ${expandedCategory === key ? "rotate-180" : ""}`}>▼</span>
                    </button>
                    {expandedCategory === key && (
                      <div className="px-4 pb-4">
                        <ScrollableContainer>
                          {challengeList.map((challenge) => (
                            <ChallengeCard
                              key={challenge.id}
                              {...challenge}
                              onRoleClick={() => handleRoleClick(challenge.id, challenge.role)}
                              onInvite={challenge.role === "participant" ? handleInvite : undefined}
                            />
                          ))}
                        </ScrollableContainer>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Past Challenges */}
              <div className="space-y-4">
                <div className="text-left">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <span>📚</span>
                    Past Challenges
                  </h2>
                  <p className="text-sm text-muted-foreground">Previously completed adventures</p>
                </div>

                <div className="rocket-card">
                  <button
                    onClick={() => setShowPastChallenges(!showPastChallenges)}
                    className="w-full p-4 flex items-center justify-between"
                  >
                    <span className="font-semibold">View Past Challenges</span>
                    <span className={`transition-transform duration-200 ${showPastChallenges ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </button>

                  {showPastChallenges && (
                    <div className="px-4 pb-4 space-y-3">
                      {pastChallenges.map((challenge, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-muted-foreground truncate">{challenge.title}</h4>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-muted-foreground mt-1">
                              <span className={`px-2 py-1 rounded-full whitespace-nowrap ${
                                challenge.status === "Completed" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"
                              }`}>
                                {challenge.status}
                              </span>
                              <div className="flex items-center gap-1 whitespace-nowrap">
                                <Users className="w-3 h-3 flex-shrink-0" />
                                <span>{challenge.participants}</span>
                              </div>
                              <div className="flex items-center gap-1 whitespace-nowrap">
                                <Award className="w-3 h-3 flex-shrink-0" />
                                <span>{challenge.avgPoints} avg pts</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Spacing */}
              <div className="h-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommanderDashboard;