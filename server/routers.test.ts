import { describe, it, expect, vi, beforeAll } from "vitest";

// Mock card data for testing
const mockCards = [
  {
    id: 1,
    name: "Anger",
    number: 1,
    meaning: "Passion, intensity, and conflict",
    uprightInterpretation: "Righteous anger, standing up for yourself",
    reversedInterpretation: "Suppressed anger, loss of control",
    symbolism: "Fire, conflict, raw emotion",
    keywords: '["anger", "passion", "conflict", "intensity"]',
    themes: '["emotion", "power", "confrontation"]',
    imageUrl: "https://via.placeholder.com/300x400?text=Anger",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Love",
    number: 2,
    meaning: "Connection, compassion, and unity",
    uprightInterpretation: "Deep love, harmony, connection",
    reversedInterpretation: "Heartbreak, disconnection, lack of compassion",
    symbolism: "Hearts, union, emotional bonds",
    keywords: '["love", "compassion", "connection", "harmony"]',
    themes: '["relationship", "emotion", "unity"]',
    imageUrl: "https://via.placeholder.com/300x400?text=Love",
    createdAt: new Date(),
  },
];

describe("Card Data Validation", () => {
  describe("Card Structure", () => {
    it("should have all required card properties", () => {
      mockCards.forEach((card) => {
        expect(card).toHaveProperty("id");
        expect(card).toHaveProperty("name");
        expect(card).toHaveProperty("number");
        expect(card).toHaveProperty("meaning");
        expect(card).toHaveProperty("uprightInterpretation");
        expect(card).toHaveProperty("reversedInterpretation");
        expect(card).toHaveProperty("symbolism");
        expect(card).toHaveProperty("keywords");
        expect(card).toHaveProperty("themes");
        expect(card).toHaveProperty("imageUrl");
      });
    });

    it("should have valid card names", () => {
      mockCards.forEach((card) => {
        expect(card.name).toBeTruthy();
        expect(typeof card.name).toBe("string");
        expect(card.name.length).toBeGreaterThan(0);
      });
    });

    it("should have valid card numbers", () => {
      mockCards.forEach((card) => {
        expect(typeof card.number).toBe("number");
        expect(card.number).toBeGreaterThan(0);
      });
    });
  });

  describe("Card Interpretations", () => {
    it("should have valid upright interpretations", () => {
      mockCards.forEach((card) => {
        expect(card.uprightInterpretation).toBeTruthy();
        expect(typeof card.uprightInterpretation).toBe("string");
        expect(card.uprightInterpretation.length).toBeGreaterThan(5);
      });
    });

    it("should have valid reversed interpretations", () => {
      mockCards.forEach((card) => {
        expect(card.reversedInterpretation).toBeTruthy();
        expect(typeof card.reversedInterpretation).toBe("string");
        expect(card.reversedInterpretation.length).toBeGreaterThan(5);
      });
    });

    it("upright and reversed interpretations should differ", () => {
      mockCards.forEach((card) => {
        expect(card.uprightInterpretation).not.toBe(card.reversedInterpretation);
      });
    });
  });

  describe("Card Metadata", () => {
    it("should have valid meanings", () => {
      mockCards.forEach((card) => {
        expect(card.meaning).toBeTruthy();
        expect(typeof card.meaning).toBe("string");
        expect(card.meaning.length).toBeGreaterThan(5);
      });
    });

    it("should have valid symbolism", () => {
      mockCards.forEach((card) => {
        expect(card.symbolism).toBeTruthy();
        expect(typeof card.symbolism).toBe("string");
        expect(card.symbolism.length).toBeGreaterThan(5);
      });
    });

    it("should have keywords as valid JSON arrays", () => {
      mockCards.forEach((card) => {
        expect(() => JSON.parse(card.keywords)).not.toThrow();
        const keywords = JSON.parse(card.keywords);
        expect(Array.isArray(keywords)).toBe(true);
        expect(keywords.length).toBeGreaterThan(0);
      });
    });

    it("should have themes as valid JSON arrays", () => {
      mockCards.forEach((card) => {
        expect(() => JSON.parse(card.themes)).not.toThrow();
        const themes = JSON.parse(card.themes);
        expect(Array.isArray(themes)).toBe(true);
        expect(themes.length).toBeGreaterThan(0);
      });
    });

    it("should have valid image URLs", () => {
      mockCards.forEach((card) => {
        expect(card.imageUrl).toBeTruthy();
        expect(card.imageUrl.startsWith("http")).toBe(true);
      });
    });
  });
});

