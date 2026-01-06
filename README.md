# SecureNotes Cloud

A secure, containerized Node.js backend demonstrating DevSecOps best practices.

## 🔐 Security Architecture

| Security Control | Implementation |
|------------------|----------------|
| IAM | Clerk JWT authentication |
| Authorization | Express middleware + API-level checks |
| Data Security | Supabase Row Level Security (RLS) |
| Secrets Management | Environment variables |
| Container Hardening | Alpine base, non-root user |
| Vulnerability Scanning | Trivy |
| Monitoring | Render logs |
| Incident Response | [Documented plan](./security/incident-response.md) |

## 🗂 Project Structure

```
YourNotes-cloud/
├── app/app.js              # Express application
├── routes/
│   ├── protected.js        # Auth test routes
│   └── notes.js            # Notes CRUD
├── services/
│   ├── clerk.js            # Clerk client
│   └── supabase.js         # Supabase client
├── middleware/
│   └── authMiddleware.js   # JWT validation
├── docker/
│   └── Dockerfile          # Hardened container
├── security/
│   └── incident-response.md
├── server.js               # Entry point
└── .env.example            # Environment template
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker (optional)
- Clerk account
- Supabase account

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

Required environment variables:
- `CLERK_SECRET_KEY` - From Clerk dashboard
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anon/public key

### 3. Setup Supabase Database

Execute in Supabase SQL editor:

```sql
-- Create notes table
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Users can only access their own notes
CREATE POLICY "Users can view own notes"
ON notes FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own notes"
ON notes FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can delete own notes"
ON notes FOR DELETE USING (user_id = auth.uid()::text);
```

### 4. Run Development Server
```bash
npm run dev
```

## 🐳 Docker Deployment

### Build Image
```bash
docker build -t yournotes-cloud -f docker/Dockerfile .
```

### Run Container
```bash
docker run -p 3000:3000 --env-file .env yournotes-cloud
```

### Verify Security
```bash
# Confirm non-root user
docker run yournotes-cloud whoami
# Output: node
```

## 🔍 Vulnerability Scanning

```bash
# Scan with Trivy
trivy image yournotes-cloud > security/trivy-scan.txt
```

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Health check |
| GET | `/api/protected` | Yes | Auth test |
| GET | `/api/protected/me` | Yes | User profile |
| GET | `/api/notes` | Yes | List user's notes |
| GET | `/api/notes/:id` | Yes | Get specific note |
| POST | `/api/notes` | Yes | Create note |
| DELETE | `/api/notes/:id` | Yes | Delete note |

### Example Request
```bash
curl -H "Authorization: Bearer <clerk_session_token>" \
  http://localhost:3000/api/notes
```

## ☁️ Render Deployment

1. Connect GitHub repository to Render
2. Create new Web Service
3. Set build command: `docker build -t app -f docker/Dockerfile .`
4. Add environment variables in Render dashboard
5. Deploy

## 📋 Security Checklist

- [x] JWT authentication on all protected routes
- [x] Row Level Security on database
- [x] Non-root container user
- [x] Minimal Alpine base image
- [x] Secrets in environment variables
- [x] No hardcoded credentials
- [x] Incident response plan documented
- [x] Structured request logging for monitoring

## 📄 License

ISC
