# Car Wash Booking Application

## 🖥️ Application Preview

### Landing Page
![Landing screenshot](assets/landing_desk.png)

### Schedule Management
![Schedule changing demonstration](assets/change_schedule.gif)

### Payment Process  
![Payment process demonstration](assets/payment_accepted.gif)

---

This project is a booking application designed for a car wash company.
The goal is to allow customers to book a car wash service online and enable the company to manage reservations efficiently.

## Project Objectives
- Simplify the booking process for customers
- Avoid scheduling conflicts
- Improve organization and time management for the car wash company

## Core Features (MVP)
- Book a time slot by selecting a service and a date/time
- View available time slots
- Booking confirmation
- Admin area to view and manage bookings

## Documentation
- Requirements specification: `docs/requirements specification/`
- User stories & business rules: `docs/Functional specification/`
- UI mockups and wireframes: `design/figma-links.md`
- Planning and backlog: `planning/`

## Tech Stack
- **Frontend**: React with TypeScript
- **Backend**: NestJS (Node.js) API
- **Database**: PostgreSQL 16
- **Package Manager**: pnpm (monorepo workspace)
- **Containerization**: Docker & Docker Compose
- **Development**: Hot reload with pnpm workspaces

## 🏗️ Project Structure
This project uses a **monorepo architecture** with pnpm workspaces:
```
Auto_95_Clean/
├── apps/               # Applications
│   ├── frontend/       # React frontend app
│   └── backend/        # NestJS API server
├── packages/           # Shared packages
│   ├── shared/         # Common utilities
│   └── types/          # TypeScript definitions
├── docker-compose.yml  # PostgreSQL database setup
└── pnpm-workspace.yaml # Workspace configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (`npm install -g pnpm`)
- Docker & Docker Compose

### Installation & Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Auto_95_Clean
```

2. **Start the database**
```bash
docker-compose up -d
```

3. **Install dependencies**
```bash
pnpm install
```

4. **Start development servers**
```bash
pnpm dev
```

The database will be available at `localhost:5432` with:
- Database: `auto95clean`
- User: `auto95` 
- Password: `auto95pass`

## Project Status
- [x] Requirements document completed
- [x] User stories defined
- [x] Mockups finalized
- [x] Development environment setup (Docker + pnpm workspace)
- [x] Database configuration (PostgreSQL)
- [ ] MVP development in progress

## Learning Goals
This project aims to strengthen skills in:
- Functional analysis & project structuring
- **Monorepo architecture** with pnpm workspaces
- **Full-stack development** (React + NestJS + PostgreSQL)
- **Containerization** with Docker
- **Modern development workflow** and tooling
- Version control with Git

## Author
Mehdi NAOUI