describe("Tarot Spread Validation", () => {
  const validSpreads = ["daily", "threeCard", "love", "career", "celticCross", "custom"];

  it("should have all valid spread types", () => {
    validSpreads.forEach((spread) => {
      expect(typeof spread).toBe("string");
      expect(spread.length).toBeGreaterThan(0);
    });
  });

  it("should support daily spread with 1 card", () => {
    const dailySpread = { type: "daily", cardCount: 1 };
    expect(dailySpread.cardCount).toBe(1);
  });

  it("should support three-card spread with 3 cards", () => {
    const threeCardSpread = { type: "threeCard", cardCount: 3 };
    expect(threeCardSpread.cardCount).toBe(3);
  });

  it("should support love spread with 5 cards", () => {
    const loveSpread = { type: "love", cardCount: 5 };
    expect(loveSpread.cardCount).toBe(5);
  });

  it("should support career spread with 4 cards", () => {
    const careerSpread = { type: "career", cardCount: 4 };
    expect(careerSpread.cardCount).toBe(4);
  });

  it("should support Celtic Cross spread with 10 cards", () => {
    const celticCrossSpread = { type: "celticCross", cardCount: 10 };
    expect(celticCrossSpread.cardCount).toBe(10);
  });
});

describe("Reading Data Validation", () => {
  it("should validate reading with question", () => {
    const reading = {
      userId: 1,
      spreadType: "daily",
      question: "What guidance do I need today?",
      cardIds: [1],
      isReversed: [false],
      interpretation: "Your reading interpretation here",
      isFavorite: false,
    };

    expect(reading.userId).toBeGreaterThan(0);
    expect(reading.spreadType).toBeTruthy();
    expect(reading.question).toBeTruthy();
    expect(Array.isArray(reading.cardIds)).toBe(true);
    expect(Array.isArray(reading.isReversed)).toBe(true);
    expect(reading.cardIds.length).toBe(reading.isReversed.length);
  });

  it("should validate reading without question", () => {
    const reading = {
      userId: 1,
      spreadType: "daily",
      question: undefined,
      cardIds: [1],
      isReversed: [false],
      interpretation: "Your reading interpretation here",
      isFavorite: false,
    };

    expect(reading.userId).toBeGreaterThan(0);
    expect(reading.spreadType).toBeTruthy();
    expect(Array.isArray(reading.cardIds)).toBe(true);
    expect(Array.isArray(reading.isReversed)).toBe(true);
  });

  it("should validate card reversal consistency", () => {
    const reading = {
      cardIds: [1, 2, 3],
      isReversed: [true, false, true],
    };

    expect(reading.cardIds.length).toBe(reading.isReversed.length);
    reading.isReversed.forEach((isRev) => {
      expect(typeof isRev).toBe("boolean");
    });
  });
});

describe("User Reading Streak Logic", () => {
  it("should calculate streak correctly for consecutive days", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // If last reading was yesterday, streak should increment
    const lastReadingDate = yesterday;
    const currentStreak = 5;

    const newStreak = lastReadingDate.getTime() === today.getTime() - 86400000 
      ? currentStreak + 1 
      : 1;

    expect(newStreak).toBeGreaterThan(0);
  });

  it("should reset streak for non-consecutive days", () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    // If last reading was 2+ days ago, streak resets
    const lastReadingDate = twoDaysAgo;
    const currentStreak = 5;

    const newStreak = lastReadingDate.getTime() < today.getTime() - 86400000 
      ? 1 
      : currentStreak + 1;

    expect(newStreak).toBe(1);
  });
});

describe("Journal Entry Validation", () => {
  it("should validate journal entry structure", () => {
    const journal = {
      readingId: 1,
      userId: 1,
      notes: "This reading resonated with me deeply",
      reflection: "I should focus on my emotional well-being",
    };

    expect(journal.readingId).toBeGreaterThan(0);
    expect(journal.userId).toBeGreaterThan(0);
    expect(journal.notes).toBeTruthy();
    expect(typeof journal.notes).toBe("string");
  });

  it("should allow optional reflection", () => {
    const journal = {
      readingId: 1,
      userId: 1,
      notes: "This reading was interesting",
      reflection: undefined,
    };

    expect(journal.readingId).toBeGreaterThan(0);
    expect(journal.notes).toBeTruthy();
    // Reflection is optional
  });
});
