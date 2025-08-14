interface FriendCardProps {
  name: string;
  avatar: string;
  challenges: number;
}

export const FriendCard = ({ name, avatar, challenges }: FriendCardProps) => {
  return (
    <div className="challenge-card min-w-[140px] text-center space-y-3">
      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-lg">
        {avatar}
      </div>
      <div>
        <h4 className="font-semibold text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground">{challenges} challenges</p>
      </div>
      <button className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs py-2 px-3 rounded-lg transition-colors duration-200">
        View Profile
      </button>
    </div>
  );
};