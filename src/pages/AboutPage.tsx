import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Trophy, 
  Heart, 
  MapPin, 
  Calendar,
  Star,
  Shield,
  Zap
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: "Active Players", value: "2,500+", icon: Users },
    { label: "Matches Played", value: "15,000+", icon: Target },
    { label: "Tournaments Hosted", value: "150+", icon: Trophy },
    { label: "Years Running", value: "5+", icon: Calendar }
  ];

  const features = [
    {
      icon: Users,
      title: "Connect with Players",
      description: "Find and connect with table tennis enthusiasts across TU München campus"
    },
    {
      icon: Trophy,
      title: "Competitive Tournaments",
      description: "Participate in regular tournaments and climb the leaderboard"
    },
    {
      icon: MapPin,
      title: "Campus-Wide Tables",
      description: "Book and play at various table tennis locations across the university"
    },
    {
      icon: Star,
      title: "Skill Tracking",
      description: "Track your progress with our advanced ELO rating system"
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Play in a secure, university-verified community"
    },
    {
      icon: Zap,
      title: "Real-time Matches",
      description: "Find and join matches instantly with our live matching system"
    }
  ];

  const team = [
    {
      name: "Max Mueller",
      role: "Founder & Lead Developer",
      description: "Computer Science student with a passion for table tennis and community building",
      avatar: "MM"
    },
    {
      name: "Sarah Schmidt",
      role: "Community Manager",
      description: "Sports science student and tournament organizer",
      avatar: "SS"
    },
    {
      name: "Alex Weber",
      role: "UI/UX Designer",
      description: "Design student focused on creating intuitive user experiences",
      avatar: "AW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            Est. 2019 • TU München
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            About KickerTUM
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            The premier table tennis community platform for Technical University of Munich students, 
            faculty, and staff. Connect, compete, and celebrate the sport we all love.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="rounded-full">
              Join Our Community
            </Button>
            <Button variant="outline" size="lg" className="rounded-full">
              <Heart className="mr-2 h-4 w-4" />
              Support Us
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
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

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              To create the most vibrant and inclusive table tennis community at TU München, 
              where students and staff can connect, improve their skills, and enjoy the 
              competitive spirit of this amazing sport. We believe in building lasting 
              friendships through shared passion and healthy competition.
            </p>
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-primary">Why KickerTUM?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Born from the need to better organize table tennis activities at our university, 
                KickerTUM has evolved into a comprehensive platform that not only facilitates 
                matches and tournaments but also builds a genuine community of players who 
                support and challenge each other to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 group border-primary/10">
                <CardContent className="p-0">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-4">{member.role}</Badge>
                  <p className="text-muted-foreground leading-relaxed">{member.description}</p>
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
            <h2 className="text-4xl font-bold mb-6">Ready to Join?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Become part of TU München's most active table tennis community. 
              Whether you're a beginner or a seasoned player, there's a place for you here.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full">
                Sign Up Today
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;