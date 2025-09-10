# Hospital Management System — Deep Scan Summary

This README is an automated deep-scan summary of the repository and provides clear run instructions, environment variables, security notes, API and database overview, and quick development tips.

## Repo layout (important folders)

- `client/` — React frontend (Create React App / Webpack). Start: `npm start` inside `client`.
- `server/` — Express + Mongoose backend. Start: `nodemon index.js` or `npm start` inside `server`.
- `public/` — Public assets and exported invoices.
- `invoice/` — Sample generated PDF invoices.

## What I found (high level)

- The repository is a full stack hospital management system with a React frontend and Node/Express backend.
- The backend connects to MongoDB via Mongoose. A connection string is present directly in `server/index.js`.
- Environment variable support via `dotenv` exists in both `client` and `server`, and `.env` is listed in `.gitignore`.
- The root `package.json` includes convenience scripts to run client and server concurrently.

## How to run (development)

1. Install dependencies at repo root (installs dev tools):

   Open a PowerShell terminal and run:

```
npm install
cd server
npm install
cd ..\client
npm install
```

2. Start server and client (two options):

- Single command (uses root scripts, runs server then client):

```
npm start
```

- Or run concurrently during development (recommended):

Terminal 1 (server):

```
cd server; npm start
```

Terminal 2 (client):

```
cd client; npm start
```

The server listens on port 3001 by default (`server/index.js`). The client uses standard CRA port (3000).

## Environment variables (recommended)

Create a `.env` in `server/` with at least the following values (sensible names):

```
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
```

And in `client/` a `.env` with frontend variables like:

```
REACT_APP_SERVER_URL=http://localhost:3001
```

Note: The code currently hardcodes a MongoDB connection string and an email credential in `server/index.js` (see Security notes). Replace those with environment variables and remove secrets from the codebase and history.

## Database and models (summary)

The app uses MongoDB via Mongoose. Key models found under `server/models/`:

- `User` (`server/models/user.js`) — application users (admins, doctors, patients).
- `Patient` (`server/models/patient.js`) — patient records.
- `Doctor` (`server/models/doctor.js`) — doctor profiles.
- `Appointment` (`server/models/appointment.js`) — appointments linking patients and doctors.
- `Prescription` (`server/models/prescription.js`) — prescriptions and payment flow.
- `Medicine` (`server/models/medicine.js`) — medicine catalog.
- `Departement` (`server/models/Departement.js`) — departments.
- `Conversation` (`server/models/conversation.js`) — stores AI/chat results or conversation blobs.

These models are used across controllers under `server/controllers/` which implement the API logic.

## API overview (important routes)

The Express app mounts many routes. Key route files are under `server/routes/`:

- `LoginRegisterRoute.js` — authentication and registration endpoints.
- `UserRoute.js`, `PatientRoute.js`, `DoctorRoute.js` — user, patient, and doctor resource endpoints.
- `AppointmentRoute.js` — appointment creation/listing.
- `MedicineRoute.js`, `PrescriptionRoute.js`, `InvoiceRoute.js` — prescriptions, invoices, and payments.
- `DepartementRoute.js`, `DashboardRoute.js`, `ProfileRoute.js` — admin/dashboard related endpoints.
- `routes/api/*` — helper API endpoints (paypal, login, patient helpers, AI ask endpoint).

A simple health endpoint exists at `/` (returns "hello world"). PayPal endpoints are under `/api/paypal`.

## Security & sensitive findings (action required)

The scanner found potential secrets checked into code:

- A MongoDB connection string with credentials is hardcoded in `server/index.js`:

  mongodb+srv://------------:------------@cluster0.whkh7vj.mongodb.net/myBase?... (replace immediately)

- A Gmail credential (likely an app password) is directly present in `server/index.js` used by Nodemailer:

  user: "alrahma.hopitale@gmail.com"
  pass: "dzjezodryjvcmlea"

Action items:

