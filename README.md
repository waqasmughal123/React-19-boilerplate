# React 19 Frontend Boilerplate

A production-ready React 19 frontend boilerplate built with TypeScript, Vite, Redux Toolkit, and Material-UI. This starter template provides a solid foundation for building modern web applications with centralized content management, comprehensive Material-UI design system, and enterprise-grade development tools.

## 🎯 What's Included

This boilerplate comes pre-configured with:
- ⚛️ **React 19** with latest features and JSX transform
- 🔷 **TypeScript** for full type safety
- ⚡ **Vite** for lightning-fast development and builds
- 🗂️ **Redux Toolkit** for predictable state management
- 🎨 **Material-UI (MUI)** with comprehensive component library
- 🌓 **Dark/Light Theme** with automatic system preference detection
- 📝 **Centralized Content Management** for easy text updates
- 🏗️ **Atomic Design Architecture** for scalable components
- 🔧 **Advanced Form Components** with validation and UX features
- 🐳 **Docker Support** with multi-environment configurations
- 🔒 **Authentication System** ready for backend integration
- 📱 **Responsive Design** with mobile-first approach
- 🛠️ **Development Tools** (ESLint, Husky, lint-staged)
- 🚀 **Production Optimized** builds and deployment

## 🚀 Getting Started

### 1. Clone or Use This Template

```bash
# Clone the repository
git clone <your-repo-url>
cd frontend

# Or use as GitHub template
# Click "Use this template" button on GitHub
```

### 2. Prerequisites
- Node.js 24+ 
- Bun (preferred) or npm
- Docker & Docker Compose (optional, for containerized development)

### 3. Setup Your Project

```bash
# Install dependencies
bun install
# or
npm install

# Start development server
bun run dev
# or
npm run dev

# Build for production
bun run build
# or
npm run build
```

### 4. Customize for Your Project

1. **Update Content**: Edit `src/content/index.ts` with your app's text content
2. **Branding**: Replace logo files in `src/assets/images/`
3. **Theme**: Customize Material-UI theme in `src/theme/mui-theme.ts`
4. **App Name**: Update `package.json`, `index.html`, and content files
5. **API Integration**: Configure your backend endpoints in `src/services/`

### Docker Development

```bash
# Start development environment
make dev

# Build production image
make build

# View logs
make logs

# Stop services
make down
```

## 📁 Project Structure

