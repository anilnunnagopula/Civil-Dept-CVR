import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/infrastructure', label: 'Infrastructure' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/students', label: 'Students' },
  { to: '/research', label: 'Research' },
  { to: '/events', label: 'Events & Fests' },
  { to: '/alumni', label: 'Alumni' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.col}>
          <div className={styles.brand}>
            <span className={styles.logo}>CE</span>
            <span>Civil Engineering</span>
          </div>
          <p className={styles.tagline}>
            Shaping the built environment through innovation, research, and excellence.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map(l => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Contact</h4>
          <p>Department of Civil Engineering</p>
          <p>📍 Main Campus, Block C</p>
          <p>📞 +91-XXX-XXXXXXX</p>
          <p>✉ civil.dept@college.ac.in</p>
        </div>
      </div>
      <div className={styles.copy}>
        <p>© {new Date().getFullYear()} Department of Civil Engineering. All rights reserved.</p>
        <p className={styles.credit}>
          Built with <span className={styles.heart}>❤️</span> by <strong>ANIL NUNNAGOPULA</strong> (Batch 2022-2026 CIVIL)
        </p>
      </div>
    </footer>
  );
}
