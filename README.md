# MontyCloud - Cloud Operations Dashboard

A modern, responsive cloud operations dashboard built with React, TypeScript, and Vite. This application provides real-time monitoring, resource management, and notification systems for cloud infrastructure.

## 🌐 Live Demo

**🚀 [View Live Application](https://classy-brioche-2cf5d3.netlify.app/)**

Experience the full functionality of MontyCloud with real-time data, interactive charts, and responsive design.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation & Running

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd montycloud
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code quality checks
```

## 🏗️ Architecture & Design

### Technical Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7 (ultra-fast development and building)
- **Styling**: Tailwind CSS 4 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: React Router DOM v7
- **State Management**: React Context API with custom hooks
- **Notifications**: Sonner toast library
- **Icons**: Lucide React
- **Error Handling**: react-error-boundary

### Design Philosophy

#### 1. **Component-First Architecture**

- **Atomic Design**: Components are built from smallest (atoms) to largest (pages)
- **Reusability**: UI components are highly reusable across the application
- **Composition**: Complex components are built by composing simpler ones

#### 2. **Type Safety & Developer Experience**

- **Full TypeScript**: 100% TypeScript coverage for better developer experience
- **Strict Type Checking**: Comprehensive type definitions for all data structures
- **IntelliSense Support**: Rich autocomplete and error detection

#### 3. **Performance Optimization**

- **Code Splitting**: Automatic code splitting with Vite
- **Tree Shaking**: Unused code elimination for smaller bundles
- **Memoization**: Strategic use of `React.memo`, `useMemo`, and `useCallback`

#### 4. **Accessibility & UX**

- **WCAG Compliance**: Accessible components with proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Semantic HTML and proper labeling
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   ├── layout/          # Layout components (header, sidebar, etc.)
│   ├── charts/          # Chart components
│   └── custom/          # Custom business components
├── pages/               # Page components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── constants/           # Application constants
├── lib/                 # Utility functions
├── services/            # Internal service integrations
└── styles/              # Global styles and CSS variables
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue-based color scheme with semantic variants
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success (green), Warning (yellow), Error (red)
- **Dark Mode**: Full dark theme support with CSS custom properties

### Typography

- **Font Stack**: System fonts for optimal performance
- **Scale**: Consistent typography scale using Tailwind's type system
- **Hierarchy**: Clear visual hierarchy with proper heading levels

### Spacing & Layout

- **Grid System**: CSS Grid and Flexbox for responsive layouts
- **Spacing Scale**: Consistent spacing using Tailwind's spacing scale
- **Breakpoints**: Mobile-first responsive design

## 🔧 Key Features

### 1. **Real-time Dashboard**

- Interactive charts and metrics
- Real-time data updates
- Responsive grid layout

### 2. **Resource Management**

- Cloud resource inventory
- Advanced filtering and search
- Data table with sorting and pagination

### 3. **Notification System**

- Real-time notifications
- Toast messages with actions
- Notification history and management

### 4. **Error Handling**

- Global error boundary
- Graceful error recovery
- Development error details

### 5. **Theme Support**

- Light and dark themes
- System preference detection
- Smooth theme transitions

## 🛠️ Development Guidelines

### Code Style

- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting (if configured)
- **Import Organization**: Consistent import ordering and grouping
- **Naming Conventions**: PascalCase for components, camelCase for functions

### Component Patterns

```typescript
// Functional components with TypeScript
const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Component logic
  return <div>Content</div>;
};

// Custom hooks for reusable logic
const useCustomHook = () => {
  // Hook logic
  return { data, loading, error };
};
```

### State Management

- **Local State**: `useState` for component-specific state
- **Global State**: Context API for application-wide state
- **Derived State**: `useMemo` for computed values
- **Side Effects**: `useEffect` for lifecycle management

## 🚀 Performance Considerations

### Bundle Optimization

- **Tree Shaking**: Only import what you use
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Components loaded on demand

## 📦 Dependencies

### Core Dependencies

- `react` & `react-dom`: UI framework
- `typescript`: Type safety
- `vite`: Build tool and dev server
- `react-router-dom`: Client-side routing

### UI & Styling

- `tailwindcss`: Utility-first CSS framework
- `@radix-ui/*`: Headless UI components
- `lucide-react`: Icon library
- `class-variance-authority`: Component variants

### Data & Charts

- `chart.js` & `react-chartjs-2`: Charting library
- `@tanstack/react-table`: Data table functionality

### Utilities

- `lodash`: Utility functions
- `sonner`: Toast notifications
- `react-error-boundary`: Error handling

## 🔮 Future Enhancements

### Technical Improvements

- **Testing Suite**: Comprehensive test coverage
- **Storybook**: Component documentation
- **Performance Monitoring**: Bundle analysis and optimization
- **PWA Support**: Progressive Web App capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**
