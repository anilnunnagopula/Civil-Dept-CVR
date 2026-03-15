import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useCollection } from '../hooks/useCollection';
import { useToast } from '../contexts/ToastContext';
import AdminForm from '../components/AdminForm';
import styles from './AdminDashboard.module.css';

// ── Tab config ──
const TABS = [
  'Overview',
  'Faculty',
  'HOD/Leadership',
  'Infrastructure',
  'Events & Fests',
  'Student Projects',
  'Patents',
  'Publications',
  'B.Tech Alumni',
  'M.Tech Alumni',
  'Faculty Alumni',
];

// ── Field configs per tab ──
const FIELDS = {
  'Faculty': [
    { name: 'name', label: 'Name', required: true },
    { name: 'role', label: 'Role', type: 'select', required: true,
      options: ['Professor', 'Assoc. Professor', 'Asst. Professor', 'Visiting', 'Adjunct'] },
    { name: 'specialisation', label: 'Specialisation', required: true },
    { name: 'experience', label: 'Experience' },
    { name: 'qualifications', label: 'Qualifications' },
    { name: 'email', label: 'Email', type: 'email' },
  ],
  'HOD/Leadership': [
    { name: 'name', label: 'Name', required: true },
    { name: 'role', label: 'Role', type: 'select', required: true,
      options: ['HoD', 'Associate HoD', 'Dean', 'Deputy Dean', 'Coordinator'] },
    { name: 'specialisation', label: 'Specialisation', required: true },
    { name: 'since', label: 'Since Year' },
    { name: 'email', label: 'Email', type: 'email' },
  ],
  'Infrastructure': [
    { name: 'name', label: 'Name', required: true },
    { name: 'type', label: 'Type', type: 'select', required: true,
      options: ['Laboratory', 'Classroom', 'Other'] },
    { name: 'emoji', label: 'Emoji Icon', placeholder: 'e.g. 🔬' },
    { name: 'capacity', label: 'Capacity' },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
  ],
  'Events & Fests': [
    { name: 'name', label: 'Event Name', required: true },
    { name: 'type', label: 'Type', type: 'select', required: true,
      options: ['Technical Fest', 'Cultural', 'Workshop', 'Competition', 'Seminar', 'Guest Lecture', 'Field Visit'] },
    { name: 'date', label: 'Date', required: true },
    { name: 'venue', label: 'Venue' },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'highlights', label: 'Highlights', type: 'textarea' },
  ],
  'Student Projects': [
    { name: 'title', label: 'Project Title', required: true },
    { name: 'teamMembers', label: 'Team Members', required: true },
    { name: 'year', label: 'Year', required: true },
    { name: 'facultyGuide', label: 'Faculty Guide' },
    { name: 'description', label: 'Description', type: 'textarea', required: true },
    { name: 'award', label: 'Award / Recognition' },
  ],
  'Patents': [
    { name: 'title', label: 'Patent Title', required: true },
    { name: 'inventors', label: 'Inventors', required: true },
    { name: 'year', label: 'Year' },
    { name: 'patentNumber', label: 'Patent Number' },
    { name: 'status', label: 'Status', type: 'select', required: true,
      options: ['Filed', 'Published', 'Granted'] },
  ],
  'Publications': [
    { name: 'title', label: 'Paper Title', required: true },
    { name: 'authors', label: 'Authors', required: true },
    { name: 'journal', label: 'Journal / Conference', required: true },
    { name: 'year', label: 'Year' },
    { name: 'doi', label: 'DOI' },
  ],
  'B.Tech Alumni': [
    { name: 'name', label: 'Name', required: true },
    { name: 'batchYear', label: 'Batch Year', required: true },
    { name: 'currentRole', label: 'Current Role' },
    { name: 'organisation', label: 'Organisation' },
    { name: 'linkedIn', label: 'LinkedIn URL', type: 'url' },
  ],
  'M.Tech Alumni': [
    { name: 'name', label: 'Name', required: true },
    { name: 'batchYear', label: 'Batch Year', required: true },
    { name: 'currentRole', label: 'Current Role' },
    { name: 'organisation', label: 'Organisation' },
    { name: 'linkedIn', label: 'LinkedIn URL', type: 'url' },
  ],
  'Faculty Alumni': [
    { name: 'name', label: 'Name', required: true },
    { name: 'tenure', label: 'Tenure (e.g. 2010–2020)', required: true },
    { name: 'specialisation', label: 'Specialisation' },
    { name: 'currentRole', label: 'Current Role & Organisation' },
  ],
};

// collection name per tab
const COLLECTION = {
  'Faculty': 'faculty',
  'HOD/Leadership': 'hods',
  'Infrastructure': 'infra',
  'Events & Fests': 'events',
  'Student Projects': 'projects',
  'Patents': 'patents',
  'Publications': 'publications',
  'B.Tech Alumni': 'btech_alumni',
  'M.Tech Alumni': 'mtech_alumni',
  'Faculty Alumni': 'faculty_alumni',
};

