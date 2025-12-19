import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { Sparkles, Wand2, BookOpen, Heart } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen gradient-dark">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient">Tarot Reading</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Pricing
              </Button>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="btn-mystical">Sign In</Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-gradient">
                Discover Your Destiny
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore personalized tarot readings powered by ancient wisdom and modern AI. 
                Gain insights into your past, present, and future.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/reading/daily">
                    <Button className="btn-mystical w-full sm:w-auto">
                      Get Your Daily Card
                    </Button>
                  </Link>
                  <Link href="/spreads">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Explore Spreads
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <a href={getLoginUrl()}>
                    <Button className="btn-mystical w-full sm:w-auto">
                      Start Reading
                    </Button>
                  </a>
                  <a href={getLoginUrl()}>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="card-mystical p-8 md:p-12 flex items-center justify-center min-h-96">
            <div className="text-center space-y-4">
              <Wand2 className="h-24 w-24 text-secondary mx-auto glow-gold" />
              <p className="text-muted-foreground">
                36 mystical cards await your discovery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-card/30 py-20">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gradient">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of tarot readings enhanced with AI-powered interpretations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="card-mystical p-8 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Choose Your Spread</h3>
              <p className="text-muted-foreground">
                Select from 6 different tarot spreads, from daily cards to comprehensive Celtic Cross readings.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-mystical p-8 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Wand2 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Draw Your Cards</h3>
              <p className="text-muted-foreground">
                Experience animated card shuffling and drawing with the option to reverse cards for deeper meanings.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-mystical p-8 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Get AI Insights</h3>
              <p className="text-muted-foreground">
                Receive personalized interpretations based on your question, card positions, and reading history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spreads Preview Section */}
      <section className="container py-20">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-gradient">Available Spreads</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each spread offers unique insights into different aspects of your life
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Daily Card", description: "Single card for daily guidance" },
              { name: "Three Card", description: "Past, Present, Future spread" },
              { name: "Love Reading", description: "5-card relationship spread" },
              { name: "Career Reading", description: "4-card professional guidance" },
              { name: "Celtic Cross", description: "10-card comprehensive reading" },
              { name: "Custom Spread", description: "Create your own layout" },
            ].map((spread) => (
              <div key={spread.name} className="card-mystical p-6 space-y-3">
                <h3 className="text-lg font-bold">{spread.name}</h3>
                <p className="text-sm text-muted-foreground">{spread.description}</p>
                {isAuthenticated && (
                  <Link href={`/spreads/${spread.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-secondary">
                      Try Now →
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/30 py-20">
        <div className="container text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gradient">Ready to Explore Your Path?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users discovering insights through the ancient art of tarot reading.
            </p>
          </div>

          {!isAuthenticated && (
            <a href={getLoginUrl()}>
              <Button className="btn-mystical px-8 py-6 text-lg">
                Begin Your Journey
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 Tarot Reading App. Powered by mystical wisdom and modern AI.</p>
        </div>
      </footer>
    </div>
  );
}
