
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Map, User, Star, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  // Show personalized greeting for logged-in users
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Greeting */}
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6">
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/70 mb-4">
                  Hello
                </h1>
                <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                  {user.name}!
                </h2>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                Welcome back to KickerTUM. Ready to dominate the tables today?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Link to="/profile">
                    View Your Profile <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/tournaments">Browse Tournaments</Link>
                </Button>
              </div>
            </div>

            {/* Right side - Waving Robot */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Robot placeholder with wave animation */}
                <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center border-2 border-primary/20 shadow-2xl">
                  <div className="text-center">
                    {/* Simple robot emoji with wave animation as placeholder */}
                    <div className="text-8xl md:text-9xl animate-bounce">🤖</div>
                    <div className="text-6xl md:text-7xl animate-[wave_1s_ease-in-out_infinite] origin-bottom-right inline-block mt-4">👋</div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/30 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Track Your Matches",
      description: "Log your kicker matches and see your ELO rating improve as you win.",
      path: "/profile"
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Join Tournaments",
      description: "Participate in tournaments around Munich and compete with the best players.",
      path: "/tournaments"
    },
    {
      icon: <Map className="h-8 w-8 text-primary" />,
      title: "Find Tables",
      description: "Discover kicker tables around Munich with our interactive map.",
      path: "/tables"
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Leaderboard",
      description: "See how you rank among other kicker players in Munich.",
      path: "/leaderboard"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Kickstart Your Game at KickerTUM
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Munich's Premier Kicker Community - Track matches, participate in tournaments, and discover kicker tables around Munich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button asChild size="lg" className="rounded-full">
                <Link to="/profile">
                  View Your Profile <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="rounded-full">
                <Link to="/signup">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/tables">Find Kicker Tables</Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Everything You Need for Kicker in Munich
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="ios-card p-6 flex flex-col items-center text-center hover-scale"
              >
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button asChild variant="ghost" className="mt-auto rounded-full">
                  <Link to={feature.path}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Section with enhanced styling */}
      <section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Recent Activity</h2>
            <Button asChild variant="ghost" className="rounded-full">
              <Link to="/leaderboard">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Matches */}
            <div className="ios-card p-6 border-2 border-primary/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Recent Matches</h3>
                <Button asChild size="sm" variant="ghost" className="rounded-full">
                  <Link to="/profile">View All</Link>
                </Button>
              </div>
              
              {/* Sample matches - In a real app these would be dynamically loaded */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/40 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Team Alpha vs Team Beta</div>
                        <div className="text-sm text-muted-foreground">2 hours ago</div>
                      </div>
                    </div>
                    <div className="font-semibold">5 - 3</div>
                  </div>
                ))}
              </div>
              
              <Button asChild variant="outline" size="sm" className="w-full mt-4 rounded-full">
                <Link to="/profile">
                  <Plus className="mr-2 h-4 w-4" /> Record New Match
                </Link>
              </Button>
            </div>
            
            {/* Upcoming Tournaments */}
            <div className="ios-card p-6 border-2 border-primary/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Upcoming Tournaments</h3>
                <Button asChild size="sm" variant="ghost" className="rounded-full">
                  <Link to="/tournaments">View All</Link>
                </Button>
              </div>
              
              {/* Sample tournaments */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border/40 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Munich Kicker Cup {i}</div>
                        <div className="text-sm text-muted-foreground">Next Friday, 18:00</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full text-xs">Join</Button>
                  </div>
                ))}
              </div>
              
              <Button asChild variant="outline" size="sm" className="w-full mt-4 rounded-full">
                <Link to="/tournaments">
                  <Plus className="mr-2 h-4 w-4" /> Create Tournament
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features CTA with enhanced styling */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="ios-card p-8 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 overflow-hidden relative rounded-2xl">
            <div className="max-w-2xl relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Unlock Premium Features
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Get access to create your own matches, invite other players, and more with our premium subscription.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link to="/subscription">
                  Upgrade Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/20 to-transparent"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full filter blur-2xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
