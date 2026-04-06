
# 🚀 GigShield – AI Parametric Insurance for Gig Workers

🌐 **Live Demo:** [https://gigcrest-555-main.vercel.app/](https://gigcrest-555-main.vercel.app/)

## 📌 Overview

**GigShield** is an AI-powered parametric insurance platform designed specifically for gig workers (delivery partners, riders, etc.). It protects their income against real-world disruptions like:

* 🌧 Heavy Rain
* 🌫 Air Pollution (AQI)
* 🌡 Extreme Heat
* 🌊 Floods
* 🚫 Strikes / Curfews

Instead of manual claim filing, **GigShield automatically detects events and triggers payouts**, ensuring fast and fair compensation.

---

## 🎯 Key Features

### 👷 Worker App (Mobile-First)

* User registration & OTP login
* Dashboard with:

  * Active policy
  * Weather conditions
  * Earnings protection stats
* Buy insurance policies (weekly)
* View claims & payout history
* Profile management

---

### 🧑‍💼 Admin Dashboard (Desktop)

* Real-time system overview
* Event simulation (demo highlight ⭐)
* Claims management (approve/deny)
* Fraud detection alerts
* Financial analytics (premium vs payout)
* Interactive zone risk map

---

### ⚙️ Backend Core

* REST APIs for all operations
* JSON-based database system
* Authentication system (OTP-based)
* Aggregated dashboard APIs
* Policy & claims processing

---

### 🌦 Event Engine

* Weather data integration (real + mock)
* Disruption detection logic
* Automatic claim triggering
* Event simulation for demo

---

### 🤖 AI/ML Engine

* Premium calculation
* Risk-based pricing
* Fraud detection system
* Payout calculation
* Mock data generation

---

## 🧠 System Architecture

```
Frontend (Worker + Admin)
        ↓
   Backend APIs (Core)
        ↓
 ┌───────────────┬───────────────┐
 │ Event Engine  │ AI/ML Engine  │
 └───────────────┴───────────────┘
        ↓
      Database (JSON)
```

---

## 👥 Team Structure

| Role     | Responsibility                        |
| -------- | ------------------------------------- |
| Person 1 | Worker Frontend (Mobile UI)           |
| Person 2 | Admin Dashboard + Maps                |
| Person 3 | Backend APIs & Database               |
| Person 4 | Event Engine (Weather + Detection)    |
| Person 5 | AI/ML Engine (Premium + Fraud + Data) |

---

## 🛠 Tech Stack

### Frontend

* React.js
* Next.js (App Router)
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js API Routes
* Node.js

### Data & Storage

* JSON-based storage

### Visualization & Maps

* Recharts
* Leaflet.js

### Tools

* Postman / Thunder Client
* Vercel (Deployment)

---

## 🔌 API Design Standard

All APIs follow a unified response format:

```json
{
  "success": true,
  "data": {},
  "error": ""
}
```

---

## 💡 Core Functionalities

### 📊 Worker Dashboard

* Displays real-time stats
* Shows active policies
* Tracks claims and payouts

### 💰 Premium Calculation

* Based on:

  * Zone risk
  * Season
  * Worker behavior
  * Platform usage

---

### ⚡ Event Simulation (Demo Feature)

Admins can:

* Select zone
* Choose event type
* Set severity

➡️ System auto-generates:

* Claims
* Payouts
* Fraud checks

---

### 🛡 Fraud Detection

* Location mismatch detection
* Risk scoring system
* Manual review support

---

## 📂 Project Structure

```
app/
  worker/        → Worker UI
  admin/         → Admin UI
  api/           → Backend APIs

components/
  worker/        → Worker components
  admin/         → Admin components
  maps/          → Map components

lib/
  db.ts          → Database utility
  auth.ts        → Authentication
  services/      → Core logic

types/
  index.ts       → Shared types

data/
  *.json         → Mock database
```

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/gigshield.git

# Navigate to project
cd gigshield

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🚀 Deployment

The project is deployed on **Vercel**:

👉 [https://gigcrest-555-main.vercel.app/](https://gigcrest-555-main.vercel.app/)

---

## 📋 Development Rules (Important)

* Use shared types (`types/index.ts`)
* Do not modify others’ files
* Commit at least 3 times/day
* Use mock data if APIs aren’t ready
* Follow consistent ID formats
* Use ISO date format

---

## 🧪 Testing

* APIs tested using Postman
* Frontend tested with mock data
* Integration during final phase

---

## ⏱ Development Timeline

* Independent development by each team member
* Integration phase at the end
* Daily coordination via team communication

---

## 🌟 Future Enhancements

* Real payment gateway integration
* Live weather API scaling
* Advanced ML fraud detection
* Mobile app version
* Real-time notifications

---

## 📢 Conclusion

GigShield solves a **real-world problem** by combining:

* AI
* Real-time data
* Parametric insurance


