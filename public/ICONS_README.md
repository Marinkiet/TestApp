# PWA Icons

## Required Icons

For the PWA to work properly, you need these icon files in the `public` folder:

- `pwa-192x192.png` - 192x192 pixels
- `pwa-512x512.png` - 512x512 pixels
- `apple-touch-icon.png` - 180x180 pixels
- `favicon.ico` - 32x32 pixels

## Quick Icon Generation

### Option 1: Use an Online Tool (Easiest)

1. Go to https://realfavicongenerator.net/
2. Upload a square image (at least 512x512)
3. Generate all icons
4. Download and extract to `public` folder

### Option 2: Use PWA Asset Generator

```bash
npm install -g pwa-asset-generator

# Generate from an image
pwa-asset-generator logo.png public --icon-only
```

### Option 3: Create Simple Icons

Use any image editor to create:
- A 512x512 PNG with your logo/icon
- Save as `pwa-512x512.png`
- Resize to 192x192 and save as `pwa-192x192.png`
- Resize to 180x180 and save as `apple-touch-icon.png`

## Recommended Icon Design

For the Finance Dashboard, consider:
- 💰 Money bag emoji
- 📊 Chart emoji
- 💎 Diamond emoji
- 🏆 Trophy emoji
- Or a custom logo with:
  - Simple design
  - High contrast
  - Recognizable at small sizes
  - Matches app theme (purple/blue gradient)

## Temporary Solution

The app will work without custom icons, but:
- Install prompt may not show properly
- Home screen icon will be generic
- Less professional appearance

For now, the app uses emoji icons which work but aren't ideal.

## Icon Specifications

### pwa-192x192.png
- Size: 192x192 pixels
- Format: PNG
- Purpose: Android home screen
- Background: Solid color or transparent

### pwa-512x512.png
- Size: 512x512 pixels
- Format: PNG
- Purpose: Android splash screen, app drawer
- Background: Solid color or transparent

### apple-touch-icon.png
- Size: 180x180 pixels
- Format: PNG
- Purpose: iOS home screen
- Background: Solid color (no transparency)

### favicon.ico
- Size: 32x32 pixels
- Format: ICO
- Purpose: Browser tab
- Background: Transparent or solid

## Testing Icons

After adding icons:
1. Clear browser cache
2. Rebuild: `npm run build`
3. Test: `npm run preview`
4. Check install prompt on mobile
5. Install and verify home screen icon

## Current Status

⚠️ **Icons need to be created**

The app is configured for PWA but needs actual icon files. Use one of the methods above to generate them.
