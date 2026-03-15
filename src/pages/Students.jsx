import { useCollection } from '../hooks/useCollection';
import SectionHeader from '../components/SectionHeader';
import styles from './Students.module.css';

export default function Students() {
  const { data, loading } = useCollection('projects');

  return (
    <div className="page">
      <div className="container">
        <SectionHeader title="Best Projects" subtitle="Outstanding student projects and capstone works." />
        {loading && <div className="spinner" />}
        <div className="grid-2">
          {data.map(p => (
            <div key={p.id} className={`card ${styles.projCard}`}>
              <div className={styles.leftPanel}>
                <span className={styles.year}>{p.year}</span>
                <span className={styles.star}>⭐</span>
              </div>
              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{p.title}</h3>
                  {p.isNew && <span className="badge-new">NEW</span>}
                </div>
                {p.description && <p className={styles.desc}>{p.description}</p>}
                <div className={styles.meta}>
                  {p.teamMembers && (
                    <p><span className={styles.ml}>Team</span>{p.teamMembers}</p>
                  )}
                  {p.facultyGuide && (
                    <p><span className={styles.ml}>Guide</span>{p.facultyGuide}</p>
                  )}
                  {p.award && (
                    <p className={styles.award}>🏆 {p.award}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {!loading && data.length === 0 && (
          <p className="empty">No student projects yet. Add some from the admin panel.</p>
        )}
      </div>
    </div>
  );
}
