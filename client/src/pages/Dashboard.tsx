import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, BookOpen, Heart, TrendingUp, Calendar, Star } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Sign In Required</h1>
          <p className="text-muted-foreground">Please sign in to access your dashboard</p>
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
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              ← Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gradient">Dashboard</h1>
          <Link href="/profile">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Profile →
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-2">
            Welcome back, {user?.email?.split('@')[0] || 'Mystic Seeker'}!
          </h2>
          <p className="text-muted-foreground">
            Continue your journey of self-discovery with personalized tarot insights
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/reading/daily">
              <Button className="btn-mystical w-full h-20 flex-col">
                <Sparkles className="h-6 w-6 mb-2" />
                Daily Card
              </Button>
            </Link>
            <Link href="/spreads">
              <Button variant="outline" className="w-full h-20 flex-col">
                <BookOpen className="h-6 w-6 mb-2" />
                All Spreads
              </Button>
            </Link>
            <Link href="/spreads/love-reading">
              <Button variant="outline" className="w-full h-20 flex-col">
                <Heart className="h-6 w-6 mb-2" />
                Love Reading
              </Button>
            </Link>
            <Link href="/spreads/career-reading">
              <Button variant="outline" className="w-full h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                Career Path
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="card-mystical p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Star className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">12</span>
            </div>
            <div>
              <h4 className="font-bold">Total Readings</h4>
              <p className="text-sm text-muted-foreground">Lifetime insights</p>
            </div>
          </div>

          <div className="card-mystical p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Calendar className="h-8 w-8 text-secondary" />
              <span className="text-2xl font-bold text-gradient">7</span>
            </div>
            <div>
              <h4 className="font-bold">Day Streak</h4>
              <p className="text-sm text-muted-foreground">Keep it going!</p>
            </div>
          </div>

          <div className="card-mystical p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Sparkles className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-gradient">3</span>
            </div>
            <div>
              <h4 className="font-bold">Free Readings</h4>
              <p className="text-sm text-muted-foreground">Remaining this month</p>
            </div>
          </div>

          <div className="card-mystical p-6 space-y-4">
            <div className="flex items-center justify-between">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gradient">6</span>
            </div>
            <div>
              <h4 className="font-bold">Spreads Tried</h4>
              <p className="text-sm text-muted-foreground">Out of 6 available</p>
            </div>
          </div>
        </div>

        {/* Recent Readings */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Recent Readings</h3>
          <div className="grid gap-4">
            {[
              {
                type: "Daily Card",
                date: "Today",
                card: "The Star",
                insight: "Hope and inspiration guide your path forward"
              },
              {
                type: "Three Card",
                date: "Yesterday",
                cards: "The Magician, The Tower, The Sun",
                insight: "Transformation leads to new beginnings"
              },
              {
                type: "Love Reading",
                date: "2 days ago",
                cards: "Two of Cups, The Lovers, Ten of Pentacles",
                insight: "Deep emotional connections bring stability"
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
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    {reading.type === "Daily Card" ? "Card" : "Cards"}: {reading.cards || reading.card}
                  </p>
                  <p className="text-muted-foreground">{reading.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12">
          <div className="card-mystical p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Unlock Unlimited Insights</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upgrade to Premium for unlimited readings, advanced spreads, and personalized AI interpretations
            </p>
            <Link href="/pricing">
              <Button className="btn-gold">Upgrade to Premium</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
