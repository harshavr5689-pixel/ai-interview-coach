# Contributing to AI Interview Coach

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)
- Basic knowledge of React and TypeScript

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview-coach
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 📝 How to Contribute

### Reporting Bugs
- Use the GitHub Issues tab
- Describe the bug clearly
- Include steps to reproduce
- Add screenshots if applicable
- Mention browser and OS version

### Suggesting Features
- Open a GitHub Issue with `[Feature Request]` prefix
- Describe the feature and its benefits
- Explain use cases
- Consider implementation complexity

### Pull Requests

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the code style guide
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Reference related issues
   - Add screenshots for UI changes

## 🎨 Code Style Guide

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use functional components with hooks

### React Components
```typescript
// Good: Functional component with TypeScript
interface MyComponentProps {
  title: string
  count: number
}

export const MyComponent = ({ title, count }: MyComponentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{count}</p>
    </div>
  )
}
```

### File Structure
```
src/
├── components/     # React components
├── data/          # Static data and questions
├── hooks/         # Custom React hooks
├── store/         # State management
├── utils/         # Utility functions
└── types/         # TypeScript type definitions
```

### Naming Conventions
- **Components**: PascalCase (`MyComponent.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useMyHook.ts`)
- **Utilities**: camelCase (`myUtility.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_QUESTIONS`)

### CSS/Styling
- Use Tailwind CSS classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use design system colors

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Writing Tests
- Test critical functionality
- Use descriptive test names
- Mock external dependencies
- Aim for good coverage

## 📚 Documentation

### Code Comments
- Explain "why" not "what"
- Document complex algorithms
- Add JSDoc for functions
- Keep comments up-to-date

### README Updates
- Update README for new features
- Add installation steps if needed
- Include usage examples
- Keep dependencies list current

## 🎯 Feature Ideas

### High Priority
- Mobile responsive improvements
- Performance optimizations
- Accessibility enhancements
- Better error handling

### Medium Priority
- Additional company questions
- More interview tips
- Dark mode support
- Progress tracking over time

### Nice to Have
- Multi-language support
- AI mock interviewer
- Resume analysis
- Interview scheduling

## 🐛 Common Issues

### Development Server Won't Start
- Check Node.js version (18+)
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`

### TypeScript Errors
- Restart TypeScript server in VS Code
- Check `tsconfig.json` settings
- Ensure all types are imported

### Build Fails
- Check for syntax errors
- Ensure all imports are valid
- Run `npm run lint` to find issues

## 💬 Communication

### Questions
- Open a GitHub Discussion
- Tag with appropriate labels
- Be clear and concise

### Code Review
- Be respectful and constructive
- Explain reasoning for suggestions
- Approve when ready

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Every contribution, no matter how small, is valuable and appreciated. Together we can make AI Interview Coach the best interview preparation tool!
