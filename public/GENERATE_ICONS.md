# Generate PWA Icons

## Quick Method (Recommended)

1. Open `generate-icons.html` in your browser (double-click the file)
2. Icons will be automatically generated and displayed
3. Right-click each icon and select "Save image as..."
4. Save each icon to the `public/` folder with the exact filename shown:
   - `pwa-192x192.png` (192x192)
   - `pwa-512x512.png` (512x512)
   - `apple-touch-icon.png` (180x180)
   - `favicon-32x32.png` (32x32)
   - `favicon-16x16.png` (16x16)

## Alternative: Use Online Tool

If you prefer, you can use an online PWA icon generator:

1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload the `icon.svg` file from the `public/` folder
3. Download the generated icons
4. Place them in the `public/` folder

## Alternative: Use Figma/Photoshop

1. Open `icon.svg` in Figma, Photoshop, or any design tool
2. Export as PNG at these sizes:
   - 192x192 → `pwa-192x192.png`
   - 512x512 → `pwa-512x512.png`
   - 180x180 → `apple-touch-icon.png`
   - 32x32 → `favicon-32x32.png`
   - 16x16 → `favicon-16x16.png`
3. Save to `public/` folder

## Verify PWA Installation

After generating icons and deploying:

### On Android:
1. Open your app in Chrome
2. Look for "Install app" prompt or menu option (⋮ → Install app)
3. The app should appear on your home screen with the icon

### On iOS:
1. Open your app in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. The app should appear on your home screen with the icon

## Troubleshooting

If PWA installation doesn't work:

1. **Check HTTPS**: PWA requires HTTPS (works on localhost and deployed sites)
2. **Clear cache**: Clear browser cache and reload
3. **Check manifest**: Open DevTools → Application → Manifest (should show no errors)
4. **Check service worker**: DevTools → Application → Service Workers (should be registered)
5. **Verify icons exist**: Check that all icon files are in `public/` folder
6. **Check console**: Look for any errors in browser console

## Icon Design

The current icon features:
- 💰 Money bag with dollar sign
- Purple gradient background (#667eea to #764ba2)
- Gold/yellow money bag (#FFD700)
- Professional and recognizable design
- Works well at all sizes (16px to 512px)

Feel free to customize `icon.svg` or `generate-icons.html` to change the design!
