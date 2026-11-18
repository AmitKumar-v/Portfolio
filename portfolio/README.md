# Portfolio (MERN)

A personal portfolio with two projects (ClientFlow and SmartDesk), a light/dark theme, a contact form, and an admin page where you edit the projects and read messages.

**Stack:** MongoDB, Express 5, React 18 (Vite), Node.js, Tailwind CSS 3. Plain JavaScript, no TypeScript.

## Folder map

```
portfolio/
├── server/                     Backend (Express + MongoDB)
│   ├── server.js               Starts the app, connects the database
│   ├── seed.js                 Creates your admin login and the 2 projects
│   ├── config/db.js            MongoDB connection
│   ├── models/                 What we store: User, Project, Message, Resume
│   ├── routes/                 URL list: which URL calls which controller
│   ├── controllers/            The actual logic for each URL
│   └── middleware/             auth.js (checks login), errorHandler.js
└── client/                     Frontend (React)
    └── src/
        ├── main.jsx            Starts React
        ├── App.jsx             Which URL shows which page
        ├── index.css           Theme colours (light + dark)
        ├── data/profile.js     YOUR text: intro, education, skills (edit this)
        ├── api/client.js       One axios setup used for every API call
        ├── context/            ThemeContext (dark mode), AuthContext (login)
        ├── pages/              Home, Login, Admin
        └── components/         Hero, Projects, About, Contact, ... and admin/
```

## How it works (follow one request)

**Visitor sends a contact message**

1. `Contact.jsx` collects name, email and message, then calls `api.post('/messages', form)`.
2. `server.js` sends `/api/messages` to `routes/messageRoutes.js`.
3. The route runs the rate limiter (5 per hour), then `createMessage` in `controllers/messageController.js`.
4. The controller checks the input, then saves it with the `Message` model into MongoDB.
5. You read it later in Admin, Messages tab.

**You log in and edit a project**

1. `Login.jsx` sends email and password to `POST /api/auth/login`.
2. `authController.js` compares the password with the bcrypt hash and returns a JWT token.
3. `AuthContext` saves the token in localStorage. `api/client.js` now adds it to every request.
4. `ProtectedRoute.jsx` lets you open `/admin`. On the server, `middleware/auth.js` checks the token before any create, update or delete.

## Run it on your computer

You need Node.js 18+ and MongoDB (local, or a free MongoDB Atlas cluster).

```bash
# 1. install everything (root, server and client)
npm run install-all

# 2. server settings
cp server/.env.example server/.env
#    open server/.env and set MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 3. create your admin account and the two projects (run once)
npm run seed

# 4. start both server and client
npm run dev
```

Open http://localhost:5173. The admin login is at http://localhost:5173/admin/login (there is a small "Admin" link in the footer).

## Things you will want to change

- **Your text:** `client/src/data/profile.js` (intro, education, experience, skills, GitHub link).
- **Resume:** log in to `/admin`, open the Resume tab and upload a PDF (up to 2 MB). The "Download resume" button appears on the site by itself. Uploading again replaces the old file.
- **Projects:** log in to `/admin` and use Edit. Add the GitHub link and live link there once they exist.
- **Exact Clean Slate colours:** open the theme on tweakcn.com, press Code, and paste its `:root` and `.dark` colour blocks into `client/src/index.css`. Keep the variable names.
- **Page title and description:** `client/index.html`.

## Deploying later

- Frontend: build with `npm run build --prefix client` and host the `dist` folder (Vercel or Netlify).
- Backend: host `server` on Render or Railway with the same variables as `.env`. Set `CLIENT_URL` to your frontend URL.
- Frontend `.env`: set `VITE_API_URL` to your backend URL plus `/api`.
- Run `npm run seed` once against the production database to create the admin account.
