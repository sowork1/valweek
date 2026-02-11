// ============================================
// Firebase Configuration
// ============================================
// Your Firebase project config
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyApA4KJSFutjxek0_k3tdudav0nhiYWwgk",
    authDomain: "valweeks-f7099.firebaseapp.com",
    databaseURL: "https://valweeks-f7099-default-rtdb.firebaseio.com",
    projectId: "valweeks-f7099",
    storageBucket: "valweeks-f7099.firebasestorage.app",
    messagingSenderId: "320645309117",
    appId: "1:320645309117:web:3030e744d963d585d4dd4",
    measurementId: "G-4LB8VVNRYH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// const storage = firebase.storage(); REMOVED

// Database reference paths
const DB_PATHS = {
    config: 'valentine/config',
    days: 'valentine/days',
    memories: 'valentine/memories',
    quotes: 'valentine/quotes',
    gallery: 'valentine/gallery',
    panelTimeline: 'valentine/panels/timeline',
    panelEnvelopes: 'valentine/panels/envelopes',
    panelBucketList: 'valentine/panels/bucketlist',
    panelReasons: 'valentine/panels/reasons',
    panelCoupons: 'valentine/panels/coupons',
    panelGarden: 'valentine/panels/garden',
    panelDateNight: 'valentine/panels/datenight',
    panelLoveMatch: 'valentine/panels/lovematch'
};

// Check if Firebase is configured
function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";
}
