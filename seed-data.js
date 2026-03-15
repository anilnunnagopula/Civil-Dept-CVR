/**
 * CVR Civil Engineering — Data Seed Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Run once in the browser console on http://localhost:5173 to push real
 * department data fetched from https://cvr.ac.in/home4/index.php/civil
 *
 * HOW TO USE:
 * 1. Open http://localhost:5173 in Chrome
 * 2. Open DevTools → Console
 * 3. Copy-paste the entire content of this file and press Enter
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9jbouAW5Phry3Ivh9j-gZQ9lMzqjaqIE",
  authDomain: "civil-dept-8e426.firebaseapp.com",
  projectId: "civil-dept-8e426",
  storageBucket: "civil-dept-8e426.firebasestorage.app",
  messagingSenderId: "980223131767",
  appId: "1:980223131767:web:bb26a1ce2e325a8d330672",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

async function seed(collectionName, docs) {
  const col = collection(db, collectionName);
  for (const doc of docs) {
    await addDoc(col, { ...doc, isNew: false, createdAt: serverTimestamp() });
    console.log(`✅ [${collectionName}] Added: ${doc.name || doc.title}`);
  }
}

// ── HODs & Leadership ───────────────────────────────────────────────────────
const hods = [
  {
    name: "Dr. B. Naga Malleswara Rao",
    role: "HoD",
    specialisation: "Water Resources Engineering",
    since: "2011",
    email: "hod.civil@cvr.ac.in",
  },
  {
    name: "Dr. K. Rama Sastri",
    role: "Dean",
    specialisation: "Geotechnical Engineering",
    since: "2011",
    email: "",
  },
  {
    name: "Dr. M. V. Seshagiri Rao",
    role: "Dean",
    specialisation: "Structural Engineering",
    since: "2011",
    email: "",
  },
];

// ── Teaching Faculty ────────────────────────────────────────────────────────
const faculty = [
  {
    name: "Dr. N. Murali Krishna",
    role: "Professor",
    specialisation: "Structural Engineering",
    qualifications: "Ph.D.",
    experience: "20+ years",
    email: "",
  },
  {
    name: "Dr. T. Muralidhara Rao",
    role: "Professor",
    specialisation: "Structural Engineering",
    qualifications: "Ph.D.",
    experience: "20+ years",
    email: "",
  },
  {
    name: "Dr. Sasank Sekhar Hota",
    role: "Professor",
    specialisation: "Structural Engineering",
    qualifications: "Ph.D.",
    experience: "18+ years",
    email: "",
  },
  {
    name: "Dr. K. Madhusudan Reddy",
    role: "Professor",
    specialisation: "Geotechnical Engineering",
    qualifications: "Ph.D.",
    experience: "20+ years",
    email: "",
  },
  {
    name: "Dr. Sadguna Nuli",
    role: "Assoc. Professor",
    specialisation: "Transportation Engineering",
    qualifications: "Ph.D.",
    experience: "15+ years",
    email: "",
  },
  {
    name: "Mr. M. Ashok Kumar",
    role: "Asst. Professor",
    specialisation: "Geotechnical Engineering",
    qualifications: "M.Tech",
    experience: "8+ years",
    email: "",
  },
];

// ── Infrastructure / Labs ───────────────────────────────────────────────────
const infra = [
  {
    name: "Advanced Concrete Technology Lab",
    type: "Laboratory",
    emoji: "🧱",
    description:
      "Equipped with Compression Testing Machine (2000kN), Concrete Permeability Apparatus, Accelerated Curing Tank, and Air Entrainment Meter.",
    capacity: "30 Students",
  },
  {
    name: "Project & Research Lab",
    type: "Laboratory",
    emoji: "🔬",
    description:
      "Contains Computerized Four-Column Load Frame (1000kN capacity) and High-Temperature Furnace (up to 1000°C) for advanced material testing.",
    capacity: "20 Students",
  },
  {
    name: "Environmental Engineering Lab",
    type: "Laboratory",
    emoji: "🌿",
    description:
      "Equipped with Nephelometer, Spectrophotometer, B.O.D. Incubator, and Noise Level Meter for water quality and environmental analysis.",
    capacity: "30 Students",
  },
  {
    name: "Geotechnical Engineering Lab",
    type: "Laboratory",
    emoji: "⛏️",
    description:
      "Features Standard Penetration Test (SPT) Setup and comprehensive soil testing equipment for geotechnical investigation and soil mechanics.",
    capacity: "30 Students",
  },
  {
    name: "Surveying & Geo-Informatics Lab",
    type: "Laboratory",
    emoji: "🗺️",
    description:
      "Equipped with Total Stations, Digital Levels, and GPS units for field surveying and geomatics studies.",
    capacity: "30 Students",
  },
  {
    name: "Civil Engineering Computer Lab",
    type: "Laboratory",
    emoji: "💻",
    description:
      "Industry-standard software including STAAD Pro, ETABS, AutoCAD, and QGIS for structural design, drafting, and GIS applications.",
    capacity: "40 Students",
  },
  {
    name: "Departmental Library",
    type: "Other",
    emoji: "📚",
    description:
      "3,871 volumes across 673 titles. Access to ASCE digital library (35 journals) and DELNET (209 journals) for research and reference.",
    capacity: "",
  },
];

// ── Run seeding ─────────────────────────────────────────────────────────────
(async () => {
  console.log("🌱 Starting seed...");
  await seed("hods", hods);
  await seed("faculty", faculty);
  await seed("infra", infra);
  console.log("✅ All done! Reload your site to see the data.");
})();
