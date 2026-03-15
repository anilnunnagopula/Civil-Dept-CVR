import { useCollection } from '../hooks/useCollection';
import { Helmet } from 'react-helmet-async';
import SectionHeader from '../components/SectionHeader';
import styles from './Events.module.css';

const TYPE_COLORS = {
  'Technical Fest': { bg: '#0f2744', text: '#fff' },
  'Cultural':       { bg: '#c9a84c', text: '#0f2744' },
  'Workshop':       { bg: '#16a34a', text: '#fff' },
  'Competition':    { bg: '#dc2626', text: '#fff' },
  'Seminar':        { bg: '#7c3aed', text: '#fff' },
  'Guest Lecture':  { bg: '#2563eb', text: '#fff' },
  'Field Visit':    { bg: '#0891b2', text: '#fff' },
};

export default function Events() {
  const { data, loading } = useCollection('events');

  return (
    <div className="page">
      <Helmet>
        <title>Events &amp; Fests | Civil Engineering Department | CVR College</title>
        <meta name="description" content="Stay updated with the latest technical fests, workshops, seminars, and cultural events organized by the Civil Engineering Department at CVR College." />
      </Helmet>
      <div className="container">
        <SectionHeader title="Events &amp; Fests" subtitle="Highlights from our vibrant academic and cultural calendar." />
        {loading && <div className="spinner" />}
        <div className="grid-2">
          {data.map(ev => {
            const tc = TYPE_COLORS[ev.type] || { bg: '#475569', text: '#fff' };
            return (
              <div key={ev.id} className={`card ${styles.evCard}`}>
                <div className={styles.header}>
                  <div className={styles.headerBg} />
                  <div className={styles.headerContent}>
                    <span
                      className={styles.typePill}
                      style={{ background: tc.bg, color: tc.text }}
                    >{ev.type}</span>
                    <h3 className={styles.evName}>{ev.name}</h3>
                    {ev.isNew && <span className="badge-new" style={{marginTop: 4}}>NEW</span>}
                    {ev.date && <p className={styles.evDate}>{ev.date}</p>}
                  </div>
                </div>
                <div className={styles.body}>
                  {ev.venue && <p className={styles.venue}>📍 {ev.venue}</p>}
                  {ev.description && <p className={styles.desc}>{ev.description}</p>}
                  {ev.highlights && (
                    <div className={styles.highlights}>
                      <span className={styles.hlLabel}>Highlights</span>
                      <p>{ev.highlights}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {!loading && data.length === 0 && (
          <p className="empty">No events yet. Add some from the admin panel.</p>
        )}
      </div>
    </div>
  );
}
