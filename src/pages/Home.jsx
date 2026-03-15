import { Link } from 'react-router-dom';
import { useCollection } from '../hooks/useCollection';
import { Helmet } from 'react-helmet-async';
import SectionHeader from '../components/SectionHeader';
import styles from './Home.module.css';

const quickLinks = [
  { to: '/infrastructure', icon: '🏛️', label: 'Infrastructure' },
  { to: '/faculty', icon: '👨‍🏫', label: 'Faculty' },
  { to: '/students', icon: '🎓', label: 'Students' },
  { to: '/research', icon: '🔬', label: 'Research' },
  { to: '/events', icon: '🎪', label: 'Events & Fests' },
  { to: '/alumni', icon: '🌐', label: 'Alumni' },
];

const programs = [
  'B.Tech Civil Engineering (Intake: 120)',
  'M.Tech – Structural Engineering (Intake: 24)',
  'Minor Degree – AI & Machine Learning',
  'Minor Degree – Data Science',
  'Minor Degree – Cyber Security',
  'Minor Degree – IoT',
  'Ph.D. (Civil Engineering)',
];

const badges = [
  { icon: '🏅', text: 'NAAC "A" Grade', sub: 'II Cycle · 2022–2027' },
  { icon: '📋', text: 'NBA Tier-1', sub: 'B.Tech & M.Tech · 2025–2028' },
  { icon: '🏛️', text: 'UGC Autonomous', sub: 'JNTUH Affiliated' },
  { icon: '📅', text: 'Dept. Est. 2011', sub: '33-Acre Campus · Hyd' },
];

function collectLatestNew(...arrays) {
  return arrays
    .flat()
    .filter(item => item.isNew)
    .sort((a, b) => {
      const ta = a.createdAt?.seconds || 0;
      const tb = b.createdAt?.seconds || 0;
      return tb - ta;
    })
    .slice(0, 6);
}

