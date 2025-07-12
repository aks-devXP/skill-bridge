# SkillBridge Frontend

This is the frontend application for SkillBridge, built with React and Vite.

## Features

- ⚡️ **Vite** - Fast development and building
- ⚛️ **React 18** - Latest React features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🚀 **Modern JavaScript** - ES2020+ features
- 📱 **Responsive Design** - Mobile-first approach
- 🔧 **ESLint** - Code linting and formatting
- 🎯 **Import Aliases** - Clean import paths with `@/`

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── contexts/      # React contexts (Auth, etc.)
├── services/      # API service functions
├── utils/         # Utility functions
├── App.jsx        # Main app component
├── main.jsx       # Entry point
├── App.css        # Global styles
└── index.css      # Base styles
```

## Import Aliases

The project uses import aliases for cleaner imports:

```javascript
// Instead of
import Button from '../../../components/Button'

// You can use
import Button from '@/components/Button'
```

## Styling

This project uses Tailwind CSS for styling. All components use utility classes for consistent design and responsive layouts.

## Development

- **Hot Reload**: Changes are reflected immediately in the browser
- **ESLint**: Code linting with React-specific rules
- **Import Aliases**: Clean import paths with `@/` prefix
- **Modern JavaScript**: Full ES2020+ support

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Follow the existing code style
2. Use Tailwind classes for styling
3. Use import aliases (`@/`) for imports
4. Test your changes before committing

## License

This project is part of the SkillBridge platform.
