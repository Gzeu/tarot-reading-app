import { drizzle } from 'drizzle-orm/mysql2';
import { cards } from './drizzle/schema.ts';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  process.exit(1);
}

const db = drizzle(process.env.DATABASE_URL);

// Complete 78-card tarot deck data
const tarotCards = [
  // MAJOR ARCANA (0-21)
  {
    name: 'The Fool',
    number: 0,
    suit: 'major',
    arcana: 'major',
    meaning: 'New beginnings, innocence, spontaneity, free spirit',
    uprightInterpretation: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
    reversedInterpretation: 'When reversed, The Fool suggests recklessness, taking foolish risks, being inconsiderate of consequences, and acting without thinking.',
    symbolism: 'A young person standing at the edge of a cliff, carrying a small bag, accompanied by a white dog. The mountains represent challenges, while the dog symbolizes loyalty and protection.',
    keywords: ['beginnings', 'innocence', 'spontaneity', 'free spirit', 'adventure'],
    themes: ['new beginnings', 'journey', 'potential', 'faith']
  },
  {
    name: 'The Magician',
    number: 1,
    suit: 'major',
    arcana: 'major',
    meaning: 'Manifestation, resourcefulness, power, inspired action',
    uprightInterpretation: 'The Magician represents manifestation, willpower, desire, creation, and the power to make things happen. You have the tools and resources needed.',
    reversedInterpretation: 'Reversed indicates manipulation, poor planning, untapped talents, and scattered energy.',
    symbolism: 'A figure standing before a table with the four suits of the tarot, one arm pointing to heaven and the other to earth, representing "as above, so below".',
    keywords: ['manifestation', 'resourcefulness', 'power', 'action', 'concentration'],
    themes: ['creation', 'willpower', 'mastery', 'skill']
  },
  {
    name: 'The High Priestess',
    number: 2,
    suit: 'major',
    arcana: 'major',
    meaning: 'Intuition, sacred knowledge, divine feminine, subconscious mind',
    uprightInterpretation: 'The High Priestess represents intuition, sacred knowledge, the divine feminine, and the subconscious mind. Trust your instincts and inner voice.',
    reversedInterpretation: 'Reversed suggests secrets, disconnection from intuition, withdrawal, and silence.',
    symbolism: 'A woman seated between two pillars (light and dark), holding a scroll labeled "Tora", symbolizing divine law and hidden knowledge.',
    keywords: ['intuition', 'mystery', 'subconscious', 'divine feminine', 'sacred knowledge'],
    themes: ['intuition', 'mystery', 'spirituality', 'inner voice']
  },
  {
    name: 'The Empress',
    number: 3,
    suit: 'major',
    arcana: 'major',
    meaning: 'Femininity, beauty, nature, nurturing, abundance',
    uprightInterpretation: 'The Empress represents femininity, beauty, nature, nurturing, and abundance. A time of growth, creativity, and nurturing relationships.',
    reversedInterpretation: 'Reversed indicates creative block, dependence on others, smothering, and neglecting self-care.',
    symbolism: 'A pregnant woman seated on a throne in nature, surrounded by abundance, wearing a crown of twelve stars representing the zodiac.',
    keywords: ['femininity', 'beauty', 'nature', 'abundance', 'nurturing'],
    themes: ['fertility', 'creation', 'nature', 'motherhood']
  },
  {
    name: 'The Emperor',
    number: 4,
    suit: 'major',
    arcana: 'major',
    meaning: 'Authority, establishment, structure, father figure',
    uprightInterpretation: 'The Emperor represents authority, structure, control, and fatherhood. Time to take charge and create order from chaos.',
    reversedInterpretation: 'Reversed suggests domination, excessive control, lack of discipline, and inflexibility.',
    symbolism: 'A stern figure seated on a throne decorated with rams, holding an ankh and orb, representing life and worldly power.',
    keywords: ['authority', 'structure', 'control', 'father figure', 'leadership'],
    themes: ['leadership', 'stability', 'power', 'order']
  },
  {
    name: 'The Hierophant',
    number: 5,
    suit: 'major',
    arcana: 'major',
    meaning: 'Spiritual wisdom, religious beliefs, conformity, tradition',
    uprightInterpretation: 'The Hierophant represents spiritual wisdom, tradition, conformity, and institutions. Seeking guidance from established structures.',
    reversedInterpretation: 'Reversed indicates personal beliefs, freedom, challenging tradition, and unconventional approaches.',
    symbolism: 'A religious figure seated between two pillars, raising his hand in blessing, with two acolytes kneeling before him.',
    keywords: ['tradition', 'conformity', 'spirituality', 'education', 'institutions'],
    themes: ['tradition', 'religion', 'belief systems', 'conformity']
  },
  {
    name: 'The Lovers',
    number: 6,
    suit: 'major',
    arcana: 'major',
    meaning: 'Love, harmony, relationships, values alignment, choices',
    uprightInterpretation: 'The Lovers represent love, harmony, relationships, and values alignment. Making important choices about relationships and personal beliefs.',
    reversedInterpretation: 'Reversed suggests disharmony, imbalance, misalignment of values, and difficult relationship choices.',
    symbolism: 'Two figures stand beneath an angel, representing divine blessing. The tree of knowledge and tree of life symbolize choice and consequence.',
    keywords: ['love', 'harmony', 'relationships', 'choices', 'values'],
    themes: ['love', 'relationships', 'choices', 'alignment']
  },
  {
    name: 'The Chariot',
    number: 7,
    suit: 'major',
    arcana: 'major',
    meaning: 'Control, willpower, success, action, determination',
    uprightInterpretation: 'The Chariot represents control, willpower, success, and determination. Overcome obstacles through confidence and focus.',
    reversedInterpretation: 'Reversed indicates lack of control, lack of direction, aggression, and scattered energy.',
    symbolism: 'A figure in a chariot pulled by two sphinxes (one black, one white), representing the need to balance opposing forces.',
    keywords: ['control', 'willpower', 'success', 'determination', 'action'],
    themes: ['victory', 'determination', 'control', 'progress']
  },
  {
    name: 'Strength',
    number: 8,
    suit: 'major',
    arcana: 'major',
    meaning: 'Strength, courage, persuasion, influence, compassion',
    uprightInterpretation: 'Strength represents inner strength, courage, compassion, and influence. Gentle control through understanding rather than force.',
    reversedInterpretation: 'Reversed suggests self-doubt, weakness, insecurity, and lack of confidence.',
    symbolism: 'A woman gently closing the mouth of a lion, representing the triumph of love and patience over raw force.',
    keywords: ['strength', 'courage', 'patience', 'compassion', 'influence'],
    themes: ['inner strength', 'courage', 'compassion', 'resilience']
  },
  {
    name: 'The Hermit',
    number: 9,
    suit: 'major',
    arcana: 'major',
    meaning: 'Soul searching, introspection, being alone, inner guidance',
    uprightInterpretation: 'The Hermit represents soul searching, introspection, and inner guidance. Time for contemplation and self-reflection.',
    reversedInterpretation: 'Reversed indicates isolation, loneliness, withdrawal from life, and refusing help.',
    symbolism: 'An old man standing alone on a mountain peak, holding a lantern containing a six-pointed star, representing divine wisdom.',
    keywords: ['introspection', 'solitude', 'wisdom', 'guidance', 'contemplation'],
    themes: ['soul searching', 'introspection', 'guidance', 'wisdom']
  },
  {
    name: 'Wheel of Fortune',
    number: 10,
    suit: 'major',
    arcana: 'major',
    meaning: 'Good luck, karma, life cycles, destiny, turning point',
    uprightInterpretation: 'The Wheel of Fortune represents cycles, karma, and turning points. Life is constantly changing; accept the ups and downs.',
    reversedInterpretation: 'Reversed suggests bad luck, resistance to change, breaking cycles, and lack of control.',
    symbolism: 'A wheel with mystical symbols, surrounded by four creatures representing the four elements and fixed signs of the zodiac.',
    keywords: ['luck', 'karma', 'destiny', 'cycles', 'turning point'],
    themes: ['fate', 'destiny', 'cycles', 'change']
  },
  {
    name: 'Justice',
    number: 11,
    suit: 'major',
    arcana: 'major',
    meaning: 'Justice, fairness, truth, cause and effect, law',
    uprightInterpretation: 'Justice represents fairness, truth, and the law of cause and effect. Be fair and objective in your decisions.',
    reversedInterpretation: 'Reversed indicates unfairness, lack of accountability, dishonesty, and avoiding consequences.',
    symbolism: 'A figure seated between two pillars, holding scales and a sword, representing balanced judgment and truth.',
    keywords: ['justice', 'fairness', 'truth', 'accountability', 'law'],
    themes: ['justice', 'truth', 'fairness', 'karma']
  },
  {
    name: 'The Hanged Man',
    number: 12,
    suit: 'major',
    arcana: 'major',
    meaning: 'Pause, surrender, letting go, new perspectives',
    uprightInterpretation: 'The Hanged Man represents surrender, letting go, and new perspectives. Sometimes you need to pause and see things differently.',
    reversedInterpretation: 'Reversed suggests delays, resistance, stalling, and indecision.',
    symbolism: 'A man hanging upside down from a tree by one foot, appearing serene, representing willing sacrifice and enlightenment.',
    keywords: ['pause', 'surrender', 'perspective', 'sacrifice', 'waiting'],
    themes: ['surrender', 'suspension', 'sacrifice', 'perspective']
  },
  {
    name: 'Death',
    number: 13,
    suit: 'major',
    arcana: 'major',
    meaning: 'Endings, change, transformation, transition',
    uprightInterpretation: 'Death represents endings, change, and transformation. Not literal death, but the end of one chapter and beginning of another.',
    reversedInterpretation: 'Reversed indicates resistance to change, inability to let go, stagnation, and fear of change.',
    symbolism: 'A skeleton in armor riding a white horse, representing inevitable change and the transition from one state to another.',
    keywords: ['endings', 'change', 'transformation', 'transition', 'release'],
    themes: ['transformation', 'endings', 'change', 'rebirth']
  },
  {
    name: 'Temperance',
    number: 14,
    suit: 'major',
    arcana: 'major',
    meaning: 'Balance, moderation, patience, purpose',
    uprightInterpretation: 'Temperance represents balance, moderation, and patience. Find the middle ground and blend opposing forces harmoniously.',
    reversedInterpretation: 'Reversed suggests imbalance, excess, lack of long-term vision, and re-alignment needed.',
    symbolism: 'An angel pouring water between two cups, with one foot on land and one in water, representing balance between material and spiritual.',
    keywords: ['balance', 'moderation', 'patience', 'purpose', 'harmony'],
    themes: ['balance', 'moderation', 'patience', 'alchemy']
  },
  {
    name: 'The Devil',
    number: 15,
    suit: 'major',
    arcana: 'major',
    meaning: 'Shadow self, attachment, addiction, restriction, sexuality',
    uprightInterpretation: 'The Devil represents bondage, addiction, materialism, and sexuality. Examine what holds you captive in unhealthy patterns.',
    reversedInterpretation: 'Reversed indicates releasing limiting beliefs, exploring dark thoughts, detachment, and breaking free.',
    symbolism: 'A horned figure with two chained humans, representing bondage to material world and base desires. The loose chains show freedom is possible.',
    keywords: ['bondage', 'addiction', 'sexuality', 'materialism', 'shadow'],
    themes: ['bondage', 'materialism', 'temptation', 'addiction']
  },
  {
    name: 'The Tower',
    number: 16,
    suit: 'major',
    arcana: 'major',
    meaning: 'Sudden change, upheaval, chaos, revelation, awakening',
    uprightInterpretation: 'The Tower represents sudden upheaval, chaos, and revelation. Dramatic change that destroys false structures to make way for truth.',
    reversedInterpretation: 'Reversed suggests personal transformation, fear of change, averting disaster, and delayed upheaval.',
    symbolism: 'A tower struck by lightning with people falling from it, representing sudden destruction of false beliefs and structures.',
    keywords: ['upheaval', 'chaos', 'revelation', 'sudden change', 'awakening'],
    themes: ['upheaval', 'sudden change', 'chaos', 'revelation']
  },
  {
    name: 'The Star',
    number: 17,
    suit: 'major',
    arcana: 'major',
    meaning: 'Hope, faith, purpose, renewal, spirituality',
    uprightInterpretation: 'The Star represents hope, faith, and renewed purpose. A time of healing, inspiration, and spiritual insight.',
    reversedInterpretation: 'Reversed indicates lack of faith, despair, self-trust issues, and disconnection from spirit.',
    symbolism: 'A naked woman kneeling by water, pouring from two vessels, with eight stars above. Represents hope and divine guidance.',
    keywords: ['hope', 'faith', 'purpose', 'renewal', 'inspiration'],
    themes: ['hope', 'faith', 'inspiration', 'serenity']
  },
  {
    name: 'The Moon',
    number: 18,
    suit: 'major',
    arcana: 'major',
    meaning: 'Illusion, fear, anxiety, subconscious, intuition',
    uprightInterpretation: 'The Moon represents illusion, fear, and the subconscious. Things are not as they seem; trust your intuition but verify facts.',
    reversedInterpretation: 'Reversed suggests release of fear, repressed emotion surfacing, and inner confusion clearing.',
    symbolism: 'The moon shining on a path with a dog and wolf howling, a crayfish emerging from water, representing the journey from unconscious to conscious.',
    keywords: ['illusion', 'fear', 'anxiety', 'intuition', 'subconscious'],
    themes: ['illusion', 'intuition', 'fear', 'subconscious']
  },
  {
    name: 'The Sun',
    number: 19,
    suit: 'major',
    arcana: 'major',
    meaning: 'Positivity, fun, warmth, success, vitality',
    uprightInterpretation: 'The Sun represents positivity, success, vitality, and joy. Everything is working out; embrace happiness and success.',
    reversedInterpretation: 'Reversed suggests temporary depression, lack of success, inner child issues, and blocked happiness.',
    symbolism: 'A bright sun shining over a child on a white horse, with sunflowers behind, representing innocence, joy, and success.',
    keywords: ['positivity', 'success', 'vitality', 'joy', 'warmth'],
    themes: ['success', 'joy', 'vitality', 'enlightenment']
  },
  {
    name: 'Judgement',
    number: 20,
    suit: 'major',
    arcana: 'major',
    meaning: 'Judgement, rebirth, inner calling, absolution',
    uprightInterpretation: 'Judgement represents rebirth, inner calling, and absolution. A time of reflection, evaluation, and awakening to higher purpose.',
    reversedInterpretation: 'Reversed indicates self-doubt, inner critic, ignoring the call, and lack of self-awareness.',
    symbolism: 'An angel blowing a trumpet while people rise from graves, representing resurrection, renewal, and divine judgment.',
    keywords: ['judgement', 'rebirth', 'calling', 'absolution', 'awakening'],
    themes: ['judgement', 'rebirth', 'reflection', 'awakening']
  },
  {
    name: 'The World',
    number: 21,
    suit: 'major',
    arcana: 'major',
    meaning: 'Completion, accomplishment, travel, fulfillment',
    uprightInterpretation: 'The World represents completion, accomplishment, and fulfillment. A cycle has ended successfully; celebrate your achievements.',
    reversedInterpretation: 'Reversed suggests seeking closure, incomplete goals, lack of completion, and delays.',
    symbolism: 'A naked figure dancing within a wreath, surrounded by the four elements, representing wholeness and cosmic consciousness.',
    keywords: ['completion', 'accomplishment', 'travel', 'fulfillment', 'success'],
    themes: ['completion', 'achievement', 'fulfillment', 'wholeness']
  },

  // MINOR ARCANA - WANDS (1-14)
  {
    name: 'Ace of Wands',
    number: 1,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Inspiration, new opportunities, growth, potential',
    uprightInterpretation: 'A spark of inspiration, new creative venture, or exciting opportunity. Take action on fresh ideas.',
    reversedInterpretation: 'Delays, lack of direction, missed opportunities, or creative blocks.',
    symbolism: 'A hand emerging from clouds holding a sprouting wand, representing divine inspiration and creative potential.',
    keywords: ['inspiration', 'opportunity', 'growth', 'potential', 'creation'],
    themes: ['new beginnings', 'creativity', 'inspiration', 'energy']
  },
  {
    name: 'Two of Wands',
    number: 2,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Future planning, progress, decisions, discovery',
    uprightInterpretation: 'Planning for the future, making decisions, and expanding horizons. Bold choices lead to progress.',
    reversedInterpretation: 'Fear of unknown, lack of planning, poor decisions, or playing it safe.',
    symbolism: 'A figure holding a globe, looking out from a castle, representing vision and future planning.',
    keywords: ['planning', 'decisions', 'progress', 'discovery', 'vision'],
    themes: ['planning', 'future', 'decisions', 'expansion']
  },
  {
    name: 'Three of Wands',
    number: 3,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Progress, expansion, foresight, overseas opportunities',
    uprightInterpretation: 'Plans are coming to fruition. Expansion and growth through vision and foresight.',
    reversedInterpretation: 'Playing it safe, lack of foresight, delays, or obstacles to expansion.',
    symbolism: 'A figure gazing at ships in the distance, representing patience and long-term vision paying off.',
    keywords: ['progress', 'expansion', 'foresight', 'opportunities', 'growth'],
    themes: ['expansion', 'foresight', 'travel', 'growth']
  },
  {
    name: 'Four of Wands',
    number: 4,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Celebration, harmony, marriage, home, community',
    uprightInterpretation: 'Celebration, homecoming, harmony, and happy events. Time to enjoy achievements.',
    reversedInterpretation: 'Lack of harmony, broken relationships, family issues, or canceled celebrations.',
    symbolism: 'Four wands forming a canopy with people celebrating beneath, representing joy and stability.',
    keywords: ['celebration', 'harmony', 'home', 'community', 'joy'],
    themes: ['celebration', 'harmony', 'community', 'stability']
  },
  {
    name: 'Five of Wands',
    number: 5,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Conflict, disagreements, competition, tension',
    uprightInterpretation: 'Minor conflicts, competition, and disagreements. Healthy competition or petty arguing.',
    reversedInterpretation: 'Avoiding conflict, respecting differences, or end of competition.',
    symbolism: 'Five figures wielding wands in apparent conflict, representing competition and struggle.',
    keywords: ['conflict', 'competition', 'disagreement', 'tension', 'rivalry'],
    themes: ['conflict', 'competition', 'tension', 'struggle']
  },
  {
    name: 'Six of Wands',
    number: 6,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Success, public recognition, progress, self-confidence',
    uprightInterpretation: 'Victory, success, and public recognition. Your efforts are being acknowledged.',
    reversedInterpretation: 'Private achievement, self-doubt, lack of recognition, or fall from grace.',
    symbolism: 'A victorious figure on horseback, crowned with laurel, representing triumph and recognition.',
    keywords: ['success', 'victory', 'recognition', 'confidence', 'achievement'],
    themes: ['victory', 'recognition', 'success', 'pride']
  },
  {
    name: 'Seven of Wands',
    number: 7,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Challenge, competition, protection, perseverance',
    uprightInterpretation: 'Standing your ground, defending your position, and persevering against challenges.',
    reversedInterpretation: 'Exhaustion, giving up, overwhelmed, or lack of confidence.',
    symbolism: 'A figure defending their position on high ground against six wands, representing defending beliefs.',
    keywords: ['challenge', 'defense', 'perseverance', 'courage', 'protection'],
    themes: ['defense', 'perseverance', 'challenge', 'courage']
  },
  {
    name: 'Eight of Wands',
    number: 8,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Speed, action, movement, quick decisions',
    uprightInterpretation: 'Rapid action, swift changes, and quick results. Things are moving fast.',
    reversedInterpretation: 'Delays, frustration, slow progress, or scattered energy.',
    symbolism: 'Eight wands flying through the air toward the ground, representing swift movement and progress.',
    keywords: ['speed', 'action', 'movement', 'progress', 'momentum'],
    themes: ['speed', 'momentum', 'action', 'progress']
  },
  {
    name: 'Nine of Wands',
    number: 9,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Resilience, courage, persistence, test of faith',
    uprightInterpretation: 'Nearly there; persist despite challenges. Drawing on inner strength for final push.',
    reversedInterpretation: 'Exhaustion, paranoia, giving up, or inability to continue.',
    symbolism: 'A wounded figure leaning on a wand with eight behind, representing resilience despite adversity.',
    keywords: ['resilience', 'persistence', 'courage', 'boundaries', 'strength'],
    themes: ['resilience', 'perseverance', 'courage', 'defense']
  },
  {
    name: 'Ten of Wands',
    number: 10,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Burden, responsibility, hard work, stress',
    uprightInterpretation: 'Carrying heavy burdens, overwhelmed by responsibilities, but success is near.',
    reversedInterpretation: 'Releasing burdens, delegation, shifting priorities, or seeking help.',
    symbolism: 'A figure struggling to carry ten heavy wands, representing burden and responsibility.',
    keywords: ['burden', 'responsibility', 'stress', 'overwork', 'achievement'],
    themes: ['burden', 'responsibility', 'stress', 'completion']
  },
  {
    name: 'Page of Wands',
    number: 11,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Exploration, excitement, freedom, new ideas',
    uprightInterpretation: 'Free-spirited, enthusiastic energy. New creative projects and adventurous spirit.',
    reversedInterpretation: 'Lack of direction, procrastination, immaturity, or scattered energy.',
    symbolism: 'A young person holding a wand, gazing at it with wonder, representing curiosity and potential.',
    keywords: ['exploration', 'excitement', 'ideas', 'enthusiasm', 'adventure'],
    themes: ['exploration', 'enthusiasm', 'potential', 'adventure']
  },
  {
    name: 'Knight of Wands',
    number: 12,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Energy, passion, action, adventure, impulsiveness',
    uprightInterpretation: 'Passionate pursuit of goals, adventure, and bold action. High energy and enthusiasm.',
    reversedInterpretation: 'Recklessness, haste, frustration, or uncontrolled passion.',
    symbolism: 'A knight on a rearing horse holding a wand, representing dynamic action and adventure.',
    keywords: ['passion', 'action', 'adventure', 'energy', 'impulsiveness'],
    themes: ['action', 'passion', 'adventure', 'energy']
  },
  {
    name: 'Queen of Wands',
    number: 13,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Courage, confidence, independence, determination',
    uprightInterpretation: 'Confident, courageous, and independent. Vibrant energy and natural leadership.',
    reversedInterpretation: 'Self-centered, jealous, demanding, or lacking confidence.',
    symbolism: 'A queen holding a wand and sunflower, with a black cat at her feet, representing confidence and intuition.',
    keywords: ['confidence', 'courage', 'independence', 'determination', 'vibrancy'],
    themes: ['confidence', 'independence', 'determination', 'warmth']
  },
  {
    name: 'King of Wands',
    number: 14,
    suit: 'wands',
    arcana: 'minor',
    meaning: 'Leadership, vision, honor, entrepreneurship',
    uprightInterpretation: 'Natural leader with vision and entrepreneurial spirit. Bold and charismatic.',
    reversedInterpretation: 'Ruthless, dominating, forceful, or lack of direction.',
    symbolism: 'A king on a throne holding a wand, with salamanders (representing transformation) on his robes.',
    keywords: ['leadership', 'vision', 'entrepreneurship', 'honor', 'boldness'],
    themes: ['leadership', 'vision', 'boldness', 'charisma']
  },

  // MINOR ARCANA - CUPS (1-14)
  {
    name: 'Ace of Cups',
    number: 1,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Love, new relationships, compassion, creativity',
    uprightInterpretation: 'New love, emotional beginnings, and spiritual connection. Opening your heart.',
    reversedInterpretation: 'Emotional loss, blocked creativity, or repressed emotions.',
    symbolism: 'A hand emerging from clouds holding an overflowing cup, representing divine love and emotional abundance.',
    keywords: ['love', 'emotion', 'compassion', 'creativity', 'new feelings'],
    themes: ['new love', 'emotions', 'creativity', 'spirituality']
  },
  {
    name: 'Two of Cups',
    number: 2,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Unified love, partnership, mutual attraction',
    uprightInterpretation: 'Partnership, unity, and mutual attraction. Harmonious relationships.',
    reversedInterpretation: 'Imbalance, broken relationships, or disharmony.',
    symbolism: 'Two figures exchanging cups beneath the caduceus, representing partnership and balance.',
    keywords: ['partnership', 'unity', 'love', 'attraction', 'harmony'],
    themes: ['partnership', 'unity', 'love', 'connection']
  },
  {
    name: 'Three of Cups',
    number: 3,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Celebration, friendship, creativity, community',
    uprightInterpretation: 'Celebration with friends, creative collaboration, and joyful gatherings.',
    reversedInterpretation: 'Isolation, canceled celebrations, or strained friendships.',
    symbolism: 'Three figures raising cups in celebration, representing friendship and community.',
    keywords: ['celebration', 'friendship', 'creativity', 'community', 'joy'],
    themes: ['celebration', 'friendship', 'community', 'creativity']
  },
  {
    name: 'Four of Cups',
    number: 4,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Meditation, contemplation, apathy, reevaluation',
    uprightInterpretation: 'Contemplation, apathy, or missing opportunities. Look within for answers.',
    reversedInterpretation: 'New perspectives, acceptance, or renewed interest.',
    symbolism: 'A figure sitting under a tree, arms crossed, ignoring three cups while a hand offers a fourth.',
    keywords: ['contemplation', 'apathy', 'reevaluation', 'meditation', 'introspection'],
    themes: ['contemplation', 'apathy', 'introspection', 'opportunity']
  },
  {
    name: 'Five of Cups',
    number: 5,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Regret, failure, disappointment, pessimism',
    uprightInterpretation: 'Loss, regret, and disappointment. Focus on what remains, not what\'s lost.',
    reversedInterpretation: 'Acceptance, moving on, finding peace, or recovery.',
    symbolism: 'A cloaked figure mourning three spilled cups while two remain standing behind.',
    keywords: ['regret', 'loss', 'disappointment', 'pessimism', 'grief'],
    themes: ['loss', 'regret', 'disappointment', 'acceptance']
  },
  {
    name: 'Six of Cups',
    number: 6,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Nostalgia, memories, childhood, innocence',
    uprightInterpretation: 'Nostalgia, happy memories, and childhood innocence. Reunion with the past.',
    reversedInterpretation: 'Living in the past, unrealistic expectations, or moving forward.',
    symbolism: 'Children sharing cups filled with flowers, representing innocence and happy memories.',
    keywords: ['nostalgia', 'memories', 'childhood', 'innocence', 'reunion'],
    themes: ['nostalgia', 'memories', 'innocence', 'past']
  },
  {
    name: 'Seven of Cups',
    number: 7,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Choices, fantasy, illusion, wishful thinking',
    uprightInterpretation: 'Many choices and opportunities. Beware of illusion and unrealistic expectations.',
    reversedInterpretation: 'Clarity, making choices, or overcoming confusion.',
    symbolism: 'A figure viewing seven cups filled with various visions, representing choices and illusions.',
    keywords: ['choices', 'fantasy', 'illusion', 'opportunities', 'imagination'],
    themes: ['choices', 'illusion', 'fantasy', 'opportunity']
  },
  {
    name: 'Eight of Cups',
    number: 8,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Disappointment, abandonment, withdrawal, escapism',
    uprightInterpretation: 'Walking away from something unfulfilling. Seeking deeper meaning.',
    reversedInterpretation: 'Fear of change, staying in bad situations, or trying one more time.',
    symbolism: 'A figure walking away from eight cups toward mountains, representing spiritual journey.',
    keywords: ['withdrawal', 'abandonment', 'disappointment', 'escapism', 'seeking'],
    themes: ['withdrawal', 'abandonment', 'seeking', 'journey']
  },
  {
    name: 'Nine of Cups',
    number: 9,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Contentment, satisfaction, gratitude, wish fulfillment',
    uprightInterpretation: 'Wish fulfillment, emotional satisfaction, and contentment. The "wish card".',
    reversedInterpretation: 'Greed, dissatisfaction, materialism, or inner happiness needed.',
    symbolism: 'A satisfied figure sitting before nine cups arranged in an arc, representing fulfillment.',
    keywords: ['satisfaction', 'contentment', 'wishes', 'gratitude', 'fulfillment'],
    themes: ['satisfaction', 'wishes', 'contentment', 'abundance']
  },
  {
    name: 'Ten of Cups',
    number: 10,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Divine love, harmony, alignment, happy family',
    uprightInterpretation: 'Perfect harmony, happy family, and divine love. Emotional fulfillment.',
    reversedInterpretation: 'Broken relationships, family issues, or misalignment of values.',
    symbolism: 'A couple with children beneath a rainbow of ten cups, representing family harmony.',
    keywords: ['harmony', 'love', 'family', 'alignment', 'bliss'],
    themes: ['harmony', 'family', 'love', 'fulfillment']
  },
  {
    name: 'Page of Cups',
    number: 11,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Creative opportunities, intuitive messages, curiosity',
    uprightInterpretation: 'Intuitive messages, creative opportunities, and emotional curiosity.',
    reversedInterpretation: 'Emotional immaturity, creative blocks, or ignoring intuition.',
    symbolism: 'A youth holding a cup with a fish emerging, representing intuitive messages.',
    keywords: ['creativity', 'intuition', 'curiosity', 'messages', 'sensitivity'],
    themes: ['creativity', 'intuition', 'messages', 'emotion']
  },
  {
    name: 'Knight of Cups',
    number: 12,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Romance, charm, imagination, idealism',
    uprightInterpretation: 'Romantic proposals, charm, and creative inspiration. Following your heart.',
    reversedInterpretation: 'Moodiness, jealousy, unrealistic expectations, or overactive imagination.',
    symbolism: 'A knight on a white horse holding a cup, representing romantic idealism.',
    keywords: ['romance', 'charm', 'idealism', 'imagination', 'proposals'],
    themes: ['romance', 'idealism', 'charm', 'creativity']
  },
  {
    name: 'Queen of Cups',
    number: 13,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Compassion, calm, comfort, emotional stability',
    uprightInterpretation: 'Compassionate, intuitive, and emotionally mature. Nurturing and healing.',
    reversedInterpretation: 'Emotional instability, codependency, or martyrdom.',
    symbolism: 'A queen on a throne by the sea holding an ornate cup, representing emotional depth.',
    keywords: ['compassion', 'calm', 'intuition', 'nurturing', 'emotional'],
    themes: ['compassion', 'intuition', 'nurturing', 'emotion']
  },
  {
    name: 'King of Cups',
    number: 14,
    suit: 'cups',
    arcana: 'minor',
    meaning: 'Emotional balance, compassion, diplomacy',
    uprightInterpretation: 'Emotionally balanced, compassionate leader. Wise counsel and diplomacy.',
    reversedInterpretation: 'Emotional manipulation, moodiness, or volatility.',
    symbolism: 'A king on a throne in the sea holding a cup, representing emotional mastery.',
    keywords: ['balance', 'compassion', 'diplomacy', 'wisdom', 'emotional control'],
    themes: ['emotional balance', 'wisdom', 'compassion', 'diplomacy']
  },

  // MINOR ARCANA - SWORDS (1-14)
  {
    name: 'Ace of Swords',
    number: 1,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Breakthrough, clarity, sharp mind, new ideas',
    uprightInterpretation: 'Mental clarity, breakthrough, and new ideas. Truth cutting through confusion.',
    reversedInterpretation: 'Confusion, chaos, lack of clarity, or destructive thinking.',
    symbolism: 'A hand emerging from clouds holding a sword crowned with a wreath, representing mental clarity.',
    keywords: ['clarity', 'breakthrough', 'truth', 'ideas', 'mental power'],
    themes: ['clarity', 'truth', 'mental power', 'breakthrough']
  },
  {
    name: 'Two of Swords',
    number: 2,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Difficult decisions, indecision, stalemate, avoidance',
    uprightInterpretation: 'Difficult choice, indecision, or stalemate. Need to make a decision.',
    reversedInterpretation: 'Clarity emerging, moving forward, or overwhelming choices.',
    symbolism: 'A blindfolded figure holding two crossed swords, representing difficult choices.',
    keywords: ['indecision', 'stalemate', 'choices', 'avoidance', 'balance'],
    themes: ['indecision', 'stalemate', 'choices', 'conflict']
  },
  {
    name: 'Three of Swords',
    number: 3,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Heartbreak, emotional pain, sorrow, grief',
    uprightInterpretation: 'Heartbreak, emotional pain, and sorrow. Necessary release of pain.',
    reversedInterpretation: 'Recovery, forgiveness, moving on, or suppressed emotions.',
    symbolism: 'A heart pierced by three swords beneath storm clouds, representing heartbreak.',
    keywords: ['heartbreak', 'sorrow', 'grief', 'pain', 'loss'],
    themes: ['heartbreak', 'sorrow', 'pain', 'release']
  },
  {
    name: 'Four of Swords',
    number: 4,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Rest, relaxation, meditation, contemplation',
    uprightInterpretation: 'Rest, recovery, and contemplation. Time to recharge and reflect.',
    reversedInterpretation: 'Restlessness, burnout, or resistance to rest.',
    symbolism: 'A figure lying in rest with three swords above and one below, representing recuperation.',
    keywords: ['rest', 'recovery', 'meditation', 'contemplation', 'peace'],
    themes: ['rest', 'recovery', 'contemplation', 'peace']
  },
  {
    name: 'Five of Swords',
    number: 5,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Conflict, defeat, winning at all costs, betrayal',
    uprightInterpretation: 'Conflict, defeat, or hollow victory. Winning at all costs has consequences.',
    reversedInterpretation: 'Making amends, reconciliation, or moving past conflict.',
    symbolism: 'A figure collecting swords while others walk away defeated, representing hollow victory.',
    keywords: ['conflict', 'defeat', 'betrayal', 'victory', 'loss'],
    themes: ['conflict', 'defeat', 'betrayal', 'victory']
  },
  {
    name: 'Six of Swords',
    number: 6,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Transition, change, release, moving on',
    uprightInterpretation: 'Transition to calmer waters, moving on, and releasing the past.',
    reversedInterpretation: 'Resistance to change, unfinished business, or stuck in the past.',
    symbolism: 'Figures in a boat moving toward calmer waters, representing transition.',
    keywords: ['transition', 'change', 'moving on', 'release', 'journey'],
    themes: ['transition', 'moving on', 'change', 'journey']
  },
  {
    name: 'Seven of Swords',
    number: 7,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Betrayal, deception, strategy, stealth',
    uprightInterpretation: 'Deception, betrayal, or strategic thinking. Someone may not be trustworthy.',
    reversedInterpretation: 'Coming clean, conscience, or revealing secrets.',
    symbolism: 'A figure sneaking away with five swords while leaving two behind, representing deception.',
    keywords: ['betrayal', 'deception', 'strategy', 'stealth', 'cunning'],
    themes: ['deception', 'betrayal', 'strategy', 'secrets']
  },
  {
    name: 'Eight of Swords',
    number: 8,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Restriction, imprisonment, self-imposed limitation',
    uprightInterpretation: 'Feeling trapped, restricted, or victimized. Mental prison of own making.',
    reversedInterpretation: 'Freedom, release, or removing limitations.',
    symbolism: 'A bound and blindfolded figure surrounded by swords, representing self-imposed restriction.',
    keywords: ['restriction', 'imprisonment', 'victimization', 'limitation', 'trapped'],
    themes: ['restriction', 'limitation', 'fear', 'victimization']
  },
  {
    name: 'Nine of Swords',
    number: 9,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Anxiety, worry, fear, depression, nightmares',
    uprightInterpretation: 'Anxiety, worry, and mental anguish. Often worse in imagination than reality.',
    reversedInterpretation: 'Hope, recovery, or reaching out for help.',
    symbolism: 'A figure sitting up in bed with hands covering face, nine swords above, representing anxiety.',
    keywords: ['anxiety', 'worry', 'fear', 'nightmares', 'stress'],
    themes: ['anxiety', 'worry', 'fear', 'mental anguish']
  },
  {
    name: 'Ten of Swords',
    number: 10,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Painful endings, betrayal, loss, crisis',
    uprightInterpretation: 'Rock bottom, painful ending, or betrayal. It can\'t get worse; only up from here.',
    reversedInterpretation: 'Recovery, regeneration, or resisting inevitable end.',
    symbolism: 'A figure face-down with ten swords in their back, dawn breaking, representing rock bottom.',
    keywords: ['endings', 'betrayal', 'crisis', 'loss', 'rock bottom'],
    themes: ['endings', 'betrayal', 'crisis', 'regeneration']
  },
  {
    name: 'Page of Swords',
    number: 11,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Curiosity, restlessness, mental energy, vigilance',
    uprightInterpretation: 'Curious, mental energy, and new ideas. Vigilant and ready for action.',
    reversedInterpretation: 'Gossip, deception, all talk no action, or scattered thoughts.',
    symbolism: 'A youth holding a sword, standing alert, representing mental agility and vigilance.',
    keywords: ['curiosity', 'vigilance', 'mental energy', 'ideas', 'communication'],
    themes: ['curiosity', 'mental energy', 'communication', 'vigilance']
  },
  {
    name: 'Knight of Swords',
    number: 12,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Ambition, action, driven, fast thinking',
    uprightInterpretation: 'Ambitious, driven, and fast-thinking action. Direct approach to goals.',
    reversedInterpretation: 'Reckless, impulsive, unfocused, or aggressive.',
    symbolism: 'A knight charging forward with sword raised, representing swift action.',
    keywords: ['ambition', 'action', 'speed', 'directness', 'assertiveness'],
    themes: ['ambition', 'action', 'speed', 'assertiveness']
  },
  {
    name: 'Queen of Swords',
    number: 13,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Independent, unbiased judgment, clear boundaries',
    uprightInterpretation: 'Independent thinking, clear boundaries, and honest communication.',
    reversedInterpretation: 'Coldness, cruelty, bitterness, or holding grudges.',
    symbolism: 'A queen on throne holding an upright sword, representing clarity and independence.',
    keywords: ['independence', 'judgment', 'clarity', 'boundaries', 'honesty'],
    themes: ['independence', 'clarity', 'honesty', 'boundaries']
  },
  {
    name: 'King of Swords',
    number: 14,
    suit: 'swords',
    arcana: 'minor',
    meaning: 'Mental clarity, intellectual power, authority, truth',
    uprightInterpretation: 'Mental clarity, intellectual power, and fair authority. Logical and truthful.',
    reversedInterpretation: 'Manipulative, tyrannical, abusive power, or clouded judgment.',
    symbolism: 'A king on throne holding an upright sword, representing intellectual authority.',
    keywords: ['clarity', 'authority', 'truth', 'logic', 'intellectual'],
    themes: ['mental clarity', 'authority', 'truth', 'logic']
  },

  // MINOR ARCANA - PENTACLES (1-14)
  {
    name: 'Ace of Pentacles',
    number: 1,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Opportunity, prosperity, new financial venture',
    uprightInterpretation: 'New financial opportunity, prosperity, and material abundance beginning.',
    reversedInterpretation: 'Lost opportunity, missed chance, or poor financial planning.',
    symbolism: 'A hand emerging from clouds holding a pentacle above a garden, representing material opportunity.',
    keywords: ['opportunity', 'prosperity', 'abundance', 'manifestation', 'new venture'],
    themes: ['opportunity', 'prosperity', 'abundance', 'new beginnings']
  },
  {
    name: 'Two of Pentacles',
    number: 2,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Balance, adaptability, time management, priorities',
    uprightInterpretation: 'Juggling multiple priorities, adaptability, and finding balance.',
    reversedInterpretation: 'Overwhelmed, disorganization, or dropping the ball.',
    symbolism: 'A figure juggling two pentacles connected by infinity symbol, representing balance.',
    keywords: ['balance', 'adaptability', 'priorities', 'flexibility', 'juggling'],
    themes: ['balance', 'adaptability', 'priorities', 'flexibility']
  },
  {
    name: 'Three of Pentacles',
    number: 3,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Teamwork, collaboration, skill, competence',
    uprightInterpretation: 'Teamwork, collaboration, and skill development. Working together toward goals.',
    reversedInterpretation: 'Lack of teamwork, mediocrity, or working alone.',
    symbolism: 'A craftsperson working on a cathedral with others, representing collaboration and skill.',
    keywords: ['teamwork', 'collaboration', 'skill', 'competence', 'planning'],
    themes: ['teamwork', 'collaboration', 'skill', 'apprenticeship']
  },
  {
    name: 'Four of Pentacles',
    number: 4,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Security, conservation, scarcity, control',
    uprightInterpretation: 'Financial security, conservation, but also possessiveness and control.',
    reversedInterpretation: 'Generosity, letting go, or financial insecurity.',
    symbolism: 'A figure clutching pentacles tightly, representing control and security.',
    keywords: ['security', 'control', 'conservation', 'possessiveness', 'stability'],
    themes: ['security', 'control', 'conservation', 'materialism']
  },
  {
    name: 'Five of Pentacles',
    number: 5,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Financial loss, poverty, isolation, hardship',
    uprightInterpretation: 'Financial hardship, feeling left out, or material loss. Help is available.',
    reversedInterpretation: 'Recovery, improving finances, or spiritual poverty.',
    symbolism: 'Two figures walking in snow past a lit church window, representing hardship but hope nearby.',
    keywords: ['hardship', 'loss', 'poverty', 'isolation', 'insecurity'],
    themes: ['hardship', 'loss', 'poverty', 'isolation']
  },
  {
    name: 'Six of Pentacles',
    number: 6,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Generosity, charity, giving, sharing wealth',
    uprightInterpretation: 'Generosity, charity, and sharing wealth. Giving or receiving help.',
    reversedInterpretation: 'Strings attached, debt, inequality, or one-sided charity.',
    symbolism: 'A wealthy figure giving coins to beggars while holding balanced scales, representing fair charity.',
    keywords: ['generosity', 'charity', 'sharing', 'prosperity', 'gifts'],
    themes: ['generosity', 'charity', 'sharing', 'prosperity']
  },
  {
    name: 'Seven of Pentacles',
    number: 7,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Assessment, patience, long-term view, investment',
    uprightInterpretation: 'Assessing progress, patience, and long-term investment. Pausing to evaluate.',
    reversedInterpretation: 'Impatience, lack of progress, or poor investment.',
    symbolism: 'A figure leaning on a tool, viewing growing pentacles, representing assessment of effort.',
    keywords: ['assessment', 'patience', 'investment', 'progress', 'long-term'],
    themes: ['assessment', 'patience', 'investment', 'progress']
  },
  {
    name: 'Eight of Pentacles',
    number: 8,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Apprenticeship, mastery, skill development, diligence',
    uprightInterpretation: 'Dedication to craft, skill development, and mastery through practice.',
    reversedInterpretation: 'Lack of focus, mediocrity, or shortcuts.',
    symbolism: 'A craftsperson diligently working on pentacles, representing dedication to mastery.',
    keywords: ['skill', 'mastery', 'apprenticeship', 'diligence', 'dedication'],
    themes: ['skill', 'mastery', 'dedication', 'craftsmanship']
  },
  {
    name: 'Nine of Pentacles',
    number: 9,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Abundance, luxury, self-sufficiency, independence',
    uprightInterpretation: 'Financial independence, luxury, and self-sufficiency through hard work.',
    reversedInterpretation: 'Financial setbacks, overworking, or living beyond means.',
    symbolism: 'A wealthy figure in a garden with pentacles, representing self-made success.',
    keywords: ['abundance', 'luxury', 'independence', 'self-sufficiency', 'success'],
    themes: ['abundance', 'independence', 'luxury', 'success']
  },
  {
    name: 'Ten of Pentacles',
    number: 10,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Wealth, inheritance, family, legacy, tradition',
    uprightInterpretation: 'Long-term financial security, family wealth, and legacy. Generational prosperity.',
    reversedInterpretation: 'Family disputes, financial instability, or fleeting success.',
    symbolism: 'A multi-generational family with pentacles, representing lasting wealth and legacy.',
    keywords: ['wealth', 'legacy', 'family', 'inheritance', 'tradition'],
    themes: ['wealth', 'legacy', 'family', 'tradition']
  },
  {
    name: 'Page of Pentacles',
    number: 11,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Ambition, goal-setting, learning, manifestation',
    uprightInterpretation: 'New financial opportunity, goal-setting, and practical learning.',
    reversedInterpretation: 'Procrastination, lack of progress, or lack of commitment.',
    symbolism: 'A youth holding a pentacle, gazing at it thoughtfully, representing new opportunity.',
    keywords: ['ambition', 'goals', 'learning', 'opportunity', 'manifestation'],
    themes: ['ambition', 'opportunity', 'learning', 'manifestation']
  },
  {
    name: 'Knight of Pentacles',
    number: 12,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Efficiency, hard work, routine, responsibility',
    uprightInterpretation: 'Hardworking, responsible, and methodical approach. Steady progress.',
    reversedInterpretation: 'Laziness, obsessiveness, or workaholic tendencies.',
    symbolism: 'A knight on a stationary horse holding a pentacle, representing methodical progress.',
    keywords: ['efficiency', 'routine', 'hard work', 'responsibility', 'methodical'],
    themes: ['hard work', 'routine', 'responsibility', 'efficiency']
  },
  {
    name: 'Queen of Pentacles',
    number: 13,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Practicality, nurturing, security, comfort',
    uprightInterpretation: 'Practical, nurturing, and grounded. Creating comfort and security.',
    reversedInterpretation: 'Financial insecurity, smothering, or neglecting self-care.',
    symbolism: 'A queen on throne in nature holding a pentacle, representing grounded prosperity.',
    keywords: ['practicality', 'nurturing', 'security', 'comfort', 'abundance'],
    themes: ['practicality', 'nurturing', 'security', 'abundance']
  },
  {
    name: 'King of Pentacles',
    number: 14,
    suit: 'pentacles',
    arcana: 'minor',
    meaning: 'Wealth, business, leadership, security, abundance',
    uprightInterpretation: 'Financial success, business acumen, and material abundance. Reliable provider.',
    reversedInterpretation: 'Greed, materialism, or financial instability.',
    symbolism: 'A king on throne surrounded by pentacles and abundance, representing mastery of material world.',
    keywords: ['wealth', 'success', 'leadership', 'security', 'abundance'],
    themes: ['wealth', 'success', 'leadership', 'abundance']
  },
];

async function seedCards() {
  try {
    console.log('🌟 Starting tarot card seeding...');
    console.log(`📊 Total cards to insert: ${tarotCards.length}`);

    // Insert cards in batches to avoid overwhelming the database
    const batchSize = 10;
    let inserted = 0;

    for (let i = 0; i < tarotCards.length; i += batchSize) {
      const batch = tarotCards.slice(i, i + batchSize);
      await db.insert(cards).values(batch);
      inserted += batch.length;
      console.log(`✅ Inserted ${inserted}/${tarotCards.length} cards...`);
    }

    console.log('\n✨ Card seeding completed successfully!');
    console.log('\n📈 Summary:');
    console.log(`   - Major Arcana: 22 cards (0-21)`);
    console.log(`   - Minor Arcana - Wands: 14 cards`);
    console.log(`   - Minor Arcana - Cups: 14 cards`);
    console.log(`   - Minor Arcana - Swords: 14 cards`);
    console.log(`   - Minor Arcana - Pentacles: 14 cards`);
    console.log(`   - Total: 78 cards`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding cards:', error);
    process.exit(1);
  }
}

seedCards();