```
frontend/
├── public/                     # Static assets
│   ├── favicon.svg            # Horizon Digital favicon
│   └── vite.svg              # Default Vite icon
├── src/
│   ├── assets/               # Application assets
│   │   └── images/          # Logo and image files
│   │       ├── HD_LOGO.05c83a78cc145c1d05b98dc498e68ee5.svg
│   │       ├── horizon-digital-logo.png
│   │       └── horizon-digital-logo-lg.png
│   ├── components/          # Reusable UI components (Atomic Design)
│   │   ├── atoms/          # Basic building blocks
│   │   │   ├── Logo/       # Horizon Digital logo component
│   │   │   ├── MuiButton/  # Material-UI button with loading states
│   │   │   ├── MuiInput/   # Material-UI text input component
│   │   │   ├── MuiEmailInput/ # Email input with validation
│   │   │   ├── MuiPasswordInput/ # Password input with strength indicator
│   │   │   ├── MuiNumberInput/ # Number input with steppers and formatting
│   │   │   ├── MuiSelect/  # Dropdown/select with multi-selection
│   │   │   ├── MuiCheckbox/ # Checkbox, radio, and switch components
│   │   │   └── ThemeToggle/ # Dark/light mode toggle button
│   │   ├── molecules/      # Combinations of atoms
│   │   │   ├── DashboardCard/  # Dashboard metric cards
│   │   │   ├── MuiDashboardCard/ # Material-UI dashboard cards
│   │   │   └── FormField/  # Form field wrapper component
│   │   ├── organisms/      # Complex UI sections
│   │   │   ├── Header/     # Application header
│   │   │   ├── Sidebar/    # Navigation sidebar
│   │   │   └── ProtectedRoute/  # Route protection wrapper
│   │   └── templates/      # Page layouts
│   │       ├── Layout/     # Main application layout
│   │       └── DashboardLayout/  # Dashboard-specific layout
│   ├── content/            # 🎯 Centralized Content Management
│   │   └── index.ts       # All application text content
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts     # Authentication hook
│   │   ├── useContent.ts  # Content management hooks
│   │   └── index.ts       # Hook exports
│   ├── pages/             # Application pages (organized by feature)
│   │   ├── auth/          # Authentication pages
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── LoginPage.css
│   │   │   └── index.ts
│   │   └── dashboard/     # Dashboard pages
│   │       ├── DashboardPage.tsx
│   │       ├── DashboardPage.css
│   │       └── index.ts
│   ├── services/          # API and external services
│   │   ├── api.ts         # Base API configuration
│   │   └── authService.ts # Authentication API calls
│   ├── store/             # Redux store configuration
│   │   ├── slices/        # Redux slices
│   │   │   └── authSlice.ts
│   │   └── index.ts       # Store setup
│   ├── styles/            # Global styles and theme
│   │   └── theme.css      # CSS custom properties (design system)
│   ├── theme/             # 🎨 Material-UI Theme System
│   │   ├── mui-theme.ts   # MUI theme configuration (light/dark)
│   │   ├── ThemeContext.tsx # Theme provider and context
│   │   └── index.ts       # Theme exports
│   ├── types/             # TypeScript type definitions
│   │   ├── auth.ts        # Authentication types
│   │   └── api.ts         # API response types
│   ├── utils/             # Utility functions
│   │   ├── cn.ts          # Class name utility
│   │   └── index.ts       # Utility exports
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── Dockerfile             # Docker configuration
├── entrypoint.sh          # Docker entrypoint script
├── Makefile              # Development commands
├── compose.dev.yml       # Development Docker Compose
├── compose.prod.yml      # Production Docker Compose
├── compose.uat.yml       # UAT Docker Compose
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎨 Material-UI Design System

### Theme System
The application uses Material-UI's comprehensive theming system defined in `src/theme/mui-theme.ts`:

```typescript
// Custom color palette
const colors = {
  primary: {
    main: '#1a2332',      // Dark Navy (from existing theme)
    light: '#2d3748',
    dark: '#0f1419',
  },
  secondary: {
    main: '#8b5cf6',      // Purple Accent (from existing theme)
    light: '#a78bfa',
    dark: '#7c3aed',
  },
  // Complete palette with success, warning, error, info colors
}

// Automatic light/dark theme switching
export const lightTheme = createTheme(createLightTheme())
export const darkTheme = createTheme(createDarkTheme())
```

### Component Architecture (Atomic Design)

#### Atoms
- **MuiButton**: Material-UI button with loading states and variants
- **MuiInput**: Basic text input with icons and validation
- **MuiEmailInput**: Email input with real-time validation and status icons
- **MuiPasswordInput**: Password input with visibility toggle and strength indicator
- **MuiNumberInput**: Number input with steppers, currency, and percentage support
- **MuiSelect**: Dropdown with single/multiple selection and search
- **MuiCheckbox**: Checkboxes, radio buttons, and switches
- **ThemeToggle**: Dark/light mode toggle button
- **Logo**: Horizon Digital branding with multiple sizes

#### Molecules
- **DashboardCard**: Metric display cards with icons
- **MuiDashboardCard**: Material-UI dashboard cards with hover effects
- **FormField**: Form field wrapper component

#### Organisms
- **Header**: Top navigation with user menu
- **Sidebar**: Left navigation with menu items
- **ProtectedRoute**: Authentication wrapper

#### Templates
- **Layout**: Main application shell
- **DashboardLayout**: Dashboard-specific layout

### 🔧 Advanced Form Components

This boilerplate includes a comprehensive set of Material-UI form components with advanced features:

#### **MuiEmailInput**
- Real-time email validation with regex checking
- Visual validation status icons (✓ for valid, ✗ for invalid)
- Email format validation and error messages
- Blur validation for better UX

#### **MuiPasswordInput**
- Password visibility toggle (show/hide)
- Password strength indicator with visual progress bar
- Strength levels: Very Weak → Weak → Fair → Good → Strong
- Lock icon and customizable validation

#### **MuiNumberInput**
- Numeric input with increment/decrement steppers
- Currency formatting (USD, EUR, etc.)
- Percentage support with % symbol
- Min/max constraints and step values
- Decimal/integer only modes

#### **MuiSelect**
- Single and multiple selection modes
- Icons and descriptions for options
- Clearable selections with clear button
- Chip display for multiple selections
- Search functionality (configurable)

#### **MuiCheckbox**
- Single checkboxes with boolean values
- Checkbox groups for multiple selections
- Radio button groups for single selection
- Switch toggles for on/off states
- Horizontal and vertical layouts

#### **Usage Examples**
```typescript
// Email with validation
<MuiEmailInput
  label="Email Address"
  validateOnBlur
  showValidationIcon
  errorText={error}
