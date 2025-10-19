# 💰 Expense Splitter

A modern, full-stack web application for splitting expenses among groups of people. Built with React, TypeScript, Spring Boot, and PostgreSQL.

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login
- 👥 **Group Management** - Create and manage expense groups
- 💸 **Expense Tracking** - Add, edit, and categorize expenses
- 📊 **Balance Calculation** - Automatic calculation of who owes what
- 🏦 **Settlement Tracking** - Record payments and settlements
- 🌙 **Dark Mode** - Modern UI with light/dark theme support
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Glass-morphism design with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern styling
- **React Query** for data fetching and caching
- **React Hook Form** with Zod validation
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Spring Boot 3.2** with Java 17
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **PostgreSQL** database
- **Flyway** for database migrations
- **Lombok** for reduced boilerplate

### DevOps
- **Docker & Docker Compose** for containerization
- **Maven** for dependency management
- **ESLint** for code quality
- **GitHub Actions** ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Java 17+
- PostgreSQL 16+ (or use Docker)
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-splitter
   ```

2. **Start with Docker Compose (Recommended)**
   ```bash
   docker-compose up -d
   ```
   This starts all services: frontend (port 3000), backend (port 8080), database (port 5432), and pgAdmin (port 5050).

3. **Manual Setup**
   
   **Backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Production Build

**Windows (PowerShell):**
```powershell
./run-prod.ps1
```

**Linux/macOS:**
```bash
./run-prod.sh
```

This builds the frontend, integrates it with the backend, and starts the production server.

## 📁 Project Structure

```
expense-splitter/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Feature-specific components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and configuration
│   │   └── types/           # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/esplit/backend/
│   │       ├── auth/        # Authentication logic
│   │       ├── user/        # User management
│   │       ├── group/       # Group and member management
│   │       ├── expense/     # Expense tracking
│   │       └── settlement/  # Settlement management
│   └── pom.xml
├── docker-compose.yml        # Multi-container setup
├── run-prod.sh              # Linux/macOS production script
├── run-prod.ps1             # Windows PowerShell production script
└── README.md
```

## 🎨 UI Features

- **Glass-morphism Design** - Modern frosted glass effect
- **Smooth Animations** - Micro-interactions and transitions
- **Responsive Layout** - Mobile-first design approach
- **Dark/Light Theme** - System preference aware
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Groups
- `GET /api/groups` - List user's groups
- `POST /api/groups` - Create new group
- `POST /api/groups/{id}/members` - Add member to group

### Expenses
- `GET /api/groups/{groupId}/expenses` - List group expenses
- `POST /api/groups/{groupId}/expenses` - Add expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Settlements
- `GET /api/groups/{groupId}/settlements` - List settlements
- `POST /api/groups/{groupId}/settlements` - Record settlement

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:
- **Users** - User accounts and authentication
- **Groups** - Expense sharing groups
- **GroupMembers** - Many-to-many relationship between users and groups
- **Expenses** - Individual expense records
- **ExpenseShares** - How expenses are split among members
- **Settlements** - Payment records between users

## 🚀 Deployment

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment
1. Build the frontend: `cd frontend && npm run build`
2. Copy built files to backend static resources
3. Build backend: `cd backend && ./mvnw clean package`
4. Run: `java -jar backend/target/backend-0.0.1-SNAPSHOT.jar`

## 🧪 Testing

**Frontend:**
```bash
cd frontend
npm run test
npm run lint
npm run typecheck
```

**Backend:**
```bash
cd backend
./mvnw test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- React community for excellent libraries
- Spring Boot team for the robust framework
- Tailwind CSS for the utility-first approach
- All open source contributors

---

### 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the maintainers.

### 🔄 Version History

- **v1.0.0** - Initial release with full expense splitting functionality
- Enhanced UI with glass-morphism design
- Full integration between frontend and backend
- Docker containerization support

---

**Made with ❤️ using React, Spring Boot, and modern web technologies**