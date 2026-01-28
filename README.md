# Professional Portfolio

A minimalistic professional portfolio website built with React and Vite to showcase your programming projects and skills.

## Features

- 🎨 Clean, minimalistic design
- 📱 Fully responsive layout
- ⚡ Fast performance with Vite
- 🎯 Sections for Hero, About, Projects, Skills, and Contact
- 🔗 Easy to customize and deploy

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

## Customization

### Personal Information

Edit the following files to add your personal information:

- **Hero Section**: [src/components/Hero.jsx](src/components/Hero.jsx) - Update your name, title, and description
- **About Section**: [src/components/About.jsx](src/components/About.jsx) - Add your bio
- **Projects**: [src/components/Projects.jsx](src/components/Projects.jsx) - Replace sample projects with your own
- **Skills**: [src/components/Skills.jsx](src/components/Skills.jsx) - Update with your skills
- **Contact**: [src/components/Contact.jsx](src/components/Contact.jsx) - Add your email and social links

### Styling

Each component has its own CSS file for easy customization:
- Modify colors, fonts, and spacing in the respective `.css` files
- Global styles are in [src/index.css](src/index.css)

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Deployment

You can deploy this portfolio to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` branch
- **Any static hosting service**

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.jsx / Hero.css
│   │   ├── About.jsx / About.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── Skills.jsx / Skills.css
│   │   └── Contact.jsx / Contact.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## License

MIT License - feel free to use this template for your own portfolio!
