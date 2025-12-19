import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, ArrowLeft, Shuffle, Eye, Heart, Star } from "lucide-react";

const tarotCards = [
  { name: "The Fool", meaning: "New beginnings, innocence, spontaneity" },
  { name: "The Magician", meaning: "Manifestation, resourcefulness, power" },
  { name: "The High Priestess", meaning: "Intuition, sacred knowledge, divine feminine" },
  { name: "The Empress", meaning: "Femininity, beauty, nature, abundance" },
  { name: "The Emperor", meaning: "Authority, structure, control" },
  { name: "The Hierophant", meaning: "Spiritual wisdom, religious beliefs, tradition" },
  { name: "The Lovers", meaning: "Love, harmony, relationships, values alignment" },
  { name: "The Chariot", meaning: "Control, willpower, success, determination" },
  { name: "Strength", meaning: "Inner strength, courage, patience, control" },
  { name: "The Hermit", meaning: "Soul searching, introspection, inner guidance" },
  { name: "Wheel of Fortune", meaning: "Good luck, karma, life cycles, destiny" },
  { name: "Justice", meaning: "Fairness, truth, law, cause and effect" },
  { name: "The Hanged Man", meaning: "Suspension, surrender, letting go, new perspectives" },
  { name: "Death", meaning: "Endings, change, transformation, transition" },
  { name: "Temperance", meaning: "Balance, moderation, patience, purpose" },
  { name: "The Devil", meaning: "Bondage, addiction, materialism, sexuality" },
  { name: "The Tower", meaning: "Sudden change, upheaval, chaos, revelation" },
  { name: "The Star", meaning: "Hope, faith, rejuvenation, inspiration" },
  { name: "The Moon", meaning: "Illusion, fear, anxiety, subconscious" },
  { name: "The Sun", meaning: "Joy, success, celebration, positivity" },
  { name: "Judgement", meaning: "Judgement, rebirth, inner calling, absolution" },
  { name: "The World", meaning: "Completion, integration, accomplishment, travel" }
];

