import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Sparkles, Heart, TrendingUp, BookOpen, Star, Users, Target } from "lucide-react";

const spreads = [
  {
    id: "daily-card",
    name: "Daily Card",
    description: "Draw a single card for daily guidance and insight",
    icon: Sparkles,
    cards: 1,
    difficulty: "Beginner",
    time: "5 minutes",
    category: "General",
    path: "/reading/daily"
  },
  {
    id: "three-card",
    name: "Three Card Spread",
    description: "Past, Present, Future - understand your journey through time",
    icon: BookOpen,
    cards: 3,
    difficulty: "Beginner",
    time: "10 minutes",
    category: "General",
    path: "/spreads/three-card"
  },
  {
    id: "love-reading",
    name: "Love Reading",
    description: "5-card spread focused on relationships and matters of the heart",
    icon: Heart,
    cards: 5,
    difficulty: "Intermediate",
    time: "15 minutes",
    category: "Relationships",
    path: "/spreads/love-reading"
  },
  {
    id: "career-reading",
    name: "Career Reading",
    description: "4-card spread for professional guidance and career decisions",
    icon: TrendingUp,
    cards: 4,
    difficulty: "Intermediate",
    time: "12 minutes",
    category: "Career",
    path: "/spreads/career-reading"
  },
  {
    id: "celtic-cross",
    name: "Celtic Cross",
    description: "Comprehensive 10-card reading for deep life analysis",
    icon: Star,
    cards: 10,
    difficulty: "Advanced",
    time: "30 minutes",
    category: "General",
    path: "/spreads/celtic-cross"
  },
  {
    id: "relationship-spread",
    name: "Relationship Spread",
    description: "Understand dynamics between two people",
    icon: Users,
    cards: 7,
    difficulty: "Intermediate",
    time: "20 minutes",
    category: "Relationships",
    path: "/spreads/relationship-spread"
  },
  {
    id: "decision-making",
    name: "Decision Making",
    description: "Clarity when facing important choices",
    icon: Target,
    cards: 6,
    difficulty: "Intermediate",
    time: "18 minutes",
    category: "General",
    path: "/spreads/decision-making"
  },
  {
    id: "custom-spread",
    name: "Custom Spread",
    description: "Create your own personalized tarot layout",
    icon: Sparkles,
    cards: "Variable",
    difficulty: "All Levels",
    time: "Custom",
    category: "Custom",
    path: "/spreads/custom"
  }
];

export default function Spreads() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Sign In Required</h1>
          <p className="text-muted-foreground">Please sign in to access tarot spreads</p>
          <Link href="/">
            <Button className="btn-mystical">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-500";
      case "Intermediate": return "text-yellow-500";
      case "Advanced": return "text-red-500";
      default: return "text-primary";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "General": return "bg-primary/20 text-primary";
      case "Relationships": return "bg-pink-500/20 text-pink-500";
      case "Career": return "bg-blue-500/20 text-blue-500";
      case "Custom": return "bg-purple-500/20 text-purple-500";
      default: return "bg-accent/20 text-accent";
    }
  };

  return (
    <div className="min-h-screen gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gradient">Tarot Spreads</h1>
          <Link href="/reading/daily">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Daily Card →
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        {/* Introduction */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gradient">Choose Your Spread</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each tarot spread offers unique insights into different aspects of your life. 
            Select the one that best matches your current question or situation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["All", "General", "Relationships", "Career", "Custom"].map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className={category === "All" ? "btn-mystical" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Spreads Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spreads.map((spread) => {
            const Icon = spread.icon;
            return (
              <div key={spread.id} className="card-mystical p-6 space-y-4 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs font-bold ${getDifficultyColor(spread.difficulty)}`}>
                      {spread.difficulty}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(spread.category)}`}>
                      {spread.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold">{spread.name}</h3>
                  <p className="text-muted-foreground text-sm">{spread.description}</p>
                  
                  {/* Details */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{spread.cards} cards</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{spread.time}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={spread.path}>
                  <Button className="btn-mystical w-full">
                    Start Reading
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Quick Start Section */}
        <div className="mt-16">
          <div className="card-mystical p-8 text-center space-y-6">
            <h3 className="text-2xl font-bold text-gradient">Not Sure Where to Start?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you're new to tarot readings, we recommend starting with the Daily Card or Three Card Spread 
              to get familiar with the process before trying more complex layouts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reading/daily">
                <Button className="btn-mystical">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Try Daily Card
                </Button>
              </Link>
              <Link href="/spreads/three-card">
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Try Three Card
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16">
          <div className="text-center space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-gradient">Reading Tips</h3>
            <p className="text-muted-foreground">Get the most out of your tarot experience</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-mystical p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold">Clear Your Mind</h4>
              <p className="text-sm text-muted-foreground">
                Take a few deep breaths and clear your thoughts before starting the reading
              </p>
            </div>
            <div className="card-mystical p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-bold">Focus Your Question</h4>
              <p className="text-sm text-muted-foreground">
                Have a clear question or intention in mind for the most accurate guidance
              </p>
            </div>
            <div className="card-mystical p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-bold">Trust Your Intuition</h4>
              <p className="text-sm text-muted-foreground">
                Pay attention to your initial feelings and impressions of the cards
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
