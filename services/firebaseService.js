// services/firebaseService.js
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { initializeApp: initializeClientApp } = require('firebase/app');
const clientAuth = require('firebase/auth');
const serviceAccount = require('../car-rental-5f3c9-firebase-adminsdk-a7nik-fc0c3a2ce7.json'); // Update with correct path

require('dotenv').config();

// Firebase Admin Initialization
initializeApp({
  credential: cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const clientApp = initializeClientApp(firebaseConfig);
const clientAuthInstance = clientAuth.getAuth(clientApp);

module.exports = { adminAuth: getAuth(), clientAuthInstance };