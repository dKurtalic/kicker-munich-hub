import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Eye, Lock, Database, Mail, Clock } from "lucide-react";

const PrivacyPolicyPage = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: Shield,
      content: `Welcome to KickerTUM. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data and tell you about your privacy rights.`
    },
    {
      id: "data-collection",
      title: "2. Information We Collect",
      icon: Database,
      content: `We collect information you provide directly to us, such as:

• Account information (name, email, profile picture)
• Match results and tournament participation
• Communication preferences
• Location data for table finding features
• Usage data and analytics to improve our service`
    },
    {
      id: "data-use",
      title: "3. How We Use Your Information",
      icon: Eye,
      content: `We use the information we collect to:

• Provide and maintain our service
• Track your kicker matches and statistics
• Organize tournaments and competitions
• Send you service-related communications
• Improve our platform and user experience
• Comply with legal obligations`
    },
    {
      id: "data-sharing",
      title: "4. Information Sharing",
      content: `We do not sell, trade, or otherwise transfer your personal information to third parties except:

• With your explicit consent
• To service providers who assist us in operating our platform
• When required by law or to protect our rights
• In connection with a business transfer or acquisition

Your match results and tournament participation may be visible to other users as part of the social features of our platform.`
    },
    {
      id: "data-security",
      title: "5. Data Security",
      icon: Lock,
      content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.`
    },
    {
      id: "data-retention",
      title: "6. Data Retention",
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you delete your account, we will delete or anonymize your personal data, except where we are required to retain it by law.`
    },
    {
      id: "your-rights",
      title: "7. Your Rights",
      content: `Under applicable data protection laws, you have the right to:

• Access your personal data
• Correct inaccurate personal data
• Delete your personal data
• Object to processing of your personal data
• Data portability
• Withdraw consent where applicable

To exercise these rights, please contact us using the information provided below.`
    },
    {
      id: "cookies",
      title: "8. Cookies and Tracking",
      content: `We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences. Some features of our service may not function properly if cookies are disabled.`
    },
    {
      id: "third-party",
      title: "9. Third-Party Services",
      content: `Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.`
    },
    {
      id: "children",
      title: "10. Children's Privacy",
      content: `Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us immediately.`
    },
    {
      id: "changes",
      title: "11. Changes to This Policy",
      content: `We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "last updated" date. Your continued use of our service after any changes constitutes acceptance of the updated policy.`
    },
    {
      id: "contact",
      title: "12. Contact Information",
      icon: Mail,
      content: `If you have any questions about this privacy policy or our privacy practices, please contact us at:

Email: privacy@kickertum.com
Address: Munich, Germany

We will respond to your inquiry within 30 days.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Badge variant="secondary" className="text-sm">
              Last updated: {lastUpdated}
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-xl border-0 bg-card/50 backdrop-blur">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Data Protection & Privacy</CardTitle>
            <CardDescription className="text-base">
              How we handle your personal information and respect your privacy rights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-8 pr-4">
                {sections.map((section, index) => (
                  <div key={section.id} className="group">
                    <div className="flex items-start gap-4">
                      {section.icon && (
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-primary/20 transition-colors">
                          <section.icon className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {section.title}
                        </h3>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    </div>
                    {index < sections.length - 1 && (
                      <Separator className="mt-8 opacity-50" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Data Protection Summary */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Secure Storage</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and stored securely</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Transparent Use</h3>
              <p className="text-sm text-muted-foreground">We clearly explain how we use your information</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <Lock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Your Control</h3>
              <p className="text-sm text-muted-foreground">You have full control over your personal data</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;