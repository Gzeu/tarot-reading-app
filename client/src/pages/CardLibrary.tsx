import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Filter, BookOpen, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - replace with actual API call
const mockCards = [
  {
    id: 1,
    name: 'The Fool',
    number: 0,
    suit: 'major',
    arcana: 'major',
    meaning: 'New beginnings, innocence, spontaneity',
    uprightInterpretation: 'The Fool represents new beginnings...',
    reversedInterpretation: 'Reversed indicates recklessness...',
    symbolism: 'A young person at the edge of a cliff...',
    keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit'],
    themes: ['new beginnings', 'journey', 'potential'],
    imageUrl: '/cards/the-fool.jpg',
  },
  // Add more cards...
];

export default function CardLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterArcana, setFilterArcana] = useState<string>('all');
  const [filterSuit, setFilterSuit] = useState<string>('all');
  const [selectedCard, setSelectedCard] = useState<typeof mockCards[0] | null>(null);

  const filteredCards = mockCards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesArcana = filterArcana === 'all' || card.arcana === filterArcana;
    const matchesSuit = filterSuit === 'all' || card.suit === filterSuit;
    return matchesSearch && matchesArcana && matchesSuit;
  });

  return (
    <div className="min-h-screen mystical-gradient">
      {/* Header */}
      <div className="container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-[hsl(var(--gold))]" />
            <h1 className="text-5xl font-bold gold-text text-shadow-gold">
              Card Library
            </h1>
            <Sparkles className="w-8 h-8 text-[hsl(var(--primary))]" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the complete tarot deck with detailed meanings, symbolism, and interpretations
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mystical-card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards by name or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterArcana} onValueChange={setFilterArcana}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Arcana" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Arcana</SelectItem>
                <SelectItem value="major">Major Arcana</SelectItem>
                <SelectItem value="minor">Minor Arcana</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSuit} onValueChange={setFilterSuit}>
              <SelectTrigger>
                <SelectValue placeholder="Suit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suits</SelectItem>
                <SelectItem value="major">Major</SelectItem>
                <SelectItem value="wands">Wands</SelectItem>
                <SelectItem value="cups">Cups</SelectItem>
                <SelectItem value="swords">Swords</SelectItem>
                <SelectItem value="pentacles">Pentacles</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredCards.length} cards found</span>
            <Button variant="ghost" size="sm" onClick={() => {
              setSearchTerm('');
              setFilterArcana('all');
              setFilterSuit('all');
            }}>
              Clear filters
            </Button>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => setSelectedCard(card)}
              >
                <div className="mystical-card p-4 h-full flex flex-col">
                  {/* Card Image */}
                  <div className="aspect-[2/3] bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--purple-accent))] rounded-lg mb-3 flex items-center justify-center relative overflow-hidden group">
                    {card.imageUrl ? (
                      <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                    ) : (
                      <Star className="w-12 h-12 text-white/50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                      <span className="text-white text-sm font-semibold">View Details</span>
                    </div>
                  </div>
                  
                  {/* Card Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{card.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {card.arcana === 'major' ? 'Major Arcana' : `${card.suit.charAt(0).toUpperCase() + card.suit.slice(1)}`}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {card.meaning}
                    </p>
                  </div>
                  
                  {/* Keywords */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {card.keywords.slice(0, 2).map((keyword, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Card Details Modal */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mystical-scrollbar">
          {selectedCard && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold gold-text">
                  {selectedCard.name}
                </DialogTitle>
                <p className="text-muted-foreground">
                  {selectedCard.arcana === 'major' ? 'Major Arcana' : `Minor Arcana - ${selectedCard.suit.charAt(0).toUpperCase() + selectedCard.suit.slice(1)}`}
                </p>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Card Image */}
                <div className="aspect-[2/3] bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--purple-accent))] rounded-lg flex items-center justify-center">
                  {selectedCard.imageUrl ? (
                    <img src={selectedCard.imageUrl} alt={selectedCard.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Star className="w-24 h-24 text-white/50" />
                  )}
                </div>

                {/* Card Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-[hsl(var(--primary))]">
                      Core Meaning
                    </h4>
                    <p className="text-muted-foreground">{selectedCard.meaning}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCard.keywords.map((keyword, i) => (
                        <Badge key={i} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCard.themes.map((theme, i) => (
                        <Badge key={i} className="bg-[hsl(var(--purple-accent))]">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interpretations */}
              <Tabs defaultValue="upright" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upright">Upright</TabsTrigger>
                  <TabsTrigger value="reversed">Reversed</TabsTrigger>
                  <TabsTrigger value="symbolism">Symbolism</TabsTrigger>
                </TabsList>
                <TabsContent value="upright" className="mt-4">
                  <div className="mystical-card p-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedCard.uprightInterpretation}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="reversed" className="mt-4">
                  <div className="mystical-card p-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedCard.reversedInterpretation}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="symbolism" className="mt-4">
                  <div className="mystical-card p-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedCard.symbolism}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
