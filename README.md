# Pixabay-Image-Finder
---

## Project Purpose:

This project was built to practice my ReactJS and Firebase Skill. Project uses Pixabay Image API to fetch image and you can login to favourite images.

## Tools and Skills Used
1. ReactJS
2. React Router
3. Material-UI(just for the form)
4. Responsive and Mobile friendly design(pure css)
5. Firebase Realtime Database
6. Firebase Auth

## How to Load the App

You can run a hosted version of the app at [https://pixabay-image-finder.netlify.com/](https://pixabay-image-finder.netlify.com/)

The project uses Node.js and the Create-React-App starter. If you do not have Node >= 6.x installed, you can download it here: [Node.js](https://nodejs.org/en/)

Once Node is installed, navigate to the directory where you want to store the app

```
git clone https://github.com/Akash187/Pixabay-Image-Finder.git
npm install
```

Create a Firebase App and put the keys and secret in a .env file in the root of project. See the example below.
```
REACT_APP_FIREBASE_API_KEY=AIzaSyBjuzodfdsjkKDFfkdk2oJYUX9dEaU
REACT_APP_FIREBASE_AUTH_DOMAIN=manchester-city-12e45.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://manchester-city-12e45.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=manchester-city-12e45
REACT_APP_FIREBASE_STORAGE_BUCKET=manchester-city-12e45.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=2412e4546937
```

Once all of the dependencies have been installed you can launch the app with

```
npm start
```

A new browser window should automatically open displaying the app. If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser

