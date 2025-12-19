import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Shuffle, Eye, TrendingUp, BookOpen } from "lucide-react";

const careerCards = [
  { name: "The Chariot", meaning: "Ambition, success, determination, career advancement" },
  { name: "The Emperor", meaning: "Leadership, authority, structure, career foundation" },
  { name: "Eight of Pentacles", meaning: "Skill development, craftsmanship, dedication to work" },
  { name: "Knight of Swords", meaning: "Action, ambition, rapid progress in career" },
  { name: "The World", meaning: "Completion, achievement, career success" },
  { name: "Ten of Pentacles", meaning: "Long-term security, legacy, financial success" },
  { name: "The Magician", meaning: "Manifestation, skills, career opportunities" },
  { name: "Ace of Swords", meaning: "New ideas, breakthrough, career clarity" },
  { name: "Six of Wands", meaning: "Recognition, success, career advancement" },
  { name: "King of Pentacles", meaning: "Mastery, financial abundance, career leadership" }
];

export default function CareerReading() {
  const { user, isAuthenticated } = useAuth();
  const [cards, setCards] = useState<typeof careerCards[0][]>([]);
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
      const shuffled = [...careerCards].sort(() => Math.random() - 0.5).slice(0, 4);
      setCards(shuffled);
      setIsShuffling(false);
    }, 3000);
  };

  const revealCards = () => {
    setCardsRevealed(true);
    toast.success("Your career reading has been revealed!");
  };

  const positions = [
    { name: "Current Situation", description: "Your present career position" },
    { name: "Challenge", description: "Obstacles to overcome" },
    { name: "Action", description: "Steps to take for progress" },
    { name: "Outcome", description: "Potential career future" }
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
          <h1 className="text-2xl font-bold text-gradient">Career Reading</h1>
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
          <h2 className="text-3xl font-bold text-gradient">Professional Guidance</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This 4-card spread provides insight into your career path, challenges, and potential for growth. 
            Focus on your professional journey and work-related questions.
          </p>
        </div>

        {/* Question Input */}
        {!cards.length && !isShuffling && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="card-mystical p-8 space-y-6">
              <div className="text-center space-y-4">
                <TrendingUp className="h-12 w-12 text-blue-500 mx-auto" />
                <h3 className="text-xl font-bold">What career guidance do you seek?</h3>
                <p className="text-muted-foreground">
                  Focus on your current job, career path, or professional development
                </p>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What would you like to know about your career or professional path?"
                  className="w-full h-32 p-4 bg-card/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                
                <Button 
                  className="btn-mystical w-full"
                  onClick={shuffleCards}
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Draw Career Cards
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
                <TrendingUp className="h-16 w-16 text-blue-500 mx-auto animate-pulse" />
                <div>
                  <h3 className="text-xl font-bold">Aligning with Career Energy...</h3>
                  <p className="text-muted-foreground">
                    The cards are focusing on your professional path
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
                <h3 className="text-xl font-bold">Your Career Cards Are Ready</h3>
                <p className="text-muted-foreground">
                  Four cards have been selected to guide your professional journey
                </p>
              </div>
              
              {/* Hidden Cards Layout */}
              <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                {positions.map((position, index) => (
                  <div key={position.name} className="space-y-2">
                    <h4 className="text-center font-bold text-sm text-muted-foreground">{position.name}</h4>
                    <div className="h-32 w-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-2xl flex items-center justify-center mx-auto">
                      <TrendingUp className="h-12 w-12 text-white" />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">{position.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  className="btn-mystical px-8 py-4 text-lg"
                  onClick={revealCards}
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Reveal Career Reading
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Revealed Cards */}
        {cards.length > 0 && cardsRevealed && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Cards Display */}
            <div className="card-mystical p-8">
              <h3 className="text-xl font-bold text-center mb-8 text-gradient">Your Career Reading</h3>
              
              <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                {cards.map((card, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-center font-bold text-sm text-muted-foreground">
                      {positions[index].name}
                    </h4>
                    <div className="h-40 w-28 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-2xl flex items-center justify-center mx-auto">
                      <BookOpen className="h-16 w-16 text-white" />
                    </div>
                    <div className="text-center">
                      <h5 className="font-bold text-blue-400 text-sm">{card.name}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interpretations */}
            <div className="grid gap-4 md:grid-cols-2">
              {cards.map((card, index) => (
                <div key={index} className="card-mystical p-6 space-y-3">
                  <div className="text-center">
                    <h4 className="font-bold text-blue-400">{positions[index].name}</h4>
                    <h5 className="font-bold text-sm">{card.name}</h5>
                  </div>
                  <p className="text-muted-foreground text-sm">{card.meaning}</p>
                  <p className="text-xs text-muted-foreground italic">
                    {positions[index].description}
                  </p>
                </div>
              ))}
            </div>

            {/* Overall Career Message */}
            <div className="card-mystical p-8 space-y-6">
              <h4 className="text-xl font-bold text-center text-gradient">Career Guidance</h4>
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Your career reading shows that {cards[0].name.toLowerCase()} represents your current professional situation. 
                  The challenge you face is represented by {cards[1].name.toLowerCase()}.
                </p>
                <p className="text-muted-foreground">
                  To move forward, the cards suggest {cards[2].name.toLowerCase()} energy - focusing on action and development. 
                  The potential outcome shows {cards[3].name.toLowerCase()} possibilities for your career.
                </p>
                <p className="text-blue-400 font-medium">
                  Your professional path requires both strategic planning and decisive action. 
                  Trust your abilities and continue developing your skills for long-term success.
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
                New Career Reading
              </Button>
              <Link href="/spreads">
                <Button variant="outline">
                  Try Different Spread
                </Button>
              </Link>
            </div>

            {/* Save Reading */}
            <div className="card-mystical p-6 text-center space-y-4">
              <h4 className="font-bold">Save This Career Reading</h4>
              <p className="text-sm text-muted-foreground">
                Keep this guidance in your journal to track your professional growth
              </p>
              <Button variant="ghost" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Save to Journal
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