// ── Stat card top-border colours ──
const STAT_COLORS = ['#c9a84c','#0f2744','#16a34a','#dc2626','#7c3aed','#2563eb','#0891b2','#b45309','#64748b','#1a3a60'];

// ── CVR Seed data (from https://cvr.ac.in/home4/index.php/civil) ──
const SEED_DATA = {
  hods: [
    { name: 'Dr. B. Naga Malleswara Rao', role: 'HoD', specialisation: 'Water Resources Engineering', since: '2011', email: 'hod.civil@cvr.ac.in' },
    { name: 'Dr. K. Rama Sastri', role: 'Dean', specialisation: 'Geotechnical Engineering', since: '2011', email: '' },
    { name: 'Dr. M. V. Seshagiri Rao', role: 'Dean', specialisation: 'Structural Engineering', since: '2011', email: '' },
  ],
  faculty: [
    { name: 'Dr. N. Murali Krishna', role: 'Professor', specialisation: 'Structural Engineering', qualifications: 'Ph.D.', experience: '20+ years', email: '' },
    { name: 'Dr. T. Muralidhara Rao', role: 'Professor', specialisation: 'Structural Engineering', qualifications: 'Ph.D.', experience: '20+ years', email: '' },
    { name: 'Dr. Sasank Sekhar Hota', role: 'Professor', specialisation: 'Structural Engineering', qualifications: 'Ph.D.', experience: '18+ years', email: '' },
    { name: 'Dr. K. Madhusudan Reddy', role: 'Professor', specialisation: 'Geotechnical Engineering', qualifications: 'Ph.D.', experience: '20+ years', email: '' },
    { name: 'Dr. Sadguna Nuli', role: 'Assoc. Professor', specialisation: 'Transportation Engineering', qualifications: 'Ph.D.', experience: '15+ years', email: '' },
    { name: 'Mr. M. Ashok Kumar', role: 'Asst. Professor', specialisation: 'Geotechnical Engineering', qualifications: 'M.Tech', experience: '8+ years', email: '' },
  ],
  infra: [
    { name: 'Advanced Concrete Technology Lab', type: 'Laboratory', emoji: '🧱', description: 'Compression Testing Machine (2000kN), Concrete Permeability Apparatus, Accelerated Curing Tank, Air Entrainment Meter.', capacity: '30 Students' },
    { name: 'Project & Research Lab', type: 'Laboratory', emoji: '🔬', description: 'Computerized Four-Column Load Frame (1000kN) and High-Temperature Furnace (1000°C) for advanced material testing.', capacity: '20 Students' },
    { name: 'Environmental Engineering Lab', type: 'Laboratory', emoji: '🌿', description: 'Nephelometer, Spectrophotometer, B.O.D. Incubator, Noise Level Meter for water and environmental analysis.', capacity: '30 Students' },
    { name: 'Geotechnical Engineering Lab', type: 'Laboratory', emoji: '⛏️', description: 'Standard Penetration Test (SPT) Setup and comprehensive soil testing equipment for geotechnical investigations.', capacity: '30 Students' },
    { name: 'Surveying & Geo-Informatics Lab', type: 'Laboratory', emoji: '🗺️', description: 'Total Stations, Digital Levels, and GPS units for field surveying and geomatics studies.', capacity: '30 Students' },
    { name: 'Civil Engineering Computer Lab', type: 'Laboratory', emoji: '💻', description: 'Industry software: STAAD Pro, ETABS, AutoCAD, QGIS for structural design, drafting, and GIS.', capacity: '40 Students' },
    { name: 'Departmental Library', type: 'Other', emoji: '📚', description: '3,871 volumes across 673 titles. ASCE (35 journals) and DELNET (209 journals) digital access.', capacity: '' },
  ],
};