export default function DailyReading() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCard, setSelectedCard] = useState<typeof tarotCards[0] | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Sign In Required</h1>
          <p className="text-muted-foreground">Please sign in to access your daily reading</p>
          <Link href="/">
            <Button className="btn-mystical">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shuffleCards = () => {
    setIsShuffling(true);
    setCardRevealed(false);
    setSelectedCard(null);
    
    // Simulate shuffling animation
    setTimeout(() => {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
      setSelectedCard(randomCard);
      setIsShuffling(false);
    }, 2000);
  };

  const revealCard = () => {
    setCardRevealed(true);
    toast.success("Your daily card has been revealed!");
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
          <h1 className="text-2xl font-bold text-gradient">Daily Card Reading</h1>
          <Link href="/spreads">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              All Spreads →
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        {/* Introduction */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-gradient">Your Daily Guidance</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Draw a single card to receive guidance and insight for your day ahead
          </p>
        </div>

        {/* Card Drawing Area */}
        <div className="max-w-2xl mx-auto">
          {!selectedCard && !isShuffling && (
            <div className="card-mystical p-12 text-center space-y-8">
              <div className="space-y-4">
                <Sparkles className="h-16 w-16 text-primary mx-auto glow-gold" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready for Your Daily Insight?</h3>
                  <p className="text-muted-foreground">
                    Focus on your question or intention for today, then draw your card
                  </p>
                </div>
              </div>
              
              <Button 
                className="btn-mystical px-8 py-4 text-lg"
                onClick={shuffleCards}
              >
                <Shuffle className="h-5 w-5 mr-2" />
                Draw Your Card
              </Button>
            </div>
          )}

          {isShuffling && (
            <div className="card-mystical p-12 text-center space-y-8">
              <div className="space-y-4">
                <Shuffle className="h-16 w-16 text-primary mx-auto animate-spin" />
                <div>
                  <h3 className="text-xl font-bold">Shuffling the Deck...</h3>
                  <p className="text-muted-foreground">
                    The cards are aligning with your energy
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedCard && !cardRevealed && (
            <div className="card-mystical p-12 text-center space-y-8">
              <div className="space-y-4">
                <div className="h-32 w-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl flex items-center justify-center">
                  <Eye className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Your Card Has Been Chosen</h3>
                  <p className="text-muted-foreground">
                    Are you ready to reveal what the universe has in store for you today?
                  </p>
                </div>
              </div>
              
              <Button 
                className="btn-mystical px-8 py-4 text-lg"
                onClick={revealCard}
              >
                <Eye className="h-5 w-5 mr-2" />
                Reveal Card
              </Button>
            </div>
          )}

          {selectedCard && cardRevealed && (
            <div className="space-y-8">
              {/* Revealed Card */}
              <div className="card-mystical p-8 text-center space-y-6">
                <div className="space-y-4">
                  <div className="h-40 w-28 mx-auto bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl flex items-center justify-center">
                    <Star className="h-16 w-16 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gradient mb-2">{selectedCard.name}</h3>
                    <p className="text-lg text-muted-foreground italic">{selectedCard.meaning}</p>
                  </div>
                </div>
              </div>

              {/* Daily Interpretation */}
              <div className="card-mystical p-8 space-y-6">
                <h4 className="text-xl font-bold text-center text-gradient">Today's Message</h4>
                <div className="space-y-4 text-center">
                  <p className="text-muted-foreground">
                    {selectedCard.name === "The Star" && "Today brings hope and inspiration. Trust in your inner light and let it guide you toward your dreams. The universe is supporting your journey."}
                    {selectedCard.name === "The Magician" && "You have all the tools you need today to manifest your desires. Focus your intention and take decisive action. Your power is in your hands."}
                    {selectedCard.name === "The Fool" && "New beginnings are on the horizon. Embrace adventure and take that leap of faith. The universe rewards the courageous."}
                    {selectedCard.name === "The Lovers" && "Harmony and connection are highlighted today. Focus on relationships that align with your values. Love is in the air."}
                    {selectedCard.name === "The Chariot" && "Success through determination is yours today. Stay focused on your goals and let nothing distract you from your path to victory."}
                    {selectedCard.name === "Strength" && "Your inner power shines today. Face challenges with courage and compassion. True strength comes from within."}
                    {selectedCard.name === "The Sun" && "Joy and success illuminate your path today. Celebrate your achievements and share your light with others. Positivity attracts more positivity."}
                    {selectedCard.name === "The Moon" && "Trust your intuition today. Not everything is as it seems. Look beneath the surface for deeper truths."}
                    {selectedCard.name === "The Tower" && "Unexpected changes may occur today. Embrace transformation as opportunity. Sometimes we must rebuild stronger foundations."}
                    {selectedCard.name === "Death" && "Endings lead to new beginnings. Release what no longer serves you to make space for transformation and growth."}
                    {!["The Star", "The Magician", "The Fool", "The Lovers", "The Chariot", "Strength", "The Sun", "The Moon", "The Tower", "Death"].includes(selectedCard.name) && 
                      "Today's energy invites you to reflect on the deeper meaning of this card in your life. Take time to meditate on its message and how it applies to your current situation."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="btn-mystical"
                  onClick={shuffleCards}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Draw Another Card
                </Button>
                <Link href="/spreads">
                  <Button variant="outline">
                    Try a Different Spread
                  </Button>
                </Link>
              </div>

              {/* Save to Journal */}
              <div className="card-mystical p-6 text-center space-y-4">
                <h4 className="font-bold">Save This Reading</h4>
                <p className="text-sm text-muted-foreground">
                  Keep this card in your journal to track patterns and insights over time
                </p>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Journal
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-16">
          <div className="text-center space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-gradient">Daily Reading Tips</h3>
            <p className="text-muted-foreground">Make the most of your daily card practice</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-mystical p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-bold">Set Your Intention</h4>
              <p className="text-sm text-muted-foreground">
                Before drawing, take a moment to focus on what guidance you seek for the day
              </p>
            </div>
            <div className="card-mystical p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Eye className="h-6 w-6 text-secondary" />
              </div>
              <h4 className="font-bold">Reflect & Apply</h4>
              <p className="text-sm text-muted-foreground">
                Consider how the card's message applies to your current situations and decisions
              </p>
            </div>
            <div className="card-mystical p-6 space-y-3">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-bold">Track Patterns</h4>
              <p className="text-sm text-muted-foreground">
                Notice recurring cards or themes to understand your spiritual journey
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
