import { useCollection } from '../hooks/useCollection';
import { Helmet } from 'react-helmet-async';
import SectionHeader from '../components/SectionHeader';
import PersonCard from '../components/PersonCard';
import styles from './Faculty.module.css';

function initials(name='') {
  const p = name.trim().split(' ');
  return p.length === 1 ? p[0][0]?.toUpperCase() || '?' : (p[0][0]+p[p.length-1][0]).toUpperCase();
}

export default function Faculty() {
  const { data: hods, loading: l1 } = useCollection('hods');
  const { data: faculty, loading: l2 } = useCollection('faculty');
  const { data: facAlumni, loading: l3 } = useCollection('faculty_alumni');
  const loading = l1 || l2 || l3;

  return (
    <div className="page">
      <Helmet>
        <title>Faculty | Civil Engineering Department | CVR College</title>
        <meta name="description" content="Meet our highly qualified faculty members specializing in Structural, Geotechnical, Water Resources, and Transportation Engineering." />
      </Helmet>
      <div className="container">
        <SectionHeader title="Faculty" subtitle="Meet the dedicated minds shaping the next generation of engineers." />
        {loading && <div className="spinner" />}

        {/* HOD & Leadership */}
        {hods.length > 0 && (
          <section className={styles.group}>
            <h3 className={styles.groupHead}>🏅 HOD &amp; Leadership</h3>
            <div className="grid-2">
              {hods.map(h => (
                <PersonCard
                  key={h.id}
                  name={h.name}
                  role={h.role}
                  detail={`Specialisation: ${h.specialisation}`}
                  extraDetail={h.email ? `✉ ${h.email}` : undefined}
                  avatarClass="avatar-gold"
                  isNew={h.isNew}
                />
              ))}
            </div>
          </section>
        )}

        {/* Teaching Faculty */}
        {faculty.length > 0 && (
          <section className={styles.group}>
            <h3 className={styles.groupHead}>👨‍🏫 Teaching Faculty</h3>
            <div className="grid-3">
              {faculty.map(f => (
                <div key={f.id} className={`card ${styles.facultyCard}`}>
                  <div className={styles.cardTop}>
                    <div className={`avatar avatar-navy`}>{initials(f.name)}</div>
                    <div>
                      <div className={styles.fNameRow}>
                        <span className={styles.fName}>{f.name}</span>
                        {f.isNew && <span className="badge-new">NEW</span>}
                      </div>
                      <p className={styles.fRole}>{f.role}</p>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    {f.specialisation && <p><span className={styles.fl}>Specialisation</span>{f.specialisation}</p>}
                    {f.experience && <p><span className={styles.fl}>Experience</span>{f.experience}</p>}
                    {f.qualifications && <p><span className={styles.fl}>Qualifications</span>{f.qualifications}</p>}
                    {f.email && <p><span className={styles.fl}>Email</span><a href={`mailto:${f.email}`} className={styles.email}>{f.email}</a></p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Faculty Alumni */}
        {facAlumni.length > 0 && (
          <section className={styles.group}>
            <h3 className={styles.groupHead}>🎓 Faculty Alumni</h3>
            <div className="grid-3">
              {facAlumni.map(f => (
                <PersonCard
                  key={f.id}
                  name={f.name}
                  role="Former Faculty"
                  detail={`Specialisation: ${f.specialisation || '—'} | Tenure: ${f.tenure}`}
                  greenText={f.currentRole ? `Now: ${f.currentRole}` : undefined}
                  avatarClass="avatar-slate"
                  isNew={f.isNew}
                />
              ))}
            </div>
          </section>
        )}

        {!loading && hods.length === 0 && faculty.length === 0 && facAlumni.length === 0 && (
          <p className="empty">No faculty entries yet. Add some from the admin panel.</p>
        )}
      </div>
    </div>
  );
}
