# 🤝 Contributing to EduManage Pro

Thank you for considering contributing to EduManage Pro! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

---

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports:
1. Check existing issues to avoid duplicates
2. Use the latest version
3. Verify it's actually a bug

When reporting bugs, include:
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)

### Suggesting Features

Feature suggestions are welcome! Include:
- Clear description of the feature
- Why it would be useful
- Possible implementation approach
- Examples from other apps (if applicable)

### Code Contributions

Areas where contributions are especially welcome:
- Bug fixes
- UI/UX improvements
- Performance optimizations
- Documentation improvements
- Test coverage
- Accessibility enhancements
- New features (discuss first in issues)

---

## 🛠️ Development Setup

### Prerequisites

- Node.js v14+
- MongoDB
- Git

### Setup Steps

1. **Fork the repository**
   - Click "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/EduManage-Pro.git
   cd EduManage-Pro
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/EduManage-Pro.git
   ```

4. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up environment variables**
   - Copy `.env.example` to `.env` in both folders
   - Configure your local settings

6. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## 💻 Coding Standards

### JavaScript/React

- Use ES6+ features
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic

### Code Style

```javascript
// Good
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await api.submitData(data);
    setSuccess(true);
  } catch (error) {
    setError(error.message);
  }
};

// Avoid
function handleSubmit(event){
event.preventDefault()
api.submitData(data).then(response=>{setSuccess(true)}).catch(error=>{setError(error.message)})
}
```

### File Organization

```
components/
├── ComponentName/
│   ├── ComponentName.js
│   ├── ComponentName.styles.js
│   └── index.js
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.js`)
- **Functions**: camelCase (`handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **Files**: Match component name

### Best Practices

1. **Keep components small and focused**
   - One component = one responsibility
   - Extract reusable logic into hooks

2. **Use PropTypes or TypeScript**
   ```javascript
   ComponentName.propTypes = {
     title: PropTypes.string.isRequired,
     onSubmit: PropTypes.func
   };
   ```

3. **Handle errors gracefully**
   ```javascript
   try {
     await apiCall();
   } catch (error) {
     console.error('Error:', error);
     showErrorMessage(error.message);
   }
   ```

4. **Avoid hardcoded values**
   ```javascript
   // Good
   const API_URL = process.env.REACT_APP_BASE_URL;
   
   // Avoid
   const url = 'http://localhost:5000';
   ```

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(auth): add password reset functionality

- Add forgot password page
- Implement email sending
- Add reset token validation

Closes #123
```

```bash
fix(dashboard): correct attendance calculation

The attendance percentage was showing incorrect values
due to division by zero when no classes were held.

Fixes #456
```

### Commit Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep first line under 72 characters
- Reference issues and PRs when applicable

---

## 🔄 Pull Request Process

### Before Submitting

1. **Update your fork**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes**
   - Run the app locally
   - Test all affected features
   - Check for console errors
   - Test on different screen sizes

3. **Check code quality**
   - No console.log statements
   - No commented-out code
   - Proper error handling
   - Code is formatted consistently

### Submitting PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the template

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated
```

### Review Process

1. Maintainer reviews your PR
2. Address any requested changes
3. Once approved, PR will be merged
4. Your contribution is live! 🎉

### After Merge

1. **Delete your branch**
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Update your fork**
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

---

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

### Writing Tests

```javascript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
  
  it('should handle user interaction', () => {
    // Test implementation
  });
});
```

---

## 📚 Documentation

### Code Comments

```javascript
/**
 * Calculates student attendance percentage
 * @param {number} present - Number of days present
 * @param {number} total - Total number of days
 * @returns {number} Attendance percentage
 */
const calculateAttendance = (present, total) => {
  if (total === 0) return 0;
  return (present / total) * 100;
};
```

### README Updates

If your changes affect:
- Installation process
- Configuration
- Usage
- Features

Update the relevant documentation files.

---

## 🎨 UI/UX Guidelines

### Design Principles

1. **Consistency**: Use existing components and patterns
2. **Accessibility**: Ensure WCAG 2.1 compliance
3. **Responsiveness**: Test on mobile, tablet, desktop
4. **Performance**: Optimize images and code

### Material-UI Usage

```javascript
// Use theme values
sx={{
  color: 'primary.main',
  bgcolor: 'background.paper',
  p: 2, // padding
  m: 1  // margin
}}
```

---

## 🐛 Debugging Tips

### Frontend

```javascript
// Use React DevTools
// Add breakpoints in browser
// Check Redux state
console.log('State:', state);
```

### Backend

```javascript
// Use console.log strategically
console.log('Request body:', req.body);

// Check MongoDB queries
Model.find().explain('executionStats');
```

---

## 📞 Getting Help

- **Questions**: Open a discussion on GitHub
- **Bugs**: Create an issue
- **Chat**: Join our community (if available)

---

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<p align="center">
Thank you for contributing to EduManage Pro! 🙏<br>
Every contribution, no matter how small, makes a difference.
</p>
