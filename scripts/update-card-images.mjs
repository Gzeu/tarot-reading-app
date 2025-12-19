#!/usr/bin/env node

/**
 * Script to update card image URLs in the database
 * 
 * This script updates the imageUrl field for all cards in your database
 * to point to the correct location in your public directory.
 * 
 * USAGE:
 *   node scripts/update-card-images.mjs
 * 
 * Make sure your DATABASE_URL environment variable is set before running.
 */

import { drizzle } from 'drizzle-orm/mysql2';
import { eq } from 'drizzle-orm';
import { cards } from '../drizzle/schema.ts';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  process.exit(1);
}

const db = drizzle(process.env.DATABASE_URL);

// Helper function to convert card name to filename
function cardNameToFilename(name) {
  return name
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/ /g, '-')
    + '.jpg';
}

// Base URL for card images (will be served from public/cards/)
const BASE_IMAGE_URL = '/cards/';

async function updateCardImages() {
  try {
    console.log('🎴 Updating card image URLs...\n');

    // Fetch all cards
    const allCards = await db.select().from(cards);
    
    console.log(`📊 Found ${allCards.length} cards in database\n`);

    let updated = 0;
    let failed = 0;

    for (const card of allCards) {
      const filename = cardNameToFilename(card.name);
      const imageUrl = BASE_IMAGE_URL + filename;

      try {
        await db
          .update(cards)
          .set({ imageUrl })
          .where(eq(cards.id, card.id));
        
        console.log(`✅ Updated: ${card.name} -> ${imageUrl}`);
        updated++;
      } catch (error) {
        console.error(`❌ Failed to update ${card.name}:`, error.message);
        failed++;
      }
    }

    console.log(`\n✨ Update complete!`);
    console.log(`   - Successfully updated: ${updated} cards`);
    if (failed > 0) {
      console.log(`   - Failed: ${failed} cards`);
    }
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Add card images to client/public/cards/ directory`);
    console.log(`   2. Run: node scripts/download-card-images.mjs to check status`);
    console.log(`   3. The TarotCard component will show placeholders for missing images\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating card images:', error);
    process.exit(1);
  }
}

updateCardImages();
