import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Shuffle, Eye, Heart, BookOpen } from "lucide-react";

const loveCards = [
  { name: "The Lovers", meaning: "Union, harmony, relationships, choices of the heart" },
  { name: "Two of Cups", meaning: "Partnership, connection, mutual feelings" },
  { name: "Ten of Cups", meaning: "Emotional fulfillment, harmony, happy family" },
  { name: "Four of Wands", meaning: "Celebration, harmony, marriage, home" },
  { name: "The Empress", meaning: "Love, nurturing, abundance, feminine energy" },
  { name: "The Star", meaning: "Hope, inspiration, healing in relationships" },
  { name: "The Sun", meaning: "Joy, happiness, success in love" },
  { name: "Ace of Cups", meaning: "New love, emotional beginnings, compassion" },
  { name: "Three of Cups", meaning: "Friendship, community, celebration" },
  { name: "Knight of Cups", meaning: "Romance, charm, emotional messages" }
];

export default function LoveReading() {
  const { user, isAuthenticated } = useAuth();
  const [cards, setCards] = useState<typeof loveCards[0][]>([]);
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
    
    setTimeout(() => {
      const shuffled = [...loveCards].sort(() => Math.random() - 0.5).slice(0, 5);
      setCards(shuffled);
      setIsShuffling(false);
    }, 3000);
  };

  const revealCards = () => {
    setCardsRevealed(true);
    toast.success("Your love reading has been revealed!");
  };

  const positions = [
    { name: "You", description: "Your current feelings and position" },
    { name: "Partner", description: "Their current feelings and position" },
    { name: "Connection", description: "The energy between you both" },
    { name: "Challenge", description: "Obstacles to overcome" },
    { name: "Outcome", description: "Potential future of the relationship" }
  ];

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
          <h1 className="text-2xl font-bold text-gradient">Love Reading</h1>
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
          <h2 className="text-3xl font-bold text-gradient">Relationship Guidance</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This 5-card spread provides deep insight into your relationship dynamics, challenges, 
            and potential outcomes. Focus on matters of the heart.
          </p>
        </div>

        {/* Question Input */}
        {!cards.length && !isShuffling && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="card-mystical p-8 space-y-6">
              <div className="text-center space-y-4">
                <Heart className="h-12 w-12 text-pink-500 mx-auto" />
                <h3 className="text-xl font-bold">What relationship guidance do you seek?</h3>
                <p className="text-muted-foreground">
                  Focus on your relationship, a specific person, or your love life in general
                </p>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What would you like to know about your relationship or love life?"
                  className="w-full h-32 p-4 bg-card/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                
                <Button 
                  className="btn-mystical w-full"
                  onClick={shuffleCards}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Draw Love Cards
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
                <Heart className="h-16 w-16 text-pink-500 mx-auto animate-pulse" />
                <div>
                  <h3 className="text-xl font-bold">Connecting with Love Energy...</h3>
                  <p className="text-muted-foreground">
                    The cards are aligning with matters of the heart
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cards Drawn but Not Revealed */}
        {cards.length > 0 && !cardsRevealed && (
          <div className="max-w-6xl mx-auto">
            <div className="card-mystical p-8 space-y-8">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Your Love Cards Are Ready</h3>
                <p className="text-muted-foreground">
                  Five cards have been selected to guide your heart
                </p>
              </div>
              
              {/* Hidden Cards Layout */}
              <div className="flex flex-wrap justify-center gap-4">
                {positions.map((position, index) => (
                  <div key={position.name} className="space-y-2">
                    <h4 className="text-center font-bold text-sm text-muted-foreground">{position.name}</h4>
                    <div className="h-24 w-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center text-muted-foreground max-w-20">{position.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  className="btn-mystical px-8 py-4 text-lg"
                  onClick={revealCards}
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Reveal Love Reading
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
              <h3 className="text-xl font-bold text-center mb-8 text-gradient">Your Love Reading</h3>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {cards.map((card, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-center font-bold text-sm text-muted-foreground">
                      {positions[index].name}
                    </h4>
                    <div className="h-32 w-24 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Heart className="h-12 w-12 text-white" />
                    </div>
                    <div className="text-center">
                      <h5 className="font-bold text-pink-400 text-sm">{card.name}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interpretations */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, index) => (
                <div key={index} className="card-mystical p-6 space-y-3">
                  <div className="text-center">
                    <h4 className="font-bold text-pink-400">{positions[index].name}</h4>
                    <h5 className="font-bold text-sm">{card.name}</h5>
                  </div>
                  <p className="text-muted-foreground text-sm">{card.meaning}</p>
                  <p className="text-xs text-muted-foreground italic">
                    {positions[index].description}
                  </p>
                </div>
              ))}
            </div>

            {/* Overall Love Message */}
            <div className="card-mystical p-8 space-y-6">
              <h4 className="text-xl font-bold text-center text-gradient">Love Message</h4>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Your reading reveals important insights about your relationship journey. 
                  The cards show that {cards[0].name.toLowerCase()} represents your current position, 
                  while {cards[1].name.toLowerCase()} reflects your partner's energy.
                </p>
                <p className="text-muted-foreground">
                  The connection between you is influenced by {cards[2].name.toLowerCase()}, 
                  with {cards[3].name.toLowerCase()} indicating challenges to work through. 
                  The potential outcome shows {cards[4].name.toLowerCase()} energy.
                </p>
                <p className="text-pink-400 font-medium">
                  Trust your heart and communicate openly. Love requires patience, understanding, 
                  and the courage to be vulnerable.
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
                New Love Reading
              </Button>
              <Link href="/spreads">
                <Button variant="outline">
                  Try Different Spread
                </Button>
              </Link>
            </div>

            {/* Save Reading */}
            <div className="card-mystical p-6 text-center space-y-4">
              <h4 className="font-bold">Save This Love Reading</h4>
              <p className="text-sm text-muted-foreground">
                Keep this guidance in your journal to track your relationship journey
              </p>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save to Journal
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
