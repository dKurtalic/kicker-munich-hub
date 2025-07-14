import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scale, Shield, Users, Clock } from "lucide-react";

const TermsOfServicePage = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: Scale,
      content: `By accessing and using KickerTUM, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: "description",
      title: "2. Service Description",
      icon: Users,
      content: `KickerTUM is a platform designed for kicker (foosball) enthusiasts in Munich to track matches, organize tournaments, find tables, and connect with other players. We provide digital tools to enhance your kicker experience.`
    },
    {
      id: "accounts",
      title: "3. User Accounts",
      icon: Shield,
      content: `You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.`
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use",
      content: `You agree not to use KickerTUM for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services. This includes but is not limited to:
      
• Harassing other users
• Uploading malicious content
• Attempting to gain unauthorized access
• Violating any applicable laws or regulations`
    },
    {
      id: "content",
      title: "5. User Content",
      content: `You retain ownership of any content you submit to KickerTUM. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with our service.`
    },
    {
      id: "privacy",
      title: "6. Privacy",
      content: `Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your information.`
    },
    {
      id: "termination",
      title: "7. Termination",
      content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.`
    },
    {
      id: "disclaimers",
      title: "8. Disclaimers",
      content: `The information on this platform is provided on an "as is" basis. To the fullest extent permitted by law, we exclude all representations, warranties, and conditions relating to our service and the use of this platform.`
    },
    {
      id: "limitation",
      title: "9. Limitation of Liability",
      content: `In no event shall KickerTUM, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the service.`
    },
    {
      id: "changes",
      title: "10. Changes to Terms",
      content: `We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using KickerTUM.
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
            <CardTitle className="text-2xl">Legal Agreement</CardTitle>
            <CardDescription className="text-base">
              By using our service, you agree to these terms and conditions.
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

        {/* Footer */}
        <div className="text-center mt-12 p-6 rounded-xl bg-muted/50">
          <p className="text-sm text-muted-foreground">
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:legal@kickertum.com" className="text-primary hover:underline font-medium">
              legal@kickertum.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;