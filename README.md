# Maple St Bakery — Website

## Project Structure

```
maple-st-bakery/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── image1.png   ← Hero background (full-screen, landscape)
    ├── image2.png   ← About section (portrait recommended, 3:4)
    ├── image3.png   ← Product: Portuguese Rolls
    ├── image4.png   ← Product: Bacon Egg & Cheese Roll
    ├── image5.png   ← Product: Cannoli
    ├── image6.png   ← Product: Tiramisu Cake
    ├── image7.png   ← Product: Coconut Macaroons
    ├── image8.png   ← Product: Pastéis de Nata
    ├── image9.png   ← Product: Birthday Cakes
    ├── image10.png  ← Story banner (full-width, cinematic)
    ├── image11.png  ← Gallery image (tall/portrait)
    ├── image12.png  ← Gallery image
    ├── image13.png  ← Gallery image
    ├── image14.png  ← Gallery image (wide)
    ├── image15.png  ← Gallery image
    ├── image16.png  ← Gallery image (tall/portrait)
    └── image17.png  ← Contact/exterior photo
```

## Image Tips

- **Hero (image1):** Use a wide landscape shot — bread on counter, storefront, or
  baking in action. Minimum 1600px wide.
- **About (image2):** A portrait-oriented photo of the baker, the counter, or pastries
  up close works best.
- **Products (image3–9):** Square or slightly landscape photos of each item on a
  clean background or natural setting.
- **Banner (image10):** A moody, atmospheric kitchen or baking shot. Darker images
  work well since text overlays it.
- **Gallery (image11–16):** Mix portrait and landscape. Candid, editorial style.
- **Contact (image17):** Storefront exterior, or a welcoming interior shot.

## Deployment on Vercel

1. Push the folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → New Project → Import Git Repo.
3. Framework preset: **Other** (static site — no build step needed).
4. Root directory: the folder containing `index.html`.
5. Deploy. Done.

Or use Vercel CLI:
```bash
npm i -g vercel
cd maple-st-bakery
vercel
```

## Fonts Used
- **Cormorant Garamond** (headings) — Google Fonts
- **Jost** (body) — Google Fonts

Both load from Google Fonts CDN — no install needed.

## Notes
- No frameworks. Pure HTML/CSS/JS.
- Responsive: mobile-first, tested to 320px.
- Parallax on story banner uses native scroll events.
- Scroll animations use IntersectionObserver (no library).
- Touch devices get tap-to-reveal on product grid.
