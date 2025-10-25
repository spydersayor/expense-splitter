# 💰 Expense Splitter

A full-stack expense splitting application built with React, Spring Boot, and PostgreSQL. Split expenses with friends and family easily!

![Expense Splitter](https://img.shields.io/badge/React-18.3.1-blue) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue) ![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 🚀 Single Command Startup

### 🎯 **Just run one command and you're done!**

**Windows:**
```batch
start.bat
```

**Alternative (if Docker is already running):**
```batch
quick-start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh && ./start.sh
```

### ✨ What happens automatically:
1. ✅ Checks Docker installation and starts it if needed
2. ✅ Sets up environment files
3. ✅ Builds frontend and backend containers
4. ✅ Starts PostgreSQL database
5. ✅ Launches PgAdmin for database management
6. ✅ Everything ready in 2-3 minutes!

### 🌐 **Access your app:**
- **📱 Frontend:** http://localhost:3000
- **🔧 Backend API:** http://localhost:8080
- **🗃️ Database:** localhost:5432
- **⚙️ PgAdmin:** http://localhost:5050 (admin@example.com / admin)

## 🌐 Live Demo

- **Frontend:** [https://expense-splitter.vercel.app](https://expense-splitter.vercel.app)
- **Backend API:** [https://expense-splitter-backend.railway.app](https://expense-splitter-backend.railway.app)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with password hashing
- 👥 **Group Management** - Create and manage expense groups
- 💸 **Expense Tracking** - Add and split expenses among group members
- ⚖️ **Balance Calculation** - Automatic balance calculation and settlement suggestions
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **Real-time Updates** - Live updates with React Query
- 🛡️ **Input Validation** - Comprehensive form validation
- 🐳 **Docker Ready** - Easy deployment with Docker Compose

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Spring Boot    │    │   PostgreSQL    │
│   (Port 3000)   │◄──►│   (Port 8080)   │◄──►│   (Port 5432)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client

### Backend
- **Spring Boot 3.2.5** - Java framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence
- **PostgreSQL** - Database
- **Flyway** - Database migrations
- **JWT** - Token-based authentication
- **Lombok** - Boilerplate reduction

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Vercel** - Frontend hosting
- **Railway** - Backend hosting

## 📦 Installation

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Java 17+ (for local development)
- Maven 3.6+ (for local development)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/expense-splitter.git
   cd expense-splitter
   ```

2. **Start the application:**
   ```bash
   # Windows
   start.bat
   
   # Linux/Mac
   chmod +x start.sh
   ./start.sh
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - Database: localhost:5432

### Manual Setup

<details>
<summary>Click to expand manual setup instructions</summary>

#### Backend Setup

1. **Database Setup:**
   ```bash
   createdb expense_splitter
   ```

2. **Environment Variables:**
   ```bash
   export DATABASE_URL="jdbc:postgresql://localhost:5432/expense_splitter"
   export DATABASE_USERNAME="postgres"
   export DATABASE_PASSWORD="your_password"
   export JWT_SECRET="your-secret-key-here"
   export JWT_EXPIRATION="86400000"
   export CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
   ```

3. **Run Backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

#### Frontend Setup

1. **Environment Variables:**
   ```bash
   echo "VITE_BASE_URL=http://localhost:8080" > frontend/.env
   ```

2. **Install and Run:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

</details>

## 🚀 Deployment

### Automated Deployment

The application is automatically deployed when you push to the `main` branch:

1. **Frontend** → Vercel
2. **Backend** → Railway
3. **Database** → Railway PostgreSQL

### Manual Deployment

#### Deploy Frontend to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard:
   - `VITE_BASE_URL` → Your backend URL

#### Deploy Backend to Railway

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login and deploy:
   ```bash
   railway login
   railway link
   railway up
   ```

3. Set environment variables in Railway dashboard:
   - `DATABASE_URL` → PostgreSQL connection string
   - `JWT_SECRET` → Random secret key
   - `CORS_ORIGINS` → Your frontend URL

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_BASE_URL=http://localhost:8080
VITE_APP_NAME=Expense Splitter
VITE_APP_VERSION=1.0.0
```

#### Backend (.env)
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/expense_splitter
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Groups
- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create new group
- `POST /api/groups/{id}/members` - Add member to group

### Expenses
- `GET /api/expenses` - Get expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Balances
- `GET /api/groups/{id}/balances` - Get group balances

### Settlements
- `GET /api/settlements` - Get settlements
- `POST /api/settlements` - Create settlement

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run typecheck
npm run lint
npm run build

# Backend tests
cd backend
./mvnw test
./mvnw package

# Docker tests
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Troubleshooting

### 🎯 Single Command Startup Issues

**⚠️ Docker Desktop not found:**
```batch
# The script will try to start Docker Desktop automatically
# If it fails, manually start Docker Desktop and run:
quick-start.bat
```

**🚫 Port conflicts (3000, 8080, 5432, 5050 in use):**
```batch
# Stop existing containers and retry
docker-compose down
start.bat
```

**🔎 Check what's running:**
```batch
docker-compose ps
docker-compose logs -f
```

**🔄 Complete reset:**
```batch
# This removes all containers and data
docker-compose down -v
start.bat
```

### Common Issues

<details>
<summary>Docker issues</summary>

- **Docker not starting:** Install Docker Desktop from https://docker.com
- **Permission issues:** Run as Administrator on Windows
- **Build failures:** Check internet connection for image downloads

</details>

<details>
<summary>Application issues</summary>

- **Frontend won't load:** Wait 60 seconds for build to complete
- **API errors:** Check backend logs: `docker-compose logs backend`
- **Database connection:** Check database logs: `docker-compose logs db`

</details>

## 📞 Support

- 📧 Email: support@expense-splitter.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/expense-splitter/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/expense-splitter/discussions)

## 🙏 Acknowledgments

- React team for the amazing framework
- Spring Boot team for the robust backend framework
- Vercel and Railway for hosting services
- All contributors and users

---

Made with ❤️ by [Your Name](https://github.com/yourusername)