1. Rotate the exposed database and email credentials immediately.
2. Move secrets to environment variables and load them with `dotenv`.
3. Remove secrets from git history (use git filter-repo or BFG) if this repo was public.
4. Add an explicit developer note in `README` reminding to not commit `.env` files.

## Quick developer tips

- Replace the hardcoded Mongo URI and email credentials in `server/index.js` with `process.env.MONGO_URI` and `process.env.EMAIL_*` and ensure `.env` is listed in `.gitignore`.
- Use `npm run dev` from root if you add a `dev` script that uses `concurrently` to run server and client in parallel.
- Run `npm run lint` (add ESLint) and `npm test` to add quality gates.

## Tests & quality gates

No automated tests were found beyond a default `App.test.js` in the client. Adding minimal unit tests for controllers and a small integration smoke test for the API (health check and DB connect) would be recommended.

## Next recommended follow-ups (low risk, high value)

1. Replace hardcoded secrets with environment variables and push a small PR.
2. Add a `Makefile` or top-level `scripts` that runs `npm --prefix server start` and `npm --prefix client start` concurrently in dev.
3. Add short CONTRIBUTING.md with dev setup steps and a `CODE_OF_CONDUCT.md` if this will be shared.
4. Add a small script or GitHub Action to detect secrets on push (pre-commit or CI using `git-secrets` or `truffleHog`).

---

If you'd like, I can:

- Replace the hardcoded secrets with environment variables and update `server/index.js` accordingly (I can open a branch and create a PR).
- Add a small `run-dev` script at the repository root that starts both client and server with `concurrently`.
- Create a minimal `.env.example` for both `server/` and `client/`.

Tell me which next steps you want me to perform and I'll apply them.
<!DOCTYPE html>
<html lang="en">
<head>
  
 
    
</head>
<body>
    <header>
        <div class="container">
            <h1>Hospital Management System</h1>
            <ul>
                <li><a href="#overview">Overview</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#tech">Technologies Used</a></li>
                <li><a href="#demo">Demo</a></li>
            </ul>
        </div>
    </header>

<section class="showcase">
        <div class="container">
            <h1>Welcome to the Hospital Management System</h1>
            <p>A comprehensive and integrated solution to improve hospital management.</p>
            <a href="https://tariq-mehdi-ahmed-said-hopital-pfe.netlify.app" class="button">View Demo</a>
        </div>
    </section>

<section id="overview" class="container">
        <h2>Project Overview</h2>
        <p>This hospital management system provides a complete and integrated solution to enhance hospital management. Leveraging modern technologies and an optimized user interface, it offers a smooth and efficient experience for administrators, doctors, and patients. The inclusion of advanced features like AI voice consultations and online meetings ensures that the system remains at the forefront of technological innovation.</p>
    </section>

<section id="features" class="container">
        <h2>Features</h2>
        <ul>
            <li>Manage prescriptions</li>
            <li>Access communication tools</li>
            <li>Manage users</li>
            <li>Manage appointments</li>
            <li>Use AI medical chat</li>
            <li>Consult appointments</li>
            <li>Manage consultations</li>
            <li>Edit profile</li>
            <li>Book appointments online or in-hospital</li>
            <li>Pay prescriptions</li>
        </ul>
    </section>

<section id="tech" class="container">
        <h2>Technologies Used</h2>
        <ul>
            <li>Express.js</li>
            <li>React.js</li>
            <li>Google Gemini</li>
            <li>VideoSDK</li>
            <li>Socket.io</li>
            <li>Docker</li>
            <li>MongoDB</li>
            <li>Firebase</li>
            <li>Node.js</li>
            <li>Express.js</li>
        </ul>
    </section>

<section id="demo" class="container">
        <h2>Project Demo</h2>
        <p>You can access the demo of the project <a href="https://tariq-mehdi-ahmed-said-hopital-pfe.netlify.app">here</a>.</p>
    </section>

<footer>
        <p>© 2024 Hospital Management System. All rights reserved.</p>
    </footer>
</body>
</html>
