![Hung-Up Header Banner](/client/public/banner.png)

# Hung-Up

_A full-stack wardrobe organizer built with React, Express, and MongoDB._

[Live demo](https://hung-up-demo.delaneywells.dev)

Hung-Up helps users catalog their clothes, outfits, and plan for occasions. This is a digital wardrobe built for the indecisive who dread getting dressed (like myself), _and_ for the fashion obsessed organizers-at-heart.

Originally adapted from a prior school project, this build-out is inspired by my real desire to think less about personal style.

Featured in my full-stack portfolio, this app demonstrates:

- Custom REST API (Node + Express + MongoDB)
- React front-end with modular SCSS styling
- Image uploads via Cloudinary
- CRUD operations with live demo data
- Deployment on Render using a monorepo setup

> **Note:** This public demo uses a shared database — any changes you make (adding, editing, or deleting items) will be visible to others. Please do not make changes unless you want to hire me. 😊

---

## Features

| Feature                 | Description                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------- |
| **Clothing Management** | Add, edit, and rate your clothing items on different characteristics.                 |
| **Outfit Builder**      | Combine pieces into curated looks, log a photo of yourself in the look for reference. |
| **Drawers System**      | Access items easily through sorting by drawer.                                        |
| **Smart Metadata**      | Add details like color, size, and weather/occasion tags, pick your favorites.         |
| **Image Uploads**       | Upload outfit and clothing photos using Cloudinary integration.                       |
| **Demo Mode Notice**    | A visual banner and confirmational warning before any shared database changes.        |
| **Full Deployment**     | Hosted via Render with a Node backend and Vite/React frontend.                        |

---

## Tech Stack

| Category            | Tools                        |
| ------------------- | ---------------------------- |
| **Frontend**        | React · SCSS Modules · Axios |
| **Backend**         | Express · Node.js · Mongoose |
| **Database**        | MongoDB Atlas                |
| **Image Storage**   | Cloudinary                   |
| **Deployment**      | Render (monorepo setup)      |
| **Version Control** | Git + GitHub                 |

---

## Project Structure

Here are far more details than you asked for:

```bash
hung-up/
├── api/                      # Express & MongoDB backend
│   └── src/
│       ├── controllers/      # Business logic for API routes
│       ├── routes/           # Express route definitions
│       ├── models/           # Mongoose schemas and data models
│       ├── db/               # Database connection helpers
│       └── server.js         # Express server entry point
│
└── client/                   # React frontend
    └── src/
        ├── components/       # Reusable UI components
        ├── hooks/            # Custom React hooks
        ├── pages/            # Route-level views
        ├── styles/           # SCSS modules and theme files
        ├── utils/            # Shared helper functions and formatting logic
        └── lib/              # Client-side data layer or API service wrappers

```

---

## Screenshots

<!-- TODO: add mobile screenshots -->

| View               | Screenshot                                           | Mobile |
| ------------------ | ---------------------------------------------------- | ------ |
| Home / Closet      | ![Closet View](/client/public/Screenshot_02.png)     |
| Clothes Index      | ![Clothing Index](/client/public/Screenshot_03.png)  |
| Clothing Detail    | ![Clothing Detail](/client/public/Screenshot_13.png) |
| Clothing Edit Form | ![Outfit Index](/client/public/Screenshot_25.png)    |
| Outfits Index      | ![Closet View](/client/public/Screenshot_02.png)     |
| Outfit Detail      | ![Clothing Detail](/client/public/Screenshot_13.png) |
| Outfit Edit Form   | ![Edit Form](/client/public/Screenshot_03.png)       |
| Drawers Index      | ![Outfit Index](/client/public/Screenshot_25.png)    |
| Filtered Index     | ![Outfit Index](/client/public/Screenshot_25.png)    |

---

## Learning & Skill Development

## Deployment

Hosted via Render as a single service (API + client).

Build command:

```bash
cd api && npm ci && npm run build
```

Start command:

```bash
cd api && npm start
```

Live site: hung-up-demo.onrender.com or [hung-up-demo.delaneywells.dev](https://hung-up-demo.delaneywells.dev)

---

## Acknowledgments

Built by Delaney Wells.

Design and development by me, inspired by the small daily decisions that reflect our biggest values.

### License

<!-- TODO: check if true  -->

This project is licensed under the MIT License.

You’re welcome to reference, fork, or use it for learning. As a reminder, please do not make changes to the database on my live demo...unless you want to hire me! ;)
