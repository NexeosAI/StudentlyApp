# StudentlyAI App

StudentlyAI is a comprehensive student management application powered by advanced AI capabilities, designed to enhance the learning experience for students with diverse needs.

## 🌟 Features

- 🤖 **AI-Powered Learning Assistant**
  - Personalized learning recommendations
  - Intelligent content generation
  - Real-time study assistance

- 🎨 **Adaptive Interface**
  - Dark/Light theme support
  - Responsive design
  - Accessibility-first approach

- 🔐 **Secure Authentication**
  - OAuth integration (Google, GitHub)
  - Role-based access control
  - Secure session management

- 🌍 **Internationalization**
  - Multi-language support
  - Locale-based content adaptation
  - RTL support

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NexeosAI/StudentlyApp.git
cd StudentlyApp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Built With

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **API Integration**: TanStack Query
- **AI Integration**: OpenAI
- **Icons**: Lucide React

## 📦 Project Structure

```
src/
├── components/        # Reusable UI components
├── layouts/          # Page layouts
├── lib/             # Utilities and configurations
│   ├── api/         # API clients and endpoints
│   ├── config/      # App configurations
│   ├── hooks/       # Custom React hooks
│   ├── store/       # State management
│   └── types/       # TypeScript types
├── pages/           # Application pages
└── styles/          # Global styles
```

## 🧪 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Production build with optimizations
- `npm run analyze` - Analyze bundle size
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [OpenAI](https://openai.com/)

---

Made with ❤️ by NexeosAI
