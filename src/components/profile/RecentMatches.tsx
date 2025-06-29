
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Match {
  id: number;
  date: string;
  opponent: string;
  result: string;
  score: string;
  eloChange: number;
  type: string;
}

interface RecentMatchesProps {
  matches: Match[];
}

const RecentMatches = ({ matches }: RecentMatchesProps) => {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Recent Matches</h3>
          <p className="text-sm text-muted-foreground">Your latest table tennis matches</p>
        </div>
        <Link to="/matches/create">
          <Button>Create Match</Button>
        </Link>
      </div>
      
      <div className="space-y-4">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <Badge variant={match.result === "Won" ? "secondary" : "outline"}>
                      {match.type}
                    </Badge>
                    <div>
                      <p className="font-medium">vs {match.opponent}</p>
                      <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Score: {match.score}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={match.result === "Won" ? "secondary" : "destructive"}
                    className="mb-2"
                  >
                    {match.result}
                  </Badge>
                  <p className={`text-sm font-medium ${
                    match.eloChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {match.eloChange > 0 ? '+' : ''}{match.eloChange} ELO
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline">View All Matches</Button>
      </div>
    </div>
  );
};

export default RecentMatches;
