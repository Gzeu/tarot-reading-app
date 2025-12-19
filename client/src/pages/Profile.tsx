import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { User, Mail, Calendar, Star, Settings, LogOut, Sparkles } from "lucide-react";

export default function Profile() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Sign In Required</h1>
          <p className="text-muted-foreground">Please sign in to access your profile</p>
          <Link href="/">
            <Button className="btn-mystical">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              ← Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gradient">Profile</h1>
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Home →
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        {/* Profile Header */}
        <div className="card-mystical p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gradient mb-2">
                {user?.email?.split('@')[0] || 'Mystic Seeker'}
              </h2>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-destructive hover:text-destructive"
              onClick={handleSignOut}
              disabled={loading}
            >
              <LogOut className="h-4 w-4" />
              {loading ? "Signing Out..." : "Sign Out"}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="card-mystical p-6 space-y-4 text-center">
            <Star className="h-8 w-8 text-primary mx-auto" />
            <div className="text-2xl font-bold text-gradient">12</div>
            <div>
              <h4 className="font-bold">Total Readings</h4>
              <p className="text-sm text-muted-foreground">All time</p>
            </div>
          </div>

          <div className="card-mystical p-6 space-y-4 text-center">
            <Sparkles className="h-8 w-8 text-secondary mx-auto" />
            <div className="text-2xl font-bold text-gradient">7</div>
            <div>
              <h4 className="font-bold">Day Streak</h4>
              <p className="text-sm text-muted-foreground">Current</p>
            </div>
          </div>

          <div className="card-mystical p-6 space-y-4 text-center">
            <Calendar className="h-8 w-8 text-accent mx-auto" />
            <div className="text-2xl font-bold text-gradient">3</div>
            <div>
              <h4 className="font-bold">This Month</h4>
              <p className="text-sm text-muted-foreground">Readings</p>
            </div>
          </div>

          <div className="card-mystical p-6 space-y-4 text-center">
            <User className="h-8 w-8 text-primary mx-auto" />
            <div className="text-2xl font-bold text-gradient">Free</div>
            <div>
              <h4 className="font-bold">Plan</h4>
              <p className="text-sm text-muted-foreground">Current tier</p>
            </div>
          </div>
        </div>

        {/* Reading History */}
        <div className="space-y-6 mb-12">
          <h3 className="text-xl font-bold">Reading History</h3>
          <div className="grid gap-4">
            {[
              {
                type: "Daily Card",
                date: "Today, 10:30 AM",
                card: "The Star",
                question: "What energy should I focus on today?",
                insight: "Hope and inspiration guide your path forward"
              },
              {
                type: "Three Card",
                date: "Yesterday, 8:15 PM",
                cards: "The Magician, The Tower, The Sun",
                question: "What do I need to know about my career path?",
                insight: "Transformation leads to new beginnings"
              },
              {
                type: "Love Reading",
                date: "Dec 15, 2024, 6:45 PM",
                cards: "Two of Cups, The Lovers, Ten of Pentacles",
                question: "How can I improve my relationship?",
                insight: "Deep emotional connections bring stability"
              },
              {
                type: "Celtic Cross",
                date: "Dec 12, 2024, 3:20 PM",
                cards: "The Fool, The Hermit, Justice, Death, Temperance, The Devil, The Star, The Moon, The Sun, The World",
                question: "What does the next year hold for me?",
                insight: "A complete journey of transformation and fulfillment awaits"
              }
            ].map((reading, index) => (
              <div key={index} className="card-mystical p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{reading.type}</h4>
                    <p className="text-sm text-muted-foreground">{reading.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details →
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Question:</p>
                    <p className="text-muted-foreground italic">{reading.question}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {reading.type === "Daily Card" ? "Card" : "Cards"}:
                    </p>
                    <p className="text-sm text-muted-foreground">{reading.cards || reading.card}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Insight:</p>
                    <p className="text-muted-foreground">{reading.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Preferences</h3>
          <div className="card-mystical p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Daily reading reminders</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">Reading Focus</h4>
                <p className="text-sm text-muted-foreground">Default areas of interest</p>
              </div>
              <Button variant="outline" size="sm">Set Focus</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold">Card Deck Theme</h4>
                <p className="text-sm text-muted-foreground">Visual appearance of cards</p>
              </div>
              <Button variant="outline" size="sm">Customize</Button>
            </div>
          </div>
        </div>

        {/* Upgrade Section */}
        <div className="mt-12">
          <div className="card-mystical p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Upgrade Your Experience</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get unlimited readings, premium spreads, and personalized AI insights
            </p>
            <Link href="/pricing">
              <Button className="btn-gold">View Premium Plans</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
