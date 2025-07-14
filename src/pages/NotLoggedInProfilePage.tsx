import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Trophy, 
  Users, 
  Target, 
  BarChart3, 
  Calendar,
  Crown,
  Zap,
  Shield,
  Star
} from 'lucide-react';

const NotLoggedInProfilePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: User,
      title: "Personal Profile",
      description: "Create your player profile with stats, achievements, and personal information"
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Track your ELO rating, win rate, and improvement over time"
    },
    {
      icon: Trophy,
      title: "Tournament History",
      description: "View all your tournament participations, results, and prizes won"
    },
    {
      icon: Users,
      title: "Match History",
      description: "See detailed records of all your matches with opponents and scores"
    },
    {
      icon: Target,
      title: "Skills Analysis",
      description: "Get insights into your playing style and areas for improvement"
    },
    {
      icon: Calendar,
      title: "Upcoming Events",
      description: "Never miss a tournament or match with personalized event notifications"
    }
  ];

  const premiumFeatures = [
    {
      icon: Crown,
      title: "Premium Statistics",
      description: "Advanced analytics and detailed performance breakdowns"
    },
    {
      icon: Zap,
      title: "Priority Booking",
      description: "Book tables before regular members and get the best time slots"
    },
    {
      icon: Shield,
      title: "Exclusive Tournaments",
      description: "Access to premium-only tournaments with bigger prizes"
    }
  ];

  const stats = [
    { label: "Active Profiles", value: "2,500+", icon: Users },
    { label: "Matches Tracked", value: "15,000+", icon: Target },
    { label: "Tournaments Recorded", value: "150+", icon: Trophy },
    { label: "Average Rating", value: "1,450", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            Join the Community
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Your Player Profile
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Create your personalized KickerTUM profile to track your progress, 
            connect with other players, and showcase your table tennis journey at TU München.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="rounded-full"
              onClick={() => navigate('/signup')}
            >
              <User className="mr-2 h-4 w-4" />
              Create Your Profile
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full"
              onClick={() => navigate('/login')}
            >
              Already Have Account?
            </Button>
          </div>
        </div>
      </section>

      {/* Mock Profile Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Your Profile Could Look Like</h2>
            <p className="text-muted-foreground">Here's a preview of the amazing features waiting for you</p>
          </div>

          <Card className="p-8 shadow-xl border-primary/10 relative overflow-hidden">
            {/* Overlay to show it's a preview */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <User className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                <h3 className="text-2xl font-bold mb-2">Your Profile Awaits</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Sign up to unlock your personalized player profile with all these amazing features
                </p>
                <Button 
                  size="lg" 
                  className="rounded-full"
                  onClick={() => navigate('/signup')}
                >
                  Get Started Now
                </Button>
              </div>
            </div>

            {/* Mock Profile Content (blurred) */}
            <div className="opacity-30">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold">
                  JS
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">John Student</h3>
                  <p className="text-muted-foreground mb-2">john.student@tum.de</p>
                  <div className="flex gap-2">
                    <Badge>ELO: 1,650</Badge>
                    <Badge variant="secondary">Rank: #45</Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">68%</div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">142</div>
                  <div className="text-sm text-muted-foreground">Matches</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">Tournaments</div>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Trophies</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Profile Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to track your table tennis journey and connect with the community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 group border-primary/10">
                <CardContent className="p-0">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Premium Features */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-primary text-primary-foreground">
                <Crown className="mr-1 h-3 w-3" />
                Premium Features
              </Badge>
              <h3 className="text-2xl font-bold mb-2">Unlock Even More</h3>
              <p className="text-muted-foreground">
                Upgrade to Premium for advanced features and exclusive access
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="rounded-full bg-primary/20 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Join Our Growing Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-primary/10">
                <CardContent className="p-0">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of TU München students and staff who are already 
              tracking their table tennis journey with KickerTUM.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="rounded-full"
                onClick={() => navigate('/signup')}
              >
                <User className="mr-2 h-4 w-4" />
                Create Your Profile
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotLoggedInProfilePage;