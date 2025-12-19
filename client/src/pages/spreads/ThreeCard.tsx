import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Shuffle, Eye, BookOpen, Clock, ArrowRight } from "lucide-react";

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

export default function ThreeCardSpread() {
  const { user, isAuthenticated } = useAuth();
  const [cards, setCards] = useState<typeof tarotCards[0][]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [question, setQuestion] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-dark flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient">Sign In Required</h1>
          <p className="text-muted-foreground">Please sign in to access this spread</p>
          <Link href="/">
            <Button className="btn-mystical">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shuffleCards = () => {
    if (!question.trim()) {
      toast.error("Please enter your question first");
      return;
    }

    setIsShuffling(true);
    setCardsRevealed(false);
    setCards([]);
    
    // Simulate shuffling animation
    setTimeout(() => {
      const shuffled = [...tarotCards].sort(() => Math.random() - 0.5).slice(0, 3);
      setCards(shuffled);
      setIsShuffling(false);
    }, 3000);
  };

  const revealCards = () => {
    setCardsRevealed(true);
    toast.success("Your cards have been revealed!");
  };

  const getCardInterpretation = (card: typeof tarotCards[0], position: string) => {
    const interpretations: Record<string, Record<string, string>> = {
      "The Fool": {
        past: "You began this journey with innocence and openness to new experiences",
        present: "You're at a starting point, ready for new adventures and opportunities",
        future: "A new beginning awaits. Be open to unexpected opportunities"
      },
      "The Magician": {
        past: "You had all the tools needed to manifest your desires",
        present: "You currently possess the power and resources to achieve your goals",
        future: "Success through manifestation and focused intention is coming"
      },
      "The Star": {
        past: "Hope has guided you through difficult times",
        present: "Inspiration and renewal are currently available to you",
        future: "Bright hope and healing energy will illuminate your path"
      }
    };

    return interpretations[card.name]?.[position] || 
      `The ${card.name} in the ${position} position suggests ${card.meaning.toLowerCase()}`;
  };

  return (
    <div className="min-h-screen gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/spreads">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Spreads
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gradient">Three Card Spread</h1>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Dashboard →
            </Button>
          </Link>
        </div>
      </header>

      <main className="container py-8">
        {/* Introduction */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-gradient">Past, Present, Future</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This classic three-card spread provides insight into how your past influences your present situation 
            and what the future may hold based on current energies.
          </p>
        </div>

        {/* Question Input */}
        {!cards.length && !isShuffling && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="card-mystical p-8 space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">What guidance do you seek?</h3>
                <p className="text-muted-foreground">
                  Focus on a specific question or area of your life you'd like insight into
                </p>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What would you like to know about your situation?"
                  className="w-full h-32 p-4 bg-card/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                
                <Button 
                  className="btn-mystical w-full"
                  onClick={shuffleCards}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Draw Three Cards
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Shuffling Animation */}
        {isShuffling && (
          <div className="max-w-2xl mx-auto">
            <div className="card-mystical p-12 text-center space-y-8">
              <div className="space-y-4">
                <Shuffle className="h-16 w-16 text-primary mx-auto animate-spin" />
                <div>
                  <h3 className="text-xl font-bold">Drawing Your Cards...</h3>
                  <p className="text-muted-foreground">
                    The universe is aligning with your question: "{question}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards Drawn but Not Revealed */}
        {cards.length > 0 && !cardsRevealed && (
          <div className="max-w-4xl mx-auto">
            <div className="card-mystical p-8 space-y-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Your Cards Are Ready</h3>
                <p className="text-muted-foreground">
                  Three cards have been selected to answer your question
                </p>
              </div>
              
              {/* Hidden Cards Layout */}
              <div className="flex justify-center gap-4">
                {["Past", "Present", "Future"].map((position, index) => (
                  <div key={position} className="space-y-2">
                    <h4 className="text-center font-bold text-muted-foreground">{position}</h4>
                    <div className="h-32 w-24 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl flex items-center justify-center">
                      <Eye className="h-12 w-12 text-white" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  className="btn-mystical px-8 py-4 text-lg"
                  onClick={revealCards}
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Reveal All Cards
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Revealed Cards */}
        {cards.length > 0 && cardsRevealed && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Cards Display */}
            <div className="card-mystical p-8">
              <h3 className="text-xl font-bold text-center mb-8 text-gradient">Your Reading</h3>
              
              <div className="flex justify-center gap-6 mb-8">
                {cards.map((card, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="text-center font-bold text-muted-foreground">
                      {index === 0 ? "Past" : index === 1 ? "Present" : "Future"}
                    </h4>
                    <div className="h-40 w-28 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-white" />
                    </div>
                    <div className="text-center">
                      <h5 className="font-bold text-primary">{card.name}</h5>
                      <p className="text-xs text-muted-foreground italic mt-1">{card.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrow Flow */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <ArrowRight className="h-6 w-6 text-primary" />
                <Clock className="h-6 w-6 text-secondary" />
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* Interpretations */}
            <div className="grid gap-6 md:grid-cols-3">
              {cards.map((card, index) => (
                <div key={index} className="card-mystical p-6 space-y-4">
                  <div className="text-center">
                    <h4 className="font-bold text-lg text-primary">
                      {index === 0 ? "Past" : index === 1 ? "Present" : "Future"}
                    </h4>
                    <h5 className="font-bold">{card.name}</h5>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {getCardInterpretation(card, index === 0 ? "past" : index === 1 ? "present" : "future")}
                  </p>
                </div>
              ))}
            </div>

            {/* Overall Reading */}
            <div className="card-mystical p-8 space-y-6">
              <h4 className="text-xl font-bold text-center text-gradient">Overall Message</h4>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Your journey shows a progression from {cards[0].name.toLowerCase()} in the past, 
                  through {cards[1].name.toLowerCase()} in the present, 
                  moving toward {cards[2].name.toLowerCase()} in the future.
                </p>
                <p className="text-muted-foreground">
                  This reading suggests that the foundations you've laid are creating the current circumstances, 
                  and the choices you make now will shape your future outcomes. 
                  Trust in the process and allow the wisdom of these cards to guide your path forward.
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
                New Reading
              </Button>
              <Link href="/spreads">
                <Button variant="outline">
                  Try Different Spread
                </Button>
              </Link>
            </div>

            {/* Save Reading */}
            <div className="card-mystical p-6 text-center space-y-4">
              <h4 className="font-bold">Save This Reading</h4>
              <p className="text-sm text-muted-foreground">
                Keep this reading in your journal to track your journey and reflect on future insights
              </p>
              <Button variant="ghost" size="sm">
                Save to Journal
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
