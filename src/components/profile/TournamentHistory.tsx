
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Tournament {
  id: number;
  name: string;
  date: string;
  placement: string;
  participants: number;
  prize: string;
}

interface TournamentHistoryProps {
  tournaments: Tournament[];
}

const TournamentHistory = ({ tournaments }: TournamentHistoryProps) => {
  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Tournament History</h3>
          <p className="text-sm text-muted-foreground">Your tournament participation and results</p>
        </div>
        <Link to="/tournaments">
          <Button>Browse Tournaments</Button>
        </Link>
      </div>
      
      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="font-medium">{tournament.name}</p>
                      <p className="text-sm text-muted-foreground">{new Date(tournament.date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">{tournament.participants} participants</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-2">
                    {tournament.placement}
                  </Badge>
                  <p className="text-sm font-medium text-green-600">
                    {tournament.prize}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline">View All Tournaments</Button>
      </div>
    </div>
  );
};

export default TournamentHistory;
