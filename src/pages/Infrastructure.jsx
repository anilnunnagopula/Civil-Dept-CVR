import { useCollection } from '../hooks/useCollection';
import SectionHeader from '../components/SectionHeader';
import styles from './Infrastructure.module.css';

const GROUPS = [
  { key: 'Laboratory', label: 'Laboratories', icon: '🔬' },
  { key: 'Classroom', label: 'Classrooms & Halls', icon: '🏫' },
  { key: 'Other', label: 'Other Facilities', icon: '🏛️' },
];

export default function Infrastructure() {
  const { data, loading } = useCollection('infra');

  return (
    <div className="page">
      <div className="container">
        <SectionHeader
          title="Infrastructure"
          subtitle="World-class facilities that empower learning, research, and innovation."
        />
        {loading && <div className="spinner" />}
        {GROUPS.map(g => {
          const items = data.filter(d => d.type === g.key);
          if (!items.length && !loading) return null;
          return (
            <div key={g.key} className={styles.group}>
              <h3 className={styles.groupHeading}>
                {g.icon} {g.label}
              </h3>
              <div className="grid-3">
                {items.map(item => (
                  <div key={item.id} className={`card ${styles.infraCard}`}>
                    <div className={styles.iconWrap}>{item.emoji || g.icon}</div>
                    <div className={styles.body}>
                      <div className={styles.titleRow}>
                        <h4 className={styles.name}>{item.name}</h4>
                        {item.isNew && <span className="badge-new">NEW</span>}
                      </div>
                      {item.capacity && (
                        <p className={styles.cap}>Capacity: {item.capacity}</p>
                      )}
                      {item.description && (
                        <p className={styles.desc}>{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {!loading && data.length === 0 && (
          <p className="empty">No infrastructure entries yet. Add some from the admin panel.</p>
        )}
      </div>
    </div>
  );
}
