import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Shuffle, Eye, Star, BookOpen } from "lucide-react";

const celticCards = [
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

export default function CelticCross() {
  const { user, isAuthenticated } = useAuth();
  const [cards, setCards] = useState<typeof celticCards[0][]>([]);
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
      const shuffled = [...celticCards].sort(() => Math.random() - 0.5).slice(0, 10);
      setCards(shuffled);
      setIsShuffling(false);
    }, 4000);
  };

  const revealCards = () => {
    setCardsRevealed(true);
    toast.success("Your Celtic Cross reading has been revealed!");
  };

  const positions = [
    { name: "Present", description: "Current situation" },
    { name: "Challenge", description: "Immediate obstacle" },
    { name: "Past", description: "Past influences" },
    { name: "Future", description: "Future potential" },
    { name: "Above", description: "Conscious goals" },
    { name: "Below", description: "Subconscious influences" },
    { name: "Advice", description: "Guidance for you" },
    { name: "External", description: "External influences" },
    { name: "Hopes", description: "Hopes and fears" },
    { name: "Outcome", description: "Final outcome" }
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
          <h1 className="text-2xl font-bold text-gradient">Celtic Cross</h1>
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
          <h2 className="text-3xl font-bold text-gradient">Comprehensive Life Analysis</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The classic 10-card Celtic Cross provides deep insight into all aspects of your life. 
            This comprehensive reading reveals past influences, present challenges, and future outcomes.
          </p>
        </div>

        {/* Question Input */}
        {!cards.length && !isShuffling && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="card-mystical p-8 space-y-6">
              <div className="text-center space-y-4">
                <Star className="h-12 w-12 text-yellow-500 mx-auto" />
                <h3 className="text-xl font-bold">What comprehensive guidance do you seek?</h3>
                <p className="text-muted-foreground">
                  This reading provides deep insight into your entire life situation
                </p>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What area of your life would you like comprehensive insight into?"
                  className="w-full h-32 p-4 bg-card/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                
                <Button 
                  className="btn-mystical w-full"
                  onClick={shuffleCards}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Draw Celtic Cross
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
                <Star className="h-16 w-16 text-yellow-500 mx-auto animate-spin" />
                <div>
                  <h3 className="text-xl font-bold">Drawing the Celtic Cross...</h3>
                  <p className="text-muted-foreground">
                    The universe is providing comprehensive insight into your question
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
                <h3 className="text-xl font-bold">Your Celtic Cross Is Ready</h3>
                <p className="text-muted-foreground">
                  Ten cards have been selected for your comprehensive reading
                </p>
              </div>
              
              {/* Hidden Cards Layout - Celtic Cross Formation */}
              <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-2 max-w-md">
                  {/* Row 1 */}
                  <div className="col-start-2 space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Hopes</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Row 2 */}
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Past</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Present</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Future</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Row 3 */}
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Below</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Challenge</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Above</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Row 4 */}
                  <div className="col-start-2 space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Outcome</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Cards */}
              <div className="flex justify-center gap-4 mt-4">
                <div className="space-y-1">
                  <h4 className="text-center font-bold text-xs text-muted-foreground">Advice</h4>
                  <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-center font-bold text-xs text-muted-foreground">External</h4>
                  <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  className="btn-mystical px-8 py-4 text-lg"
                  onClick={revealCards}
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Reveal Celtic Cross
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
              <h3 className="text-xl font-bold text-center mb-8 text-gradient">Your Celtic Cross Reading</h3>
              
              {/* Celtic Cross Formation */}
              <div className="flex justify-center mb-8">
                <div className="grid grid-cols-3 gap-2 max-w-md">
                  {/* Row 1 */}
                  <div className="col-start-2 space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Hopes</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center font-bold">{cards[8].name}</p>
                  </div>
                  
                  {/* Row 2 */}
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Past</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center font-bold">{cards[2].name}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Present</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center font-bold">{cards[0].name}</p>
                  masses
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted mexican-foreground">Future</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center font-bold">{cards[3].name}</p>
                  </div>
                  
                  {/* Row 3 */}
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Below</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center-justify">
                      <BookOpen className=" h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center font-bold">{cards[5].name}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Challenge</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center font-bold">{cards[1].name}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Above</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center font-bold">{cards[4].name}</p>
                  </div>
                  
                  {/* Row 4 */}
                  <div className="col-start-2 space-y-1">
                    <h4 className="text-center font-bold text-xs text-muted-foreground">Outcome</h4>
                    <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-center font-bold">{cards[9].name}</p>
                  </div>
                </div>
              </div>
              
              {/* Additional Cards */}
              <div className="flex justify-center gap-4 mt-4">
                <div className="space-y-1">
                  <h4 className="text-center font-bold text-xs text-muted-foreground">Advice</h4>
                  <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-xs text-center font-bold">{cards[6].name}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-center font-bold text-xs text-muted-foreground">External</h4>
                  <div className="h-20 w-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-2xl flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-xs text-center font-bold">{cards[7].name}</p>
                </div>
              </div>
            </div>

            {/* Interpretations */}
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, index) => (
                <div key={index} className="card-mystical p-4 space-y-2">
                  <div className="text-center">
                    <h4 className="font-bold text-yellow-400 text-sm">{positions[index].name}</h4>
                    <h5 className="font-bold text-xs">{card.name}</h5>
                  </div>
                  <p className="text-muted-foreground text-xs">{card.meaning}</p>
                  <p className="text-xs text-muted-foreground italic">
                    {positions[index].description}
                  </p>
                </div>
              ))}
            </div>

            {/* Overall Message */}
            <div className="card-mystical p-8 space-y-6">
              <h4 className="text-xl font-bold text-center text-gradient">Life Guidance</h4>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Your Celtic Cross reading reveals a comprehensive picture of your life journey. 
                  The central card {cards[0].name.toLowerCase()} represents your present situation, 
                  while {cards[1].name.toLowerCase()} shows the immediate challenge you face.
                </p>
                <p className="text-muted-foreground">
                  Looking at the past influences of {cards[2].name.toLowerCase()} and the future potential of {cards[3].name.toLowerCase()}, 
                  we see how your journey is evolving. Your conscious goals ({cards[4].name.toLowerCase()}) 
                  and subconscious influences ({cards[5].name.toLowerCase()}) create the foundation for your path.
                </p>
                <p className="text-yellow-400 font-medium">
                  The advice of {cards[6].name.toLowerCase()} combined with external factors ({cards[7].name.toLowerCase()}) 
                  and your deepest hopes ({cards[8].name.toLowerCase()}) lead toward the ultimate outcome of {cards[9].name.toLowerCase()}.
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
                New Celtic Cross
              </Button>
              <Link href="/spreads">
                <Button variant="outline">
                  Try Different Spread
                </Button>
              </Link>
            </div>

            {/* Save Reading */}
            <div className="card-mystical p-6 text-center space-y-4">
              <h4 className="font-bold">Save This Comprehensive Reading</h4>
              <p className="text-sm text-muted-foreground">
                Keep this deep insight in your journal for future reflection
              </p>
              <Button variant="ghost" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Save to Journal
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
