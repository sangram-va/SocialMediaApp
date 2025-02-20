Social Media Articles App

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) project that allows users to create, read, update, and delete (CRUD) social media articles. It utilizes React (with Vite) for the frontend, Node.js & Express.js for the backend, and MongoDB with Mongoose for data storage.

Features

User authentication (JWT)

CRUD operations on articles

Responsive UI with Styled Components

API calls using Axios

Modals for user interactions (react-modal)

Client-side routing with React Router DOM

Prerequisites

Before setting up the project, ensure you have the following installed:

Node.js (Latest LTS version)

MongoDB (Local or Cloud - MongoDB Atlas)

Git (Optional but recommended)

Getting Started

Follow these steps to set up the project:

1. Backend Setup (Node.js + Express + MongoDB)

Step 1: Initialize Backend

mkdir social-media-articles-app && cd social-media-articles-app
mkdir backend && cd backend
npm init -y

Step 2: Install Dependencies

npm install express mongoose cors dotenv body-parser jsonwebtoken bcryptjs

Step 3: Create Basic Server Setup

Create an index.js file inside backend and add the following:

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => console.log(error));

Step 4: Configure Environment Variables

Create a .env file in backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Step 5: Define Models (Mongoose)

Inside backend/models/Article.js:

const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Article", ArticleSchema);

Step 6: Create Routes

Inside backend/routes/articles.js:

const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const newArticle = new Article(req.body);
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

module.exports = router;

Step 7: Connect Routes to Server

Modify index.js:

const articleRoutes = require("./routes/articles");
app.use("/api/articles", articleRoutes);

Run the backend:

node index.js

2. Frontend Setup (React + Vite)

Step 1: Create React App

cd ../
npx create-vite frontend --template react
cd frontend

Step 2: Install Dependencies

npm install axios styled-components react-modal react-router-dom

Step 3: Setup Routing

Modify main.jsx:

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

Step 4: Create Routes in App.jsx

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateArticle from "./pages/CreateArticle";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateArticle />} />
        </Routes>
    );
}

export default App;

Step 5: Fetch Data using Axios

Modify Home.jsx:

import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/articles")
            .then((res) => setArticles(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Articles</h1>
            {articles.map((article) => (
                <div key={article._id}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;

Step 6: Run the Frontend

npm run dev

3. Final Steps

Start Backend and Frontend Together

In separate terminals, run:

cd backend && node index.js

cd frontend && npm run dev

Additional Enhancements

Authentication: Used JWT for secure user login and registration.

UI Improvements: Enhance styling with Styled Components.

Modals: Used react-modal for pop-up interactions.

