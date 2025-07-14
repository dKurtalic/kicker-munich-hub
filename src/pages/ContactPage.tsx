import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Users, 
  HelpCircle,
  Bug,
  Lightbulb,
  Heart
} from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "kickertum@tum.de",
      description: "We typically respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Student Support",
      details: "+49 89 289 22000",
      description: "Available during university hours"
    },
    {
      icon: MapPin,
      title: "Find Us",
      details: "TU München Campus",
      description: "Various table tennis locations across campus"
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: "Mon-Fri 9:00-17:00",
      description: "Extended hours during tournaments"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Question', icon: MessageSquare },
    { value: 'support', label: 'Technical Support', icon: HelpCircle },
    { value: 'bug', label: 'Report a Bug', icon: Bug },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb },
    { value: 'tournament', label: 'Tournament Info', icon: Users },
    { value: 'other', label: 'Other', icon: Heart }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      type: 'general'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            We're Here to Help
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Have a question, suggestion, or just want to say hello? 
            We'd love to hear from you. Our team is always ready to help make your KickerTUM experience better.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 group border-primary/10">
                <CardContent className="p-0">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                  <p className="text-primary font-medium mb-1">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <Card className="p-8 shadow-xl border-primary/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type Selection */}
              <div>
                <label className="text-sm font-medium mb-3 block">What can we help you with?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleInputChange('type', type.value)}
                      className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                        formData.type === type.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name and Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@tum.de"
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium mb-2 block">Subject *</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Brief description of your inquiry"
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium mb-2 block">Message *</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Please provide as much detail as possible..."
                  rows={6}
                  required
                  className="border-primary/20 focus:border-primary resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="flex-1 rounded-full"
                  disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg"
                  className="rounded-full"
                  onClick={() => setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    type: 'general'
                  })}
                >
                  Clear
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="grid gap-6">
            {[
              {
                q: "How do I join KickerTUM?",
                a: "Simply create an account using your TUM email address. All TU München students, faculty, and staff are welcome to join our community."
              },
              {
                q: "Is there a fee to use KickerTUM?",
                a: "KickerTUM is free to use! We also offer a Premium subscription with additional features like unlimited tournament entries and advanced statistics."
              },
              {
                q: "How do I book a table?",
                a: "Navigate to the Tables page, select your preferred location and time slot, then confirm your booking. Premium members get priority access."
              },
              {
                q: "Can I organize my own tournament?",
                a: "Yes! Any member can create and organize tournaments. Use our tournament creation tool to set up your event and invite other players."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6 border-primary/10">
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <Button variant="outline" size="lg" className="rounded-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start a Conversation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;