/>

// Password with strength indicator
<MuiPasswordInput
  label="Password"
  strengthIndicator
  showPasswordToggle
/>

// Number with currency
<MuiNumberInput
  label="Price"
  currency="USD"
  min={0}
  showSteppers
/>

// Multi-select dropdown
<MuiSelect
  label="Skills"
  options={skillOptions}
  multiple
  clearable
/>
```

## 🎯 Content Management System

### Centralized Content Architecture
This boilerplate includes a powerful centralized content management system. All text content is managed from a single source: `src/content/index.ts`

```typescript
export const content = {
  app: {
    name: 'Your App Name',           // 👈 Customize this
    tagline: 'Your app description'  // 👈 Customize this
  },
  auth: {
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account to continue',
      loginButton: 'Sign In'
    }
  },
  dashboard: {
    welcome: {
      title: 'Welcome back',
      subtitle: 'Here\'s what\'s happening today'
    }
  }
  // Add your own content sections here
}
```

### Why Centralized Content?
- **Single Source of Truth**: All text in one place
- **Easy Internationalization**: Ready for multi-language support
- **Consistent Messaging**: Unified tone across the application
- **Quick Updates**: Change content without touching components
- **Type Safety**: Full TypeScript support for content keys

### Content Hooks
Access content easily with custom hooks:

```typescript
// Specific content sections
const authContent = useAuthContent()
const dashboardContent = useDashboardContent()
const sidebarContent = useSidebarContent()

// Path-based access
const title = useContent('auth.login.title')

// Full content object
const { auth, dashboard } = useContent()
```

### Usage in Components
```typescript
const LoginPage = () => {
  const authContent = useAuthContent()
  
  return (
    <div>
      <h1>{authContent.login.title}</h1>
      <p>{authContent.login.subtitle}</p>
      <button>{authContent.login.loginButton}</button>
    </div>
  )
}
```

## 🔐 Authentication System

### Redux Store
Authentication state is managed with Redux Toolkit:

```typescript
// Login
dispatch(loginUser({ email, password }))

// Register
dispatch(registerUser({ email, password, password_confirm }))

// Logout
dispatch(logout())
```

### Protected Routes
Routes are protected using the `ProtectedRoute` component:

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

### API Integration
Authentication integrates with Django backend:

```typescript
// Login endpoint: POST /api/auth/login/
// Register endpoint: POST /api/auth/register/
// Token refresh: POST /api/auth/token/refresh/
```

## 🛠 Development Tools

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
bun run lint         # Run ESLint

# Docker Commands (via Makefile)
make dev            # Start development environment
make build          # Build production image
make logs           # View container logs
make down           # Stop all services
make install        # Install dependencies in container
```

