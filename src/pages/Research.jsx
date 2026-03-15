import { useCollection } from '../hooks/useCollection';
import SectionHeader from '../components/SectionHeader';
import styles from './Research.module.css';

const STATUS_COLORS = { Granted: '#16a34a', Published: '#b45309', Filed: '#1a3a60' };

export default function Research() {
  const { data: patents, loading: l1 } = useCollection('patents');
  const { data: pubs, loading: l2 } = useCollection('publications');

  return (
    <div className="page">
      <div className="container">
        <SectionHeader title="Research" subtitle="Patents, publications, and scholarly contributions by our faculty and students." />

        {/* Patents */}
        <section className={styles.group}>
          <h3 className={styles.groupHead}>🔒 Patents</h3>
          {(l1) && <div className="spinner" />}
          <div className="grid-2">
            {patents.map(p => (
              <div key={p.id} className={`card ${styles.patentCard}`}>
                <div className={styles.patentHeader}>
                  <span className={styles.lockIcon}>🔒</span>
                  <div>
                    <div className={styles.titleRow}>
                      <h4 className={styles.pTitle}>{p.title}</h4>
                      {p.isNew && <span className="badge-new">NEW</span>}
                    </div>
                    <p className={styles.pSub}>{p.inventors}</p>
                  </div>
                  <span
                    className={styles.statusBadge}
                    style={{ background: STATUS_COLORS[p.status] || '#64748b' }}
                  >{p.status}</span>
                </div>
                <div className={styles.patentMeta}>
                  {p.patentNumber && <span>#{p.patentNumber}</span>}
                  {p.year && <span>Year: {p.year}</span>}
                </div>
              </div>
            ))}
          </div>
          {!l1 && patents.length === 0 && <p className="empty">No patents yet.</p>}
        </section>

        {/* Publications */}
        <section className={styles.group}>
          <h3 className={styles.groupHead}>📄 Publications</h3>
          {(l2) && <div className="spinner" />}
          <div className={styles.pubList}>
            {pubs.map(p => (
              <div key={p.id} className={`card ${styles.pubCard}`}>
                <div className={styles.pubLeft} />
                <div className={styles.pubBody}>
                  <div className={styles.titleRow}>
                    <h4 className={styles.pTitle}>{p.title}</h4>
                    {p.isNew && <span className="badge-new">NEW</span>}
                  </div>
                  <p className={styles.authLine}>{p.authors}</p>
                  {p.journal && <p className={styles.journalLine}><em>{p.journal}</em>{p.year ? `, ${p.year}` : ''}</p>}
                  {p.doi && (
                    <a href={p.doi.startsWith('http') ? p.doi : `https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className={styles.doiLink}>
                      🔗 DOI
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!l2 && pubs.length === 0 && <p className="empty">No publications yet.</p>}
        </section>
      </div>
    </div>
  );
}
