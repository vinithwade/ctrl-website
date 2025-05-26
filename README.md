# CTRL Website

A modern website showcasing the CTRL application builder - a bi-directional no-code/low-code platform.

> Last updated: June 2024 - Fixed API route handlers for admin dashboard functionality

## Features

- Modern, responsive design
- Animations on scroll
- Reviews system with database integration
- Early access request form with database storage
- Futuristic UI with glass effects and accent colors

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- SQLite for database (with serverless adaptation)
- TailwindCSS for styling

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

This project is configured for deployment on Vercel with serverless functions.

1. Connect your repository to Vercel
2. Set the following environment variables:
   - `NODE_ENV`: production

The SQLite database is adapted to work in Vercel's serverless environment by using the `/tmp` directory. Note that in a production environment, you might want to consider a more persistent database solution.

## License

MIT

## Project Structure

```
ctrl-website/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Reviews.tsx
│   │   ├── Download.tsx
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
├── tailwind.config.mjs # Tailwind configuration
└── README.md
```

## Contact

For questions or feedback, please reach out to [your-email@example.com](mailto:your-email@example.com).
