
import { Link } from 'react-router-dom';
import { Map, Trophy, Heart, Mail, Info } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/40 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">K</div>
              <span className="font-bold text-lg">KickerTUM</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The premier platform for kicker enthusiasts in Munich.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Match Tracking
                </Link>
              </li>
              <li>
                <Link to="/tournaments" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Tournaments
                </Link>
              </li>
              <li>
                <Link to="/tables" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
                  <Map className="h-4 w-4" /> Table Finder
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/leaderboard" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Leaderboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Support Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" /> About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KickerTUM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
