interface RewardCardProps {
  icon: string;
  title: string;
  subtitle: string;
  background: string;
}

export const RewardCard = ({ icon, title, subtitle, background }: RewardCardProps) => {
  return (
    <div className={`rocket-card p-4 ${background} relative overflow-hidden group cursor-pointer`}>
      {/* Sparkle effect */}
      <div className="absolute top-2 right-2 sparkle">✨</div>

      <div className="text-center space-y-3">
        <div className="text-3xl mb-2">{icon}</div>
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{subtitle}</p>

        <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary text-xs py-2 px-3 rounded-lg transition-colors duration-200 group-hover:scale-105">
          Learn More
        </button>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};