# HomeGuide AI 🏡🤖

An AI-powered real estate chatbot MVP that helps agencies capture and qualify leads 24/7 through their website.

## ✨ Features

- 🧠 **Chatbot UI** – Conversational interface that gathers buyer preferences like location, budget, bedrooms, name, and email.
- 📅 **Calendar Integration** – Lets users select a move-in date using a calendar (`react-calendar`).
- ☁️ **Firebase Integration** – Stores lead information securely in Firebase.
- 💬 **Floating Chat Widget** – Clean, mobile-friendly interface anchored to the bottom right of the site.
- ⚡ **Quick Setup** – Runs locally with `npm start` and easy to deploy with Firebase Hosting.

## Tech Stack

- **Frontend:** React (JavaScript)
- **Styling:** Basic CSS (with chatbot.css)
- **Date Picker:** `react-calendar`
- **Backend / DB:** Firebase (via client SDK)

## 🚀 Getting Started

1. **Clone the repo:**
   ```bash
   git clone git@github.com:your-username/homeguide-ai.git
   cd homeguide-ai


## Future Improvements

- Real-time property suggestions based on user input.
- Integration with a real estate API for up-to-date listings.
- User authentication and personalized dashboards.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Install dependencies
npm install

## Add Firebase config
Create .env file with this
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

## Start the App
npm start
