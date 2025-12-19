# Tarot Card Images Guide

This guide explains how to add visual card representations to your tarot reading app.

## 🎴 Current Status

The app is **fully functional without images**. The `TarotCard` component includes:
- Beautiful SVG-generated placeholder cards
- Suit-specific color gradients (purple for major arcana, orange for wands, blue for cups, gray for swords, green for pentacles)
- Suit emoji symbols (🔥 for wands, 💧 for cups, ⚔️ for swords, ⭐ for pentacles, ✨ for major arcana)
- Card names and numbers
- Mystical card back design with gold borders

## 📁 Directory Structure

```
client/public/cards/
├── the-fool.jpg
├── the-magician.jpg
├── the-high-priestess.jpg
├── ... (75 more cards)
└── king-of-pentacles.jpg
```

## 🆓 Free Tarot Card Image Sources

### 1. Rider-Waite-Smith Deck (Public Domain)

The classic Rider-Waite-Smith tarot deck is in the public domain and freely available:

#### **Sacred Texts** (Recommended)
- URL: https://sacred-texts.com/tarot/
- Format: Individual high-quality images
- License: Public Domain
- Download: Right-click each card and save

#### **Archive.org**
- URL: https://archive.org/details/riderwaitesmith
- Format: Complete deck archives
- License: Public Domain
- Download: Bulk download available

#### **Wikimedia Commons**
- URL: https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck
- Format: SVG and high-res JPG
- License: Public Domain
- Download: Individual files or bulk download tools

### 2. Other Free Decks

#### **Open Tarot**
- GitHub: https://github.com/topics/tarot-cards
- Various open-source tarot projects with free images
- Check individual licenses

#### **Labyrinthos Academy**
- URL: https://labyrinthos.co/blogs/tarot-card-meanings-list
- Free for educational use (check license)
- Modern interpretations available

## 🎨 AI-Generated Alternative

### Using AI to Generate Custom Cards

#### **Stable Diffusion** (Free, Open Source)
```bash
# Example prompt for The Fool card:
"Mystical tarot card design for The Fool, young person at cliff edge, 
white dog companion, mountains in background, art nouveau style, 
gold borders, vintage tarot aesthetic, detailed illustration"
```

Tools:
- Stable Diffusion Web: https://stablediffusionweb.com/
- DreamStudio: https://beta.dreamstudio.ai/
- Leonardo.ai: https://leonardo.ai/ (free tier available)

#### **Midjourney** (Paid)
- URL: https://www.midjourney.com/
- Cost: $10/month (basic plan)
- High-quality, consistent style

#### **DALL-E 3** (Paid)
- URL: https://openai.com/dall-e-3
- Cost: Pay per image
- Excellent quality and following of prompts

### AI Prompt Template

```
"Tarot card illustration for [CARD NAME], [KEY SYMBOLISM], 
mystical art nouveau style, ornate gold border, vintage tarot aesthetic, 
detailed symbolic imagery, [COLOR PALETTE], aspect ratio 2:3"
```

Example prompts:
```
The Fool: "young traveler at mountain cliff, white dog, sun rising, 
         bundle on stick, carefree expression"
The Magician: "robed figure at altar, infinity symbol above head, 
              wand raised, four suit symbols on table"
The High Priestess: "woman between two pillars, crescent moon crown, 
                    Torah scroll, pomegranates"
```

## 📋 Setup Instructions

### Step 1: Create the Cards Directory

```bash
mkdir -p client/public/cards
```

### Step 2: Download Card Images

Choose one of these methods:

**Method A: Manual Download (Rider-Waite)**
1. Visit https://sacred-texts.com/tarot/
2. Right-click each card image
3. Save to `client/public/cards/` with correct filename

**Method B: Bulk Download Script** (Advanced)
```bash
# Create a download script (example using wget)
wget -P client/public/cards/ https://example.com/tarot/the-fool.jpg
wget -P client/public/cards/ https://example.com/tarot/the-magician.jpg
# ... repeat for all 78 cards
```

**Method C: AI Generation**
1. Use Stable Diffusion or other AI tool
2. Generate each card using prompts from this guide
3. Save with correct filenames

### Step 3: Check Your Progress

Run the image checker script:

```bash
node scripts/download-card-images.mjs
```

This will show:
- How many cards you have (✅)
- Which cards are missing (❌)
- A generated checklist in `CARD_IMAGES_LIST.md`

