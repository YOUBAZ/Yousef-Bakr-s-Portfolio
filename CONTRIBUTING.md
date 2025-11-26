# Contributing to Yousef Bakr's Portfolio

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Code of Conduct

- Be respectful and constructive
- Follow best practices and coding standards
- Test your changes thoroughly before submitting

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Setup
```bash
# Clone the repository
git clone https://github.com/YOUBAZ/Yousef-Bakr-s-Portfolio.git
cd Yousef-Bakr-s-Portfolio

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your EmailJS credentials to .env
# VITE_EMAILJS_SERVICE_ID=your_service_id
# VITE_EMAILJS_TEMPLATE_ID=your_template_id
# VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Start development server
npm run dev
```

## Development Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Commit Messages
Follow conventional commits format:
```
type(scope): brief description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style/formatting
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(projects): add pagination to projects grid
fix(mobile-menu): resolve focus trap escape key issue
docs(readme): update installation instructions
refactor(home): extract animation data to separate file
```

## Code Standards

### JavaScript/React
- Use functional components with hooks
- Add PropTypes for all component props
- Follow existing code style (Prettier formatted)
- Use meaningful variable and function names
- Add comments for complex logic

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow existing design system (colors, spacing)
- Ensure responsive design (mobile-first)
- Maintain WCAG AA color contrast ratios

### File Organization
```
src/
├── components/     # Reusable UI components
├── pages/          # Route pages
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── data/           # Static data & animations
└── config/         # Configuration files
```

## Testing

### Before Submitting PR
- [ ] Code runs without errors
- [ ] All existing features still work
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Keyboard navigation works
- [ ] No console errors or warnings
- [ ] Code follows project style

### Manual Testing Checklist
1. Run `npm run build` - should complete without errors
2. Test all pages load correctly
3. Test mobile menu functionality
4. Verify 404 page works
5. Check browser console for errors

## Pull Request Process

### Before Creating PR
1. Update from main branch
2. Test changes thoroughly
3. Update documentation if needed
4. Ensure commits are clean and well-described

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Changes tested locally
- [ ] Documentation updated
```

### Review Process
1. Automated checks must pass
2. Code review by maintainer
3. Address any requested changes
4. Approval and merge

## Reporting Issues

### Bug Reports
Include:
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/error messages
- Browser/OS information

### Feature Requests
Include:
- Clear description of feature
- Use case / motivation
- Proposed implementation (optional)
- Examples from other sites (optional)

## Architecture Guidelines

### Adding New Components
1. Create component file in `src/components/`
2. Add PropTypes validation
3. Export as default
4. Update imports where used

### Adding New Pages
1. Create page file in `src/pages/`
2. Add route in `src/App.jsx` (lazy loaded)
3. Add SEO component with unique metadata
4. Update navigation if needed

### Adding Utilities
1. Create in `src/utils/`
2. Export named functions
3. Add JSDoc comments
4. Add to index if multiple utilities

## Performance Guidelines

- Lazy load heavy components
- Optimize images (WebP format recommended)
- Use React.memo for expensive renders
- Avoid unnecessary re-renders
- Code split routes

##Accessibility Guidelines

- All images need alt text
- Maintain WCAG AA color contrast
- Support keyboard navigation
- Add ARIA labels where needed
- Test with screen readers if possible

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions?

Feel free to open an issue for questions or clarifications.

## Thank You!

Your contributions help make this portfolio better. Thank you for your time and effort! 🚀