export default function Home() {
  const { data: faculty } = useCollection('faculty');
  const { data: hods } = useCollection('hods');
  const { data: students } = useCollection('projects');
  const { data: patents } = useCollection('patents');
  const { data: publications } = useCollection('publications');
  const { data: infra } = useCollection('infra');
  const { data: events } = useCollection('events');

  const allFaculty = [...faculty, ...hods];
  const latestNew = collectLatestNew(allFaculty, students, patents, publications, infra, events);

  const stats = [
    { label: 'Faculty Members', value: allFaculty.length || '25+', icon: '👨‍🏫' },
    { label: 'Students Enrolled', value: '1200+', icon: '🎓' },
    { label: 'Patents Filed', value: patents.length || '15+', icon: '🔒' },
    { label: 'Publications', value: publications.length || '150+', icon: '📄' },
  ];

  return (
    <>
      <Helmet>
        <title>Home | Civil Engineering Department | CVR College</title>
        <meta name="description" content="Welcome to the Civil Engineering Department at CVR College of Engineering. Accredited by NBA (Tier-1), we provide excellence in technical education and research." />
      </Helmet>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className={styles.hero}>
        {/* animated background layers */}
        <div className={styles.heroBg} />
        <div className={styles.gridOverlay} />
        <div className={styles.gradientBlob1} />
        <div className={styles.gradientBlob2} />

        <div className={`container ${styles.heroContent}`}>
          {/* College name pill */}
          <div className={styles.collegePill}>
            <span className={styles.collegeDot} />
            CVR College of Engineering &nbsp;·&nbsp; Hyderabad
          </div>

          {/* Dept name */}
          <p className={styles.heroEyebrow}>Department of</p>
          <h1 className={`serif ${styles.heroTitle}`}>
            Civil <span className={styles.goldText}>Engineering</span>
          </h1>
          <p className={styles.heroSub}>
            Building tomorrow's infrastructure today — through rigorous education,
            cutting-edge research, and industry-ready graduates.
          </p>

          {/* CTA buttons */}
          <div className={styles.heroCta}>
            <Link to="/faculty" className={`btn btn-gold`}>Meet Our Faculty</Link>
            <Link to="/research" className={`btn btn-ghost-white`}>Explore Research</Link>
          </div>

          {/* Accreditation badges */}
          <div className={styles.badgeRow}>
            {badges.map(b => (
              <div key={b.text} className={styles.badge}>
                <span className={styles.badgeIcon}>{b.icon}</span>
                <div>
                  <p className={styles.badgeText}>{b.text}</p>
                  <p className={styles.badgeSub}>{b.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className={styles.statGrid}>
            {stats.map(s => (
              <div key={s.label} className={styles.statBox}>
                <span className={styles.statIcon}>{s.icon}</span>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className={styles.wave}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ── Quick Links ──────────────────────────────── */}
      <section className={styles.quickLinks}>
        <div className="container">
          <div className={styles.qlGrid}>
            {quickLinks.map(l => (
              <Link key={l.to} to={l.to} className={styles.qlCard}>
                <span className={styles.qlIcon}>{l.icon}</span>
                <span className={styles.qlLabel}>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Updates ────────────────────────────── */}
      {latestNew.length > 0 && (
        <section className={`page ${styles.section}`} style={{ paddingTop: 0 }}>
          <div className="container">
            <SectionHeader title="Latest Updates" subtitle="Recently added entries across the department" />
            <div className="grid-3">
              {latestNew.map(item => (
                <div key={item.id} className={`card ${styles.updateCard}`}>
                  <div className={styles.updateCardTop} />
                  <div className={styles.updateBody}>
                    <span className="badge-new">NEW</span>
                    <h3 className={styles.updateTitle}>{item.name || item.title}</h3>
                    {item.role && <p className={styles.updateSub}>{item.role}</p>}
                    {item.type && <p className={styles.updateSub}>{item.type}</p>}
                    {item.description && (
                      <p className={styles.updateDesc}>{item.description.slice(0, 100)}…</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Vision & Programs ─────────────────────────── */}
      <section className={`page ${styles.section}`} style={{ paddingTop: latestNew.length ? 0 : 56 }}>
        <div className="container">
          <div className={styles.vpGrid}>
            <div className={`card ${styles.vpCard}`}>
              <h3 className={`serif ${styles.vpTitle}`}>Our Vision &amp; Mission</h3>
              <div className={styles.vpDivider} />
              <p className={styles.vpText}>
                <strong>Vision:</strong> To be a Centre for quality education and research in
                the field of Civil Engineering.
              </p>
              <p className={styles.vpText} style={{ marginTop: 12 }}>
                <strong>Mission:</strong> To provide a well-balanced curriculum with practical
                exposure; state-of-the-art laboratories with modern hardware and software;
                research opportunities for faculty and students; and to create employability
                skills and social responsibility in graduates.
              </p>
            </div>

            <div className={`card ${styles.vpCard}`}>
              <h3 className={`serif ${styles.vpTitle}`}>Programs Offered</h3>
              <div className={styles.vpDivider} />
              <ul className={styles.programList}>
                {programs.map(p => (
                  <li key={p}>🎓 {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── About CVR ─────────────────────────────────── */}
      <section className={styles.aboutStrip}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p className={styles.aboutEyebrow}>About the Department</p>
              <h2 className={`serif ${styles.aboutTitle}`}>Civil Engineering at CVR</h2>
              <p className={styles.aboutDesc}>
                Established in <strong>2011–12</strong>, the Department of Civil Engineering at CVR College
                offers B.Tech (intake 120) and M.Tech – Structural Engineering (intake 24),
                both holding <strong>NBA Tier-1 accreditation (2025–2028)</strong>. Students can also
                pursue Minor Degrees in AI&amp;ML, Data Science, Cyber Security, and IoT.
                The department boasts state-of-the-art laboratories, an active research culture,
                and access to ASCE (35 journals) &amp; DELNET (209 journals).
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
                <a href="https://cvr.ac.in/home4/index.php/civil" target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  Department Website ↗
                </a>
                <a href="https://www.cvr.ac.in" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  CVR College ↗
                </a>
              </div>
            </div>
            <div className={styles.aboutStats}>
              {[
                { num: '120', unit: '+', label: 'B.Tech Intake' },
                { num: '2011', unit: '', label: 'Dept. Established' },
                { num: '6+', unit: '', label: 'Research Labs' },
                { num: 'NBA', unit: 'Tier-1', label: 'Accredited Programs' },
              ].map(s => (
                <div key={s.label} className={styles.aboutStat}>
                  <span className={styles.aboutNum}>{s.num}<small>{s.unit}</small></span>
                  <span className={styles.aboutLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
