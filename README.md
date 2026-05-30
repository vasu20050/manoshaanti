# ManoShaanti Platform

This repository contains the ManoShaanti platform — a web-based AI-powered mental health support system for Indian youth.

## Tech Stack

- **Frontend**: React + Vite + TypeScript (web)
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: Firestore, BigQuery
- **Hosting**: Google Cloud Platform (Cloud Run, Firestore, etc.)
- **AI**: Google Vertex AI + Gemini

## What's included

- Backend services (Node.js + Express + TypeScript) with microservices architecture
- Frontend web application (React + Vite + TypeScript)
- Infrastructure as Code (Terraform + Kubernetes manifests)
- Docker and docker-compose for local development
- PRD and Architecture documents

## Getting started (local development)

1. Copy `.env.example` to `.env` and fill in credentials
2. Install dependencies:
   - `npm install` (root workspace installs frontend and backend)
3. Start services locally:
   - `docker-compose up --build` (starts backend, redis, firestore emulator)
4. Start frontend:
   - `cd frontend && npm install && npm run dev`
5. Open http://localhost:3000 in your browser

## Useful scripts
- `npm run dev` - Starts backend & frontend in dev mode (workspace)
- `npm run build` - Builds backend & frontend
- `npm run docker-build` - Builds backend Docker image

## Notes
- This platform is web-only with responsive design for desktop and tablet
- AI integration (Vertex AI) and production configurations require additional setup
- Ensure you have Docker and Docker Compose installed for local development

---

If you'd like, I can:
- Implement Vertex AI integration for chat responses
- Add unit tests and CI pipeline enhancements
- Configure Terraform variables and runbooks
- Add more backend services (notifications, analytics, etc.)