### Step 4: Update Database URLs

Once you have some images, update the database:

```bash
node scripts/update-card-images.mjs
```

This automatically sets the `imageUrl` field for all cards to point to `/cards/[card-name].jpg`

## 🎯 Image Specifications

### Recommended Format
- **File Type**: JPG or PNG
- **Aspect Ratio**: 2:3 (portrait)
- **Resolution**: 600x900 pixels minimum (higher is better)
- **Max File Size**: 500KB per image (for performance)
- **Color Space**: sRGB

### Naming Convention

Cards must be named exactly as shown:

```
Major Arcana:
  the-fool.jpg, the-magician.jpg, the-high-priestess.jpg, etc.

Minor Arcana:
  ace-of-wands.jpg, two-of-wands.jpg, three-of-wands.jpg, etc.
  ace-of-cups.jpg, two-of-cups.jpg, etc.
  ace-of-swords.jpg, two-of-swords.jpg, etc.
  ace-of-pentacles.jpg, two-of-pentacles.jpg, etc.

Court Cards:
  page-of-wands.jpg, knight-of-wands.jpg, queen-of-wands.jpg, king-of-wands.jpg
```

**Full list available in `scripts/download-card-images.mjs`**

## 🔧 Image Optimization

### Compress Images (Optional but Recommended)

Use one of these tools to reduce file size:

```bash
# Using ImageMagick
for img in client/public/cards/*.jpg; do
  convert "$img" -quality 85 -resize 600x900 "$img"
done

# Using TinyPNG (online)
# Visit https://tinypng.com/ and upload images

# Using Squoosh (CLI)
npx @squoosh/cli --mozjpeg '{"quality":85}' client/public/cards/*.jpg
```

## 🎨 Custom Card Back

To add a custom card back image:

1. Create `client/public/cards/card-back.jpg`
2. Update `TarotCard.tsx` component:

```tsx
function CardBack({ className }: { className?: string }) {
  return (
    <img 
      src="/cards/card-back.jpg" 
      alt="Card back" 
      className={cn('w-full h-full rounded-lg', className)}
    />
  );
}
```

## 🚀 What Happens If Images Are Missing?

The app is designed to work seamlessly without images:

1. **TarotCard Component** automatically detects missing images
2. **Fallback to generated SVG placeholders** with:
   - Beautiful gradients matching the suit
   - Card name and number
   - Suit emoji symbols
   - Professional appearance
3. **No broken image icons** - users see attractive placeholders

## 📊 Progress Tracking

Run this command anytime to check your progress:

```bash
node scripts/download-card-images.mjs
```

Output example:
```
🃏 Tarot Card Images Status:

✅ Found: 42/78 cards
❌ Missing: 36/78 cards

📄 Missing card images:
-------------------
1. The Star (the-star.jpg)
2. The Moon (the-moon.jpg)
...
```

## 🎭 Legal Considerations

### Public Domain
- Rider-Waite-Smith deck (published 1909) is public domain
- No attribution required
- Free for commercial use

### AI-Generated
- You own the rights to AI-generated images
- Check specific AI tool's terms of service
- Some tools require attribution

### Third-Party Decks
- Always check the license
- Some decks allow non-commercial use only
- Attribution may be required

## 💡 Tips & Best Practices

1. **Start with Major Arcana** (22 cards) - they're most commonly used
2. **Batch process images** to maintain consistent sizing
3. **Use descriptive alt text** for accessibility
4. **Keep originals** in a separate folder before optimizing
5. **Test loading speed** after adding images
6. **Consider lazy loading** for better performance

## 🔗 Useful Links

- [Tarot Wikipedia](https://en.wikipedia.org/wiki/Tarot)
- [Rider-Waite Symbolism Guide](https://www.biddytarot.com/tarot-card-meanings/)
- [Archive.org Tarot Collection](https://archive.org/details/tarot)
- [Public Domain Review](https://publicdomainreview.org/)

## 📞 Need Help?

If you encounter issues:

1. Check that filenames match exactly (case-sensitive on some systems)
2. Verify images are in `client/public/cards/` directory
3. Run `node scripts/download-card-images.mjs` to debug
4. Check browser console for 404 errors on missing images
5. The app will gracefully show placeholders for any missing images

---

**Remember**: The app works perfectly with generated placeholders. Adding real images is optional but enhances the visual experience!