// ── Overview ──
function Overview({ collections }) {
  const { showToast } = useToast();
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded]   = useState(false);

  async function handleSeed() {
    if (!window.confirm(
      'This will add all CVR Civil dept faculty, HODs, and labs to Firestore.\n\nProceed?'
    )) return;
    setSeeding(true);
    try {
      for (const [col, docs] of Object.entries(SEED_DATA)) {
        for (const doc of docs) {
          await addDoc(collection(db, col), { ...doc, isNew: false, createdAt: serverTimestamp() });
        }
      }
      setSeeded(true);
      showToast('✅ CVR dept data seeded successfully!', 'success');
    } catch (err) {
      showToast('❌ Seed failed: ' + err.message, 'error');
    } finally {
      setSeeding(false);
    }
  }

  const allNew = Object.values(collections)
    .flatMap(c => c.data)
    .filter(d => d.isNew)
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

  const labels = [
    'Faculty', 'HOD/Leadership', 'Infrastructure', 'Events & Fests',
    'Student Projects', 'Patents', 'Publications', 'B.Tech Alumni', 'M.Tech Alumni', 'Faculty Alumni',
  ];

  return (
    <div>
      <h2 className={styles.tabTitle}>Overview</h2>

      {/* Seed banner */}
      <div className={styles.seedBanner}>
        <div>
          <p className={styles.seedTitle}>🌱 Seed CVR Dept Data</p>
          <p className={styles.seedSub}>
            Pre-populate Faculty, HOD & Leadership, and Infrastructure with real data
            fetched from the CVR Civil Engineering department website.
            {seeded && ' ✅ Already seeded this session.'}
          </p>
        </div>
        <button
          className="btn btn-gold"
          onClick={handleSeed}
          disabled={seeding || seeded}
          style={{ flexShrink: 0 }}
        >
          {seeding ? 'Seeding…' : seeded ? 'Seeded ✓' : 'Seed Database'}
        </button>
      </div>

      <div className={styles.statGrid}>
        {labels.map((l, i) => {
          const col = COLLECTION[l];
          const count = collections[col]?.data?.length ?? 0;
          return (
            <div key={l} className={`card ${styles.statCard}`} style={{ borderTopColor: STAT_COLORS[i] }}>
              <span className={styles.statNum}>{count}</span>
              <span className={styles.statLbl}>{l}</span>
            </div>
          );
        })}
      </div>

      {allNew.length > 0 && (
        <>
          <h3 className={styles.recentTitle}>Recently Added</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name / Title</th>
                  <th>Status</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {allNew.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.name || item.title || '—'}</td>
                    <td><span className="badge-new">NEW</span></td>
                    <td style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>
                      {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ── Generic CRUD Tab ──
function CrudTab({ tabName, collectionName }) {
  const { data, loading, add, remove } = useCollection(collectionName);
  const { showToast } = useToast();

  async function handleAdd(form) {
    await add(form);
    showToast(`✅ ${tabName} entry added!`, 'success');
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this entry?')) return;
    await remove(id);
    showToast(`🗑 Entry deleted`, 'default');
  }

  return (
    <div className={styles.crudLayout}>
      <div className={styles.formSection}>
        <h2 className={styles.tabTitle}>Add {tabName}</h2>
        <AdminForm fields={FIELDS[tabName]} onSubmit={handleAdd} submitLabel={`Add ${tabName}`} />
      </div>

      <div className={styles.listSection}>
        <h3 className={styles.listTitle}>Existing Entries ({data.length})</h3>
        {loading && <div className="spinner" />}
        {!loading && data.length === 0 && <p className="empty">No entries yet.</p>}
        {data.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name / Title</th>
                  <th>Status</th>
                  <th style={{ width: 60 }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, maxWidth: 280 }}>
                      {item.name || item.title || '—'}
                      {item.role && <span style={{ color: 'var(--text2)', fontWeight: 400, marginLeft: 6 }}>— {item.role}</span>}
                    </td>
                    <td>
                      {item.isNew
                        ? <span className="badge-new">NEW</span>
                        : <span style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>Existing</span>}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Dashboard ──
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Pre-load all collections for overview stats
  const faculty     = useCollection('faculty');
  const hods        = useCollection('hods');
  const infra       = useCollection('infra');
  const events      = useCollection('events');
  const projects    = useCollection('projects');
  const patents     = useCollection('patents');
  const publications= useCollection('publications');
  const btech       = useCollection('btech_alumni');
  const mtech       = useCollection('mtech_alumni');
  const facAlumni   = useCollection('faculty_alumni');

  const allCollections = {
    faculty, hods, infra, events, projects, patents,
    publications, btech_alumni: btech, mtech_alumni: mtech, faculty_alumni: facAlumni,
  };

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  function selectTab(t) {
    setActiveTab(t);
    setSidebarOpen(false);
  }

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sLogo}>CE</div>
          <div>
            <p className={styles.sTitle}>Admin Dashboard</p>
          </div>
        </div>

        <nav className={styles.sNav}>
          {TABS.map(t => (
            <button
              key={t}
              className={`${styles.sNavItem} ${activeTab === t ? styles.sNavActive : ''}`}
              onClick={() => selectTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>

        <div className={styles.sFooter}>
          <Link to="/" className="btn btn-ghost-white btn-sm" style={{ display: 'block', textAlign: 'center', marginBottom: 8 }}>
            👁 View Site
          </Link>
          <button className="btn btn-ghost-white btn-sm" style={{ width: '100%' }} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Mobile header */}
        <div className={styles.mobileHeader}>
          <button className={styles.hamburger} onClick={() => setSidebarOpen(o => !o)}>☰</button>
          <span className={styles.mobileTitle}>{activeTab}</span>
        </div>

        <div className={styles.content}>
          {activeTab === 'Overview' ? (
            <Overview collections={allCollections} />
          ) : (
            <CrudTab tabName={activeTab} collectionName={COLLECTION[activeTab]} />
          )}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