### Code Quality
- **ESLint**: Code linting with React 19 rules
- **TypeScript**: Full type safety
- **Husky**: Git hooks for pre-commit checks (includes build verification)
- **lint-staged**: Run linters on staged files
- **Build Check**: Automatic build verification before each commit

### Environment Configuration

#### Development (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Horizon Digital
```

#### Docker Environment
- **Development**: `compose.dev.yml`
- **Production**: `compose.prod.yml`
- **UAT**: `compose.uat.yml`

## 🐳 Docker Configuration

### Multi-Stage Build
The Dockerfile uses multi-stage builds for optimization:

1. **Dependencies**: Install packages with bun/npm fallback
2. **Build**: Create production build
3. **Runtime**: Serve application

### Package Manager Fallback
Supports both bun and npm with automatic fallback:

```dockerfile
# Try bun first, fallback to npm
RUN if command -v bun >/dev/null 2>&1; then \
        bun install; \
    else \
        npm install; \
    fi
```

### Environment-Specific Configs
- **Development**: Hot reload, source maps
- **Production**: Optimized build, preview server
- **UAT**: Production-like environment for testing

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Desktop */
@media (max-width: 1200px) { }
```

### Mobile-First Approach
All components are built mobile-first with progressive enhancement for larger screens.

## 🔧 Configuration Files

### Vite Configuration (`vite.config.ts`)
- Path aliases for clean imports
- Proxy configuration for API calls
- Development server settings

### TypeScript Configuration (`tsconfig.json`)
- Strict type checking
- Path mapping for aliases
- React 19 JSX transform

### ESLint Configuration (`eslint.config.js`)
- React 19 specific rules
- TypeScript integration
- Import/export linting

## 🚀 Deployment

### Production Build
```bash
# Build optimized bundle
bun run build

# Preview production build locally
bun run preview
```

### Docker Production
```bash
# Build production image
docker build -t horizon-digital-frontend .

# Run production container
docker run -p 3000:3000 horizon-digital-frontend
```

## 🔒 Pre-Commit Quality Checks

The project uses Husky to enforce code quality before every commit. The pre-commit hook automatically runs:

### 1. Code Quality Checks
- **ESLint**: Lints all staged files
- **Prettier**: Formats code according to project standards
- **TypeScript**: Type checking on staged files

### 2. Build Verification
- **Full Build**: Runs `bun run build` (or `npm run build`)
- **Type Checking**: Ensures TypeScript compilation succeeds
- **Bundle Creation**: Verifies the production build works

### Pre-Commit Process Flow
```bash
🔍 Running pre-commit checks...
📝 Checking code quality...
   ✓ ESLint passed
   ✓ Prettier formatting applied
   ✓ TypeScript types valid

🏗️ Checking if project builds successfully...
   ✓ TypeScript compilation successful
   ✓ Vite build completed
   ✓ Production bundle created

✅ All pre-commit checks passed!
```

### If Checks Fail
```bash
❌ Build failed. Please fix the build errors and try again.
```

The commit will be **blocked** until all issues are resolved. This ensures:
- No broken code enters the repository
- Consistent code quality across the team
- Production builds always work
- TypeScript errors are caught early

### Bypassing Checks (Not Recommended)
```bash
# Only in emergency situations
git commit --no-verify -m "Emergency fix"
```

## 🔄 Working with Husky & Code Contributions

### Understanding Husky Pre-Commit Hooks

Husky automatically runs quality checks before every commit to ensure code quality and prevent broken code from entering the repository.

### Code Contribution Workflow

#### 1. **Making Changes**
```bash
# Make your code changes
# Edit files, add features, fix bugs, etc.
```

#### 2. **Stage Your Changes**
```bash
# Stage specific files
git add src/components/MyComponent.tsx

# Or stage all changes
git add .
```

#### 3. **Commit (Triggers Husky)**
```bash
git commit -m "feat: add new user dashboard component"
```

