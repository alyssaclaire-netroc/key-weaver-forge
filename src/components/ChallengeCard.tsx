import { Users, ArrowRight } from 'lucide-react';

interface ChallengeCardProps {
  title: string;
  icon: string;
  progress: number;
  points: number;
  role: 'participant' | 'team-leader' | 'admin' | 'observer';
  status?: string;
  participants?: number;
  onRoleClick: () => void;
  onInvite?: () => void;
}

const roleConfig = {
  participant: {
    label: "Participant",
    className: "role-button role-participant",
    icon: "👤"
  },
  'team-leader': {
    label: "Team Leader",
    className: "role-button role-team-leader",
    icon: "👥"
  },
  admin: {
    label: "Admin",
    className: "role-button role-admin",
    icon: "⚙️"
  },
  observer: {
    label: "Observer",
    className: "role-button role-observer",
    icon: "👁️"
  }
};

export const ChallengeCard = ({
  title,
  icon,
  progress,
  points,
  role,
  status,
  participants,
  onRoleClick,
  onInvite
}: ChallengeCardProps) => {
  const roleData = roleConfig[role];

  return (
    <div className="challenge-card min-w-[280px] space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{title}</h4>
          {status && (
            <p className="text-xs text-muted-foreground">{status}</p>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Points and Participants */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-primary font-medium">+{points} pts</span>
        {participants && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{participants}</span>
          </div>
        )}
      </div>

      {/* Role Button and Actions */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={onRoleClick}
          className={roleData.className}
        >
          <span className="mr-1">{roleData.icon}</span>
          {roleData.label}
        </button>

        {onInvite && (
          <button
            onClick={onInvite}
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label="Invite friends"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};