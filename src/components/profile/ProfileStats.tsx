
import { Target, Trophy, Users, TrendingUp } from 'lucide-react';

interface ProfileStatsProps {
  elo: number;
  rank: number;
  totalMatches: number;
  winRate: number;
}

const ProfileStats = ({ elo, rank, totalMatches, winRate }: ProfileStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Target className="h-5 w-5 text-primary mr-2" />
          <span className="text-2xl font-bold">{elo}</span>
        </div>
        <p className="text-sm text-muted-foreground">ELO Rating</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Trophy className="h-5 w-5 text-primary mr-2" />
          <span className="text-2xl font-bold">#{rank}</span>
        </div>
        <p className="text-sm text-muted-foreground">Rank</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Users className="h-5 w-5 text-primary mr-2" />
          <span className="text-2xl font-bold">{totalMatches}</span>
        </div>
        <p className="text-sm text-muted-foreground">Total Matches</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <TrendingUp className="h-5 w-5 text-primary mr-2" />
          <span className="text-2xl font-bold">{winRate}%</span>
        </div>
        <p className="text-sm text-muted-foreground">Win Rate</p>
      </div>
    </div>
  );
};

export default ProfileStats;