**What happens automatically:**
- 🔍 **Lint-staged runs**: Checks only your staged files
- 📝 **ESLint**: Fixes linting issues automatically where possible
- 🎨 **Prettier**: Formats your code to project standards
- 🔧 **TypeScript**: Validates types in staged files
- 🏗️ **Build Check**: Runs full build to ensure nothing is broken
- ✅ **Success**: Commit proceeds if all checks pass
- ❌ **Failure**: Commit is rejected if any check fails

#### 4. **Push to Repository**
```bash
# Push to your branch
git push origin feature/my-new-feature

# Or push to main (if you have permissions)
git push origin main
```

### Handling Pre-Commit Failures

#### **ESLint Errors**
```bash
❌ ESLint failed with 3 errors
```
**Solution:**
```bash
# Fix the errors manually or run ESLint with --fix
bun run lint:fix
# Or
npm run lint:fix

# Then commit again
git add .
git commit -m "fix: resolve linting issues"
```

#### **TypeScript Errors**
```bash
❌ Build failed: TypeScript compilation errors
```
**Solution:**
```bash
# Check TypeScript errors
bun run type-check
# Or
npm run type-check

# Fix the type errors in your code
# Then commit again
git add .
git commit -m "fix: resolve TypeScript errors"
```

#### **Build Failures**
```bash
❌ Build failed: Vite build errors
```
**Solution:**
```bash
# Run build locally to see the full error
bun run build
# Or
npm run build

# Fix the build issues
# Then commit again
git add .
git commit -m "fix: resolve build errors"
```

### Advanced Husky Usage

#### **Commit Message Format**
```bash
# Good commit messages (follows conventional commits)
git commit -m "feat: add user authentication system"
git commit -m "fix: resolve login redirect issue"
git commit -m "docs: update API documentation"
git commit -m "style: improve button component styling"
git commit -m "refactor: optimize dashboard performance"
git commit -m "test: add unit tests for auth service"

# Poor commit messages (avoid these)
git commit -m "fix stuff"
git commit -m "updates"
git commit -m "wip"
```

#### **Working with Branches**
```bash
# Create feature branch
git checkout -b feature/user-dashboard

# Make changes and commit (Husky runs automatically)
git add .
git commit -m "feat: implement user dashboard layout"

# Push feature branch
git push origin feature/user-dashboard

# Create pull request for review
```

#### **Before Committing - Best Practices**
```bash
# 1. Test your changes locally
bun run dev
# Or
npm run dev

# 2. Run linting manually to catch issues early
bun run lint
# Or
npm run lint

# 3. Check TypeScript types
bun run type-check
# Or
npm run type-check

# 4. Test the build
bun run build
# Or
npm run build

# 5. Stage and commit (Husky will run all checks again)
git add .
git commit -m "feat: your descriptive commit message"
```

### Troubleshooting Husky

#### **Husky not running?**
```bash
# Reinstall Husky hooks
bun run prepare
# Or
npm run prepare

# Check if .git/hooks/pre-commit exists
ls -la .git/hooks/

# Verify Husky configuration
cat .husky/pre-commit
```

#### **Permission issues?**
```bash
# Make pre-commit hook executable
chmod +x .husky/pre-commit

# Check permissions
ls -la .husky/pre-commit
```

#### **Package manager conflicts?**
The pre-commit hook automatically detects and uses:
1. **Bun** (if available) - faster execution
2. **NPM** (fallback) - universal compatibility

```bash
# You can see which one is being used in the output:
# "Using bun for build check..." or "Using npm for build check..."
```

### Performance Tips

- **Partial staging**: Only stage files you want to commit to run checks on fewer files
  ```bash
  git add src/components/Button.tsx  # Only check this file
  ```
- **Local testing**: Run checks manually before committing to catch issues early
- **IDE integration**: Use ESLint and Prettier extensions in your editor for real-time feedback
- **Incremental commits**: Make smaller, focused commits for faster pre-commit checks

### Husky Configuration Files

