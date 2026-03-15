import { useCollection } from '../hooks/useCollection';
import SectionHeader from '../components/SectionHeader';
import PersonCard from '../components/PersonCard';
import styles from './Alumni.module.css';

export default function Alumni() {
  const { data: btech, loading: l1 } = useCollection('btech_alumni');
  const { data: mtech, loading: l2 } = useCollection('mtech_alumni');
  const loading = l1 || l2;

  return (
    <div className="page">
      <div className="container">
        <SectionHeader title="Alumni" subtitle="Our graduates who are making an impact around the world." />
        {loading && <div className="spinner" />}

        {/* B.Tech Alumni */}
        <section className={styles.group}>
          <h3 className={styles.groupHead}>
            🎓 B.Tech Alumni
            <span className="badge-count">{btech.length}</span>
          </h3>
          <div className="grid-3">
            {btech.map(a => (
              <PersonCard
                key={a.id}
                name={a.name}
                role={`Batch of ${a.batchYear}`}
                detail={a.currentRole ? `${a.currentRole}${a.organisation ? ` @ ${a.organisation}` : ''}` : undefined}
                avatarClass="avatar-slate"
                isNew={a.isNew}
                linkedIn={a.linkedIn}
              />
            ))}
          </div>
          {!l1 && btech.length === 0 && <p className="empty">No B.Tech alumni entries yet.</p>}
        </section>

        {/* M.Tech Alumni */}
        <section className={styles.group}>
          <h3 className={styles.groupHead}>
            🏅 M.Tech Alumni
            <span className="badge-count">{mtech.length}</span>
          </h3>
          <div className="grid-3">
            {mtech.map(a => (
              <PersonCard
                key={a.id}
                name={a.name}
                role={`Batch of ${a.batchYear}`}
                detail={a.currentRole ? `${a.currentRole}${a.organisation ? ` @ ${a.organisation}` : ''}` : undefined}
                avatarClass="avatar-purple"
                isNew={a.isNew}
                linkedIn={a.linkedIn}
              />
            ))}
          </div>
          {!l2 && mtech.length === 0 && <p className="empty">No M.Tech alumni entries yet.</p>}
        </section>
      </div>
    </div>
  );
}
