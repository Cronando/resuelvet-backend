# Resuelvet Backend

A TypeScript/Node.js Express API for ticket management system with PostgreSQL database and JWT authentication.

## Prerequisites

- Node.js 20+ and npm
- PostgreSQL 16+ (for local deployment)
- Docker and Docker Compose (for dockerized deployment)

## Project Structure

```
src/
├── app.ts              # Express application setup
├── server.ts           # Server entry point
├── config/             # Database configuration
├── controllers/        # Route controllers
├── entities/           # TypeORM entities
├── middlewares/        # Express middlewares (auth, etc.)
├── routes/             # API routes
├── services/           # Business logic services
└── utils/              # Utilities (JWT, etc.)
```

## Local Deployment

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the project root with the following variables:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=resuelvet_db
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=7d
   NODE_ENV=development
   PORT=3000
   ```

3. **Setup PostgreSQL:**
   - Install PostgreSQL locally or use a PostgreSQL service
   - Create a database named `resuelvet_db`
   - Run the initialization scripts:
     ```bash
     psql -U postgres -d resuelvet_db -f resuelvet-db.sql
     psql -U postgres -d resuelvet_db -f resuelvet-inserts.sql
     ```

### Running Locally

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production build and start:**
```bash
npm run build
npm start
```

The API will be available at `http://localhost:3000`

## Docker Deployment

### Setup

1. **Prepare environment file:**
   Create a `.env.docker` file in the project root:
   ```env
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=resuelvet_db
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=7d
   NODE_ENV=production
   PORT=3000
   ```

2. **Build and start containers:**
   ```bash
   docker-compose up -d
   ```

   Or rebuild if you've made changes:
   ```bash
   docker-compose up -d --build
   ```

### Accessing Services

- **API:** `http://localhost:3000`
- **Database:** `localhost:5433` (PostgreSQL port mapped from container port 5432)

### Docker Commands

**View logs:**
```bash
docker-compose logs -f api      # API logs
docker-compose logs -f db       # Database logs
docker-compose logs -f          # All logs
```

**Stop containers:**
```bash
docker-compose down
```

**Stop and remove volumes:**
```bash
docker-compose down -v
```

**Restart services:**
```bash
docker-compose restart
```

## Database

The database is automatically initialized using SQL scripts:
- `resuelvet-db.sql` - Schema definition
- `resuelvet-inserts.sql` - Initial data

### Local Database Backup

```bash
pg_dump -U postgres -d resuelvet_db > backup.sql
```

### Restore from Backup

```bash
psql -U postgres -d resuelvet_db < backup.sql
```

## Build Information

### Multi-stage Docker Build

The Dockerfile uses a multi-stage build process:
1. **Builder stage** - Compiles TypeScript to JavaScript
2. **Runner stage** - Runs the compiled application with production dependencies only

This approach minimizes the final image size by excluding development dependencies.

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## Troubleshooting

### Local Deployment

**Connection refused to database:**
- Verify PostgreSQL is running
- Check DB credentials in `.env` file
- Ensure database and tables are created

**Port 3000 already in use:**
```bash
# On Linux/Mac - find and kill process using port 3000
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Docker Deployment

**Database connection fails:**
- Check `.env.docker` file configuration
- Ensure database service is healthy: `docker-compose ps`
- Verify health check: `docker-compose logs db`

**Container won't start:**
- Check logs: `docker-compose logs api`
- Rebuild containers: `docker-compose up -d --build`

**Port conflicts:**
- Change ports in `docker-compose.yml` if needed
- Example: Change `"3000:3000"` to `"3001:3000"` to use port 3001

## Available Users

When using the seeded database, the following test users are available for authentication:

| Username | Password | Role | Email |
|----------|----------|------|-------|
| lreza | Resuelvet123 | ADMIN | luis@resuelvet.com |
| alopez | Resuelvet123 | AGENT | ana@resuelvet.com |
| cmendez | Resuelvet123 | AGENT | carlos@resuelvet.com |
| mgarcia | Resuelvet123 | REQUESTER | maria@resuelvet.com |
| jperez | Resuelvet123 | REQUESTER | juan@resuelvet.com |

**Note:** These are development credentials for testing purposes only. Change passwords and create new users for production environments.

### User Roles

- **ADMIN** - Full system access and user management
- **AGENT** - Can manage tickets and handle support requests
- **REQUESTER** - Can create and view their own tickets

## API Documentation

The API provides endpoints for:
- Authentication (login, registration)
- User management
- Ticket management
- Ticket comments and history
- Ticket categories, status, and priority
- Role management

Refer to the route files in `src/routes/` for detailed endpoint information.

## Development

### Adding New Features

1. Create entity in `src/entities/`
2. Create service in `src/services/` extending `BaseService`
3. Create controller in `src/controllers/`
4. Create routes in `src/routes/`
5. Import routes in `src/app.ts`

### Building TypeScript

```bash
npm run build
```

Output is compiled to `dist/` directory.

## License

ISC
