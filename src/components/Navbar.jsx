import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/infrastructure', label: 'Infrastructure' },
  { to: '/faculty', label: 'Faculty' },
  { to: '/students', label: 'Students' },
  { to: '/research', label: 'Research' },
  { to: '/events', label: 'Events & Fests' },
  { to: '/alumni', label: 'Alumni' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.brand}>
          <span className={styles.logo}>CE</span>
          <span className={styles.deptName}>Civil Engineering</span>
        </Link>

        {/* Desktop nav */}
        <div className={styles.links}>
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Admin button */}
        <button
          className={`btn btn-gold btn-sm ${styles.adminBtn}`}
          onClick={() => navigate('/admin')}
        >
          ⚙ Admin
        </button>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={open ? styles.barOpen1 : styles.bar} />
          <span className={open ? styles.barOpen2 : styles.bar} />
          <span className={open ? styles.barOpen3 : styles.bar} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={styles.mobile}>
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `${styles.mLink} ${isActive ? styles.mActive : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <button
            className={`btn btn-gold btn-sm`}
            onClick={() => { navigate('/admin'); setOpen(false); }}
            style={{ margin: '8px 16px 16px' }}
          >
            ⚙ Admin
          </button>
        </div>
      )}
    </nav>
  );
}
