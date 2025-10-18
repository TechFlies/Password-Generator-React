# 🔐 Password Generator (React)

[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-2ea44f)](#-license)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-contributing)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&logoColor=white)](https://prettier.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

A modern, accessible, and responsive password generator built with React and Tailwind CSS. Craft strong passwords with customizable character sets, real-time strength feedback, and one-click copy to clipboard.

---

## ✨ Features

- 🎯 Smart generation that guarantees at least one character from each selected type
- 🔡 Character options: Uppercase, Lowercase, Numbers, Symbols
- 📏 Adjustable length (4 to 32) via slider and numeric input
- 🧠 Real-time strength meter with visual feedback
- ✅ “Select All” toggle for quick configuration
- 📋 One-click copy with success feedback
- ♿ Accessible toggles using role="switch" and aria-checked
- 📱 Responsive UI with clean, modern styling

---

## 🖼️ Preview

![App Preview](https://github.com/TechFlies/Password-Generator-React/blob/9c5b3d8588694aebcb8764aeb963a83a6f0d5366/Screenshot%202025-10-18%20010830_edited.png)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install
# or
yarn
# or
pnpm install
```

Run the app
Depending on your setup:

Vite or similar: npm run dev
Create React App: npm start
Check your package.json scripts to confirm.

### Common commands
npm run dev   # Start dev server (Vite/Next/etc.)
npm start     # Start dev server (CRA)
npm run build # Production build


## 🧩 How It Works

- Toggle which character sets to include (Uppercase, Lowercase, Numbers, Symbols)
- Pick a length between 4 and 32
- Click Generate to create a new password
- Click the Copy button to copy to your clipboard
- Strength meter updates based on length and variety

The generator:

- Builds a pool from selected sets
- Ensures at least one character from each selected set
- Fills remaining length from the pool
- Shuffles the password to avoid predictable patterns
  
## 🛠️ Tech Stack
- React (functional components and hooks)
- Tailwind CSS for styling
- Clipboard API for copy functionality
  
Key file:

- src/App.jsx
  
## ♿ Accessibility

- Toggle buttons use role="switch" and aria-checked for screen readers
- Color contrast optimized for readability
- Keyboard focusable interactive elements
  
🔐 Security Notes
Current randomness uses Math.random, which is not cryptographically secure.
For stronger security, consider replacing randomness with Web Crypto:
// Example: Get a secure random integer in [0, max)
const secureIndex = (max) => crypto.getRandomValues(new Uint32Array(1))[0] % max

Copy

Insert

See Roadmap below for planned improvements.

📦 Project Structure (excerpt)
src/
├─ App.jsx
├─ App.css
public/
├─ preview.png   # optional screenshot

Copy

Insert

🧪 Testing
No tests are included yet. Contributions with unit tests (e.g., Vitest/Jest + React Testing Library) are welcome.

🗺️ Roadmap
Use crypto.getRandomValues for cryptographically secure randomness
Add user-configurable character blacklist
Add option to avoid ambiguous characters (l, I, 1, O, 0)
Export passwords to a file
Internationalization (i18n)
Unit tests and E2E tests (Playwright/Cypress)
PWA support for offline usage
🤝 Contributing
Contributions, issues, and feature requests are welcome!

Fork the repo
Create a feature branch: git checkout -b feat/amazing-feature
Commit changes: git commit -m "feat: add amazing feature"
Push to branch: git push origin feat/amazing-feature
Open a Pull Request
📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

❤️ Acknowledgements
React community and docs
Tailwind CSS for the rapid UI development
You, for checking this out!
