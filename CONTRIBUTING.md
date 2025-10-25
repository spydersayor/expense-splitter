# Contributing to Expense Splitter

Thank you for your interest in contributing to Expense Splitter! 🎉

## 🚀 Quick Setup for Development

1. **Clone and start:**
   ```bash
   git clone <your-fork-url>
   cd expense-splitter
   start.bat  # Windows
   # or ./start.sh  # Linux/Mac
   ```

2. **That's it!** The application will be running with:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - Database: PostgreSQL on localhost:5432

## 🛠️ Development Commands

### Frontend (React/TypeScript)
```bash
cd frontend
npm run dev        # Development server
npm run build      # Production build  
npm run lint       # ESLint check
npm run typecheck  # TypeScript check
```

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run              # Development server
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev  # With H2 database
./mvnw test                         # Run tests
./mvnw package                      # Build JAR
```

### Full Stack
```bash
npm run start:local     # Start both frontend and backend locally
docker-compose up       # Start with Docker
```

## 📝 Code Style Guidelines

### Frontend
- Use TypeScript for type safety
- Follow existing ESLint configuration
- Use functional components with hooks
- Implement proper error boundaries
- Use React Query for server state management

### Backend
- Follow Spring Boot best practices
- Use Lombok to reduce boilerplate
- Implement proper exception handling
- Write unit tests for new features
- Use meaningful commit messages

## 🔄 Development Workflow

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/your-feature-name`
3. **Start development:** `start.bat` (single command!)
4. **Make your changes** with proper testing
5. **Run tests:** 
   ```bash
   # Frontend
   cd frontend && npm run lint && npm run typecheck && npm run build
   
   # Backend  
   cd backend && ./mvnw test
   ```
6. **Commit:** `git commit -m "Add: your feature description"`
7. **Push:** `git push origin feature/your-feature-name`
8. **Create Pull Request**

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run typecheck  # TypeScript validation
npm run lint       # Code quality
npm run build      # Production build test
```

### Backend Testing
```bash
cd backend
./mvnw test        # Unit and integration tests
./mvnw package     # Full build with tests
```

## 📁 Project Structure

```
expense-splitter/
├── frontend/           # React TypeScript frontend
│   ├── src/
│   │   ├── app/        # App configuration
│   │   ├── features/   # Feature modules
│   │   ├── components/ # Shared components
│   │   ├── lib/        # Utilities
│   │   └── types/      # Type definitions
├── backend/            # Spring Boot backend
│   └── src/main/java/com/esplit/backend/
│       ├── auth/       # Authentication
│       ├── user/       # User management
│       ├── group/      # Group management
│       ├── expense/    # Expense tracking
│       └── settlement/ # Settlement calculations
├── start.bat          # Single command startup (Windows)
├── start.sh           # Single command startup (Linux/Mac)
└── docker-compose.yml # Container orchestration
```

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Console errors (if any)
- Screenshots (if helpful)

## ✨ Feature Requests

We welcome feature requests! Please:
- Check existing issues first
- Describe the use case
- Explain why it would be valuable
- Consider implementation complexity

## 💡 Pull Request Guidelines

### Before submitting:
- [ ] Code follows project conventions
- [ ] Tests pass: `npm run lint && npm run typecheck` (frontend)
- [ ] Tests pass: `./mvnw test` (backend)  
- [ ] New features include tests
- [ ] Documentation updated if needed
- [ ] Single command startup still works

### PR Description should include:
- What changes were made
- Why the changes were necessary  
- How to test the changes
- Screenshots (for UI changes)

## 🔧 Architecture Guidelines

### Frontend Architecture
- **State Management:** React Query for server state, Context for app state
- **Routing:** React Router with lazy loading
- **Styling:** Tailwind CSS with responsive design
- **Forms:** React Hook Form with Zod validation

### Backend Architecture  
- **Layers:** Controller → Service → Repository → Entity
- **Security:** JWT authentication with Spring Security
- **Database:** PostgreSQL with Flyway migrations
- **Testing:** H2 in-memory database for tests

## 🚀 Deployment

The application supports multiple deployment options:
- **Development:** Docker Compose (single command)
- **Production:** Frontend (Vercel) + Backend (Railway)
- **Self-hosted:** Docker containers

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Follow the code of conduct

## 📞 Questions?

- Open an issue for bugs or feature requests
- Check existing issues and documentation
- Reach out to maintainers for guidance

---

Thank you for contributing to Expense Splitter! 🙏