#!/usr/bin/env node

/**
 * Script to download tarot card images from free sources
 * 
 * This script helps you download tarot card images for your app.
 * 
 * FREE TAROT CARD IMAGE SOURCES:
 * 
 * 1. Rider-Waite-Smith (Public Domain):
 *    - Sacred Texts: https://sacred-texts.com/tarot/
 *    - Archive.org: https://archive.org/details/riderwaitesmith
 * 
 * 2. Open Tarot Project:
 *    - GitHub: https://github.com/topics/tarot-cards
 * 
 * 3. Wikimedia Commons:
 *    - https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck
 * 
 * ALTERNATIVE APPROACHES:
 * 
 * 1. Use AI to generate cards (Stable Diffusion, Midjourney, DALL-E)
 * 2. Commission an artist on Fiverr or Upwork
 * 3. Use placeholder gradients (already implemented in TarotCard.tsx)
 * 
 * USAGE:
 * 1. Download cards manually from sources above
 * 2. Place images in client/public/cards/ directory
 * 3. Name them following this pattern:
 *    - the-fool.jpg, the-magician.jpg, etc. (major arcana)
 *    - ace-of-wands.jpg, two-of-wands.jpg, etc. (minor arcana)
 * 4. Run: node scripts/download-card-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Card names matching your database
const cards = [
  // Major Arcana
  { id: 1, name: 'The Fool', filename: 'the-fool.jpg' },
  { id: 2, name: 'The Magician', filename: 'the-magician.jpg' },
  { id: 3, name: 'The High Priestess', filename: 'the-high-priestess.jpg' },
  { id: 4, name: 'The Empress', filename: 'the-empress.jpg' },
  { id: 5, name: 'The Emperor', filename: 'the-emperor.jpg' },
  { id: 6, name: 'The Hierophant', filename: 'the-hierophant.jpg' },
  { id: 7, name: 'The Lovers', filename: 'the-lovers.jpg' },
  { id: 8, name: 'The Chariot', filename: 'the-chariot.jpg' },
  { id: 9, name: 'Strength', filename: 'strength.jpg' },
  { id: 10, name: 'The Hermit', filename: 'the-hermit.jpg' },
  { id: 11, name: 'Wheel of Fortune', filename: 'wheel-of-fortune.jpg' },
  { id: 12, name: 'Justice', filename: 'justice.jpg' },
  { id: 13, name: 'The Hanged Man', filename: 'the-hanged-man.jpg' },
  { id: 14, name: 'Death', filename: 'death.jpg' },
  { id: 15, name: 'Temperance', filename: 'temperance.jpg' },
  { id: 16, name: 'The Devil', filename: 'the-devil.jpg' },
  { id: 17, name: 'The Tower', filename: 'the-tower.jpg' },
  { id: 18, name: 'The Star', filename: 'the-star.jpg' },
  { id: 19, name: 'The Moon', filename: 'the-moon.jpg' },
  { id: 20, name: 'The Sun', filename: 'the-sun.jpg' },
  { id: 21, name: 'Judgement', filename: 'judgement.jpg' },
  { id: 22, name: 'The World', filename: 'the-world.jpg' },
  
  // Minor Arcana - Wands
  { id: 23, name: 'Ace of Wands', filename: 'ace-of-wands.jpg' },
  { id: 24, name: 'Two of Wands', filename: 'two-of-wands.jpg' },
  { id: 25, name: 'Three of Wands', filename: 'three-of-wands.jpg' },
  { id: 26, name: 'Four of Wands', filename: 'four-of-wands.jpg' },
  { id: 27, name: 'Five of Wands', filename: 'five-of-wands.jpg' },
  { id: 28, name: 'Six of Wands', filename: 'six-of-wands.jpg' },
  { id: 29, name: 'Seven of Wands', filename: 'seven-of-wands.jpg' },
  { id: 30, name: 'Eight of Wands', filename: 'eight-of-wands.jpg' },
  { id: 31, name: 'Nine of Wands', filename: 'nine-of-wands.jpg' },
  { id: 32, name: 'Ten of Wands', filename: 'ten-of-wands.jpg' },
  { id: 33, name: 'Page of Wands', filename: 'page-of-wands.jpg' },
  { id: 34, name: 'Knight of Wands', filename: 'knight-of-wands.jpg' },
  { id: 35, name: 'Queen of Wands', filename: 'queen-of-wands.jpg' },
  { id: 36, name: 'King of Wands', filename: 'king-of-wands.jpg' },
  
  // Minor Arcana - Cups
  { id: 37, name: 'Ace of Cups', filename: 'ace-of-cups.jpg' },
  { id: 38, name: 'Two of Cups', filename: 'two-of-cups.jpg' },
  { id: 39, name: 'Three of Cups', filename: 'three-of-cups.jpg' },
  { id: 40, name: 'Four of Cups', filename: 'four-of-cups.jpg' },
  { id: 41, name: 'Five of Cups', filename: 'five-of-cups.jpg' },
  { id: 42, name: 'Six of Cups', filename: 'six-of-cups.jpg' },
  { id: 43, name: 'Seven of Cups', filename: 'seven-of-cups.jpg' },
  { id: 44, name: 'Eight of Cups', filename: 'eight-of-cups.jpg' },
  { id: 45, name: 'Nine of Cups', filename: 'nine-of-cups.jpg' },
  { id: 46, name: 'Ten of Cups', filename: 'ten-of-cups.jpg' },
  { id: 47, name: 'Page of Cups', filename: 'page-of-cups.jpg' },
  { id: 48, name: 'Knight of Cups', filename: 'knight-of-cups.jpg' },
  { id: 49, name: 'Queen of Cups', filename: 'queen-of-cups.jpg' },
  { id: 50, name: 'King of Cups', filename: 'king-of-cups.jpg' },
  
  // Minor Arcana - Swords
  { id: 51, name: 'Ace of Swords', filename: 'ace-of-swords.jpg' },
  { id: 52, name: 'Two of Swords', filename: 'two-of-swords.jpg' },
  { id: 53, name: 'Three of Swords', filename: 'three-of-swords.jpg' },
  { id: 54, name: 'Four of Swords', filename: 'four-of-swords.jpg' },
  { id: 55, name: 'Five of Swords', filename: 'five-of-swords.jpg' },
  { id: 56, name: 'Six of Swords', filename: 'six-of-swords.jpg' },
  { id: 57, name: 'Seven of Swords', filename: 'seven-of-swords.jpg' },
  { id: 58, name: 'Eight of Swords', filename: 'eight-of-swords.jpg' },
  { id: 59, name: 'Nine of Swords', filename: 'nine-of-swords.jpg' },
  { id: 60, name: 'Ten of Swords', filename: 'ten-of-swords.jpg' },
  { id: 61, name: 'Page of Swords', filename: 'page-of-swords.jpg' },
  { id: 62, name: 'Knight of Swords', filename: 'knight-of-swords.jpg' },
  { id: 63, name: 'Queen of Swords', filename: 'queen-of-swords.jpg' },
  { id: 64, name: 'King of Swords', filename: 'king-of-swords.jpg' },
  
  // Minor Arcana - Pentacles
  { id: 65, name: 'Ace of Pentacles', filename: 'ace-of-pentacles.jpg' },
  { id: 66, name: 'Two of Pentacles', filename: 'two-of-pentacles.jpg' },
  { id: 67, name: 'Three of Pentacles', filename: 'three-of-pentacles.jpg' },
  { id: 68, name: 'Four of Pentacles', filename: 'four-of-pentacles.jpg' },
  { id: 69, name: 'Five of Pentacles', filename: 'five-of-pentacles.jpg' },
  { id: 70, name: 'Six of Pentacles', filename: 'six-of-pentacles.jpg' },
  { id: 71, name: 'Seven of Pentacles', filename: 'seven-of-pentacles.jpg' },
  { id: 72, name: 'Eight of Pentacles', filename: 'eight-of-pentacles.jpg' },
  { id: 73, name: 'Nine of Pentacles', filename: 'nine-of-pentacles.jpg' },
  { id: 74, name: 'Ten of Pentacles', filename: 'ten-of-pentacles.jpg' },
  { id: 75, name: 'Page of Pentacles', filename: 'page-of-pentacles.jpg' },
  { id: 76, name: 'Knight of Pentacles', filename: 'knight-of-pentacles.jpg' },
  { id: 77, name: 'Queen of Pentacles', filename: 'queen-of-pentacles.jpg' },
  { id: 78, name: 'King of Pentacles', filename: 'king-of-pentacles.jpg' },
];

const cardsDir = path.join(__dirname, '..', 'client', 'public', 'cards');

function ensureDirectoryExists() {
  if (!fs.existsSync(cardsDir)) {
    fs.mkdirSync(cardsDir, { recursive: true });
    console.log(`✅ Created directory: ${cardsDir}`);
  }
}

function checkExistingImages() {
  ensureDirectoryExists();
  
  const existing = [];
  const missing = [];
  
  cards.forEach(card => {
    const imagePath = path.join(cardsDir, card.filename);
    if (fs.existsSync(imagePath)) {
      existing.push(card.name);
    } else {
      missing.push(card);
    }
  });
  
  console.log(`\n🎴 Tarot Card Images Status:\n`);
  console.log(`✅ Found: ${existing.length}/78 cards`);
  console.log(`❌ Missing: ${missing.length}/78 cards\n`);
  
  if (missing.length > 0) {
    console.log(`📄 Missing card images:`);
    console.log(`-------------------`);
    missing.forEach((card, index) => {
      console.log(`${index + 1}. ${card.name} (${card.filename})`);
    });
    console.log(`\n💡 Next steps:\n`);
    console.log(`1. Download Rider-Waite-Smith tarot images (public domain):`);
    console.log(`   - Sacred Texts: https://sacred-texts.com/tarot/`);
    console.log(`   - Archive.org: https://archive.org/details/riderwaitesmith`);
    console.log(`   - Wikimedia: https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck\n`);
    console.log(`2. Or use AI to generate custom cards:`);
    console.log(`   - Stable Diffusion: https://stablediffusionweb.com/`);
    console.log(`   - Midjourney: https://www.midjourney.com/`);
    console.log(`   - DALL-E: https://openai.com/dall-e-3\n`);
    console.log(`3. Place images in: ${cardsDir}`);
    console.log(`4. Follow the naming convention above\n`);
    console.log(`ℹ️  The app will use beautiful gradient placeholders until images are added.\n`);
  } else {
    console.log(`✨ All card images are present!\n`);
  }
  
  return { existing, missing };
}

function generateImageList() {
  const listPath = path.join(__dirname, '..', 'CARD_IMAGES_LIST.md');
  let content = `# Tarot Card Images Checklist\n\n`;
  content += `This file tracks which card images you need to add.\n\n`;
  content += `## Instructions\n\n`;
  content += `1. Download or create 78 tarot card images\n`;
  content += `2. Place them in \`client/public/cards/\` directory\n`;
  content += `3. Use the exact filenames listed below\n`;
  content += `4. Recommended format: JPG or PNG, aspect ratio 2:3\n`;
  content += `5. Recommended size: 600x900 pixels (or higher)\n\n`;
  
  content += `## Free Image Sources\n\n`;
  content += `- [Sacred Texts Rider-Waite](https://sacred-texts.com/tarot/)\n`;
  content += `- [Archive.org Collection](https://archive.org/details/riderwaitesmith)\n`;
  content += `- [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck)\n\n`;
  
  content += `## Card List\n\n`;
  
  const sections = [
    { name: 'Major Arcana', start: 0, end: 22 },
    { name: 'Wands', start: 22, end: 36 },
    { name: 'Cups', start: 36, end: 50 },
    { name: 'Swords', start: 50, end: 64 },
    { name: 'Pentacles', start: 64, end: 78 },
  ];
  
  sections.forEach(section => {
    content += `### ${section.name}\n\n`;
    for (let i = section.start; i < section.end; i++) {
      const card = cards[i];
      const imagePath = path.join(cardsDir, card.filename);
      const exists = fs.existsSync(imagePath);
      content += `- [${exists ? 'x' : ' '}] ${card.name} - \`${card.filename}\`\n`;
    }
    content += `\n`;
  });
  
  fs.writeFileSync(listPath, content);
  console.log(`📝 Generated checklist: CARD_IMAGES_LIST.md\n`);
}

// Run the checker
console.log(`\n✨ Tarot Card Image Checker\n`);
checkExistingImages();
generateImageList();