#### **`.husky/pre-commit`** (Current Configuration)
```bash
echo "🔍 Running pre-commit checks..."

# Run lint-staged first (linting and formatting)
echo "📝 Checking code quality..."
npx lint-staged

# Check if lint-staged passed
if [ $? -ne 0 ]; then
  echo "❌ Lint-staged failed. Please fix the issues and try again."
  exit 1
fi

# Run build check
echo "🏗️  Checking if project builds successfully..."
if command -v bun >/dev/null 2>&1; then
  echo "Using bun for build check..."
  bun run build
else
  echo "Using npm for build check..."
  npm run build
fi

# Check if build passed
if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please fix the build errors and try again."
  exit 1
fi

echo "✅ All pre-commit checks passed!"
```

#### **`package.json`** (lint-staged configuration)
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

## 📋 Best Practices

### Component Development
1. Use atomic design principles
2. Implement proper TypeScript types
3. Follow the established naming conventions
4. Use centralized content system for all text

### State Management
1. Use Redux Toolkit for global state
2. Keep local state in components when appropriate
3. Use custom hooks for reusable logic

### Styling
1. Use CSS custom properties from theme system
2. Follow BEM methodology for class names
3. Implement responsive design mobile-first

### Content Management
1. All text content goes in `src/content/index.ts`
2. Use appropriate content hooks in components
3. Organize content by feature/section

## 🤝 Using This Boilerplate

### For Your Project
1. **Fork or Clone**: Use this as a starting point for your project
2. **Customize Content**: Update `src/content/index.ts` with your app's content
3. **Brand It**: Replace logos and update theme colors
4. **Extend Features**: Add your specific business logic and components
5. **Deploy**: Use the included Docker configuration for deployment

### Contributing to the Boilerplate
1. Follow the established folder structure
2. Use the centralized content system for all text
3. Implement proper TypeScript types
4. Test components in both light and dark themes
5. Ensure responsive design works across all breakpoints
6. Update documentation for new features

## 📚 Tech Stack

- **React 19**: Latest React with new features and JSX transform
- **TypeScript**: Full type safety and strict checking
- **Vite**: Lightning-fast build tool and dev server
- **Material-UI (MUI)**: Comprehensive React component library
- **Emotion**: CSS-in-JS styling engine for MUI
- **Redux Toolkit**: Predictable state management
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client with interceptors
- **Material Icons**: Extensive icon library
- **Docker**: Containerization with multi-environment support
- **Bun/NPM**: Package management with automatic fallback

## 🎯 Key Features

- ✅ **React 19** with latest features and JSX transform
- ✅ **Material-UI Integration** with comprehensive component library
- ✅ **Advanced Form Components** with validation and UX features
- ✅ **Dark/Light Theme System** with automatic switching
- ✅ **Centralized Content Management** system
- ✅ **Atomic Design Architecture** for scalable components
- ✅ **Full TypeScript Support** with strict type checking
- ✅ **Redux Toolkit** state management
- ✅ **Protected Routing** with authentication
- ✅ **Responsive Design** with mobile-first approach
- ✅ **Docker Containerization** with multi-environment support
- ✅ **Package Manager Fallback** (bun/npm)
- ✅ **Git Hooks with Husky** and pre-commit checks
- ✅ **ESLint Code Quality** with React 19 rules
- ✅ **Hot Reload Development** with Vite

---

## 🎉 Ready to Build Something Amazing?

This boilerplate gives you everything you need to start building modern React applications with Material-UI. From advanced form components with validation to responsive design, from centralized content management to production-ready Docker configurations - it's all here and ready to use.

### What's Next?
1. **Customize the content** in `src/content/index.ts`
2. **Update the branding** with your logos and colors
3. **Customize the Material-UI theme** in `src/theme/mui-theme.ts`
4. **Connect your backend** API endpoints
5. **Build forms** using the advanced MUI form components
6. **Deploy with confidence** using the included Docker setup

---

**React 19 Frontend Boilerplate** - Built with ❤️ using React 19, Material-UI, and modern web technologies.

*Start building your next great application today!* 🚀

